'use client';

import Typewriter from 'typewriter-effect';
import { useSelector } from 'react-redux';

export default function TagLine() {
  const authStatus = useSelector((state) => state.auth.status);

  return (
    <>
      {authStatus ? (
        <div
          className="text-center font-bold text-black dark:text-white 
                     text-2xl sm:text-3xl md:text-4xl lg:text-5xl 
                     w-full sm:w-[400px] md:w-[500px] lg:w-[600px] 
                     h-[80px] sm:h-[100px] md:h-[130px] lg:h-[150px] 
                     flex items-center justify-center px-4"
        >
          <Typewriter
            options={{
              autoStart: true,
              loop: true,
            }}
            onInit={(typewriter) => {
              typewriter
                .typeString('<span class="dark:text-amber-700/50 text-amber-200/50">Track your spending. Empower your saving!</span>')
                .pauseFor(2000)
                .deleteAll()
                .typeString('<span class="dark:text-amber-700/50 text-amber-200/50">Because every rupee counts</span>')
                .pauseFor(2500)
                .deleteAll()
                .start();
            }}
          />
        </div>
      ) : null}
    </>
  );
}
