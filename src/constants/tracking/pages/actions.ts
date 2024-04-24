// Return tracking data in format
// [ 'trackEvent', 'Category', 'Action', 'Name', 'Value' ]

import { DottedName } from '@/publicodes-state/types'

// Figma comment #67
export const actionsClickStart = ['trackEvent', 'Actions', 'Click Démarrer']

// Figma comment #68
export const actionsClickFilter = (category: DottedName) => [
  'trackEvent',
  'Actions',
  'Click Filter',
  category,
]

// Figma comment #69
export const actionsClickYes = (action: DottedName) => [
  'trackEvent',
  'Actions',
  action,
  'Click Yes',
]

// Figma comment #70
export const actionsClickNo = (action: DottedName) => [
  'trackEvent',
  'Actions',
  action,
  'Click No',
]

// Figma comment #71
export const actionsClickAdditionalQuestion = (action: DottedName) => [
  'trackEvent',
  'Actions',
  action,
  'Click Additional Question',
]

// Figma comment #112
export const actionsOpenAction = (action: DottedName) => [
  'trackEvent',
  'Actions',
  action,
  'Open Action',
]

// Figma comment #114
export const actionsClickActionsPlus = [
  'trackEvent',
  'Actions',
  'Click More infos',
  'Actions Plus',
]

// Figma comment #114
export const actionsClickAdeme = [
  'trackEvent',
  'Actions',
  'Click More infos',
  'ADEME',
]
