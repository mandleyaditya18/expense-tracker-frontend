import { Expense } from "@/utils/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import ExpenseDrawer from "./ExpenseDrawer";
import { format } from "date-fns";
import api from "@/utils/api";
import { useExpenseStore } from "@/store/useExpenseStore";
import { TrashIcon } from "@heroicons/react/24/outline";

interface ExpenseTableProps {
  expenses: Expense[];
  className: string;
}

const ExpensesTable: React.FC<ExpenseTableProps> = ({
  expenses,
  className,
}) => {
  const { deleteExpense } = useExpenseStore();

  const deleteExpenseHandler = async (expenseId: number) => {
    try {
      await api.delete(`/expenses/${expenseId}/`);
      deleteExpense(expenseId);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Table className={className}>
      <TableHeader>
        <TableRow>
          <TableHead className="">Title</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Category</TableHead>
          {/* <TableHead>Frequency</TableHead> */}
          <TableHead className="text-right">Amount</TableHead>
          <TableHead className="text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {expenses.map((expense) => (
          <TableRow key={expense.id}>
            <TableCell className="font-medium">{expense.title}</TableCell>
            <TableCell>{format(expense.date, "MMM do, yyyy")}</TableCell>
            <TableCell>Food</TableCell>
            {/* <TableCell>{expense.parsed_frequency}</TableCell> */}
            <TableCell className="text-right">
              {expense.parsed_amount_str}
            </TableCell>
            <TableCell className="text-center justify-center flex gap-4">
              <ExpenseDrawer expense={expense} />
              <Button
                variant="outline"
                size="icon"
                className="border-red-500"
                onClick={() => deleteExpenseHandler(expense.id)}
              >
                <TrashIcon className="h-4 w-4 text-red-500" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ExpensesTable;
