'use client'

import React from 'react'
import { jsPDF } from 'jspdf'

const imageFiles = ['image1.jpg', 'image2.jpg', 'image3.jpg'] // รูปภาพใน public/images/

export default function DownloadPdf() {
  const generatePdf = async () => {
    const pdf = new jsPDF()
    
    for (let i = 0; i < imageFiles.length; i++) {
      const file = imageFiles[i]
      const imgUrl = `/images/${file}`

      const img = await loadImage(imgUrl)

      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      canvas.width = img.width
      canvas.height = img.height
      ctx.drawImage(img, 0, 0)

      const imgData = canvas.toDataURL('image/jpeg', 1.0)

      const pageWidth = pdf.internal.pageSize.getWidth()
      const pageHeight = pdf.internal.pageSize.getHeight()

      const ratio = Math.min(pageWidth / img.width, pageHeight / img.height)
      const imgWidth = img.width * ratio
      const imgHeight = img.height * ratio
      const x = (pageWidth - imgWidth) / 2
      const y = (pageHeight - imgHeight) / 2

      if (i > 0) pdf.addPage()
      pdf.addImage(imgData, 'JPEG', x, y, imgWidth, imgHeight)
    }

    pdf.save('images.pdf')
  }

  const loadImage = (url)=> {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.onload = () => resolve(img)
      img.onerror = reject
      img.src = url
    })
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">รวมรูปภาพเป็น PDF</h1>
      <button
        onClick={generatePdf}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        ดาวน์โหลด PDF
      </button>
    </div>
  )
}
