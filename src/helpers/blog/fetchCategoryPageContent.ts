import type { CategoryPageContentType } from '@/types/blog'
import axios from 'axios'

const PAGE_SIZE = 12
const isProduction = process.env.NODE_ENV === 'production'

export async function fetchCategoryPageContent({
  slug,
  page,
}: {
  slug: string
  page: number
}): Promise<CategoryPageContentType> {
  try {
    const categoryResponse = await axios.get(
      `${process.env.CMS_URL}/api/categories?locale=fr&filters[slug][$eq]=${slug}&populate[0]=mainArticle&populate[1]=questions${
        isProduction ? '' : '&status=draft'
      }`,
      {
        headers: {
          Authorization: `Bearer ${process.env.CMS_TOKEN}`,
        },
      }
    )

    const mainArticleDocumentId =
      categoryResponse.data.data[0].mainArticle.documentId

    const mainArticleResponse = await axios.get(
      `${process.env.CMS_URL}/api/articles/${mainArticleDocumentId}?locale=fr&fields[0]=title&fields[1]=description&fields[2]=slug&populate[0]=image&populate[1]=category${
        isProduction ? '' : '&status=draft'
      }`,
      {
        headers: {
          Authorization: `Bearer ${process.env.CMS_TOKEN}`,
        },
      }
    )

    const articlesResponse = await axios.get(
      `${process.env.CMS_URL}/api/articles?locale=fr&fields[0]=title&fields[1]=description&fields[2]=slug&populate[0]=image&populate[1]=category&filters[documentId][$ne]=${mainArticleDocumentId}&filters[category][$eq]=${categoryResponse.data.data[0].id}&pagination[page]=${page}&pagination[pageSize]=${PAGE_SIZE}${
        isProduction ? '' : '&status=draft'
      }`,
      {
        headers: {
          Authorization: `Bearer ${process.env.CMS_TOKEN}`,
        },
      }
    )

    return {
      title: categoryResponse.data.data[0].title,
      description: categoryResponse.data.data[0].description,
      mainArticle: mainArticleResponse.data.data,
      articles: articlesResponse.data.data,
      pageCount: articlesResponse.data.meta.pagination.pageCount,
      questions: categoryResponse.data.data[0].questions,
      faqDescription: categoryResponse.data.data[0].faqDescription,
    }
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
