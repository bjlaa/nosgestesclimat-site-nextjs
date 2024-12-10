import Link from '@/components/Link'
import Trans from '@/components/translation/Trans'
import ImageWithCategory from '@/design-system/cms/ImageWithCategory'
import ColorLine from '@/design-system/layout/ColorLine'

export default function HeroArticle({
  imageSrc,
  imageAlt,
  title,
  description,
  category,
  href,
}: {
  imageSrc: string
  imageAlt: string
  title: string
  description: string
  category: string
  href: string
}) {
  return (
    <div>
      <h2 className="relative mb-8 inline-block pb-4 text-2xl font-medium md:text-3xl">
        <Trans>À la une !</Trans>{' '}
        <ColorLine className="bg-rainbow absolute bottom-0 left-[15%] h-[3px] w-[70%] animate-rainbow-slow transition-all md:left-0 md:w-full" />
      </h2>
      <div className="flex gap-8 rounded-xl bg-heroLightBackground md:flex-row">
        <ImageWithCategory
          imageSrc={imageSrc}
          imageAlt={imageAlt}
          width={500}
          height={500}
          category={category}
          imageClassName="w-full"
          containerClassName="w-1/2"
        />

        <div className="flex-1 py-8 pr-20">
          <h3 className="text-xl font-normal md:text-2xl">{title}</h3>

          <p
            className="text-base"
            dangerouslySetInnerHTML={{ __html: description }}
          />

          <div className="flex justify-end">
            <Link
              href={href}
              className="ml-auto inline-block cursor-pointer p-4 pt-0 text-right text-[13px] text-primary-700 underline md:text-right md:text-base">
              <Trans>Lire la suite</Trans>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
