'use client'

import { useState } from 'react'
import Header from '@/app/components/Header'

export default function LibraryPage() {
  const [dragOver, setDragOver] = useState(false)
  const [uploadStatus, setUploadStatus] = useState('')

  const handleDragOver = (e) => {
    e.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = () => {
    setDragOver(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    handleFileUpload(e.dataTransfer.files[0])
  }

  const handleFileUpload = (file) => {
    if (file && (file.name.endsWith('.xlsx') || file.name.endsWith('.csv'))) {
      setUploadStatus(`<div class="alert alert-success">تم رفع ${file.name} بنجاح</div>`)
      setTimeout(() => setUploadStatus(''), 3000)
    } else {
      setUploadStatus(`<div class="alert alert-danger">ملف غير مدعوم</div>`)
    }
  }

  const handleInputChange = (e) => {
    if (e.target.files[0]) {
      handleFileUpload(e.target.files[0])
    }
  }

  return (
    <>
      <Header />
      <div className="container-fluid p-4">
        <h1>Library Booking System</h1>

        <div id="div2">
          <h3 id="h3">Book Library Resources</h3>
          <div id="div2-1">
            <h4>Upload Study Materials</h4>
            <p>Drag and drop your files or click to select</p>

            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              style={{
                border: `2px dashed ${dragOver ? '#64c8ff' : 'rgba(100, 200, 255, 0.5)'}`,
                padding: '40px',
                borderRadius: '8px',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                backgroundColor: dragOver ? 'rgba(100, 200, 255, 0.1)' : 'transparent',
                marginBottom: '20px',
              }}
            >
              <p>Click or drag files here</p>
              <input
                type="file"
                accept=".xlsx,.csv"
                onChange={handleInputChange}
                style={{ display: 'none' }}
                id="fileInput"
              />
              <label htmlFor="fileInput" style={{ cursor: 'pointer' }}>
                <button type="button">Choose File</button>
              </label>
            </div>

            {uploadStatus && (
              <div dangerouslySetInnerHTML={{ __html: uploadStatus }} />
            )}
          </div>
        </div>
      </div>
    </>
  )
}
