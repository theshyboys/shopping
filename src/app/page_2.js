
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
// pages/index.js
// app/page.tsx
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export default function HomePage() {
  const headersList = headers();
  //const userAgent = headersList.get('user-agent') || '';
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;


  if (/android/i.test(userAgent)) {
    // สำหรับ Android: ใช้ intent:// เพื่อเปิดใน Chrome
    alert("สำหรับ Android");
    redirect('intent://www.shopping-one-alpha.vercel.app/splash#Intent;scheme=https;package=com.android.chrome;end');

  } else if (/iphone|ipad|ipod/i.test(userAgent)) {
    // สำหรับ iOS: ใช้ googlechrome:// เพื่อเปิดใน Chrome
    alert("สำหรับ iOS");
    redirect('googlechrome://www.shopping-one-alpha.vercel.app/splash');
  } else{
    console.log("สำหรับ Desktop");
    redirect('https://www.google.com');    
  }

  return (
    <div>
      <h1>ยินดีต้อนรับสู่เว็บไซต์ของเรา</h1>
      <p>เนื้อหาสำหรับผู้ใช้ทั่วไป</p>
    </div>
  );
}
