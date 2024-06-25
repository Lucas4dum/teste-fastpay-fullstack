import { api } from '~/libs/axios'

interface FormData {
  description?: string
  price?: string
  category?: string
}

export const fetchTransactions = async (token: string) => {
  try {
    const response = await api.get('/transaction', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data.transactions
  } catch (error) {
    console.error('Error fetching transactions:', error)
    throw error
  }
}

export const createTransaction = async (data: FormData, token: string) => {
  try {
    await api.post(
      '/transaction',
      {
        description: data.description,
        amount: parseFloat(data.price!),
        date: new Date().toISOString().split('T')[0],
        categoryId: data.category,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    console.log('Transação criada com sucesso')
  } catch (error) {
    console.error('Error creating transaction:', error)
    throw error
  }
}
