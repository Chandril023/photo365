
"use client"
import React, { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
const PhotoSeries: React.FC = () => {
  useEffect(() => {
    // Set the date we're counting down to
    const countDownDate = new Date('Jan 1, 2025 00:00:00').getTime();

    // Update the countdown every 1 second
    const x = setInterval(() => {
      // Get today's date and time
      const now = new Date().getTime();

      // Find the distance between now and the count down date
      const distance = countDownDate - now;

      // Time calculations for days, hours, minutes and seconds
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Display the result in the corresponding elements
      const setCountdown = (id: string, value: string) => {
        const element = document.getElementById(id);
        if (element) {
          element.textContent = value;
        }
      };

      setCountdown("days", days + "d");
      setCountdown("hours", hours + "h");
      setCountdown("minutes", minutes + "m");
      setCountdown("seconds", seconds + "s");

      // If the count down is over, write some text
      if (distance < 0) {
        clearInterval(x);
        const countdownElement = document.getElementById("countdown");
        if (countdownElement) {
          countdownElement.innerHTML = "EXPIRED";
        }
      }
    }, 1000);

    // Cleanup function to clear the interval on unmount
    return () => clearInterval(x);
  }, []); // Empty dependency array means this effect runs only once

  return (
    <div className="h-screen flex justify-center items-center px-2 bg-transparent ">
      <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg overflow-hidden dark:bg-black border-white shadow-lg rounded-lg overflow-hidden ">

        <div className="py-4 px-6">
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white">Coming Soon</h2>
          <p className="mt-2 text-lg text-gray-600 dark:text-white">We are working hard to bring you an amazing photo series page. Stay tuned!</p>
        </div>

        <div className="py-4 px-6">
          <div className="flex flex-wrap gap-4  dark:text-white">
            <div className="border rounded-lg px-4 py-2 dark:text-white">
              <div id="days" className="font-bold font-mono text-2xl text-gray-800 dark:text-white"></div>
            </div>
            <div className="border rounded-lg px-4 py-2 dark:text-white">
              <div id="hours" className="font-bold font-mono text-2xl text-gray-800 dark:text-white"></div>
            </div>
            <div className="border rounded-lg px-4 py-2">
              <div id="minutes" className="font-bold font-mono text-2xl text-gray-800 dark:text-white"></div>
            </div>
            <div className="border rounded-lg px-4 py-2">
              <div id="seconds" className="font-bold font-mono text-2xl text-gray-800 dark:text-white"></div>
            </div>
          </div>
        </div>
        <p className=' my-10 px-5'>
        <Button className='bg-black text-white hover:bg-black hover:text-white hover:border-white'><Link href="/">Home</Link></Button>
       </p>
      </div>
    </div>
  );
};

export default PhotoSeries;
