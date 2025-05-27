"use client";

import Typewriter from "typewriter-effect";
import { useSelector } from 'react-redux'

export default function TagLine(){
  const authStatus = useSelector((state) => state.auth.status);
  return (
    <>
      {authStatus ? (
        <div
          className="text-center text-3xl md:text-4xl lg:text-5xl font-bold text-gray-700 dark:text-amber-200/70 
      w-full sm:w-[400px] md:w-[500px] lg:w-[600px] 
      h-[80px] sm:h-[100px] md:h-[130px] lg:h-[150px] 
     flex items-center justify-center"
        >
          <Typewriter
            options={{
              autoStart: true,
              loop: true,
            }}
            onInit={(typewriter) => {
              typewriter
                .typeString("Track your spending. Empower your saving!")
                .pauseFor(2000)
                .deleteAll()
                .typeString("Because every rupee counts")
                .pauseFor(2500)
                .deleteAll()
                .start();
            }}
          />
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};


