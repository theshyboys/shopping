import React from "react";

const Receipt = ({ order }) => {
  return (
    <div
      className="flex flex-col items-center  min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/images/BG.png')" }}
    >
        
        <div className="p-8 flex items-center justify-center ">
          <img src="/images/thk.png" alt="Thk" className="w-70" />
        </div>
        
      <div id="receipt" className="mr-1  p-2 border w-[350px] bg-white bg-opacity-20 rounded-lg">
        <div className="p-4 flex items-center justify-center ">
          <img src="/images/LOGO.png" alt="Logo" className="w-19 " />
        </div>

        <p>
          <b>DATE </b> {order.date}
        </p>
        <p>
          <b>LOC </b> SINGHA THA MUSEUM YASOTHON{" "}
        </p>
        <hr></hr>
        <ul>
          {order.items.map((item, index) => (
            <li key={index}>
              <p>{item.name_th} {item.zone_th}</p>
              <p>{item.name_en} {item.zone_en}       {item.status}</p>
            </li>
          ))}
        </ul>
        <hr></hr>
        <p>
          <b>ITEM COUNT </b> {1}
        </p>

        <div className="p-4 flex items-center justify-center ">
          <img src="\images\THANK YOU FOR VISITING.png" alt="Logo" className="w-40 " />
        </div>

        <div className="p-4 flex items-center justify-center ">
          <img src="\images\Barcode.png" alt="Logo" className="w-80 " />
        </div>
        <br/>


      </div>
      <br/>
      <br/>
      </div>
  );
};

export default Receipt;
