'use client'; // ต้องใช้ client component ใน Next.js


import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';


export default function TestPage() {
  const router = useRouter();
  const hasRun = useRef(false);
  useEffect(() => {
        if (hasRun.current) return;
        hasRun.current = true;
        
        console.log("useEffect TestPage");
  }, []);


  return (
    <div><h1>Hello</h1></div>
  );
}


