'use client'

import { useState, useEffect } from 'react'
import Header from '@/app/components/Header'
import CircularMenu from '@/app/components/CircularMenu'

export default function ControlPage() {

  const [course, setCourse] = useState('web-applications')
  const [year, setYear] = useState('second')
  const [department, setDepartment] = useState('data-science')
  const [dragOver, setDragOver] = useState(false)
  const [uploadStatus, setUploadStatus] = useState('')
  const [uploadedFile, setUploadedFile] = useState(null)
  const [tableData, setTableData] = useState(null) // { headers: [], rows: [] }

  // Load SheetJS from CDN once
  useEffect(() => {
    if (window.XLSX) return
    const script = document.createElement('script')
    script.src = 'https://cdn.sheetjs.com/xlsx-0.20.1/package/dist/xlsx.full.min.js'
    document.head.appendChild(script)
  }, [])

  const handleDragOver = (e) => {
    e.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = () => setDragOver(false)

  const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file && (file.name.endsWith('.xlsx') || file.name.endsWith('.csv'))) {
      processFile(file) 
    } else {
      setUploadStatus('Unsupported file — use XLSX or CSV')
    }
  }

  const handleFileInput = (e) => {
    const file = e.target.files[0]
    if (file) processFile(file)
  }

  const processFile = (file) => {
    setUploadedFile(file)
    setUploadStatus('Reading file...')
    setTableData(null)

    const reader = new FileReader()

    if (file.name.endsWith('.csv')) {
      reader.onload = (e) => {
        const text = e.target.result
        const lines = text.trim().split('\n').map((l) => l.split(',').map((c) => c.trim()))
        const headers = lines[0]
        const rows = lines.slice(1)
        setTableData({ headers, rows })
        setUploadStatus('File loaded!')
        setTimeout(() => setUploadStatus(''), 2000)
      }
      reader.readAsText(file)
    } else {
      // Excel — use SheetJS
      reader.onload = (e) => {
        const waitForXLSX = () => {
          if (!window.XLSX) {
            setTimeout(waitForXLSX, 200)
            return
          }
          const data = new Uint8Array(e.target.result)
          const workbook = window.XLSX.read(data, { type: 'array' })
          const sheet = workbook.Sheets[workbook.SheetNames[0]]
          const json = window.XLSX.utils.sheet_to_json(sheet, { header: 1 })
          const headers = json[0]
          const rows = json.slice(1)
          setTableData({ headers, rows })
          setUploadStatus('File loaded!')
          setTimeout(() => setUploadStatus(''), 2000)
        }
        waitForXLSX()
      }
      reader.readAsArrayBuffer(file)
    }
  }

  return (
    <>
      <Header title="Control Panel" />
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundImage: "url('/Pics/backlogo.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '40px 20px',
      }}>

      <div style={{
        width: '100%',
        maxWidth: '900px',
        padding: '40px',
        borderRadius: '20px',
        background: 'rgba(255,255,255,0.2)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
      }}>

        <h1 style={{ textAlign: 'center', color: '#0b3a6e', marginBottom: '30px' }}>
          Control Panel
        </h1>

        {/* Dropdowns */}
        <div style={{
          display: 'flex',
          gap: '20px',
          justifyContent: 'center',
          marginBottom: '30px',
          flexWrap: 'wrap',
        }}>
          <select value={course} onChange={(e) => setCourse(e.target.value)} style={dropdownStyle}>
            <option>Web Applications</option>
            <option>Data Structures</option>
            <option>Algorithms</option>
          </select>

          <select value={year} onChange={(e) => setYear(e.target.value)} style={dropdownStyle}>
            <option>First</option>
            <option>Second</option>
            <option>Third</option>
            <option>Fourth</option>
          </select>

          <select value={department} onChange={(e) => setDepartment(e.target.value)} style={dropdownStyle}>
            <option>Computer Science</option>
            <option>Data Science</option>
            <option>Information Technology</option>
          </select>
        </div>

        {/* Upload Area */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          style={{
            border: '2px dashed #caa13c',
            padding: '40px',
            borderRadius: '15px',
            textAlign: 'center',
            background: dragOver ? 'rgba(255,255,255,0.4)' : 'transparent',
            transition: '0.3s',
          }}
        >
          <h3 style={{ color: '#0b3a6e' }}>Drag &amp; Drop Grades File</h3>
          <p style={{ color: '#333', marginBottom: '10px' }}>Supported: XLSX / CSV</p>

          <input
            type="file"
            accept=".xlsx,.csv"
            onChange={handleFileInput}
            style={{ display: 'none' }}
            id="fileInput"
          />

          <button
            onClick={() => document.getElementById('fileInput').click()}
            style={{
              marginTop: '10px',
              padding: '12px 30px',
              border: 'none',
              borderRadius: '25px',
              background: 'linear-gradient(90deg,#caa13c,#e4bd63)',
              color: 'white',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: '15px',
            }}
          >
            Choose File
          </button>

          {uploadStatus && (
            <p style={{ marginTop: '15px', color: '#0b3a6e', fontWeight: 'bold' }}>{uploadStatus}</p>
          )}
        </div>

        {/* File Info Bar */}
        {uploadedFile && (
          <div style={{
            marginTop: '20px',
            padding: '14px 20px',
            borderRadius: '10px',
            background: 'rgba(255,255,255,0.7)',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
          }}>
            <span style={{ fontSize: '22px' }}>
              {uploadedFile.name.endsWith('.csv') ? '📄' : '📊'}
            </span>
            <div style={{ flex: 1 }}>
              <p style={{ margin: 0, fontWeight: 'bold', color: '#0b3a6e' }}>{uploadedFile.name}</p>
              <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>
                {(uploadedFile.size / 1024).toFixed(1)} KB
              </p>
            </div>
            <button
              onClick={() => { setUploadedFile(null); setTableData(null) }}
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px', color: '#aaa' }}
            >✕</button>
          </div>
        )}

        {/* Table Preview */}
        {tableData && (
          <div style={{
            marginTop: '25px',
            borderRadius: '14px',
            overflow: 'hidden',
            boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
          }}>
            <div style={{
              background: 'linear-gradient(90deg,#0b3a6e,#1a5fa8)',
              padding: '14px 20px',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '15px',
            }}>
              📋 File Preview — {tableData.rows.length} row{tableData.rows.length !== 1 ? 's' : ''}
            </div>
            <div style={{ overflowX: 'auto', maxHeight: '400px', overflowY: 'auto' }}>
              <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                background: 'rgba(255,255,255,0.95)',
                fontSize: '14px',
              }}>
                <thead>
                  <tr>
                    {tableData.headers.map((h, i) => (
                      <th key={i} style={{
                        padding: '12px 16px',
                        background: 'rgba(202,161,60,0.15)',
                        color: '#0b3a6e',
                        borderBottom: '2px solid #caa13c',
                        textAlign: 'left',
                        fontWeight: 'bold',
                        whiteSpace: 'nowrap',
                        position: 'sticky',
                        top: 0,
                      }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tableData.rows.map((row, ri) => (
                    <tr key={ri} style={{
                      background: ri % 2 === 0 ? 'white' : 'rgba(202,161,60,0.05)',
                    }}>
                      {tableData.headers.map((_, ci) => (
                        <td key={ci} style={{
                          padding: '10px 16px',
                          borderBottom: '1px solid rgba(0,0,0,0.07)',
                          color: '#333',
                          whiteSpace: 'nowrap',
                        }}>
                          {row[ci] ?? '—'}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
      </div>
      <CircularMenu />
    </>
  )
}

const dropdownStyle = {
  padding: '12px',
  borderRadius: '10px',
  border: 'none',
  width: '200px',
  background: 'rgba(255,255,255,0.8)',
}
