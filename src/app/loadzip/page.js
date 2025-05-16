'use client' // ถ้าใช้ App Router

import React from 'react'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'

const images = ['BG.png', 'Barcode.png', 'BT-Scan.png'] // รูปที่อยู่ใน public/images/

export default function HomePage() {
  const handleDownloadZip = async () => {
    const zip = new JSZip()
    const folder = zip.folder('images')

    for (const filename of images) {
      const response = await fetch(`/images/${filename}`)
      const blob = await response.blob()
      folder.file(filename, blob)
    }

    const zipBlob = await zip.generateAsync({ type: 'blob' })
    saveAs(zipBlob, 'my-images.zip')
  }

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">ดาวน์โหลดรูปหลายรูป (ZIP)</h1>
      <button
        onClick={handleDownloadZip}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        ดาวน์โหลด ZIP
      </button>
    </main>
  )
}
