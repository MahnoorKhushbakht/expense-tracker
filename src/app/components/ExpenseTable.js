"use client";

import React, { useEffect } from "react";
import TableSkeleton from "./TableSkeleton";
import Alert from "@mui/material/Alert";
import { useSelector, useDispatch } from "react-redux";
import { getData, addAmount, addExpense, addIncome } from "@/store/dataSlice";
import { onAuthStateChanged, getAuth } from "firebase/auth";

function ExpenseTable() {
  const authStatus = useSelector((state) => state.auth.status);
  const loading = useSelector((state) => state.expenses.loading);
  const data = useSelector((state) => state.expenses.expensesData);
  const totalAmount = useSelector((state) => state.expenses.totalAmount);

  const dispatch = useDispatch();

  // Fetch data when user is authenticated
  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(getData());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  // Calculate amounts after data changes
  useEffect(() => {
    if (data && data.length > 0) {
      dispatch(addAmount(data));
      dispatch(addExpense(data));
      dispatch(addIncome(data));
    }
  }, [data, dispatch]);

  return (
    <>
      {authStatus ? (
        <section className="dark:text-white text-black body-font p-4 mb-10">
          <div className="container mx-auto w-11/12 md:w-10/12 lg:w-full">
            <div className="w-full mx-auto overflow-auto">
              {loading ? (
                <TableSkeleton />
              ) : (
                <table className="table-auto w-full text-center">
                  <thead>
                    <tr>
                      <th className="px-4 md:px-16 py-3 title-font tracking-wider font-medium text-white dark:text-black text-sm dark:bg-amber-400/50 bg-amber-300/50 rounded-tl rounded-bl">
                        Expense Name
                      </th>
                      <th className="px-4 md:px-24 py-5 title-font tracking-wider font-medium text-white dark:text-black text-sm dark:bg-amber-400/50 bg-amber-300/50">
                        Amount
                      </th>
                      <th className="px-4 md:px-24 py-5 title-font tracking-wider font-medium text-white dark:text-black text-sm dark:bg-amber-400/50 bg-amber-300/50">
                        Category
                      </th>
                      <th className="px-4 md:px-24 py-5 title-font tracking-wider font-medium text-white dark:text-black text-sm dark:bg-amber-400/50 bg-amber-300/50">
                        Date
                      </th>
                      <th className="w-10 title-font tracking-wider font-medium text-white text-sm dark:bg-amber-400/50 bg-amber-300/50 rounded-tr rounded-br"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {data && data.length > 0 ? (
                      data.map((item, index) => (
                        <tr key={index}>
                          <td className="px-4 md:px-24 py-5 text-white dark:text-black">
                            {item.name}
                          </td>
                          <td className="px-4 md:px-24 py-5 text-white dark:text-black">
                            {item.amount}
                          </td>
                          <td className="px-4 md:px-24 py-5 text-white dark:text-black">
                            {item.category}
                          </td>
                          <td className="px-4 md:px-24 py-5 text-lg font-bold dark:text-amber-700/50 text-amber-200/50">
                            {item.date}
                          </td>
                          <td className="w-10 text-center"></td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={5}
                          className="text-center py-3 text-black dark:text-white"
                        >
                          <Alert
                            severity="warning"
                            className="flex flex-col justify-center items-center"
                          >

                            No Data Found
                          </Alert>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
            </div>

            {!loading && (
              <div className="flex pl-4 mt-4 w-full mx-auto justify-between">
                <span className="text-amber-300/50 dark:text-amber-400/50 uppercase font-bold inline-flex items-center md:mb-2 lg:mb-0">
                  Total Expense
                </span>
                <button className="flex ml-auto font-bold p-5 text-black dark:text-white hover:bg-amber-600/50 border-0 py-2 px-6 focus:outline-none bg-amber-400/50 dark:bg-amber-600/50  dark:hover:bg-amber-400/50 rounded">
                  {totalAmount}
                </button>
              </div>
            )}
          </div>
        </section>
      ) : (
        <div></div>
      )}
    </>
  );
}

export default ExpenseTable;
