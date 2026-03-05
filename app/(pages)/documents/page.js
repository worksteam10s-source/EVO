'use client'

import { useState } from 'react'
import Header from '@/app/components/Header'

export default function DocumentsPage() {
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
    if (file) {
      setUploadStatus(`✓ Document "${file.name}" requested successfully`)
      setTimeout(() => setUploadStatus(''), 3000)
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
        <h1>Request Official Documents</h1>

        <div id="div2">
          <h3 id="h3">Document Request Form</h3>
          <div id="div2-1">
            <form>
              <label>Select Document Type:</label>
              <select>
                <option>--Select Document--</option>
                <option>Transcript</option>
                <option>Certificate of Enrollment</option>
                <option>Degree Certificate</option>
                <option>Official Letter</option>
              </select>

              <label>Number of Copies:</label>
              <input type="number" min="1" max="10" defaultValue="1" />

              <label>Delivery Method:</label>
              <select>
                <option>Pick Up</option>
                <option>Email</option>
                <option>Courier</option>
              </select>

              <label>Upload Supporting Documents:</label>
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                style={{
                  border: `2px dashed ${dragOver ? '#64c8ff' : 'rgba(100, 200, 255, 0.5)'}`,
                  padding: '30px',
                  borderRadius: '8px',
                  textAlign: 'center',
                  marginBottom: '20px',
                }}
              >
                <p>Drag files or click to upload</p>
                <input
                  type="file"
                  onChange={handleInputChange}
                  style={{ display: 'none' }}
                  id="docsInput"
                />
                <label htmlFor="docsInput">
                  <button type="button">Choose File</button>
                </label>
              </div>

              {uploadStatus && (
                <div
                  style={{
                    padding: '10px',
                    backgroundColor: 'rgba(76, 175, 80, 0.1)',
                    borderLeft: '3px solid #4caf50',
                    marginBottom: '15px',
                  }}
                >
                  {uploadStatus}
                </div>
              )}

              <button type="submit">Submit Request</button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
