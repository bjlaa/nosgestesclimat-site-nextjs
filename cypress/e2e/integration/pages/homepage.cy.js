import { visit } from '../../../helpers/interactions/visit'

describe('check for homepage status', () => {
  beforeEach(() => {
    visit('/')
  })

  it('has a start button', () => {
    cy.get('[data-cypress-id="do-the-test-link"]').should('be.visible')
  })
})
