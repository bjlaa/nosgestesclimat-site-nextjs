/* eslint-disable cypress/no-assigning-return-values */
import { Promise } from 'core-js'
import { checkIfCategoryOrderIsRespected } from '../categories/checkIfCategoryOrderIsRespected'
import { clickNextButton } from '../elements/buttons'

const LAST_QUESTION_ID = 'services sociétaux . question rhétorique-ok'

export async function recursivelyFillSimulation(persona = {}) {
  return new Promise((resolve) => {
    function answerCurrentQuestion() {
      const inputPromise = cy.get('input')

      // Cypress doesn't handle async/await
      inputPromise.then((input) => {
        // All questions have been answered
        if (input.length <= 0) {
          resolve()
          return
        }

        // @bjlaa: this is a hack to be able to differenciate between
        // mosaics and single questions ; single questions have not mosaicDottedName defined
        const [dottedName, mosaicDottedName] = input
          .attr('data-cypress-id')
          .split('---')

        function skipQuestion() {
          clickNextButton()

          cy.wait(1000)

          answerCurrentQuestion()
        }

        // Is last question
        if (dottedName === LAST_QUESTION_ID) {
          clickNextButton()

          cy.wait(10000)

          cy.get('div[data-cypress-id="fin-slider"]')

          return resolve()
        }

        // Questions should follow the order of the categories
        checkIfCategoryOrderIsRespected(dottedName)

        const type = input.attr('type')

        // Special case : radios
        if (type === 'radio') {
          const [dottedNameWithoutValueSuffix, value] = dottedName.split('-')
          if (persona.situation[dottedNameWithoutValueSuffix] === value) {
            cy.get(`label[data-cypress-id="${dottedName}-label"]`).click()

            cy.wait(1000)
          } else {
            skipQuestion()
          }
        }

        // No value for this persona
        if (!persona.situation[dottedName]) {
          skipQuestion()
          return
        }

        // Single number input or radio
        if (!mosaicDottedName && persona.situation[dottedName]) {
          cy.get(`input[data-cypress-id="${dottedName}"]`).type(
            persona.situation[dottedName]
          )

          cy.wait(1000)
        }

        const mosaicChildren = Object.keys(persona?.situation ?? {}).filter(
          (dottedNameKey) => dottedNameKey.includes(mosaicDottedName)
        )

        // Is Mosaic
        if (mosaicChildren.length > 1) {
          for (const mosaicItemDottedName of mosaicChildren) {
            cy.get(
              `input[data-cypress-id="${mosaicItemDottedName}---${mosaicDottedName}"]`
            ).type(persona.situation[mosaicItemDottedName])

            cy.wait(1000)
          }
        }

        cy.wait(1000)

        clickNextButton()

        cy.wait(1000)

        // Call itself recursively to go to the next question
        answerCurrentQuestion()
      })
    }

    answerCurrentQuestion()
  })
}
