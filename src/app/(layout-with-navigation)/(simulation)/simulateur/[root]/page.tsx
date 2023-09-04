'use client'

import Title from '@/design-system/layout/Title'
import FormProvider from '@/publicodes-state/formProvider'
import { useState } from 'react'
import Total from '../../../../../components/simulation/total/Total'
import Charts from './_components/Charts'
import Form from './_components/Form'
import Summary from './_components/Summary'

type Props = { params: { root: string } }

export default function Simulateur({ params }: Props) {
  const [isQuestionListOpen, setIsQuestionListOpen] = useState(false)
  const toggleQuestionList = () =>
    setIsQuestionListOpen((prevIsQuestionListOpen) => !prevIsQuestionListOpen)

  return (
    <FormProvider
      root={params.root}
      categoryOrder={[
        'transport',
        'alimentation',
        'logement',
        'divers',
        'services sociétaux',
      ]}>
      <Title title={'Votre bilan climat personnel'} />
      <Total toggleQuestionList={toggleQuestionList} />
      {isQuestionListOpen ? (
        <Summary toggleQuestionList={toggleQuestionList} />
      ) : (
        <>
          <Form />
          <Charts />
        </>
      )}
    </FormProvider>
  )
}
