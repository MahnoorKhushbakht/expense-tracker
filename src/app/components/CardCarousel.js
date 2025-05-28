"use client";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect } from "react";
import { getData, addAmount, addExpense, addIncome } from "@/store/dataSlice";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { Carousel } from "antd";

export default function CardCarousel() {
  const totalAmount = useSelector((state) => state.expenses.totalAmount);
  const totalExpense = useSelector((state) => state.expenses.totalExpense);
  const totalIncome = useSelector((state) => state.expenses.totalIncome);
  const dataItems = useSelector((state) => state.expenses.expensesData);
  const authStatus = useSelector((state)=> state.auth.status)
  const dispatch = useDispatch();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(getData());
      } else {
        console.log("User not logged in");
      }
    });

    return () => unsubscribe();
  }, [auth, dispatch]);

  useEffect(() => {
    if (dataItems.length > 0) {
      dispatch(addAmount(dataItems));
      dispatch(addExpense(dataItems));
      dispatch(addIncome(dataItems));
    }
  }, [dataItems, dispatch]);

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
    <Carousel autoplay className="m-5 p-5 w-full max-w-md mx-auto">
      {data.map((item, index) => {
        const isSurplus = item.label.toLowerCase() === "surplus";
        const isDeficit = item.label.toLowerCase() === "deficit";
        const valueClass = isSurplus
          ? "text-green-500"
          : isDeficit
          ? "text-red-500"
          : "";

        return (
          <div key={index} className="flex justify-center">
            <div
              className="cursor-pointer bg-black dark:bg-white text-white dark:text-black transform transition-transform hover:-translate-y-1 hover:shadow-lg rounded-md w-full h-40 flex flex-col justify-center items-center p-5 shadow-md"
            >
              <h3 className="font-bold text-center">{item.label}</h3>
                     <p className={`text-xl mt-2 ${valueClass}`}>
            {authStatus ? item.value : 0}
          </p>
            </div>
          </div>
        );
      })}
    </Carousel>
  );
}
