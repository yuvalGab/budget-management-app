import { makeAutoObservable, runInAction } from "mobx";
import apiClient from "../utils/apiClient";
import { Transaction } from "shared";

const TRANSACTION_PATH = "/transactions";

class TransactionStore {
  transactions: Transaction[] = [];
  loading = false;

  constructor() {
    makeAutoObservable(this);
  }

  async getTransactions() {
    this.loading = true;
    try {
      const response = await apiClient.get(TRANSACTION_PATH);
      runInAction(() => {
        this.transactions = response.data;
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
      const response = await apiClient.get(`${TRANSACTION_PATH}/${id}`);
      runInAction(() => {
        const transaction = response.data;
        this.transactions = [
          transaction,
          ...this.transactions.filter((t) => t.id !== id),
        ];
        this.loading = false;
      });
    } catch (error) {
      console.error("Failed to get transaction:", error);
      this.loading = false;
    }
  }

  async addTransaction(transaction: Omit<Transaction, "id">) {
    try {
      const response = await apiClient.post(TRANSACTION_PATH, transaction);
      runInAction(() => {
        this.transactions.push({ ...transaction, id: response.data.id });
      });
    } catch (error) {
      console.error("Failed to add transaction:", error);
    }
  }

  async editTransaction(id: number, updatedTransaction: Partial<Transaction>) {
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
      console.error("Failed to edit transaction:", error);
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
}

const transactionStore = new TransactionStore();
export default transactionStore;
