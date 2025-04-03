'use client';

import { use, useEffect, useState } from 'react';
import Image from 'next/image';
import { useCart } from '../../context/CartContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ProductPage({ params }) {
  const unwrappedParams = use(params); // unwrap the Promise
  const id = unwrappedParams.id;
  const [product, setProduct] = useState(null);
  const [exist, setExist] = useState(false);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart} = useCart();
  const { isExist} = useCart();

  const router = useRouter();
  const [jdata, setJdata] = useState(null);
  const [exists, setExists] = useState(null);

  useEffect(() => {
    let filePath = "/product/" + id + "/data.json";
    let ss = false;

    console.log(filePath);

    fetch(filePath)
    .then((res) => {
      setExists(res.ok);  
      (res.ok)?ss=true:ss=false;
      res.json();
    }) // ✅ return JSON ที่ถูกต้อง
    .then((json) => {
      if(ss){
        setJdata(json);
        fetchProduct();

        

      }else{
        setProduct(null);
        setLoading(false); 
        console.log("Fetch Data Fail");
      }      
    }) // ✅ อัปเดต state
    .catch((error) => {
      console.error("Error loading JSON:", error)
      setProduct(null);
      setLoading(false); 
    }); // ✅ จัดการ Error

    console.log("Teera Yoosuk");

     async function fetchProduct() {
      try {
        // In a real app, you'd fetch from an API using the ID from the QR code
        // For this example, we'll simulate an API call
        const data = await fetchProductById(id);
        setProduct(data);
        setLoading(false);
        console.log(data);
        
        setExist(isExist(data));
        console.log("Exist is ",isExist(data));
        
      } catch (error) {
        console.error('Error fetching product:', error);
        setLoading(false);
      }
    }

    
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        ...product,
        quantity,
      });
      router.push('/cart');
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
        <p className="mb-6">The scanned QR code did not match any product in our database.</p>
        <Link href="/scan" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
          Scan Another QR Code
        </Link>
      </div>
    );
  }

  return (

  <div>

    <div className="flex justify-between items-center">
      <Link href="/scan" className="py-5 px-8 text-2xl font-bold text-blue-600">
        <img src= {'/images/BT-Back.png'} className="h-4" />
      </Link>
      
      <Link href="/cart" className="relative">
        <div className="px-5 py-7">
          <img src= {'/images/BT-Shopping.png'} className="h-6" />
          {0 > 0 && (
            <span className="absolute top-5 right-4 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {5}
            </span>
          )}
        </div>

      </Link>
    </div>

    <div className="max-h-screen overflow-y-scroll  border-gray-300 p-2">
      <div className="p-4 h-70  grid place-items-center">
          <img src= {'/product/'+product.id+'/0.png'} className="h-70" />
      </div> 
      <img src= {'/product/'+product.id+'/1.png'} className="w-full" />
    </div> 


    {(!exist)?
    <button  
        onClick={handleAddToCart}
        className="px-6 py-2 w-90 fixed bottom-10 left-1/2 transform -translate-x-1/2 "
    >
        <img
        src="\images\BT-Add to cart.png"
        alt="Click Me"
      />
    </button>
    :
    <button  
        className="px-6 py-2 w-90 fixed bottom-10 left-1/2 transform -translate-x-1/2 "
    >
        <img
        src="\images\BT-Already in cart.png"
        alt="Click Me"
      />
    </button>
    }


  </div>
  );
}


// Mock API function - in a real app, this would fetch from your backend
async function fetchProductById(id) {

  console.log("fetchProductById = ", id);


    // Simulate network delay
  //  await new Promise(resolve => setTimeout(resolve, 500));
    // Mock product database based on QR code values
    const products = {
        '001' : {
        id: id,
        category: '',
      },
    };

    console.log("==> ",products['001']);
    

    return products['001'] || null;
  }

