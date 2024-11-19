import Link from '@/components/Link'
import Ademe from '@/components/images/partners/Ademe'
import Marianne from '@/components/images/partners/Marianne'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import Image from 'next/image'

export default async function Partners() {
  const { t } = await getServerTranslation()

  return (
    <div className="flex justify-center md:-mt-10">
      <div className="relative flex items-center justify-center gap-6 py-6 md:gap-8 md:py-10">
        <Marianne className="h-auto w-12 md:w-auto" />
        <Link href="https://ademe.fr" target="_blank">
          <Ademe className="h-auto w-10 md:w-auto" />
        </Link>
        <Link href="https://abc-transitionbascarbone.fr" target="_blank">
          <Image
            src="/images/misc/logo-abc-web.webp"
            alt={t("Logo de l'Association pour la transition Bas Carbone")}
            width="90"
            height="30"
            className="h-auto w-20"
          />
        </Link>
      </div>
    </div>
  )
}
