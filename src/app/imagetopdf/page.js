'use client'

import { jsPDF } from 'jspdf'
import { useState } from 'react'

export default function DownloadPdfByImageSize() {
  const [isLoading, setIsLoading] = useState(false)

  const handleDownloadPDF = async () => {
    setIsLoading(true)

    const imageList = ['1.png', '2.jpg', '3.jpg'] // รูปใน public/images/
    const pxToMm = (px) => px * 0.264583

    let pdf;

    for (let i = 0; i < imageList.length; i++) {
      const imgUrl = `/pic/${imageList[i]}`
      const img = await loadImage(imgUrl)

      const imgWidthMm = pxToMm(img.width)
      const imgHeightMm = pxToMm(img.height)

      if (i === 0) {
        pdf = new jsPDF({
          orientation: imgWidthMm > imgHeightMm ? 'landscape' : 'portrait',
          unit: 'mm',
          format: [imgWidthMm, imgHeightMm],
        })
      } else {
        pdf?.addPage([imgWidthMm, imgHeightMm], imgWidthMm > imgHeightMm ? 'landscape' : 'portrait')
      }

      // วาดภาพลง canvas แล้วแปลงเป็น base64
      const canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')
      ctx?.drawImage(img, 0, 0)

      const imgData = canvas.toDataURL('image/jpeg')

      pdf?.addImage(imgData, 'JPEG', 0, 0, imgWidthMm, imgHeightMm)
    }

    pdf?.save('images-dynamic-size.pdf')
    setIsLoading(false)
  }

  const loadImage = (url) => {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.onload = () => resolve(img)
      img.onerror = (err) => reject(err)
      img.src = url
    })
  }

  return (
    <div className="p-4">
      <h1 className="text-lg font-semibold mb-4">PDF ตามขนาดภาพ</h1>
      <button
        onClick={handleDownloadPDF}
        className="bg-blue-600 text-white px-4 py-2 rounded"
        disabled={isLoading}
      >
        {isLoading ? 'กำลังสร้าง PDF...' : 'Download PDF'
        }
      </button>
    </div>
  )
}
