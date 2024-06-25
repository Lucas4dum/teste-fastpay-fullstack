import { api } from '~/libs/axios'

interface FormData {
  categoryName?: string
}

export const fetchCategories = async (token: string) => {
  try {
    const response = await api.get('/category', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data.categories
  } catch (error) {
    console.error('Error fetching categories:', error)
    throw error
  }
}

export const createCategory = async (data: FormData, token: string) => {
  try {
    await api.post(
      '/category',
      { name: data.categoryName },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    console.log('Categoria criada com sucesso')
  } catch (error) {
    console.error('Error creating category:', error)
    throw error
  }
}
