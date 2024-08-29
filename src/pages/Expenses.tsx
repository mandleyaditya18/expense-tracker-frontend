import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Expenses = () => {
  return (
    <div className="py-4 px-8 w-100">
      <div className="flex justify-between items-center">
        <Input type="text" placeholder="Search expenses" className="w-2/3" />
        <Button>+ Add Expense</Button>
      </div>
    </div>
  );
};

export default Expenses;
