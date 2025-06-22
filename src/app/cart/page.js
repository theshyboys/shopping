"use client";

import { useCart } from "../context/CartContext";
import Link from "next/link";
//import Image from "next/image";
import { useState } from "react";
//import PDFGenerator from "../components/PDFGenerator";
//import ReceiptPage from "../receipt/page";
import { useRouter } from "next/navigation";



export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const router = useRouter();

  const subtotal = cart.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  const tax = subtotal * 0.07; // 7% tax rate
  const total = subtotal + tax;

  const handleCheckout = () => {
    router.push("/receipt");
  };

  const saveImageTest = () => {
    const link = document.createElement("a");
    link.href = "/product/grp05-2/content.png"; // ต้องเป็น path จาก public
    link.download = "abcdef.png"; // ชื่อไฟล์ที่จะบันทึก
    console.log("Name : ", link.download);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  return (
    <div 
      className="font-DB-PenThai-X-bold text-black"
      style={{ 
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <div
        className="fixed min-h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('/images/05_Cart.png')" }}
      >
        <div 
          className="fixed py-10  flex  items-center px-4"
          style={{ 
            margin: '0 auto',
            left: '0',
            right: '0',
            justifyContent: 'center',
            gap: '300px', // ระยะห่างระหว่างปุ่ม
          }}
        >
          {/* ปุ่มซ้าย */}
          <button  onClick={() => {
              router.back()
            }}>
            <img
              src="/images/BT-Back.png"
              alt="Left Button"
              className="h-4"
            />
          </button>


        {/* <div className="z-0 py-4 font-dbpenthaix-Bold text-[30px] text-center" style={{ position: 'relative' }}>
              Cart
        </div> */}


          {/* ปุ่มขวา */}
          <button 
            style={{ position: 'relative' }}
            onClick={() => {
              router.push("/scan");
            }}>
            <img
              src="/images/BT-Scan.png"
              alt="Right Button"
              className="h-6"
            ></img>
          </button>
        </div>

        <br/>
        <br/>
        <br/>

       


        <div className="container mx-auto px-4 py-8">
          {cart.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <p className="mb-4">Your cart is empty</p>
              <Link href="/" className="text-blue-600 hover:underline">
                Scan a Product to Start Shopping
              </Link>
            </div>
          ) : (

            <div className="">
              <div className=" max-h-screen overflow-y-scroll pt-0 pb-100 p-2 z-10">
                {cart.map((item) => (
                  <div key={item.id} className="flex  p-0">
                    <div className="flex items-center justify-center ">
                      <img src={'/product/'+item.id+'/cart.png'} />                      
                    </div>                          
                  </div>
                ))}

              </div>



              <div 
                className="w-screen h-auto fixed bottom-0 left-1/2 transform -translate-x-1/2 z-3"
                style={{ 
                  maxWidth: '400px',
                  margin: '0 auto',
                }}
              >
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex justify-between">
                    <span className="">จำนวนสินค้าทั้งหมด </span>
                    <span
                      className="font-DB-PenThai-X-bold text-red-600"
                      style={{ fontSize: "16px" }}
                    >
                      {cart.length}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="">Quantity </span>
                    <span className="">ชิ้น/piece</span>
                  </div>

                  <div className="pt-4 mt-4">
                    <button
                      onClick={handleCheckout}
                      className="w-full text-white rounded-md "
                    >
                      <img src="\images\BT-Check-out.png" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/**

              {cart.map((item) => (
                <div key={item.id} className="flex border-b p-0">
                  <div className="flex items-center justify-center ">
                    <img src={'/product/'+item.id+'/2.png'} />
                    
                  </div>                          
                </div>
              ))}




                           
                {cart.map((item) => (
                  
                    <div className="bg-white rounded-lg shadow-md p-1">
                      <div key={item.id} className="flex  p-1">
                        <div className="relative w-15 h-20 flex-shrink-0 overflow-hidden rounded-md">
                          <img
                            src={"/product/" + item.id + "/0.png"}
                       
                            className="object-cover"
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                          <div
                            className="flex text-red-600"
                            style={{ fontSize: "20px" }}
                          >
                            <p>{item.name_th}</p>
                          </div>

                          <div className="flex">
                            <h3>{item.name_en}</h3>
                          </div>

                          <div className="flex ">
                            <img src={"/images/Amount.png"} className="w-20" />
                          </div>
                        </div>
                      </div>
                    </div>
                ))}

 */
