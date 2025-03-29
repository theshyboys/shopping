"use client";

//import Image from "next/image";
import ReceiptPage from "./home/page";
import SplashScreen from "./splash";
import { useRouter } from 'next/navigation';

import ClickMe from "./clickme/page";

/*
echo "# shopping" >> README.md
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/theshyboys/shopping.git
git push -u origin main

https://shopping-two-rosy.vercel.app/
echo "# shopping" >> README

git init
git add .
git commit -m "first commit"
git branch -M main
git push -u origin main


https://vercel.com/theshyboys-projects
https://vercel.com/new?teamSlug=theshyboys-projects

*/


export default function Home() {
  const router = useRouter();
  return (
    <div>
      <SplashScreen/> 
      {/*router.push(`/home`)*/}
    </div>
  );
}
