'use client';
import { useSelector } from "react-redux";

export default function History() {
  const data = useSelector((state) => state.expenses.expensesData);

  return (
    <div className="h-full flex flex-col rounded-sm shadow-lg overflow-hidden">
      <table className="w-full h-full table-fixed divide-y divide-gray-300 dark:divide-white/20 bg-white dark:bg-white/20 dark:text-black text-sm text-left">
        <thead className="bg-gray-100 dark:bg-white/30 uppercase font-semibold tracking-wide">
          <tr>
            <th className="px-4 py-3">Date</th>
            <th className="px-4 py-3">Amount</th>
            <th className="px-4 py-3">Category</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-red-200 dark:divide-white/10">
          {data && data.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50 dark:hover:bg-white/40 transition-all duration-200">
              <td className="px-4 py-3">{item.date || 'N/A'}</td>
              <td className="px-4 py-3">{item.amount || 'N/A'}</td>
              <td className="px-4 py-3">{item.category || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
