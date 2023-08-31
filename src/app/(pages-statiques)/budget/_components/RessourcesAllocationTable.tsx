const arraySum = (arr: number[]) =>
  arr.reduce((a, b) => (!isNaN(b) ? a + b : a), 0)

const formatValue = (value: number) =>
  !isNaN(value) ? value.toLocaleString('fr-FR') : '-'

type Props = {
  selectedYear: string
  budget: Record<string, Record<string, Record<string, number>>>
  products: string[]
  categories: string[]
}

export default function RessourcesAllocationTable({
  selectedYear,
  categories,
  products,
  budget,
}: Props) {
  return (
    <div className='overflow-auto'>
      <table className='mb-8 w-full text-left'>
        <thead className='font-bold'>
          <tr>
            <td className='w-[6rem] p-2'>{selectedYear}</td>
            <td className='w-[6rem] p-2 text-right'>Total</td>
          </tr>
        </thead>
        <tbody className='bg-primaryLight'>
          {categories.map((label: string) => (
            <tr key={label}>
              <td className='w-[6rem] p-2'>{label}</td>
              <td className='w-[6rem] p-2 text-right font-bold'>
                {formatValue(
                  arraySum(
                    products.map((q) => budget[selectedYear]?.[q]?.[label] ?? 0)
                  )
                )}{' '}
                €
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className='bg-primary'>
            <td className='w-[6rem] p-2 font-bold text-white'>Total TTC</td>
            <td className='w-[6rem] p-2 text-right font-bold text-white'>
              {formatValue(
                arraySum(
                  products.map((q) =>
                    arraySum(Object.values(budget[selectedYear]?.[q] ?? {}))
                  )
                )
              )}{' '}
              €
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}
