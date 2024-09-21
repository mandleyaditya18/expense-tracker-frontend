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
import { TrashIcon } from "@radix-ui/react-icons";

interface ExpenseTableProps {
  expenses: Expense[];
  className: string;
}

const ExpensesTable: React.FC<ExpenseTableProps> = ({
  expenses,
  className,
}) => {
  return (
    <Table className={className}>
      <TableHeader>
        <TableRow>
          <TableHead className="">Title</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Frequency</TableHead>
          <TableHead className="text-right">Amount</TableHead>
          <TableHead className="text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {expenses.map((expense) => (
          <TableRow key={expense.id}>
            <TableCell className="font-medium">{expense.title}</TableCell>
            <TableCell>{expense.date}</TableCell>
            <TableCell>Food</TableCell>
            <TableCell>{expense.parsed_frequency}</TableCell>
            <TableCell className="text-right">
              {expense.parsed_amount_str}
            </TableCell>
            <TableCell className="text-center justify-center flex gap-2">
              <ExpenseDrawer expense={expense} />
              <Button variant="destructive" size="icon">
                <TrashIcon />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ExpensesTable;
