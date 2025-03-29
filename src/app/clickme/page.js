'use client';

import { useRouter } from 'next/navigation';

export default function ClickMe() {
      const router = useRouter();

    return (
        <div>
        
        <button  
            onClick={() => router.push(`/product/product-123`)}
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