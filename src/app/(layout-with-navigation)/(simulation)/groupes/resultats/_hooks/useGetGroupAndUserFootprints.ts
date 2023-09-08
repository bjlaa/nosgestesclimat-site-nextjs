import { getRuleSumNodes } from '@/helpers/publicodes/getRuleSumNodes'
import { useEngine, useForm, useTempEngine } from '@/publicodes-state'
import { Member } from '@/types/groups'

export function getSubcategories({
  rules,
  category,
  getRuleObject,
}: {
  rules: any
  category: string
  getRuleObject: (dottedName: string) => any
}): string[] | undefined {
  const categoryFormatted =
    category === 'logement' ? 'logement . impact' : category

  const rule = getRuleObject(categoryFormatted)

  return getRuleSumNodes(rules, rule)
}

export const useGetGroupAndUserFootprints = ({
  groupMembers,
  userId,
  isSynced,
}: {
  groupMembers: Member[] | undefined
  userId: string | null
  isSynced: boolean
}) => {
  const { categories } = useForm()

  const { rules, getRuleObject } = useTempEngine()

  const { getValue } = useEngine()

  if (!groupMembers || !userId || !isSynced) return {}

  return (
    groupMembers
      // We sort the members to have the current user as last to set the engine
      .sort((a) => (a.userId === userId ? 1 : -1))
      .reduce(
        (
          {
            groupFootprintByCategoriesAndSubcategories,
            userFootprintByCategoriesAndSubcategories,
          },
          groupMember: Member
        ) => {
          // Create a copy of the accumulator
          const updatedGroupFootprintByCategoriesAndSubcategories = {
            ...groupFootprintByCategoriesAndSubcategories,
          } as any
          const updatedUserFootprintByCategoriesAndSubcategories = {
            ...userFootprintByCategoriesAndSubcategories,
          } as any

          const isCurrentMember = groupMember.userId === userId
          // if (isCurrentMember) {
          //   updateSituationOfCurrentSimulation(
          //     groupMember?.simulation?.situation
          //   )
          // }

          categories
            // Model shenanigans
            .map((category: string) =>
              category === 'transport' ? 'transport . empreinte' : category
            )
            .forEach((category: any) => {
              const categoryValue = getValue(category)

              const defaultCategoryObject = {
                name: category,
                value: categoryValue,
                isCategory: true,
              }

              // If the category is not in the accumulator, we add its name as a new key in the object along with its value
              // otherwise we add the value to the existing sum
              if (
                !updatedGroupFootprintByCategoriesAndSubcategories[category]
              ) {
                updatedGroupFootprintByCategoriesAndSubcategories[category] =
                  defaultCategoryObject
              } else {
                updatedGroupFootprintByCategoriesAndSubcategories[
                  category
                ].value += categoryValue
              }

              // Add each category footprint for the current member
              if (isCurrentMember) {
                updatedUserFootprintByCategoriesAndSubcategories[category] =
                  defaultCategoryObject
              }

              const currentCategorySubcategories =
                getSubcategories({
                  rules,
                  category,
                  getRuleObject,
                }) || []

              currentCategorySubcategories.forEach((subCategory: string) => {
                const subCategoryValue = getValue(subCategory)

                // Same here if the property doesn't exist in the accumulator, we add it
                // otherwise we add the value to the existing sum
                if (
                  !updatedGroupFootprintByCategoriesAndSubcategories[
                    subCategory
                  ]
                ) {
                  updatedGroupFootprintByCategoriesAndSubcategories[
                    subCategory
                  ] = {
                    name: subCategory,
                    value: subCategoryValue,
                  }
                } else {
                  updatedGroupFootprintByCategoriesAndSubcategories[
                    subCategory
                  ].value += subCategoryValue
                }
                if (isCurrentMember) {
                  // Add each category footprint for the current member
                  updatedUserFootprintByCategoriesAndSubcategories[
                    subCategory
                  ] = {
                    name: subCategory,
                    value: subCategoryValue,
                  }
                }
              })
            })

          return {
            groupFootprintByCategoriesAndSubcategories:
              updatedGroupFootprintByCategoriesAndSubcategories,
            userFootprintByCategoriesAndSubcategories:
              updatedUserFootprintByCategoriesAndSubcategories,
          }
        },
        {
          groupFootprintByCategoriesAndSubcategories: {},
          userFootprintByCategoriesAndSubcategories: {},
        }
      )
  )
}
