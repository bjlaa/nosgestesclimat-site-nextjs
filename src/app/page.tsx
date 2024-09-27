import Header from '@/components/layout/Header'
import Actions from './_components/Actions'
import Amis from './_components/Amis'
import Contributions from './_components/Contributions'
import Explanations from './_components/Explanations'
import Heading from './_components/Heading'
import Organisations from './_components/Organisations'

export default async function Homepage() {
  return (
    <>
      <Header />
      <Heading />
      <div className="mx-auto mb-12 flex w-full max-w-5xl flex-col flex-wrap items-center gap-12 px-4 md:mb-20 md:flex-row md:items-start md:px-8 lg:gap-28">
        <Amis />
        <Actions />
      </div>
      <Organisations />
      <Explanations />
      <Contributions />
    </>
  )
}
