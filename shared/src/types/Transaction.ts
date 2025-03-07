export enum TransactionType {
  Income,
  Expense,
}

export interface Transaction {
  id?: number;
  name: string;
  info: string;
  amount: number;
  date: string;
  type: TransactionType;
}
