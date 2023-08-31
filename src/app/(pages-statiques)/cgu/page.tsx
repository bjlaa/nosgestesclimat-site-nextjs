import { Metadata } from 'next'
import Content from './_components/Content'

export const metadata: Metadata = {
  title: 'CGU',
  description: "Conditions générales d'utilisation du site.",
}

export default function CGU() {
  return <Content />
}
