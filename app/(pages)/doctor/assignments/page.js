'use client'
import '@/styles/doctor.css'

import { useState, useEffect } from 'react'
import Header from '@/app/components/Header'
import CircularMenu from '@/app/components/CircularMenu'

export default function AssignmentsPage() {
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [isDragOver, setIsDragOver] = useState(false)
  const [uploadStatus, setUploadStatus] = useState('')

  useEffect(() => {
    const handleMouseMove = (e) => {
      const glow = document.getElementById('cursor-glow')
      if (glow) {
        glow.style.left = e.clientX + 'px'
        glow.style.top = e.clientY + 'px'
      }
    }
    document.addEventListener('mousemove', handleMouseMove)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files)
    handleFilesUpload(files)
  }

  const handleFilesUpload = (files) => {
    files.forEach((file) => {
      const newFile = {
        id: Date.now() + Math.random(),
        name: file.name,
        size: (file.size / 1024).toFixed(2),
        date: new Date().toLocaleDateString(),
        status: 'Uploaded Successfully ✅'
      }
      setUploadedFiles((prev) => [newFile, ...prev])
    })
    setUploadStatus('Files uploaded successfully! 🎉')
    setTimeout(() => setUploadStatus(''), 3000)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragOver(false)
    const files = Array.from(e.dataTransfer.files)

    const validFiles = files.filter(
      (file) =>
        file.name.endsWith('.pdf') ||
        file.name.endsWith('.doc') ||
        file.name.endsWith('.docx') ||
        file.name.endsWith('.xlsx') ||
        file.name.endsWith('.zip')
    )

    if (validFiles.length > 0) {
      handleFilesUpload(validFiles)
    } else {
      setUploadStatus('⚠️ Please upload supported file types only')
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const deleteFile = (id) => {
    setUploadedFiles((prev) => prev.filter((file) => file.id !== id))
  }

  return (
    <>
      <div id="cursor-glow"></div>

      <Header title="Assignments" />

      <div className="main-content container-fluid p-3 p-md-4" style={{ maxWidth: '1200px' }}>

        {/* Page Title */}
        <div className="text-center my-5">
          <h1 style={{ color: '#2b3a55', fontWeight: 800, fontSize: '3rem' }}>
            📝 Assignments & Projects
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#666', fontWeight: 500 }}>
            Upload and track your academic assignments and projects
          </p>
        </div>

        {/* Upload Section */}
        <style dangerouslySetInnerHTML={{
          __html: `
          @keyframes pulse-border {
            0% { box-shadow: 0 0 0 0 rgba(58, 79, 109, 0.4); }
            70% { box-shadow: 0 0 0 15px rgba(58, 79, 109, 0); }
            100% { box-shadow: 0 0 0 0 rgba(58, 79, 109, 0); }
          }
          .upload-area-animated {
            animation: pulse-border 2.5s infinite;
          }
          .upload-area-animated:hover {
            animation: none;
            transform: translateY(-5px);
            box-shadow: 0 15px 35px rgba(0,0,0,0.08) !important;
          }
        `}} />
        <div className="row mb-5">
          <div className="col-lg-8 mx-auto">
            <div
              className={`upload-zone p-5 ${isDragOver ? 'border-primary bg-primary bg-opacity-10' : ''} ${!isDragOver ? 'upload-area-animated' : ''}`}
              onClick={() => document.getElementById('assignmentFile').click()}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              style={{
                background: isDragOver ? 'rgba(196,161,107,0.1)' : 'linear-gradient(to bottom, rgba(255,255,255,0.7), rgba(255,255,255,0.3))',
                border: isDragOver ? '2px dashed #c4a16b' : '1px solid rgba(255,255,255,0.8)',
                borderRadius: '16px',
                textAlign: 'center',
                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                cursor: 'pointer',
                boxShadow: '0 8px 32px rgba(0,0,0,0.03)',
                backdropFilter: 'blur(10px)'
              }}
            >
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: "url('/Pics/11.png')", opacity: 0.3, backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '16px', backgroundBlendMode: 'overlay' }}></div>
              <div className="position-relative z-1">
                <i className="bi bi-file-arrow-up" style={{ fontSize: '4rem', color: '#c4a16b' }}></i>

                <h3 style={{ color: '#2b3a55', marginTop: '20px', marginBottom: '10px', fontWeight: 600 }}>
                  Drag Files Here
                </h3>

                <p style={{ fontSize: '1.1rem', marginBottom: '20px', color: '#555', fontWeight: 500 }}>
                  Or click to choose from your device
                </p>

                <div className="d-inline-block px-4 py-2 mb-3" style={{ background: 'rgba(255,255,255,0.6)', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '8px', color: '#777', fontWeight: 500 }}>
                  PDF <span className="mx-2">|</span> DOC , DOCX <span className="mx-2">|</span> XLSX , ZIP
                </div>

                <input
                  type="file"
                  id="assignmentFile"
                  multiple
                  accept=".pdf,.doc,.docx,.xlsx,.zip"
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                />

                <div>
                  <button className="btn mt-4 px-5 py-2" style={{ fontSize: '1.1rem', fontWeight: 'bold', borderRadius: '8px', background: 'linear-gradient(to right, #c4a16b, #e0c89c)', color: 'white', border: 'none', boxShadow: '0 4px 10px rgba(196,161,107,0.2)', transition: 'transform 0.2s', cursor: 'pointer' }} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
                    Choose Files
                  </button>
                </div>
              </div>
            </div>

            {uploadStatus && (
              <div
                className="alert alert-success mt-4"
                style={{
                  textAlign: 'center',
                  fontSize: '1.1rem',
                  borderColor: '#00ff88',
                  backgroundColor: 'rgba(0, 255, 136, 0.1)',
                  color: '#00ff88'
                }}
              >
                {uploadStatus}
              </div>
            )}
          </div>
        </div>

        {/* Assignments List */}
        <div className="row">
          <div className="col-lg-8 mx-auto">

            <h3 className="text-center" style={{ color: '#2b3a55', marginBottom: '30px', fontWeight: 'bold' }}>
              Uploaded Assignments
            </h3>

            {uploadedFiles.length === 0 ? (
              <div
                className="text-center p-5"
                style={{
                  background: 'linear-gradient(to bottom, rgba(255,255,255,0.7), rgba(255,255,255,0.3))',
                  border: '1px solid rgba(255,255,255,0.8)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '16px',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.03)'
                }}
              >
                <p style={{ fontSize: '1.1rem', color: '#666', fontWeight: 500, margin: 0 }}>
                  No assignments uploaded yet
                </p>
              </div>
            ) : (
              uploadedFiles.map((file) => (
                <div
                  key={file.id}
                  style={{
                    background: 'linear-gradient(to right, rgba(255,255,255,0.7), rgba(255,255,255,0.4))',
                    border: '1px solid rgba(255,255,255,0.8)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '16px',
                    padding: '20px',
                    marginBottom: '15px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.03)'
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateX(5px)'; e.currentTarget.style.boxShadow = '0 12px 20px rgba(0,0,0,0.08)' }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateX(0)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.03)' }}
                >

                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>

                      <i
                        className="bi bi-file-earmark-pdf"
                        style={{
                          fontSize: '2rem',
                          color: '#c4a16b'
                        }}
                      ></i>

                      <div>
                        <h5 style={{ color: '#2b3a55', marginBottom: '5px', fontWeight: 600 }}>
                          {file.name}
                        </h5>

                        <small style={{ color: '#888' }}>
                          {file.size} KB • {file.date}
                        </small>
                      </div>

                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <span style={{ color: '#28a745', fontWeight: 'bold' }}>
                      {file.status}
                    </span>

                    <button
                      onClick={() => deleteFile(file.id)}
                      className="btn btn-outline-danger btn-sm"
                      style={{
                        padding: '8px 15px',
                        borderRadius: '8px',
                        fontWeight: 'bold',
                        transition: '0.3s'
                      }}
                    >
                      Delete
                    </button>

                  </div>
                </div>
              ))
            )}

          </div>
        </div>

        {/* Info Cards */}
        <div className="row g-4 mt-5">
          <div className="col-md-4">
            <div className="p-4 d-flex flex-column justify-content-center align-items-center text-center text-white position-relative stat-card-anim" style={{ background: '#3a4f6d', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 6px 20px rgba(58,79,109,0.25)', overflow: 'hidden', transition: 'all 0.3s ease', cursor: 'default', minHeight: '150px' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: "url('/Pics/11.png')", opacity: 0.15, backgroundSize: 'cover', backgroundPosition: 'center', backgroundBlendMode: 'overlay', pointerEvents: 'none' }}></div>
              <i className="bi bi-hdd-fill position-absolute" style={{ fontSize: '8rem', right: '-20px', bottom: '-40px', opacity: 0.05, transform: 'rotate(-15deg)' }}></i>
              <div className="position-relative z-1 w-100">
                <i className="bi bi-file-earmark-zip-fill mb-3 d-block" style={{ opacity: 0.9, fontSize: '2.5rem' }}></i>
                <div>
                  <h6 style={{ color: 'rgba(255,255,255,0.8)', margin: '0 0 8px 0', fontSize: '1.05rem', fontWeight: 500 }}>Max File Size</h6>
                  <h4 style={{ margin: 0, fontWeight: 800, fontSize: '1.8rem' }}>50 MB</h4>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="p-4 d-flex flex-column justify-content-center align-items-center text-center text-white position-relative stat-card-anim" style={{ background: 'linear-gradient(135deg, #b8905a, #d4ab7a)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 6px 20px rgba(196,161,107,0.3)', overflow: 'hidden', transition: 'all 0.3s ease', cursor: 'default', minHeight: '150px' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: "url('/Pics/11.png')", opacity: 0.1, backgroundSize: 'cover', backgroundPosition: 'center', pointerEvents: 'none' }}></div>
              <i className="bi bi-cloud-arrow-up-fill position-absolute" style={{ fontSize: '8rem', right: '-10px', bottom: '-40px', opacity: 0.08, transform: 'rotate(-10deg)' }}></i>
              <div className="position-relative z-1 w-100">
                <i className="bi bi-folder-fill mb-3 d-block" style={{ opacity: 0.9, fontSize: '2.5rem' }}></i>
                <div>
                  <h6 style={{ color: 'rgba(255,255,255,0.9)', margin: '0 0 8px 0', fontSize: '1.05rem', fontWeight: 500 }}>Uploaded Files</h6>
                  <h4 style={{ margin: 0, fontWeight: 800, fontSize: '1.8rem' }}>{uploadedFiles.length}</h4>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="p-4 d-flex flex-column justify-content-center align-items-center text-center text-white position-relative stat-card-anim" style={{ background: 'linear-gradient(135deg, #7a94ae, #a0bcd4)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 6px 20px rgba(140,163,186,0.3)', overflow: 'hidden', transition: 'all 0.3s ease', cursor: 'default', minHeight: '150px' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: "url('/Pics/11.png')", opacity: 0.15, backgroundSize: 'cover', backgroundPosition: 'center', backgroundBlendMode: 'overlay', pointerEvents: 'none' }}></div>
              <i className="bi bi-check-circle-fill position-absolute" style={{ fontSize: '8rem', right: '-20px', bottom: '-30px', opacity: 0.08, transform: 'rotate(10deg)' }}></i>
              <div className="position-relative z-1 w-100">
                <i className="bi bi-shield-check mb-3 d-block" style={{ opacity: 0.9, fontSize: '2.5rem' }}></i>
                <div>
                  <h6 style={{ color: 'rgba(255,255,255,0.9)', margin: '0 0 8px 0', fontSize: '1.05rem', fontWeight: 500 }}>Status</h6>
                  <h4 style={{ margin: 0, fontWeight: 800, fontSize: '1.6rem' }}>Ready to Submit</h4>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <CircularMenu />
    </>
  )
}