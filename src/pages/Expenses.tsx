import { useEffect } from "react";
import { useLoaderData } from "react-router-dom";

import { Input } from "@/components/ui/input";
import ExpensesTable from "@/components/shared/ExpensesTable";
import ExpenseDrawer from "@/components/shared/ExpenseDrawer";

import { Expense } from "@/utils/types";
import { useExpenseStore } from "@/store/useExpenseStore";

const Expenses = () => {
  const { expenses, setExpenses } = useExpenseStore();
  const expenseData = useLoaderData() as Expense[];

  useEffect(() => {
    if (expenseData) {
      setExpenses(expenseData);
    }
  }, [expenseData, setExpenses]);

  return (
    <div className="py-4 px-8 w-100">
      <div className="flex justify-between items-center">
        <Input type="text" placeholder="Search expenses" className="w-2/3" />
        <ExpenseDrawer />
      </div>
      <ExpensesTable expenses={expenses} className="mt-12" />
    </div>
  );
};

export default Expenses;
