export default interface IFormattedTransaction {
  id: string;
  description: string;
  amount: number;
  date: Date;
  categoryId: string;
  categoryName: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}
