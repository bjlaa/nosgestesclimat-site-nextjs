import type { CategoryPageContentType } from '@/types/blog'
import axios from 'axios'

const isProduction = process.env.NODE_ENV === 'production'

export async function fetchArticlePageContent({
  articleSlug,
  locale,
}: {
  articleSlug: string
  locale: string
}): Promise<CategoryPageContentType> {
  console.log(articleSlug, locale)
  try {
    const articleResponse = await axios.get(
      `${process.env.CMS_URL}/api/articles?locale=${locale}&filters[slug][$eq]=${articleSlug}&populate[0]=image&populate[1]=category${
        isProduction ? '' : '&status=draft'
      }`,
      {
        headers: {
          Authorization: `Bearer ${process.env.CMS_TOKEN}`,
        },
      }
    )

    return articleResponse.data.data?.[0]
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Handle specific HTTP errors
      console.error('API Error:', error.response?.status, error.response?.data)
    } else {
      // Handle other errors
      console.error('Error:', error)
    }
    return {
      title: '',
      description: '',
      faqDescription: '',
      mainArticle: {
        id: '',
        title: '',
        slug: '',
        description: '',
        href: '',
        image: {
          url: '',
          alternativeText: '',
        },
        category: {
          id: '',
          title: '',
          slug: '',
        },
      },
      articles: [],
      pageCount: 0,
      questions: [],
    }
  }
}
