"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


export default function SplashScreen() {
  const router = useRouter();
 
 
  useEffect(() => {
    const timer = setTimeout(() => {
      // เปลี่ยนไปยังหน้าหลัก (home) หลังจาก 3 วินาที
      console.log("Goto Scan");
      router.push("/scan");
      // router.push("/testpage");
    }, 2000);
    // ล้างการตั้งเวลาเมื่อคอมโพเนนต์ถูกถอด
    return () => clearTimeout(timer);
  }, []);

  return (    
    <div>
      <div
        className="flex flex-col items-center  min-h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('/images/Splash.png')" }}>
       </div>
    </div>    
  );
}




