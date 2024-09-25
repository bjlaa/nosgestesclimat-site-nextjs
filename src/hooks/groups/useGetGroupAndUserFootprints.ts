import { orderedCategories } from '@/constants/orderedCategories'

import {
  CategoriesAndSubcategoriesFootprintsType,
  Participant,
} from '@/types/groups'
import { DottedName } from '@incubateur-ademe/nosgestesclimat'
import { ComputedResultsSubcategories } from './../../publicodes-state/types.d'

type Props = {
  groupMembers: Participant[]
  userId: string | null
}

export const useGetGroupAndUserFootprints = ({
  groupMembers,
  userId,
}: Props): {
  currentUserCategoriesAndSubcategoriesFootprints: CategoriesAndSubcategoriesFootprintsType
  groupCategoriesAndSubcategoriesFootprints: CategoriesAndSubcategoriesFootprintsType
} => {
  return groupMembers.reduce<{
    currentUserCategoriesAndSubcategoriesFootprints: CategoriesAndSubcategoriesFootprintsType
    groupCategoriesAndSubcategoriesFootprints: CategoriesAndSubcategoriesFootprintsType
  }>(
    (acc, groupMember: Participant) => {
      const {
        currentUserCategoriesAndSubcategoriesFootprints,
        groupCategoriesAndSubcategoriesFootprints,
      } = acc

      const isCurrentMember = groupMember.userId === userId

      // Create a copy of the accumulator
      const updatedGroupCategoriesAndSubcategoriesFootprints = {
        ...groupCategoriesAndSubcategoriesFootprints,
      }

      const updatedCurrentUserCategoriesAndSubcategoriesFootprints: CategoriesAndSubcategoriesFootprintsType =
        {
          ...currentUserCategoriesAndSubcategoriesFootprints,
        }

      orderedCategories.forEach(
        (category) => {
          const categoryRawValue =
            groupMember?.simulation?.computedResults?.carbone?.categories[
              category
            ] || 0

          const categoryValue =
            typeof categoryRawValue === 'number' ? categoryRawValue : 0

          const defaultCategoryObject = {
            name: category,
            value: categoryValue,
            isCategory: true,
          }

          // If the category is not in the accumulator, we add its name
          // as a new key in the object along with its value otherwise we
          // add the value to the existing sum
          if (!updatedGroupCategoriesAndSubcategoriesFootprints[category]) {
            updatedGroupCategoriesAndSubcategoriesFootprints[category] =
              defaultCategoryObject
          } else {
            updatedGroupCategoriesAndSubcategoriesFootprints[category].value +=
              categoryValue
          }

          // Add each category footprint for the current member
          if (isCurrentMember) {
            updatedCurrentUserCategoriesAndSubcategoriesFootprints[category] =
              defaultCategoryObject
          }

          // Handle subcategories
          const subcategories =
            groupMember?.simulation?.computedResults?.carbone?.subcategories

          if (!subcategories) {
            return
          }

          Object.entries(subcategories).forEach(
            ([subCategory, subCategoryRawValue]) => {
              const subCategoryValue =
                typeof subCategoryRawValue === 'number'
                  ? subCategoryRawValue
                  : 0

              // Same here if the property doesn't exist in the accumulator, we add it
              // otherwise we add the value to the existing sum
              if (
                !updatedGroupCategoriesAndSubcategoriesFootprints[
                  subCategory as keyof ComputedResultsSubcategories
                ]
              ) {
                updatedGroupCategoriesAndSubcategoriesFootprints[
                  subCategory as keyof ComputedResultsSubcategories
                ] = {
                  name: subCategory as DottedName,
                  value: subCategoryValue,
                }
              } else {
                updatedGroupCategoriesAndSubcategoriesFootprints[
                  subCategory as keyof ComputedResultsSubcategories
                ].value += subCategoryValue
              }

              if (isCurrentMember) {
                // Add each category footprint for the current member
                updatedCurrentUserCategoriesAndSubcategoriesFootprints[
                  subCategory as keyof ComputedResultsSubcategories
                ] = {
                  name: subCategory as DottedName,
                  value: subCategoryValue,
                }
              }
            }
          )

          return {
            groupCategoriesAndSubcategoriesFootprints:
              updatedGroupCategoriesAndSubcategoriesFootprints,
            currentUserCategoriesAndSubcategoriesFootprints:
              updatedCurrentUserCategoriesAndSubcategoriesFootprints,
          }
        },
        {
          groupCategoriesAndSubcategoriesFootprints: {},
          currentUserCategoriesAndSubcategoriesFootprints: {},
        } as {
          groupCategoriesAndSubcategoriesFootprints: CategoriesAndSubcategoriesFootprintsType
          currentUserCategoriesAndSubcategoriesFootprints: CategoriesAndSubcategoriesFootprintsType
        }
      )

      return {
        currentUserCategoriesAndSubcategoriesFootprints:
          updatedCurrentUserCategoriesAndSubcategoriesFootprints,
        groupCategoriesAndSubcategoriesFootprints:
          updatedGroupCategoriesAndSubcategoriesFootprints,
      }
    },
    {
      currentUserCategoriesAndSubcategoriesFootprints:
        {} as CategoriesAndSubcategoriesFootprintsType,
      groupCategoriesAndSubcategoriesFootprints:
        {} as CategoriesAndSubcategoriesFootprintsType,
    }
  )
}
