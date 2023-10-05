import { clickAmisLink } from '../../helpers/elements/buttons'
import { recursivelyFillSimulation } from '../../helpers/simulation/recursivelyFillSimulation'
import { setupSimulation } from '../../helpers/simulation/setupSimulation'
/*
Cypress.automation('remote:debugger:protocol', {
  command: 'Browser.grantPermissions',
  params: {
    permissions: ['clipboardReadWrite', 'clipboardSanitizedWrite'],
    origin: window.location.origin,
  },
})
*/

describe('The Group creation page /amis/creer', () => {
  before(() => {
    cy.visit('/')
    setupSimulation()
  })

  let groupURL = ''

  it('allows to create a new group and displays it afterwards', () => {
    recursivelyFillSimulation()

    // Check that we can create our first group
    cy.get('[data-cypress-id="button-create-first-group"]').click()
    cy.get('input[data-cypress-id="group-input-owner-name"]').type('Jean-Marc')
    cy.get('[data-cypress-id="button-create-group"]').click()
    cy.get('[data-cypress-id="group-name"]')

    cy.visit('/amis')

    // Check that we can create a second group
    clickAmisLink()
    cy.get('[data-cypress-id="button-create-other-group"]').click()
    cy.get('input[data-cypress-id="group-input-owner-name"]').type('Jean-Marc')
    cy.get('[data-cypress-id="button-create-group"]').click()
    cy.get('[data-cypress-id="group-name"]')

    // And that we can update its name
    cy.get('[data-cypress-id="group-name-edit-button"]').click()

    const newName = 'Les amis de Jean-Marc'

    cy.get('input[data-cypress-id="group-edit-input-name"]').clear()
    cy.get('input[data-cypress-id="group-edit-input-name"]').type(newName)
    cy.get('[data-cypress-id="button-inline-input"]').click()
    cy.get('[data-cypress-id="group-name"]').contains(newName)

    // Check that we can copy the invitation link
    cy.get('[data-cypress-id="invite-button"]').click()
    cy.window()
      .its('navigator.clipboard')
      .invoke('readText')
      .then((text) => {
        text.then((URL) => {
          cy.log(URL)
          groupURL = URL
        })
      })
  })

  it('allows to join a group with the invitation link and display ', () => {
    // Check
    cy.visit(groupURL)

    cy.get('[data-cypress-id="member-name"]').type('Jean-Claude')
    cy.get('[data-cypress-id="button-join-group"]').click()

    recursivelyFillSimulation()

    cy.get('[data-cypress-id="see-results-link"]').click()

    cy.get('[data-cypress-id="group-name"]')

    // Check that the main sections are displayed
    cy.get('[data-cypress-id="points-fort-faibles-title"]')
    cy.get('[data-cypress-id="votre-empreinte-title"]')
  })
})
