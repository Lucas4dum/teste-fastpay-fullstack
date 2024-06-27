import ITransaction from './Itransaction'

export default interface ITransactionSummary {
  transactions: ITransaction[]
  income: number
  expenses: number
  total: number
  totalPages: number
  currentPage: number
}
