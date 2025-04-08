"use client";

import React, { useState, useEffect, useRef } from "react";
import { Html5Qrcode, Html5QrcodeSupportedFormats } from "html5-qrcode";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Html5QrcodeConstants } from "html5-qrcode/esm/core";

export default function FullScreenQRScanner() {
  const [scanning, setScanning] = useState(true);
  const [scannedResult, setScannedResult] = useState(null);
  const videoRef = useRef(null);
  const router = useRouter();
  const [uCount, setUcount] = useState(0);

  useEffect(() => {
    console.log("useEffect", scanning);
    setUcount((s) => s + 1);
    if (scanning) {
      // สร้างอินสแตนซ์ html5-qrcode
      const html5QrCode = new Html5Qrcode("full-screen-reader", {
        formatsToSupport: [
          Html5QrcodeSupportedFormats.QR_CODE,
          Html5QrcodeSupportedFormats.AZTEC,
          Html5QrcodeSupportedFormats.DATA_MATRIX,
        ],
      });

      // เริ่มสแกน
      const qrCodeSuccessCallback = (decodedText, decodedResult) => {
        console.log(`QR Code detected: ${decodedText}`);

        // หยุดการสแกน
        html5QrCode
          .stop()
          .then(() => {
            setScanning(false);
            setScannedResult(decodedText);
            // นำทางไปยังหน้าถัดไปพร้อมส่ง QR Code
            setTimeout(() => {
              //router.push(`/next-page?qr=${encodeURIComponent(decodedText)}`);
              router.push(`/product/${decodedText}`);
            }, 1000);
          })
          .catch((err) => {
            console.error("Error stopping the scan", err);
          });
      };

      // กำหนดค่าการสแกน
      const config = {
        fps: 5,
        //qrbox: {
        //  width: window.innerWidth * 0.8,
        //  height: window.innerHeight * 0.6
        // },
        videoConstraints: {
          facingMode: "environment", // ใช้กล้องหลัง
        },
      };

      // เริ่มกล้อง
      Html5Qrcode.getCameras()
        .then((devices) => {
          if (devices && devices.length) {
            const cameraId = devices[0].id;
            html5QrCode
              .start(cameraId, config, qrCodeSuccessCallback)
              .catch((err) => {
                console.error("Error starting the camera", err);
              });
          }
        })
        .catch((err) => {
          console.error("Error getting cameras", err);
          alert("ไม่สามารถเข้าถึงกล้องได้");
        });
      setScanning(false);
    }

    // ฟังก์ชันทำความสะอาด
    return () => {
      console.log("return", scanning);
    };
  }, [scanning, router]);

  return (
    <div className="fixed  min-h-screen inset-0 z-50 bg-black relative">
      {/* พื้นที่แสดงวิดีโอการสแกนแบบเต็มหน้าจอ */}
      <div
        id="full-screen-reader"
        ref={videoRef}
        className="w-full h-full relative"
      ></div>

      {/* ภาพโอเวอร์เลย์ */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <Image
          src={"/images/Scan.png"} // แทนที่ด้วย path ของภาพโอเวอร์เลย์
          alt="Overlay"
          layout="fill"
          objectFit="cover"
          className="opacity-90" // ปรับความโปร่งใสตามต้องการ
        />
      </div>
    </div>
  );
}
