"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      // เปลี่ยนไปยังหน้าหลัก (home) หลังจาก 3 วินาที
      router.push("/scan");
      //     router.push('/home');
    }, 2000);

    // ล้างการตั้งเวลาเมื่อคอมโพเนนต์ถูกถอด
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div
      className="flex flex-col items-center  min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/images/Splash.png')" }}
    ></div>
  );
}
