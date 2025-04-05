'use client'

import { useState, useEffect } from "react";

export default function Page() {
  const [data, setData] = useState(null);

  useEffect(() => {
    let jsondata = [];
    const id = "001";
    let filePath = "/product/" + id + "/data.json";
    fetch(filePath)
        .then((res) => res.json())
        .then((json) => {
            console.log("📄 JSON Data:", json);
            jsondata = json;
            setData(json);
        })
        .catch((err) => console.error("❌ Error loading JSON:", err));

/*
      const interval = setInterval(() => {
       // const jss = JSON.stringify(data, null, 2);
        console.log("JSON : ", jsondata);
      }, 1000); // ทำงานทุก 1000 มิลลิวินาที (1 วินาที)
      return () => clearInterval(interval); // เคลียร์ Timer เมื่อ Component ถูก unmount
*/

  }, []);

//<div className="font-myfont text-xl">ฟอนต์ .ttf Static ใน Tailwind</div>

  return (
    <div className="font-DB-PenThai-X text-2xl">


        <div className="p-4 flex items-center justify-center ">
          <img src="/images/LOGO.png" alt="Logo" className="w-19 " />
        </div>


            <span>DATE : </span>
            <span>เกลือ เครื่องปรุงคู่ครัวเรือน</span>
  
       
            <span>LOC : </span>
            <span>SINGHA THA MUSEUM</span>
       


      <h1>📄 JSON Data</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>  
    </div>
  );
}
