import { Expense } from '@/utils/types'
import { create } from 'zustand'

interface ExpensesState {
  expenses: Expense[]
  setExpenses: (expensesList: Expense[]) => void
  addExpense: (expense: Expense) => void
}

export const useExpenseStore = create<ExpensesState>()((set) => ({
  expenses: [],
  setExpenses: (expensesList) => set(() => ({expenses: expensesList})),
  addExpense: (expense) => set((state) => ({ expenses: [expense, ...state.expenses] })),
}))
