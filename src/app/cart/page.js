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
    <div className="font-DB-PenThai-X-bold text-black">
      <div
        className=" min-h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('/images/05_Cart.png')" }}
      >
        <div className="flex">
          <Link
            href="/scan"
            className="py-5 px-8 text-2xl font-bold text-blue-600"
          >
            <img src={"/images/BT-Back.png"} className="h-4" />
          </Link>
          <span className="px-27 py-4 font-dbpenthaix-normal text-[24px]">
            Cart
          </span>
        </div>
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
              <div className=" max-h-screen overflow-y-scroll pt-0 pb-100 p-2">
                {cart.map((item) => (
                  <div key={item.id} className="flex  p-0">
                    <div className="flex items-center justify-center ">
                      <img src={'/product/'+item.id+'/cart.png'} />                      
                    </div>                          
                  </div>
                ))}

              </div>



              <div className="w-screen h-auto fixed bottom-0 left-1/2 transform -translate-x-1/2 z-3">
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
                      //onClick={handleCheckout}
                      onClick={saveImageTest}
                      className="w-full text-white rounded-md "
                    >
                      <img src="\images\BT-Check out.png" />
                    </button>
                  </div>
                </div>
              </div>
            </div>



          )}

          {/* {isGeneratingPDF && (
            <PDFGenerator
              cart={cart}
              subtotal={subtotal}
              tax={tax}
              total={total}
              onComplete={() => {
                //setIsGeneratingPDF(false);
                //clearCart();
              }}
            />
          )} */}


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
