import {
  cmsClient,
  type ArticleType,
  type ImageType,
  type MetaType,
  type PopulatedHomePageType,
} from '@/adapters/cmsClient'
import { captureException } from '@sentry/nextjs'

const PAGE_SIZE = 12

const isProduction = process.env.NEXT_PUBLIC_ENV === 'production'

export async function fetchHomepageContent({ page }: { page: number }): Promise<
  | (Partial<PopulatedHomePageType<'mainArticle' | 'image' | 'articles'>> & {
      pageCount: number
    })
  | undefined
> {
  try {
    const homepageSearchParams = new URLSearchParams({
      locale: 'fr',
      'populate[0]': 'image',
      'populate[1]': 'mainArticle',
      'populate[2]': 'mainArticle.image',
      'populate[3]': 'mainArticle.category',
      status: isProduction ? '' : 'draft',
    })

    const homepageResponse = await cmsClient<{
      data: PopulatedHomePageType<'mainArticle' | 'image' | 'articles'>
      image: ImageType
    }>(`/api/home-page?${homepageSearchParams}`)

    if (!homepageResponse?.data) {
      console.error('Error: homepageResponse?.data is undefined')
      return undefined
    }

    const { mainArticle, image, title, description } = homepageResponse.data

    const articlesSearchParams = new URLSearchParams({
      locale: 'fr',
      'fields[0]': 'title',
      'fields[1]': 'description',
      'fields[2]': 'slug',
      'populate[0]': 'image',
      'populate[1]': 'category',
      'filters[id][$ne]': mainArticle?.id ?? '',
      'pagination[page]': page.toString(),
      'pagination[pageSize]': PAGE_SIZE.toString(),
      sort: 'publishedAt:desc',
      status: isProduction ? '' : 'draft',
    })

    const articlesResponse = await cmsClient<{
      data: ArticleType[]
      meta: MetaType
    }>(`/api/articles?${articlesSearchParams}`)

    const { data, meta } = articlesResponse

    return {
      title: title,
      description: description,
      image: image,
      mainArticle: mainArticle,
      articles: data ?? [],
      pageCount: meta?.pagination?.pageCount ?? 0,
    }
  } catch (error) {
    console.error('Error:', error)
    captureException(error)

    return undefined
  }
}