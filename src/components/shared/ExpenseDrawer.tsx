import { FC, useState } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import ExpenseForm from "./ExpenseForm";
import { Expense } from "@/utils/types";
import { Pencil1Icon } from "@radix-ui/react-icons";

interface ExpenseDrawerProps {
  expense?: Expense;
}

const ExpenseDrawer: FC<ExpenseDrawerProps> = ({ expense }) => {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const buttonText = expense ? <Pencil1Icon /> : "+ Add Expense";
  const formTitle = expense ? "Edit Expense" : "Add Expense";

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant={expense ? "secondary" : "default"}
            size={expense ? "icon" : "default"}
          >
            {buttonText}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{formTitle}</DialogTitle>
          </DialogHeader>
          <ExpenseForm setOpenForm={setOpen} expense={expense} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          variant={expense ? "secondary" : "default"}
          size={expense ? "icon" : "default"}
        >
          {buttonText}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{formTitle}</DrawerTitle>
        </DrawerHeader>
        <ExpenseForm className="px-4" setOpenForm={setOpen} expense={expense} />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default ExpenseDrawer;
