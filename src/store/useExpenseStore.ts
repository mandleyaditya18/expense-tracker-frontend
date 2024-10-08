import { Category, Expense } from "@/utils/types";
import { create } from "zustand";

interface ExpensesState {
  expenses: Expense[];
  setExpenses: (expensesList: Expense[]) => void;
  addExpense: (expense: Expense) => void;
  updateExpense: (expense: Expense) => void;
  deleteExpense: (expenseId: number) => void;

  expenseCategories: Category[];
  setExpenseCategories: (categories: Category[]) => void;
}

export const useExpenseStore = create<ExpensesState>()((set) => ({
  expenses: [],
  setExpenses: (expensesList) => set(() => ({ expenses: expensesList })),
  addExpense: (expense) =>
    set((state) => ({ expenses: [expense, ...state.expenses] })),
  updateExpense: (expense) =>
    set((state) => ({
      expenses: state.expenses.map((e) => (e.id === expense.id ? expense : e)),
    })),
  deleteExpense: (expenseId) =>
    set((state) => ({
      expenses: state.expenses.filter((e) => e.id !== expenseId),
    })),

  expenseCategories: [],
  setExpenseCategories: (categories) =>
    set(() => ({ expenseCategories: categories })),
}));
