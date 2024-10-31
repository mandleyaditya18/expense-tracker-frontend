import { format } from "date-fns";
import api from "@/utils/api";

export const dashboardAPI = async () => {
  try {
    const today = new Date();
    const monthParam = format(today, "MM-yy");
    const response = await Promise.all([
      api.get(`/users/dashboard/expenses_by_category/?month=${monthParam}`),
      api.get(`/users/dashboard/total_expense_by_month/?month=${monthParam}`),
    ]);

    return {
      expensesByCategory: response[0].data,
      totalExpenseByMonth: response[1].data,
    };
  } catch (error) {
    console.error("Error fetching dashboard data: ", error);
  }
};
