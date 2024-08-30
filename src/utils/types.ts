export interface Category {
    id: number;
    name: string;
  }
  
export interface Expense {
    id: number;
    user: number;
    title: string;
    description: string;
    date: string;
    amount: number;
    parsed_amount: string;
    category: Category[];
    frequency: "one_time" | "recurring";
  }