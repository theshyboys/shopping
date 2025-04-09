"use client";

import { use, useEffect, useState, useRef } from "react";
import Image from "next/image";
import { useCart } from "../../context/CartContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ProductPage({ params }) {
  const unwrappedParams = use(params); // unwrap the Promise
  const id = unwrappedParams.id;

  const [product, setProduct] = useState(null);
  const [exist, setExist] = useState(false);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { isExist } = useCart();
  const router = useRouter();
  const [exists, setExists] = useState(null);
  const scrollRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);

  const handleScroll = () => {
    const y = scrollRef.current.scrollTop;
    setScrollY(y);
    //console.log("Scroll : " , y);
  };

  useEffect(() => {
    let filePath = "/product/" + id + "/data.json";

    console.log("fetch data from ", filePath);

    fetch(filePath)
      .then((res) => res.json())
      .then((json) => {
        json.id = id;
        setProduct(json);
        setLoading(false);
        setExist(isExist(json));
        console.log("Exist is ", exist);
        console.log("📄 JSON Data:", json);
      })
      .catch((err) => {
        console.error(" Error loading JSON:", err);
        setProduct(null);
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        ...product,
        quantity,
      });
      router.push("/cart");
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4">Loading product information...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p className="mb-6">
          The scanned QR code did not match any product in our database.
        </p>
        <Link
          href="/scan"
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
        >
          Scan Another QR Code
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div
        className=" min-h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('/images/BG_Product.png')" }}
      >
        <div className="fixed py-5 left-0 right-0 flex justify-between items-center px-4">
          {/* ปุ่มซ้าย */}
          <button  onClick={() => {
              router.push("/scan");
            }}>
            <img
              src="/images/BT-Back.png"
              alt="Left Button"
              className="h-4"
            />
          </button>

          {/* ปุ่มขวา */}
          <button  onClick={() => {
              router.push("/cart");
            }}>
            <img
              src="/images/BT-Shopping.png"
              alt="Right Button"
              className="h-6"
            />
          </button>
        </div>
       


        <div className=" fixed pt-10 w-50 left-1/2 transform -translate-x-1/2">
          <img
            src={"/product/" + product.id + "/product.png"}
            className="w-full"
          />
        </div>

        {(scrollY == 0) ? (
          <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className=" max-h-screen overflow-y-scroll pt-70 pb-15 p-2">
          <img
            src={"/product/" + product.id + "/content.png"}
            className="w-full"
          />
        </div>
        ) : (
         
        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className="relative z-1 max-h-screen overflow-y-scroll pt-70 pb-15 p-2">
          <img
            src={"/product/" + product.id + "/content.png"}
            className="w-full"
          />
        </div>

        )}


       
        <img src="/images/Footer Bar.png" alt="Background" className="px-6 py-0 h-40 w-90 fixed bottom-0 left-1/2 transform -translate-x-1/2 z-3"/>
 

        {!exist ? (

          <div className="">
            

            
             <button
              onClick={handleAddToCart}
              className=" px-6 py-2 w-90 fixed bottom-6 left-1/2 transform -translate-x-1/2 z-3"
            >    
              <img src="\images\BT-Add to cart.png" alt="Click Me" />
            
            </button> 
         
          </div>
        ) : (
          <button
            onClick={() => {
              router.push("/scan");
            }}
            className=" px-6 py-2 w-90 fixed bottom-6 left-1/2 transform -translate-x-1/2 z-3"
          >
            <img src="\images\BT-Already in cart.png" alt="Click Me" />
          </button>
        )}


      </div>
    </div>
  );
}

/**
 <div className="fixed flex justify-between items-center">
          <Link
            href="/scan"
            className="py-5 px-8 text-2xl font-bold text-blue-600"
          >
            <img src={"/images/BT-Back.png"} className="h-4" />
          </Link>

          <Link href="/cart" className="relative">
            <div className="px-5 py-7">
              <img src={"/images/BT-Shopping.png"} className="h-6" />
            </div>
          </Link>
        </div>
 */
