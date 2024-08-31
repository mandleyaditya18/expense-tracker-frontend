import { useLoaderData } from "react-router-dom";

import { Input } from "@/components/ui/input";
import ExpensesTable from "@/components/shared/ExpensesTable";
import AddExpenseDrawer from "@/components/shared/AddExpenseDrawer";

import { Expense } from "@/utils/types";

const Expenses = () => {
  const expenses = useLoaderData() as Expense[];

  return (
    <div className="py-4 px-8 w-100">
      <div className="flex justify-between items-center">
        <Input type="text" placeholder="Search expenses" className="w-2/3" />
        <AddExpenseDrawer />
      </div>
      <ExpensesTable expenses={expenses} className="mt-12" />
    </div>
  );
};

export default Expenses;
