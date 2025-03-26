import React from "react";

const Receipt = ({ order }) => {
  return (
    <div className="p-4">
        <div className="p-4 flex items-center justify-center ">
          <img src="/images/LOGO.png" alt="Logo" className="w-19 " />
        </div>

        <div className="flex justify-between font-dbpenthaix-normal">
            <span>DATE : </span>
            <span>MAR 25TH,2025 9:00</span>
        </div>

        <div className="flex justify-between">
            <span>LOC : </span>
            <span>SINGHA THA MUSEUM</span>
        </div>
        <p className="text-right">YASOTHON</p>

        <hr style={{ height: "1px", backgroundColor: "rgb(240, 86, 86)", border: "none" }} />
        <ul>
          {order.items.map((item, index) => (
            <li key={index}>
              <p>{item.name_th}</p>
              <div className="flex justify-between">
                <span>{item.name_en} </span>
                <span>{item.status}</span>
              </div>
              <p>ZONE {item.zone_en} </p>
            </li>
          ))}
        </ul>
        <hr style={{ height: "1px", backgroundColor: "rgb(240, 86, 86)", border: "none" }} />

        <div className="flex justify-between">
            <span>ITEM COUNT : </span>
            <span>5</span>
        </div>

        <div className="p-4 flex items-center justify-center ">
          <img src="\images\THANK YOU FOR VISITING.png" alt="Logo" className="w-40 " />
        </div>

        <div className="p-4 flex items-center justify-center ">
          <img src="\images\Barcode.png" alt="Logo" className="w-80 " />
        </div>
        <br/>


      
      <br/>
      <br/>
      </div>
  );
};

export default Receipt;
