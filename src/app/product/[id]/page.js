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
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const router = useRouter();

  useEffect(() => {
    async function fetchProduct() {
      try {
        // In a real app, you'd fetch from an API using the ID from the QR code
        // For this example, we'll simulate an API call
        const data = await fetchProductById(id);
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setLoading(false);
      }
    }

    fetchProduct();
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
        <Link href="/" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
          Scan Another QR Code
        </Link>
      </div>
    );
  }

  return (

  <div>


    <div className="max-h-screen overflow-y-scroll border-2 border-gray-300 p-2">

      <br/>
      <br/>

      <div className="p-4 h-70  grid place-items-center">
          <img src={product.image} alt={product.name} className="h-70" />
      </div> 
      <img src={product.content} alt="Scrollable Image" className="w-full" />
    </div> 


    <button  
        onClick={handleAddToCart}
        className="px-6 py-2 w-90 fixed bottom-10 left-1/2 transform -translate-x-1/2 "
    >
        <img
        src="\images\BT-Add to cart.png"
        alt="Click Me"
      />
    </button>

  </div>
  

   
  );
}


// Mock API function - in a real app, this would fetch from your backend
async function fetchProductById(id) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Mock product database based on QR code values
    const products = {
      'product-123': {
        id: 'product-123',
        name: 'ปลาส้มต้นตำรับ',
        price: 99,
        description: '',
        category: 'ของฝาก',
        image: '/assest/product.png',
        content: '/assest/001.png',
        icart: '/assest/product1.png',
        sku: 'GRP05-5',
      },
    };
    
    return products[id] || null;
  }

