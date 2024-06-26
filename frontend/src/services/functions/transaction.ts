import ITransactionSummary from '~/interfaces/Itransaction-summary'
import { api } from '~/libs/axios'

export interface ITransactionDataForm {
  id?: string
  description?: string
  price?: string
  category?: string
}

// Listar todas as transações
export const listTransactions = async () => {
  try {
    const response = await api.get('/transaction')
    const { transactions, expenses, income, total }: ITransactionSummary =
      response.data
    return { transactions, expenses, income, total }
  } catch (error) {
    console.error('Error fetching transactions:', error)
    throw error
  }
}

// Listar todas as transações por ID da categoria
export const listTransactionsByCategoryId = async (categoryId: string) => {
  try {
    const response = await api.get(`/transaction/by-category/${categoryId}`)
    const { transactions, expenses, income, total }: ITransactionSummary =
      response.data
    return { transactions, expenses, income, total }
  } catch (error) {
    console.error(
      `Error fetching transactions for category with id ${categoryId}:`,
      error,
    )
    throw error
  }
}

// Criar uma nova transação
export const createTransaction = async (data: ITransactionDataForm) => {
  try {
    await api.post('/transaction', {
      description: data.description,
      amount: parseFloat(data.price!),
      date: new Date().toISOString().split('T')[0],
      categoryId: data.category,
    })
  } catch (error) {
    console.error('Error creating transaction:', error)
    throw error
  }
}

// Atualizar uma transação por ID
export const updateTransaction = async (data: ITransactionDataForm) => {
  try {
    const { id, description, price, category } = data
    await api.put(`/transaction/${id}`, {
      description,
      amount: parseFloat(price!),
      categoryId: category,
    })
  } catch (error) {
    console.error(`Error updating transaction with id ${data.id}:`, error)
    throw error
  }
}

// Deletar uma transação por ID
export const deleteTransaction = async (id: string) => {
  try {
    await api.delete(`/transaction/${id}`)
  } catch (error) {
    console.error(`Error deleting transaction with id ${id}:`, error)
    throw error
  }
}
