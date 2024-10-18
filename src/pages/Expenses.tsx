import { useEffect } from "react";
import { useLoaderData } from "react-router-dom";

import { Input } from "@/components/ui/input";
import ExpensesTable from "@/components/shared/ExpensesTable";
import ExpenseDrawer from "@/components/shared/ExpenseDrawer";

import { ExpensesAPIResponse } from "@/utils/types";
import { useExpenseStore } from "@/store/useExpenseStore";
import { Button } from "@/components/ui/button";
import api from "@/utils/api";

const Expenses = () => {
  const { expenses, setExpenses, expenseMetadata, setExpenseMetadata } =
    useExpenseStore();
  const { count, next, previous, results } =
    useLoaderData() as ExpensesAPIResponse;

  useEffect(() => {
    if (results) {
      setExpenses(results);
      setExpenseMetadata({ count, next, previous });
    }
  }, [results, setExpenses, setExpenseMetadata, count, next, previous]);

  const paginationHandler = async (type: "next" | "prev") => {
    try {
      const url =
        type === "next" ? expenseMetadata.next : expenseMetadata.previous;
      if (url) {
        const response = await api.get(url);
        const data = await response.data;
        setExpenseMetadata({
          count: data.count,
          next: data.next,
          previous: data.previous,
        });
        setExpenses(data.results);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="py-4 px-8 w-100">
      <div className="flex justify-between items-center">
        <Input type="text" placeholder="Search expenses" className="w-2/3" />
        <ExpenseDrawer />
      </div>
      <ExpensesTable expenses={expenses} className="mt-12" />
      <div className="p-4 flex justify-end">
        <Button
          variant="ghost"
          onClick={() => paginationHandler("prev")}
          disabled={!expenseMetadata.previous}
        >
          Previous
        </Button>
        <Button
          variant="ghost"
          onClick={() => paginationHandler("next")}
          disabled={!expenseMetadata.next}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Expenses;
