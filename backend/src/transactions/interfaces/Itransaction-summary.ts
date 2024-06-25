import IFormattedTransaction from './Iformatted-transactions';

export default interface ITransactionSummary {
  transactions: IFormattedTransaction[];
  income: number;
  expenses: number;
  total: number;
}
