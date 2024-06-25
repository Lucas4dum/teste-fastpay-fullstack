import ICategory from '~/interfaces/Icategory'
import { api } from '~/libs/axios'

interface FormData {
  categoryName?: string
}

// Listar todas as categorias
export const listCategories = async () => {
  try {
    const response = await api.get('/category')
    const categories: ICategory[] = response.data.categories
    return categories
  } catch (error) {
    console.error('Error fetching categories:', error)
    throw error
  }
}

// Listar uma categoria por ID
export const listCategoryById = async (id: string) => {
  try {
    const response = await api.get(`/category/${id}`)
    const category: ICategory = response.data.category
    return category
  } catch (error) {
    console.error(`Error fetching category with id ${id}:`, error)
    throw error
  }
}

// Criar uma nova categoria
export const createCategory = async (data: FormData) => {
  try {
    await api.post('/category', { name: data.categoryName })
    console.log('Categoria criada com sucesso')
  } catch (error) {
    console.error('Error creating category:', error)
    throw error
  }
}

// Atualizar uma categoria por ID
export const updateCategory = async (id: string, data: FormData) => {
  try {
    await api.put(`/category/${id}`, { name: data.categoryName })
    console.log(`Categoria com id ${id} atualizada com sucesso`)
  } catch (error) {
    console.error(`Error updating category with id ${id}:`, error)
    throw error
  }
}

// Deletar uma categoria por ID
export const deleteCategory = async (id: string) => {
  try {
    await api.delete(`/category/${id}`)
    console.log(`Categoria com id ${id} deletada com sucesso`)
  } catch (error) {
    console.error(`Error deleting category with id ${id}:`, error)
    throw error
  }
}
