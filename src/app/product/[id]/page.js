"use client";

import { use, useEffect, useState, useRef } from "react";
import Image from "next/image";
import { useCart } from "../../context/CartContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ProductPage({ params }) {
  const unwrappedParams = use(params); // unwrap the Promise
  const id = (unwrappedParams.id).toLowerCase();

  const [product, setProduct] = useState(null);
  const [exist, setExist] = useState(false);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart ,cart} = useCart();
  const { isExist } = useCart();
  const router = useRouter();
  const [exists, setExists] = useState(null);
  const scrollRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);

  const handleScroll = () => {
    const y = scrollRef.current.scrollTop;
    setScrollY(y);
    console.log("Scroll : " , y, "H",scrollRef.current.offsetHeight);
  };

  useEffect(() => {
    let filePath = "/product/" + id + "/data.json";

    //console.log("fetch data from ", filePath);

    const width = window.screen.width;
    const height = window.screen.height;
    
    console.log("Screen resolution:", width + " x " + height);

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
      <div className="container mx-auto px-4 py-16 text-center bg-white min-h-screen bg-cover bg-center">
        <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-red-500">Loading product information...</p>
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

  const cartItemsCount = cart.reduce((count, item) => count + 1, 0);

  return (
    <div>
      <div
        className=" min-h-screen bg-cover bg-center"
        style={{ 
          backgroundImage: "url('/images/BG_Product.png')" ,
          maxWidth: '400px',
          margin: '0 auto',
        }}
      >
        <div 
//          className="fixed py-5 left-0 right-0 flex justify-between items-center px-4"
          className="fixed py-5  flex  items-center px-4"
          style={{ 
            //maxWidth: '400px',
            margin: '0 auto',
            //position: 'fixed',
            //bottom: '20px',
            left: '0',
            right: '0',
            //display: 'flex',
            justifyContent: 'center',
            gap: '300px', // ระยะห่างระหว่างปุ่ม
          }}
        >
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
          <button 
            style={{ position: 'relative' }}
            onClick={() => {
              router.push("/cart");
            }}>

            <img
              src="/images/BT-Shopping.png"
              alt="Right Button"
              className="h-6"
            ></img>

              {/* จำนวนสินค้าบนรูปรถเข็น */}
              {cartItemsCount > 0 && (
                <div 
                 //className="absolute top-3 right-3 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center"
                 //className=" rounded-full "
                 style={{
                  position: 'absolute',
                  top: '-6px',
                  right: '-6px',
                  backgroundColor: '#ff4757',
                  color: 'white',
                  borderRadius: '50%',
                  width: '20px',
                  height: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  fontWeight: 'bold'
                }}
                >
                  {cartItemsCount}
                </div>
              )}


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
          className=" max-h-screen overflow-y-scroll pt-70 pb-15">
          <img
            src={"/product/" + product.id + "/content.png"}
            className="w-full"
          />
        </div>
        ) : (
         
        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className="relative z-1 max-h-screen overflow-y-scroll pt-70 pb-30">
          <img
            src={"/product/" + product.id + "/content.png"}
            className="w-full"
          />
        </div>

        )}


       
        <img 
          src="/images/Footer Bar.png" 
          alt="Background" 
          className="px-0 py-0 h-30 fixed bottom-0 left-1/2 transform -translate-x-1/2 z-3"
        />
 

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
