import type {
  PopulatedArticleType,
  PopulatedAuthorType,
} from '@/adapters/cmsClient'
import { cmsClient } from '@/adapters/cmsClient'
import { captureException } from '@sentry/nextjs'

const isProduction = process.env.NODE_ENV === 'production'

type Article = PopulatedArticleType<'image' | 'category'> & {
  author: PopulatedAuthorType<'image'>
}

export async function fetchArticlePageContent({
  articleSlug,
  locale,
}: {
  articleSlug: string
  locale: string
}): Promise<
  | {
      article?: Article
      otherArticles?: PopulatedArticleType<'image' | 'category'>[]
    }
  | undefined
> {
  try {
    const articleSearchParams = new URLSearchParams({
      locale,
      'populate[0]': 'image',
      'populate[1]': 'category',
      'populate[2]': 'author',
      'populate[3]': 'author.image',
      'filters[slug][$eq]': articleSlug,
      sort: 'publishedAt:desc',
      status: isProduction ? '' : 'draft',
    })
    console.log('toto')
    const articleResponse = await cmsClient<{
      data: [Article]
    }>(`/api/articles?${articleSearchParams}`)
    console.log(articleResponse)
    if (articleResponse.data?.length !== 1) {
      console.error(
        `Error: fetch article error for articleSlug: ${articleSlug}`
      )
      return
    }

    const {
      data: [article],
    } = articleResponse

    const categorySlug = article.category?.slug
    const otherArticlesSearchParams = new URLSearchParams({
      locale,
      'populate[0]': 'image',
      'populate[1]': 'category',
      'filters[category][slug][$eq]': categorySlug ?? '',
      'filters[slug][$ne]': articleSlug,
      sort: 'publishedAt:desc',
      'pagination[start]': '0',
      'pagination[limit]': '3',
    })

    const otherArticlesResponse = await cmsClient<{
      data: PopulatedArticleType<'image' | 'category'>[]
    }>(`/api/articles?${otherArticlesSearchParams}`)

    return {
      article,
      otherArticles: otherArticlesResponse?.data ?? [],
    }
  } catch (error) {
    console.error('Error:', error)
    captureException(error)

    return
  }
}
