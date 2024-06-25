export default interface ITransaction {
  id: string
  description: string
  amount: number
  date: string
  categoryId: string
  categoryName: string
  userId: string
  createdAt: string
  updatedAt: string
}
