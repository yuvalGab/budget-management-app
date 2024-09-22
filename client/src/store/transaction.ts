import { makeAutoObservable, runInAction } from "mobx";
import apiClient from "../utils/apiClient";
import { Transaction, TransactionType } from "shared";
import { message } from "antd";

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
      const errorMessage = "Failed to get transactions";
      console.error(`${errorMessage}:`, error);
      message.error(errorMessage);
      runInAction(() => {
        this.transactions = [];
        this.loading = false;
      });
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
      const errorMessage = "Failed to get transaction";
      console.error(`${errorMessage}:`, error);
      message.error(errorMessage);
      runInAction(() => {
        this.currentTransaction = null;
        this.loading = false;
      });
    }
  }

  async createTransaction(transaction: Omit<Transaction, "id">) {
    try {
      await apiClient.post(TRANSACTION_PATH, transaction);
      await this.getTransactions();
      message.success("Transaction created successfully");
    } catch (error) {
      const errorMessage = "Failed to create transaction";
      console.error(`${errorMessage}:`, error);
      message.error(errorMessage);
    }
  }

  async updateTransaction(id: number, updatedTransaction: Transaction) {
    try {
      await apiClient.put(`${TRANSACTION_PATH}/${id}`, updatedTransaction);
      await this.getTransactions();
      message.success("Transaction updated successfully");
    } catch (error) {
      const errorMessage = "Failed to update transaction";
      console.error(`${errorMessage}:`, error);
      message.error(errorMessage);
    }
  }

  async deleteTransaction(id: number) {
    try {
      await apiClient.delete(`${TRANSACTION_PATH}/${id}`);
      await this.getTransactions();
      message.success("Transaction deleted successfully");
    } catch (error) {
      const errorMessage = "Failed to delete transaction";
      console.error(`${errorMessage}:`, error);
      message.error(errorMessage);
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
