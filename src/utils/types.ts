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
    amount: string;
    parsed_amount: number;
    parsed_amount_str: string;
    category: Category[];
    frequency: string;
    parsed_frequency: string;
  }

export interface ExpensesAPIResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results?: Expense[]
}