import { FormEvent, useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@/components/ui/date-picker";
import { MultiSelect } from "@/components/ui/multi-select";
import { EXPENSE_FREQUENCY } from "@/utils/constants";
import api from "@/utils/api";
import { format } from "date-fns";
import { useExpenseStore } from "@/store/useExpenseStore";
import { Expense } from "@/utils/types";

const defaultValues: {
  title: string;
  description: string;
  date: Date;
  amount: number;
  category: Array<string>;
  frequency: string;
} = {
  title: "",
  description: "",
  date: new Date(),
  amount: 0.0,
  category: [],
  frequency: "one_time",
};

interface ExpenseFormProps {
  expense?: Expense;
  className?: string;
  setOpenForm: (openState: boolean) => void;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({
  expense,
  className,
  setOpenForm,
}) => {
  const { addExpense, updateExpense, expenseCategories } = useExpenseStore();
  const [expenseFormData, setExpenseFormData] = useState(defaultValues);

  const onChange = (
    name: string,
    val: string | string[] | Date | undefined,
  ) => {
    setExpenseFormData((prev) => ({ ...prev, [name]: val }));
  };

  useEffect(() => {
    if (expense) {
      setExpenseFormData({
        title: expense.title,
        description: expense.description,
        date: new Date(expense.date),
        amount: expense.parsed_amount,
        category: expense.category.map((c) => c.name),
        frequency: expense.frequency,
      });
    }
  }, [expense]);

  const expenseCategoryOptions = useMemo(() => {
    return expenseCategories.map((category) => ({
      value: category.id.toString(),
      label: category.name.charAt(0).toUpperCase() + category.name.slice(1),
    }));
  }, [expenseCategories]);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      const payload = {
        title: expenseFormData.title,
        description: expenseFormData.description,
        date: format(
          expenseFormData.date,
          format(expenseFormData.date, "yyyy-MM-dd"),
        ),
        amount: Number(expenseFormData.amount).toFixed(2),
        category: expenseFormData.category.map((c) => ({ name: c })),
        frequency: expenseFormData.frequency,
      };

      const { data } = expense
        ? await api.put(`/expenses/${expense.id}/`, payload)
        : await api.post("/expenses/", payload);

      if (expense) {
        updateExpense(data);
      } else {
        addExpense(data);
      }

      setExpenseFormData(defaultValues);
      setOpenForm(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      className={cn("grid items-start gap-4", className)}
      onSubmit={onSubmit}
    >
      <div className="grid gap-2">
        <Label htmlFor="title">Title</Label>
        <Input
          type="text"
          id="title"
          placeholder="Title"
          value={expenseFormData.title}
          onChange={(e) => onChange("title", e.target.value)}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Description"
          value={expenseFormData.description}
          onChange={(e) => onChange("description", e.target.value)}
        />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="grid gap-2">
          <Label htmlFor="date">Date</Label>
          <DatePicker
            value={expenseFormData.date}
            onChange={(date) => onChange("date", date)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="amount">Amount</Label>
          <Input
            type="number"
            id="amount"
            placeholder="Amount"
            value={expenseFormData.amount}
            onChange={(e) => onChange("amount", e.target.value)}
          />
        </div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="category">Category</Label>
        <MultiSelect
          options={expenseCategoryOptions}
          onValueChange={(val) => onChange("category", val)}
          defaultValue={expenseFormData.category}
          placeholder="Select categories"
          variant="inverted"
          maxCount={2}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="frequency">Frequency</Label>
        <Select
          value={expenseFormData.frequency}
          onValueChange={(val) => onChange("frequency", val)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Frequency" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Frequency</SelectLabel>
              {EXPENSE_FREQUENCY.map((freq) => (
                <SelectItem key={freq.value} value={freq.value}>
                  {freq.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <Button type="submit">Save changes</Button>
    </form>
  );
};

export default ExpenseForm;
