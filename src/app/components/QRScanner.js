"use client"; // ต้องใช้ client component ใน Next.js

import { Html5Qrcode, Html5QrcodeScanType } from "html5-qrcode";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function QRScanner() {
  const scannerRef = useRef(null); 
  const videoRef = useRef(null);
  const router = useRouter();
  const hasRun = useRef(false);
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    //if (hasRun.current) return;
    //hasRun.current = true;

    console.log("useEffect QRScanner");
    const initScanner = async () => {
      try {
        const scanner = new Html5Qrcode("reader");
        scannerRef.current = scanner;
        console.log("Init Html5Qrcode");

        // ขอสิทธิ์ในการใช้กล้อง
        try {
          await navigator.mediaDevices.getUserMedia({
            video: { facingMode: "environment" },
          });
          setHasPermission(true);
        } catch (err) {
          console.error("Camera permission denied:", err);
          setHasPermission(false);
          return;
        }

        const config = {
          fps: 10,
          qrbox: { width: 200, height: 200 },
          rememberLastUsedCamera: true,
          supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
        };

        await scanner.start(
          { facingMode: "environment" },
          config,
          (decodedText) => {
            beep();
            console.log("QR Code detected:", decodedText);
            router.push(`/product/${decodedText}`);
            scannerRef.current.stop().catch(console.error);
            // ทำอะไรกับข้อมูลที่ได้
          },
          (errorMessage) => {
            // ไม่ต้องแสดงข้อผิดพลาดหากผู้ใช้หยุดสแกนเอง
            if (
              errorMessage !==
              "QR code parse error, error = NotFoundException: No MultiFormat Readers were able to detect the code."
            ) {
              console.warn("QR Code scan error:", errorMessage);
            }
          }
        );

        // ปรับสไตล์ video element ให้เต็มจอ
        const videoElement = document.querySelector("#reader video"); // as HTMLVideoElement;
        if (videoElement) {
          videoElement.style.width = "100vw";
          videoElement.style.height = "100vh";
          videoElement.style.objectFit = "cover";
          videoElement.style.position = "fixed";
          videoElement.style.top = "0";
          videoElement.style.left = "0";
        }
      } catch (err) {
        console.error("Failed to initialize scanner:", err);
      }
    };

    initScanner();

    return () => {
      console.log("return");
      if (scannerRef.current && scannerRef.current.isScanning) {
        scannerRef.current.stop().catch(console.error);
        console.log("scannerRef.current.stop");
        setHasPermission(false);
      }
    };
  }, [router]);

  // ฟังก์ชันสำหรับทำเสียงบี๊ปเมื่อสแกนสำเร็จ
  const beep = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const audioContext = new AudioContext();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.type = "sine";
      oscillator.frequency.value = 800;
      gainNode.gain.value = 0.5;

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.2);
    } catch (error) {
      console.error("Error playing beep sound:", error);
    }
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Container สำหรับ Html5Qrcode */}
      <div id="reader" ref={videoRef} className="w-full h-full" />

      {/* ภาพโอเวอร์เลย์ */}
      <div className="absolute top-10 left-0 w-full h-full pointer-events-none">
        <Image
          src={"/images/QR-SCAN_01.png"} // แทนที่ด้วย path ของภาพโอเวอร์เลย์
          alt="Overlay"
          fill
          priority
          className="opacity-90 object-cover" // ปรับความโปร่งใสตามต้องการ
        />
      </div>
    </div>
  );
}
