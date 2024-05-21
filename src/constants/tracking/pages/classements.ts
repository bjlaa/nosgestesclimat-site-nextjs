// Return tracking data in format
// [ 'trackEvent', 'Category', 'Action', 'Name', 'Value' ]

// Figma comment #83
export const classementCreateGroup = [
  'trackEvent',
  'Classements',
  'Create Group',
]

// Figma comment #84
export const classementCreateOrganisation = [
  'trackEvent',
  'Classements',
  'Create Organisation',
]

type ClassementClickItem = {
  isAdministator: boolean
  numParticipants?: number
}

// Figma comment #85
export const classementClickGroup = ({
  numParticipants,
}: ClassementClickItem) => [
  'trackEvent',
  'Classements',
  'Click Group',
  null,
  String(numParticipants),
]

// Figma comment #86
export const classementClickOrganisation = [
  'trackEvent',
  'Classements',
  'Click Organisation',
]
