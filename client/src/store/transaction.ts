import { makeAutoObservable, runInAction } from "mobx";
import apiClient from "../utils/apiClient";
import { Transaction, TransactionType } from "shared";

const TRANSACTION_PATH = "/transactions";

class TransactionStore {
  transactions: Transaction[] = [];
  currentTransaction: Transaction | null = null;
  loading = false;

  constructor() {
    makeAutoObservable(this);
  }

  async getTransactions() {
    this.loading = true;
    try {
      const res = await apiClient.get(TRANSACTION_PATH);
      runInAction(() => {
        this.transactions = res.data;
        this.loading = false;
      });
    } catch (error) {
      console.error("Failed to get transactions:", error);
      this.loading = false;
    }
  }

  async getTransactionById(id: number) {
    this.loading = true;
    try {
      const res = await apiClient.get(`${TRANSACTION_PATH}/${id}`);
      runInAction(() => {
        this.currentTransaction = res.data;
        this.loading = false;
      });
    } catch (error) {
      console.error("Failed to get transaction:", error);
      this.loading = false;
    }
  }

  async addTransaction(transaction: Omit<Transaction, "id">) {
    try {
      const res = await apiClient.post(TRANSACTION_PATH, transaction);
      runInAction(() => {
        this.transactions.push({ ...transaction, id: res.data.id });
      });
    } catch (error) {
      console.error("Failed to add transaction:", error);
    }
  }

  async updateTransaction(id: number, updatedTransaction: Transaction) {
    try {
      await apiClient.put(`${TRANSACTION_PATH}/${id}`, updatedTransaction);
      runInAction(() => {
        const index = this.transactions.findIndex(
          (transaction) => transaction.id === id
        );
        if (index !== -1) {
          this.transactions[index] = {
            ...this.transactions[index],
            ...updatedTransaction,
          };
        }
      });
    } catch (error) {
      console.error("Failed to update transaction:", error);
    }
  }

  async deleteTransaction(id: number) {
    try {
      await apiClient.delete(`${TRANSACTION_PATH}/${id}`);
      runInAction(() => {
        this.transactions = this.transactions.filter(
          (transaction) => transaction.id !== id
        );
      });
    } catch (error) {
      console.error("Failed to delete transaction:", error);
    }
  }

  get totalIncome(): number {
    return this.transactions
      .filter((t) => t.type === TransactionType.Income)
      .reduce((sum, transaction) => sum + transaction.amount, 0);
  }

  get totalExpenses(): number {
    return this.transactions
      .filter((t) => t.type === TransactionType.Expense)
      .reduce((sum, transaction) => sum + transaction.amount, 0);
  }

  get remainingBalance(): number {
    return this.totalIncome - this.totalExpenses;
  }
}

const transactionStore = new TransactionStore();
export default transactionStore;
