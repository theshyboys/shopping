"use client";

//import Image from "next/image";
import ReceiptPage from "./home/page";
import SplashScreen from "./splash";
import { useRouter } from 'next/navigation';


/*
echo "# shopping" >> README.md
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/theshyboys/shopping.git
git push -u origin main


echo "# shopping" >> README

git init
git add .
git commit -m "first commit"
git branch -M main
git push -u origin main

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
