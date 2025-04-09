import React from "react";

const Receipt = (props) => {
  return (
    <div className="p-4 font-DB-PenThai-X text-black overflow-y-scroll">
      <div className="p-4 flex items-center justify-center ">
        <img src="/images/LOGO.png" alt="Logo" className="w-19 " />
      </div>

      <div className="flex justify-between ">
        <span>DATE : </span>
        <span>{props.time}</span>
      </div>

      <div className="flex justify-between ">
        <span>LOC : </span>
        <span>SINGHA THA MUSEUM</span>
      </div>

      <p className="text-right">YASOTHON</p>
      <hr className="my-2" style={{ borderTop: '1px solid rgb(240, 86, 86)' }} />
      <ul>
        {props.order.map((item) => (
          <li key={item.id}>
            <p>{item.name_th}</p>
            <div className="flex justify-between ">
              <span>{item.name_en} </span>
              <span>{item.status}</span>
            </div>
            <p className="pb-2">
              ZONE {item.zone_th} : {item.zone_en}{" "}
            </p>
          </li>
        ))}
      </ul>

      <hr className="my-2" style={{ borderTop: '1px solid rgb(240, 86, 86)' }} />

      <div className="flex justify-between ">
        <span>ITEM COUNT : </span>
        <span>{props.order.length}</span>
      </div>

      <hr className="my-2" style={{ borderTop: '1px solid rgb(240, 86, 86)' }} />

      <div className="pt-4 flex items-center justify-center ">
        <h2>THANK YOU FOR VISITING</h2>
      </div>
      <br />

      <div className=" flex items-center justify-center ">
        <img src="\images\QRLINK.png" alt="Logo" className="w-50 " />
      </div>

      <div className="p-4 flex items-center justify-center ">
        <h2>MORE ABOUT SINGHA THA</h2>
      </div>

      <p>ประสบการณ์ Shopping Online</p>
      <p>สินค้าจาก SINGHA THA ONLINE</p>
      <p>#shoppingวันวานจากสิงห์ท่า #singhathamuseum</p>

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

export default Receipt;
