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
  const [haveChrome, setHaveChrome] = useState(true);

  let this_device = '';
  let isChrome = '';
  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    isChrome = /CriOS/i.test(userAgent);

    if (/android/i.test(userAgent)) {
      setDeviceType('android');
      this_device = 'android';
    } else if (/iPhone|iPad|iPod/i.test(userAgent)) {
      setDeviceType('ios');
      this_device = 'ios';
    }else{
      console.log('desktop');
      setDeviceType('desktop');
    }

    const timer = setTimeout(() => {
      console.log(this_device);
      if(this_device == 'android'){       
        router.push('intent://shopping-one-alpha.vercel.app/scan#Intent;scheme=https;package=com.android.chrome;end');
      }else if(this_device == 'ios'){
        if(isChrome){
          router.push('/scan');
        }else{
          //router.push('googlechrome://shopping-one-alpha.vercel.app/scan');
          // พยายามเปิดแอป Chrome
          if(haveChrome){
            window.location = 'googlechrome://shopping-one-alpha.vercel.app/scan';
          }
          // หากไม่สำเร็จภายใน 1.5 วินาที ให้เปลี่ยนเส้นทางไปยัง App Store
          setTimeout(() => {
            setHaveChrome(false);
            //alert("This app cannot open with Chrome. So it will open with Safari");
            router.push('/scan');
          }, 1500);
        }
      }else{
        router.push('/scan');
      }
    }, 2000);
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
