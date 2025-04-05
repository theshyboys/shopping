// components/Receipt.tsx
export default function Receipt() {
    return (
      <div id="receipt" className="p-4 bg-white w-[400px] text-black">
        <h1 className="text-lg font-bold">Receipt</h1>
        <p>Item: Coffee</p>
        <p>Price: $3.50</p>
        <p>Date: {new Date().toLocaleDateString()}</p>
      </div>
    );
  }
  