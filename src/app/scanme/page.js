'use client'

// pages/scanner.js
import { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import Script from 'next/script';
import styles from '../Scanner.module.css';

export default function QrScanner() {
  const [scanResult, setScanResult] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [isCameraReady, setCameraReady] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const readerRef = useRef(null);
  const html5QrCodeRef = useRef(null);

  // ฟังก์ชันเริ่มการสแกน
  const startScanner = async () => {
    try {
      const Html5Qrcode = window.Html5Qrcode;

      if (!Html5Qrcode) {
        console.error('Html5Qrcode library not loaded!');
        return;
      }

      // สร้าง instance ของ Html5Qrcode
      html5QrCodeRef.current = new Html5Qrcode('reader');

      // ขอสิทธิ์ในการใช้กล้อง
      try {
        await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        setHasPermission(true);
      } catch (err) {
        console.error('Camera permission denied:', err);
        setHasPermission(false);
        return;
      }

      // คุณสมบัติของการสแกน
      const config = {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        //formatsToSupport: [Html5Qrcode.FORMATS.QR_CODE],
         formatsToSupport: [
                  Html5QrcodeSupportedFormats.QR_CODE,
                  Html5QrcodeSupportedFormats.AZTEC,
                  Html5QrcodeSupportedFormats.DATA_MATRIX,
                ],
        //showTorchButtonIfSupported: true,
        //aspectRatio: window.innerHeight / window.innerWidth,
      };

      // เริ่มการสแกน
      html5QrCodeRef.current.start(
        { facingMode: 'environment' }, // ใช้กล้องหลัง
        config,
        onScanSuccess,
        onScanFailure
      ).then(() => {
        setIsScanning(true);
        setCameraReady(true);
        
        // ปรับแต่ง DOM หลังจากเริ่มกล้อง
        setTimeout(() => {
          // ซ่อนส่วนที่ไม่จำเป็น
          const scanRegionElements = document.querySelectorAll('.html5-qrcode-element');
          scanRegionElements.forEach(el => {
            if (el.tagName.toLowerCase() !== 'video') {
              el.style.display = 'none';
            }
          });
          
          // ปรับแต่งวิดีโอให้เต็มจอ
          const videoElement = document.querySelector('video');
          if (videoElement) {
            videoElement.style.width = '100vw';
            videoElement.style.height = '100vh';
            videoElement.style.objectFit = 'cover';
          }
        }, 1000);
      }).catch(err => {
        console.error('Error starting camera:', err);
        setHasPermission(false);
      });
    } catch (err) {
      console.error('Failed to start scanner:', err);
    }
  };

  // ฟังก์ชันหยุดการสแกน
  const stopScanner = () => {
    if (html5QrCodeRef.current && html5QrCodeRef.current.isScanning) {
      html5QrCodeRef.current.stop()
        .then(() => {
          setIsScanning(false);
          setCameraReady(false);
        })
        .catch(err => console.error('Error stopping scanner:', err));
    }
  };

  // ฟังก์ชันที่ทำงานเมื่อสแกน QR Code สำเร็จ
  const onScanSuccess = (decodedText, decodedResult) => {
    setScanResult(decodedText);
    
    // เล่นเสียงเมื่อสแกนสำเร็จ
    beep();
    
    // หยุดสแกนชั่วคราว
    if (html5QrCodeRef.current) {
      html5QrCodeRef.current.pause();
    }
    
    // เริ่มสแกนใหม่หลังจาก 3 วินาที
    setTimeout(() => {
      if (html5QrCodeRef.current) {
        setScanResult('');
        html5QrCodeRef.current.resume();
      }
    }, 3000);
  };

  // ฟังก์ชันที่ทำงานเมื่อสแกนไม่สำเร็จ
  const onScanFailure = (error) => {
    // ไม่ต้องทำอะไรเมื่อสแกนไม่สำเร็จ
    // console.warn(`QR Code scan error: ${error}`);
  };

  // ฟังก์ชันสำหรับทำเสียงบี๊ปเมื่อสแกนสำเร็จ
  const beep = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const audioContext = new AudioContext();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.type = 'sine';
      oscillator.frequency.value = 800;
      gainNode.gain.value = 0.5;
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.2);
    } catch (error) {
      console.error('Error playing beep sound:', error);
    }
  };

  // เริ่มสแกนเมื่อ component ถูก mount และหยุดเมื่อ unmount
  useEffect(() => {
    // รอให้ Html5Qrcode โหลดเสร็จก่อนเริ่มสแกน
    if (typeof window !== 'undefined' && window.Html5Qrcode && !isScanning) {
      startScanner();
    }

    // Cleanup เมื่อ component ถูก unmount
    return () => {
      stopScanner();
    };
  }, []);

  // จัดการเมื่อหน้าจอเปลี่ยนขนาด
  useEffect(() => {
    const handleResize = () => {
      // ปรับขนาดวิดีโออีกครั้ง
      const videoElement = document.querySelector('video');
      if (videoElement) {
        videoElement.style.width = '100vw';
        videoElement.style.height = '100vh';
        videoElement.style.objectFit = 'cover';
      }
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>QR Code Scanner</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </Head>
      
      {/* โหลดไลบรารี Html5Qrcode ด้วย Next.js Script component */}
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/html5-qrcode/2.3.8/html5-qrcode.min.js"
        strategy="beforeInteractive"
        onLoad={() => console.log('Html5Qrcode loaded')}
      />
      
      <main className={styles.main}>
        {hasPermission === false && (
          <div className={styles.permissionError}>
            <p>ไม่สามารถเข้าถึงกล้องได้ โปรดอนุญาตให้ใช้กล้องในการตั้งค่าเบราว์เซอร์</p>
            <button onClick={startScanner} className={styles.retryButton}>
              ลองอีกครั้ง
            </button>
          </div>
        )}
        
        <div id="reader" ref={readerRef} className={styles.reader}></div>
        
        <div className={styles.scanFrame}><span></span></div>
        
        {scanResult && (
          <div className={styles.result}>
            <p>ผลลัพธ์: {scanResult}</p>
          </div>
        )}
      </main>
    </div>
  );
}