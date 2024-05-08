import { formatCarbonFootprint } from '@/helpers/formatCarbonFootprint'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useLocale } from '@/hooks/useLocale'
import { useRule } from '@/publicodes-state'
import { motion } from 'framer-motion'

export default function TargetChart() {
  const locale = useLocale()
  const { t } = useClientTranslation()

  const { numericValue: total } = useRule('bilan')

  const { formattedValue, unit } = formatCarbonFootprint(total, { locale, t })

  const currentYear = new Date().getFullYear()

  return (
    <div className="short:mb-2 short:mt-12 relative mx-auto mb-6 mt-14 h-28 max-w-[300px]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 3 }}
        className="absolute bottom-full left-3 translate-y-1">
        <div className="text-xs text-secondary-700">{currentYear}</div>
        <div className="text-xl font-black">
          {formattedValue} {unit}
        </div>
        <div className="absolute right-full top-full h-3 w-3 -translate-x-1 -translate-y-2/3 rounded-full bg-secondary-700" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 4 }}
        className="absolute bottom-10 right-1">
        <div className="text-xs text-secondary-700">2050</div>
        <div className="text-xl font-black">2 tonnes</div>
        <div className="absolute right-full top-full h-3 w-3 -translate-x-1 -translate-y-2/3 rounded-full bg-secondary-700" />
      </motion.div>
      <div className="absolute  w-11/12 origin-top-left rotate-[19deg]">
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.75, delay: 3.5 }}
          className=" h-[2px] w-full origin-left bg-secondary-700">
          <svg
            width="16"
            height="15"
            viewBox="0 0 16 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-full top-1/2 -translate-y-1/2">
            <path
              d="M15.8229 7.44126L0.0737896 14.3695V0.513062L15.8229 7.44126Z"
              fill="#D40983"
            />
          </svg>
        </motion.div>
      </div>
    </div>
  )
}
