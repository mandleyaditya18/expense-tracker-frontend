import { Expense } from "@/utils/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
        </TableRow>
      </TableHeader>
      <TableBody>
        {expenses.map((expense) => (
          <TableRow key={expense.id}>
            <TableCell className="font-medium">{expense.title}</TableCell>
            <TableCell>{expense.date}</TableCell>
            <TableCell>Food</TableCell>
            <TableCell>{expense.frequency}</TableCell>
            <TableCell className="text-right">
              {expense.parsed_amount}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ExpensesTable;
