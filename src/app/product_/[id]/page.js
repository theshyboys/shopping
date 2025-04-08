"use client";

import { use, useEffect, useState } from "react";
import Image from "next/image";
import { useCart } from "../../context/CartContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

//import { useRouter } from 'next/router';

export default function ProductPage({params}) {
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

  //const { id } = router.query;
  
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
        <div className="flex justify-between items-center">
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

        <div className="max-h-screen overflow-y-scroll  border-gray-300 p-2">
          {/* <div className="p-4 h-70  grid place-items-center">
            <img src={"/product/" + product.id + "/0.png"} className="h-70" />
          </div> */}
          <img src={"/product/" + product.id + "/detail.png"} className="w-full" />
        </div>

        {!exist ? (
          <button
            onClick={handleAddToCart}
            className="px-6 py-2 w-90 fixed bottom-10 left-1/2 transform -translate-x-1/2 "
          >
            <img src="\images\BT-Add to cart.png" alt="Click Me" />
          </button>
        ) : (
          <button
            onClick={() => {
              router.push("/scan");
            }}
            className="px-6 py-2 w-90 fixed bottom-10 left-1/2 transform -translate-x-1/2 "
          >
            <img src="\images\BT-Already in cart.png" alt="Click Me" />
          </button>
        )}
      </div>
    </div>
  );
}
