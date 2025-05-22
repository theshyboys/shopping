"use client";


/*
echo "# shopping" >> README.md
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/theshyboys/shopping.git
git push -u origin main

https://shopping-one-alpha.vercel.app/

echo "# shopping" >> README

git init
git add .
git commit -m "first commit"
git branch -M main
git push -u origin main


https://vercel.com/theshyboys-projects
https://vercel.com/new?teamSlug=theshyboys-projects


https://th.qr-code-generator.com/


*/
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [deviceType, setDeviceType] = useState('---');

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (/android/i.test(userAgent)) {
      setDeviceType('android');
      console.log('android');
      router.push('intent://shopping-one-alpha.vercel.app/scan#Intent;scheme=https;package=com.android.chrome;end');
    } else if (/iPhone|iPad|iPod/i.test(userAgent)) {
      setDeviceType('ios');
      console.log('ios');
      router.push('googlechrome://shopping-one-alpha.vercel.app/scan');
      //router.push('https://www.google.com');
    }else{
      console.log('desktop');
      setDeviceType('desktop');
      router.push('https://shopping-one-alpha.vercel.app/scan');
    }

    //console.log(deviceType);

    /*const timer = setTimeout(() => {
      console.log(deviceType);
    }, 5000);
    return () => clearTimeout(timer);
*/

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
