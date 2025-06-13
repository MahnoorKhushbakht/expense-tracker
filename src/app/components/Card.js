"use client";
import {motion} from 'motion/react'
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect } from "react";
import { getData, addAmount, addExpense, addIncome } from "@/store/dataSlice";
import { onAuthStateChanged, getAuth } from "firebase/auth";

function Card() {
  const authStatus = useSelector((state) => state.auth.status);
  const totalAmount = useSelector((state) => state.expenses.totalAmount);
  const totalExpense = useSelector((state) => state.expenses.totalExpense);
  const totalIncome = useSelector((state) => state.expenses.totalIncome);
  const dataItems = useSelector((state) => state.expenses.expensesData);
  const dispatch = useDispatch();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(getData());
        dispatch(addAmount(dataItems));
        dispatch(addExpense(dataItems));
        dispatch(addIncome(dataItems));
      } else {
        console.log("User not logged in");
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  const surplus = totalIncome - totalExpense;

  const data = [
    { label: "Total Amount", value: totalAmount },
    { label: "Total Expense", value: totalExpense },
    { label: "Total Income", value: totalIncome },
    {
      label: surplus >= 0 ? "Surplus" : "Deficit",
      value: Math.abs(surplus),
    },
  ];

  return (
    <div className="flex gap-6 w-full ">
      {data.map((item, index) => {
        const isSurplus = item.label.toLowerCase() === "surplus";
        const isDeficit = item.label.toLowerCase() === "deficit";
        const value = parseFloat(item.value);
        const valueClass = isSurplus
          ? "text-green-500"
          : isDeficit
          ? "text-red-500"
          : "";

        return (
          <motion.div
            whileHover= {
              {
                type: "spring",
                scale: 0.9
              }
            }
            key={index}
            className="dark:bg-yellow-300 dark:text-black bg-yellow-400/50 text-white cursor-pointer transform transition-all hover:-translate-y-0.5 shadow-sm hover:shadow-lg rounded-md w-40 h-40 flex flex-col justify-center items-center p-5"
          >
            <h3 className="font-bold text-center">{item.label}</h3>
           <p className={`text-xl mt-2 ${valueClass}`}>
  {authStatus ? item.value : 0}
</p>

          </motion.div>
        );
      })}
    </div>
  );
}

export default Card;
