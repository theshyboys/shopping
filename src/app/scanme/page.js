'use client';

import { Html5Qrcode } from 'html5-qrcode';
import { useEffect } from 'react';

export default function QrScanner() {
  useEffect(() => {
    const qrRegionId = 'qr-reader';

    const html5QrCode = new Html5Qrcode(qrRegionId);

    Html5Qrcode.getCameras().then(devices => {
      if (devices && devices.length) {
        const cameraId = devices[0].id;

        html5QrCode.start(
          cameraId,
          {
            fps: 10,
            qrbox: { width: 250, height: 250 }, // กรอบสำหรับสแกน
          },
          (decodedText, decodedResult) => {
            console.log(`Code matched = ${decodedText}`, decodedResult);
          },
          (errorMessage) => {
            // Ignore decode errors
          }
        );
      }
    });

    return () => {
      html5QrCode.stop().then(() => {
        html5QrCode.clear();
      });
    };
  }, []);

  return (
    <div className="relative w-full h-screen bg-black">
      {/* กล้องเต็มจอ */}
      <div id="qr-reader" className="w-full h-full" />

      {/* กรอบตรงกลาง */}
      <div className="absolute top-1/2 left-1/2 w-64 h-64 border-4 border-green-400 rounded-md transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-50"></div>
    </div>
  );
}
