import SquareImageContainer from '@/components/images/SquareImageContainer'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import Image from 'next/image'

import AllBlogCategories from '@/design-system/cms/AllBlogCategories'
import NewslettersBlockSkeleton from '@/design-system/cms/NewslettersBlockSkeleton'
import { fetchHomepageContent } from '@/helpers/blog/fetchHomepageContent'
import { fetchHomepageMetadata } from '@/helpers/blog/fetchHomepageMetadata'
import { defaultLocale } from '@/i18nConfig'
import { currentLocale } from 'next-i18n-router'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'

import ArticleList from '@/design-system/cms/ArticleList'
import GroupBlock from './_components/GroupBlock'

import ContentLarge from '@/components/layout/ContentLarge'
import MainArticle from '@/design-system/cms/MainArticle'
const NewslettersBlockDynamic = dynamic(
  () => import('@/design-system/cms/NewslettersBlock'),
  {
    ssr: false,
  }
)

export async function generateMetadata() {
  const locale = currentLocale()

  const { metaTitle, metaDescription, metaImage } = await fetchHomepageMetadata(
    {
      locale: locale ?? defaultLocale,
    }
  )

  return getMetadataObject({
    title: metaTitle ?? 'Blog - Nos Gestes Climat',
    description:
      metaDescription ??
      'Découvrez des conseils pratiques pour réduire votre empreinte écologique.',
    image: metaImage?.url ?? '',
    alternates: {
      canonical: '/blog',
    },
  })
}

export default async function BlogHomePage({
  searchParams,
}: {
  searchParams: { page: string }
}) {
  // Get the page number from the query params from the server side
  const page = Number(searchParams.page) || 1

  const { title, description, image, mainArticle, articles, pageCount } =
    await fetchHomepageContent({
      page,
    })

  return (
    <>
      <ContentLarge>
        <div className="flex flex-col justify-between gap-8 overflow-x-hidden md:flex-row">
          <div className="md:max-w-[30rem]">
            <h1
              data-cypress-id="blog-title"
              className="text-3xl md:text-5xl"
              dangerouslySetInnerHTML={{ __html: title ?? '' }}
            />

            <p
              className="text-lg"
              dangerouslySetInnerHTML={{ __html: description ?? '' }}
            />
          </div>
          <div>
            <SquareImageContainer>
              <Image
                src={image?.url ?? ''}
                width="350"
                height="400"
                alt={image?.alternativeText ?? ''}
              />
            </SquareImageContainer>
          </div>
        </div>

        <MainArticle
          title={mainArticle.title}
          description={mainArticle.description}
          imageSrc={mainArticle.image.url}
          imageAlt={mainArticle.image.alternativeText}
          href={`/blog/${mainArticle.category.slug}/${mainArticle.slug}`}
          category={mainArticle.category.title}
        />

        <ArticleList
          articles={articles}
          pageCount={pageCount}
          currentPage={page}
        />

        <div className="mb-48 flex flex-col gap-8 md:flex-row">
          <Suspense fallback={<NewslettersBlockSkeleton />}>
            <NewslettersBlockDynamic />
          </Suspense>

          <GroupBlock />
        </div>
      </ContentLarge>

      <AllBlogCategories />
    </>
  )
}
