'use client';

import { useSelector } from "react-redux";
import { Alert } from "@mui/material";

export default function History() {
  const data = useSelector((state) => state.expenses.expensesData);
  const authStatus = useSelector((state) => state.auth.status);

  const isEmpty = !authStatus || !data || data.length === 0;

  return (
    <div className="h-full flex flex-col rounded-sm shadow-lg">
      <div className="overflow-y-auto max-h-[400px]">
        <table className="w-full table-fixed divide-y divide-gray-300 dark:divide-white/20 bg-white dark:bg-white/20 dark:text-black text-sm text-left">
          <thead className="dark:text-amber-700/50 text-amber-200/50 uppercase font-semibold tracking-wide sticky top-0 bg-white dark:bg-white/20 z-10">
            <tr>
              <th className="text-black px-4 py-3">Date</th>
              <th className="text-black px-4 py-3">Amount</th>
              <th className="text-black px-4 py-3">Category</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-amber-200 dark:divide-amber-300">
            {isEmpty ? (
              <tr>
                <td colSpan={3}>
                  <div className="flex items-center justify-center p-4">
                    <Alert severity="warning" className="flex flex-col items-center w-full">
                      <p>No Data Found</p>
                    </Alert>
                  </div>
                </td>
              </tr>
            ) : (
              data.map((item, index) => (
                <tr key={index} className="text-black hover:bg-gray-50 dark:hover:bg-white/40 transition-all duration-200">
                  <td className="px-4 py-3">
                    {item.date ? new Date(item.date).toISOString().split("T")[0] : 'N/A'}
                  </td>
                  <td className="px-4 py-3">{item.amount || 'N/A'}</td>
                  <td className="px-4 py-3">{item.category || 'N/A'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
