import InteractiveResultBlock from './resultsBlocksDesktop/InteractiveResultBlock'

export default function ResultsBlocksDesktop() {
  return (
    <section className="hidden flex-col gap-4 md:flex">
      <InteractiveResultBlock metric="carbone" />
      <InteractiveResultBlock metric="eau" />
    </section>
  )
}
