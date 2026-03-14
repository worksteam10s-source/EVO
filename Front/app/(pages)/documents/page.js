'use client'

import { useState, useRef } from 'react'
import Header from '@/app/components/Header'
import CircularMenu from '@/app/components/CircularMenu'

// ── Data ─────────────────────────────────────────────────────────────────────
// Each doc entry: { label, type: 'text'|'file', accept? }
const REQUEST_TYPES = {
  enrollment: {
    label: 'Enrollment Certificate',
    docs: [
      { label: 'Student National ID',             type: 'text' },
      { label: 'Parent National ID (if required)', type: 'text' },
      { label: 'Payment Receipt',                  type: 'text' },
      { label: 'Student ID / Student Code',        type: 'text' },
    ],
  },
  metro: {
    label: 'Metro Subscription',
    docs: [
      { label: 'Student ID',                   type: 'text' },
      { label: 'Parent ID',                    type: 'text' },
      { label: 'Personal Photo (4×6)',          type: 'file', accept: 'image/*' },
      { label: 'Recent Enrollment Certificate', type: 'file', accept: '.pdf,image/*' },
      { label: 'Metro Application Form',        type: 'file', accept: '.pdf,image/*' },
    ],
  },
  military: {
    label: 'Military Status Document',
    docs: [
      { label: 'National ID',                   type: 'text' },
      { label: 'Birth Certificate',              type: 'file', accept: '.pdf,image/*' },
      { label: '3 Personal Photos',              type: 'file', accept: 'image/*' },
      { label: 'Recent Enrollment Certificate',  type: 'file', accept: '.pdf,image/*' },
      { label: 'Military Card (if available)',   type: 'file', accept: '.pdf,image/*' },
    ],
  },
  transcript: {
    label: 'Transcript',
    docs: [
      { label: 'National ID',           type: 'text' },
      { label: 'Student Card',          type: 'text' },
      { label: 'Payment Receipt',       type: 'text' },
      { label: 'Official Request Form', type: 'file', accept: '.pdf,image/*' },
    ],
  },
  idcard: {
    label: 'Student ID Card',
    docs: [
      { label: 'Personal Photo',    type: 'file', accept: 'image/*' },
      { label: 'National ID',       type: 'text' },
      { label: 'Payment Receipt',   type: 'text' },
      { label: 'Registration Form', type: 'file', accept: '.pdf,image/*' },
    ],
  },
  transfer: {
    label: 'College Transfer',
    docs: [
      { label: 'Enrollment Statement',  type: 'file', accept: '.pdf,image/*' },
      { label: 'Grade Report',          type: 'file', accept: '.pdf,image/*' },
      { label: 'National ID',           type: 'text' },
      { label: 'Official Transfer Form',type: 'file', accept: '.pdf,image/*' },
    ],
  },
  excuse: {
    label: 'Semester Excuse',
    docs: [
      { label: 'Official Request',        type: 'file', accept: '.pdf,image/*' },
      { label: 'National ID',             type: 'text' },
      { label: 'Excuse Reason Document',  type: 'file', accept: '.pdf,image/*' },
      { label: 'Enrollment Statement',    type: 'file', accept: '.pdf,image/*' },
    ],
  },
}

// Mock initial requests
const INITIAL_REQUESTS = [
  {
    id: 1, studentName: 'Menna Elwy', studentId: '247101', type: 'enrollment',
    comment: '', status: 'pending', pickupDate: '',
    docValues: { 'Student National ID': '29901120100234', 'Parent National ID (if required)': '26512301234567', 'Payment Receipt': 'REC-2024-001', 'Student ID / Student Code': 'HITU-247101' },
  },
  {
    id: 2, studentName: 'Ahmed Ali', studentId: '247202', type: 'transcript',
    comment: 'Urgent', status: 'approved', pickupDate: '2026-03-20',
    docValues: { 'National ID': '30005150200321', 'Student Card': 'HITU-247202', 'Payment Receipt': 'REC-2024-088', 'Official Request Form': 'official_request_ahmed.pdf' },
  },
  {
    id: 3, studentName: 'Sara Mohamed', studentId: '247303', type: 'metro',
    comment: '', status: 'rejected', pickupDate: '',
    docValues: { 'Student ID': 'HITU-247303', 'Parent ID': '26812110342211', 'Personal Photo (4×6)': 'sara_photo.jpg', 'Recent Enrollment Certificate': 'enrollment_cert_sara.pdf', 'Metro Application Form': 'metro_form_sara.pdf' },
  },
  {
    id: 4, studentName: 'Omar Hassan', studentId: '247404', type: 'military',
    comment: 'Army letter needed', status: 'pending', pickupDate: '',
    docValues: { 'National ID': '30112200401232', 'Birth Certificate': 'birth_cert_omar.pdf', '3 Personal Photos': 'photos_omar.zip', 'Recent Enrollment Certificate': 'enrollment_cert_omar.pdf', 'Military Card (if available)': 'military_card_omar.pdf' },
  },
]

// ── Helpers ───────────────────────────────────────────────────────────────────
const statusColor = {
  pending:  { bg: 'rgba(255,193,7,0.15)',  border: '#ffc107', text: '#ffc107' },
  approved: { bg: 'rgba(76,175,80,0.15)',  border: '#4caf50', text: '#4caf50' },
  rejected: { bg: 'rgba(244,67,54,0.15)', border: '#f44336', text: '#f44336' },
}
const statusLabel = { pending: 'Pending', approved: 'Approved ✓', rejected: 'Rejected ✗' }

// ── Animated Collapse ─────────────────────────────────────────────────────────
function Collapse({ open, children }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateRows: open ? '1fr' : '0fr',
      transition: 'grid-template-rows 0.38s cubic-bezier(0.4,0,0.2,1)',
      overflow: 'hidden',
    }}>
      <div style={{ overflow: 'hidden' }}>{children}</div>
    </div>
  )
}

// ── Print Helpers ─────────────────────────────────────────────────────────────
function printRequest(req) {
  const docs = REQUEST_TYPES[req.type]?.docs ?? []
  const html = `
    <html><head><title>Document Request – ${req.studentName}</title>
    <style>
      body{font-family:Arial,sans-serif;padding:30px;color:#111}
      h2{color:#8a4f00;border-bottom:2px solid #c9860a;padding-bottom:8px}
      table{width:100%;border-collapse:collapse;margin-top:16px}
      th,td{border:1px solid #ccc;padding:10px 14px;text-align:left}
      th{background:#fdf3e3;color:#7a4400;font-weight:700}
      .footer{margin-top:28px;font-size:12px;color:#888;border-top:1px solid #ccc;padding-top:12px}
    </style></head><body>
    <h2>📋 Official Document Request</h2>
    <p><strong>Student:</strong> ${req.studentName} &nbsp;|&nbsp; <strong>ID:</strong> ${req.studentId}</p>
    <p><strong>Document Type:</strong> ${REQUEST_TYPES[req.type]?.label}</p>
    ${req.comment ? `<p><strong>Notes:</strong> ${req.comment}</p>` : ''}
    ${req.pickupDate ? `<p><strong>Pickup Date:</strong> ${req.pickupDate}</p>` : ''}
    <table>
      <thead><tr><th>Required Document</th><th>Student-Provided Data</th></tr></thead>
      <tbody>
        ${docs.map(d => `<tr><td>${d.label ?? d}</td><td>${req.docValues?.[d.label ?? d] || '—'}</td></tr>`).join('')}
      </tbody>
    </table>
    <div class="footer">Printed: ${new Date().toLocaleString('en-EG')} &nbsp;|&nbsp; EVO System – HITU</div>
    </body></html>
  `
  const win = window.open('', '_blank')
  win.document.write(html)
  win.document.close()
  win.print()
}

function printSingleDoc(req, doc, file) {
  if (!file) {
    alert('الملف الأصلي غير متاح — يمكن فقط طباعة الملفات التي رُفعت في هذه الجلسة.')
    return
  }

  const filename = req.docValues?.[doc.label] || file.name || ''
  const ext = filename.split('.').pop().toLowerCase()
  const imageExts = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp', 'svg']
  const isImg = imageExts.includes(ext)
  const isPdf = ext === 'pdf'

  // Create a blob URL from the File object
  const blobUrl = URL.createObjectURL(file)

  if (isImg || isPdf) {
    // Open directly — browser native image viewer / PDF viewer
    const win = window.open(blobUrl, '_blank')
    // For images: trigger print after the tab loads
    if (isImg && win) {
      win.addEventListener('load', () => {
        try { win.print() } catch (_) {}
      })
      // Fallback in case load already fired
      setTimeout(() => { try { win.print() } catch (_) {} }, 1200)
    }
    // For PDFs the browser's built-in PDF viewer has its own print button
    // Revoke after a generous delay so the tab has loaded
    setTimeout(() => URL.revokeObjectURL(blobUrl), 60_000)
  } else {
    // docx, xlsx, pptx, etc. — trigger a download so user can print from native app
    const a = document.createElement('a')
    a.href = blobUrl
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    setTimeout(() => URL.revokeObjectURL(blobUrl), 5_000)
  }
}


// ── Main Component ────────────────────────────────────────────────────────────
export default function DocumentsPage() {
  const [role, setRole] = useState('student')

  // ── Student state ──
  const [reqType, setReqType]     = useState('enrollment')
  const [docValues, setDocValues] = useState({})
  const [fileObjects, setFileObjects] = useState({}) // { docLabel: File }
  const [comment, setComment]     = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [myRequests, setMyRequests] = useState(
    INITIAL_REQUESTS.filter(r => r.studentId === '247818')
  )

  // ── Admin state ──
  const [allRequests, setAllRequests] = useState(INITIAL_REQUESTS)
  const [expandedId, setExpandedId]   = useState(null)
  const [pickupDates, setPickupDates] = useState({})
  // fileStore: { [reqId]: { [docLabel]: File } }
  const [fileStore, setFileStore] = useState({})

  const currentDocs = REQUEST_TYPES[reqType]?.docs ?? []

  const handleTypeChange = (val) => { setReqType(val); setDocValues({}); setFileObjects({}) }

  // For print: resolve doc labels from the type's docs array
  const getDocLabel = (type, key) => REQUEST_TYPES[type]?.docs?.find(d => d.label === key)?.label ?? key
  const handleDocValue = (doc, val, file) => {
    setDocValues(prev => ({ ...prev, [doc]: val }))
    if (file) setFileObjects(prev => ({ ...prev, [doc]: file }))
  }

  const handleStudentSubmit = (e) => {
    e.preventDefault()
    const newId = Date.now()
    const newReq = {
      id: newId, studentName: 'Abdulrahman Reda', studentId: '247818',
      type: reqType, comment, status: 'pending', pickupDate: '',
      docValues: { ...docValues },
    }
    // Store File objects so admin can print the actual files
    if (Object.keys(fileObjects).length > 0) {
      setFileStore(prev => ({ ...prev, [newId]: { ...fileObjects } }))
    }
    setMyRequests(prev => [newReq, ...prev])
    setAllRequests(prev => [newReq, ...prev])
    setDocValues({}); setFileObjects({}); setComment(''); setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3500)
  }

  const handleDecision = (id, decision) => {
    const date = pickupDates[id] || ''
    if (decision === 'approved' && !date) {
      alert('Please set a pickup date before approving.')
      return
    }
    const update = r => r.id === id ? { ...r, status: decision, pickupDate: date } : r
    setAllRequests(prev => prev.map(update))
    setMyRequests(prev => prev.map(update))
    setExpandedId(null)
  }

  // ═══════════════════════════════════════════════════════════════════════════
  return (
    <>
      <Header title="Document Requests" />

      <div style={{ minHeight: '100vh', padding: '90px 20px 100px', fontFamily: "'Outfit', sans-serif" }}>

        {/* ── Role Toggle ── */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 36 }}>
          {['student', 'admin'].map(r => (
            <button key={r} onClick={() => setRole(r)} style={{
              padding: '10px 30px', borderRadius: 50,
              border: '2px solid #c9860a',
              background: role === r ? '#c9860a' : 'transparent',
              color: '#fff', fontWeight: 700, fontSize: 15,
              cursor: 'pointer', transition: 'all 0.25s', letterSpacing: 1,
            }}>
              {r === 'student' ? '🎓 Student' : '🛡️ Admin'}
            </button>
          ))}
        </div>

        {/* ══════════════════════════════════════════════════════════
            STUDENT VIEW
        ══════════════════════════════════════════════════════════ */}
        {role === 'student' && (
          <div style={{ maxWidth: 720, margin: '0 auto' }}>

            <GlassCard title="📋 Submit a New Document Request">
              <form onSubmit={handleStudentSubmit}>

                <label style={labelStyle}>Document Type</label>
                <select value={reqType} onChange={e => handleTypeChange(e.target.value)} style={selectStyle}>
                  {Object.entries(REQUEST_TYPES).map(([key, val]) => (
                    <option key={key} value={key}>{val.label}</option>
                  ))}
                </select>

                <label style={{ ...labelStyle, marginTop: 4 }}>Required Document Details</label>
                <div style={{
                  background: 'rgba(201,134,10,0.06)', border: '1px solid rgba(201,134,10,0.25)',
                  borderRadius: 12, padding: '16px 18px', marginBottom: 18,
                  display: 'flex', flexDirection: 'column', gap: 14,
                }}>
                  {currentDocs.map(doc => (
                    <div key={doc.label}>
                      {doc.type === 'file' ? (
                        <div style={{ position: 'relative' }}>
                          <input
                            type="file"
                            required
                            accept={doc.accept || '*'}
                            id={`file-${doc.label}`}
                            onChange={e => {
                              const file = e.target.files[0]
                              handleDocValue(doc.label, file?.name || '', file)
                            }}
                            style={{ display: 'none' }}
                          />
                          <label
                            htmlFor={`file-${doc.label}`}
                            style={{
                              ...selectStyle, marginBottom: 0,
                              display: 'flex', alignItems: 'center', gap: 10,
                              cursor: 'pointer',
                              color: docValues[doc.label] ? '#4caf50' : 'rgba(255, 255, 255, 0.5)',
                              borderStyle: 'dashed',
                            }}
                          >
                            <span style={{ fontSize: 18 }}>📁</span>
                            <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              {docValues[doc.label] || `Click to upload ${doc.label}`}
                            </span>
                            {docValues[doc.label] && <span style={{ color: '#4caf50', fontWeight: 700 }}>✓</span>}
                          </label>
                        </div>
                      ) : (
                        <input
                          type="text" required
                          placeholder={`Enter: ${doc.label}`}
                          value={docValues[doc.label] || ''}
                          onChange={e => handleDocValue(doc.label, e.target.value)}
                          style={{ ...selectStyle, marginBottom: 0, direction: 'ltr' }}
                        />
                      )}
                    </div>
                  ))}
                </div>

                <label style={labelStyle}>Additional Notes (optional)</label>
                <textarea
                  value={comment} onChange={e => setComment(e.target.value)}
                  placeholder="Any extra notes..." rows={3}
                  style={{ ...selectStyle, resize: 'vertical' }}
                />

                {submitted && (
                  <div style={{ ...alertStyle, borderColor: '#4caf50', background: 'rgba(76,175,80,0.1)', marginBottom: 14 }}>
                    ✅ Your request was submitted successfully! You will be notified once it is reviewed.
                  </div>
                )}

                <button type="submit" style={btnGoldStyle}>Submit Request</button>
              </form>
            </GlassCard>

            {/* My Requests */}
            <GlassCard title="📄 My Previous Requests" style={{ marginTop: 28 }}>
              {myRequests.length === 0 ? (
                <p style={{ color: '#aaa', textAlign: 'center' }}>No previous requests found.</p>
              ) : (
                <div style={{ overflowX: 'auto' }}>
                  <table style={tableStyle}>
                    <thead>
                      <tr>{['Document', 'Status', 'Pickup Date', 'Notes'].map(h => (
                        <th key={h} style={thStyle}>{h}</th>
                      ))}</tr>
                    </thead>
                    <tbody>
                      {myRequests.map(req => {
                        const sc = statusColor[req.status]
                        return (
                          <tr key={req.id}>
                            <td style={tdStyle}>{REQUEST_TYPES[req.type]?.label}</td>
                            <td style={tdStyle}>
                              <span style={{ padding: '4px 12px', borderRadius: 20, fontSize: 13, background: sc.bg, border: `1px solid ${sc.border}`, color: sc.text, whiteSpace: 'nowrap' }}>
                                {statusLabel[req.status]}
                              </span>
                            </td>
                            <td style={{ ...tdStyle, color: req.pickupDate ? '#4caf50' : '#888' }}>
                              {req.pickupDate || '—'}
                            </td>
                            <td style={{ ...tdStyle, color: '#aaa', fontSize: 13 }}>{req.comment || '—'}</td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </GlassCard>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════
            ADMIN VIEW
        ══════════════════════════════════════════════════════════ */}
        {role === 'admin' && (
          <div style={{ maxWidth: 980, margin: '0 auto' }}>
            <GlassCard title="🛡️ Student Requests — Admin Dashboard">

              {/* Stats */}
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 26 }}>
                {[
                  { label: 'Total Requests', value: allRequests.length,                                         color: '#c9860a' },
                  { label: 'Pending',        value: allRequests.filter(r => r.status === 'pending').length,  color: '#ffc107' },
                  { label: 'Approved',       value: allRequests.filter(r => r.status === 'approved').length, color: '#4caf50' },
                  { label: 'Rejected',       value: allRequests.filter(r => r.status === 'rejected').length, color: '#f44336' },
                ].map(stat => (
                  <div key={stat.label} style={{ flex: '1 1 120px', background: 'rgba(255,255,255,0.05)', border: `1px solid ${stat.color}44`, borderRadius: 12, padding: '14px 16px', textAlign: 'center' }}>
                    <div style={{ fontSize: 26, fontWeight: 800, color: stat.color }}>{stat.value}</div>
                    <div style={{ fontSize: 13, color: '#aaa', marginTop: 4 }}>{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Requests list */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {allRequests.map(req => {
                  const sc = statusColor[req.status]
                  const isOpen = expandedId === req.id
                  const docs = REQUEST_TYPES[req.type]?.docs ?? []
                  return (
                    <div key={req.id} style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: `1px solid ${isOpen ? '#c9860a' : 'rgba(255,255,255,0.1)'}`,
                      borderRadius: 14, overflow: 'hidden',
                      transition: 'border-color 0.3s ease',
                    }}>
                      {/* Row header */}
                      <div
                        onClick={() => setExpandedId(isOpen ? null : req.id)}
                        style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 18px', cursor: 'pointer', flexWrap: 'wrap', userSelect: 'none' }}
                      >
                        <span style={{ color: '#666', fontSize: 13, minWidth: 28 }}>#{req.id}</span>
                        <strong style={{ color: '#fff', flex: 1, minWidth: 100 }}>{req.studentName}</strong>
                        <span style={{ color: '#c9860a', fontSize: 13 }}>{req.studentId}</span>
                        <span style={{ color: '#ddd', fontSize: 13, flex: 1, minWidth: 120 }}>{REQUEST_TYPES[req.type]?.label}</span>
                        <span style={{ padding: '3px 12px', borderRadius: 20, fontSize: 13, background: sc.bg, border: `1px solid ${sc.border}`, color: sc.text, whiteSpace: 'nowrap' }}>
                          {statusLabel[req.status]}
                        </span>
                        <span style={{ color: '#c9860a', fontSize: 20, transition: 'transform 0.35s ease', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', display: 'inline-block' }}>
                          ▾
                        </span>
                      </div>

                      {/* Animated Expand Panel */}
                      <Collapse open={isOpen}>
                        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', padding: '20px 22px', background: 'rgba(0,0,0,0.22)' }}>

                          {/* Doc values table */}
                          <p style={{ color: '#c9860a', fontWeight: 700, marginBottom: 10, fontSize: 15 }}>
                            📎 Documents Submitted by Student
                          </p>
                          <div style={{ overflowX: 'auto', marginBottom: 18 }}>
                            <table style={{ ...tableStyle, fontSize: 13 }}>
                              <thead>
                                <tr>
                                  <th style={thStyle}>Required Document</th>
                                  <th style={thStyle}>Submitted Data</th>
                                </tr>
                              </thead>
                              <tbody>
                                {docs.map(d => {
                                  const val = req.docValues?.[d.label]
                                  const isFile = d.type === 'file'
                                  return (
                                    <tr key={d.label}>
                                      <td style={{ ...tdStyle, color: '#c9a96e', whiteSpace: 'nowrap' }}>
                                        {isFile ? '📎 ' : '🔢 '}{d.label}
                                      </td>
                                      <td style={{ ...tdStyle, color: '#ddd' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                          <span style={{ flex: 1 }}>
                                            {val
                                              ? isFile
                                                ? <span style={{ color: '#64b5f6', fontSize: 13 }}>📄 {val}</span>
                                                : val
                                              : <em style={{ color: '#666' }}>Not provided</em>}
                                          </span>
                                          {isFile && val && (
                                            <button
                                              onClick={e => { e.stopPropagation(); printSingleDoc(req, d, fileStore[req.id]?.[d.label]) }}
                                              title="Print this attachment"
                                              style={{
                                                background: 'rgba(201,134,10,0.15)',
                                                border: '1px solid rgba(201,134,10,0.5)',
                                                borderRadius: 6,
                                                color: '#e6a820',
                                                cursor: 'pointer',
                                                fontSize: 13,
                                                padding: '3px 8px',
                                                lineHeight: 1,
                                                flexShrink: 0,
                                              }}
                                              onMouseEnter={e => e.currentTarget.style.background = 'rgba(201,134,10,0.35)'}
                                              onMouseLeave={e => e.currentTarget.style.background = 'rgba(201,134,10,0.15)'}
                                            >
                                              🖨️
                                            </button>
                                          )}
                                        </div>
                                      </td>
                                    </tr>
                                  )
                                })}
                              </tbody>
                            </table>
                          </div>

                          {/* Print button */}
                          <button
                            onClick={() => printRequest(req)}
                            style={{ ...btnGoldStyle, width: 'auto', padding: '9px 24px', marginBottom: 20, background: 'rgba(201,134,10,0.2)', border: '1px solid #c9860a', color: '#e6a820' }}
                          >
                            🖨️ Print Request
                          </button>

                          {req.comment && (
                            <p style={{ color: '#aaa', fontSize: 13, marginBottom: 14 }}>
                              💬 Student Note: <em>{req.comment}</em>
                            </p>
                          )}

                          {/* Decision area */}
                          {req.status !== 'pending' ? (
                            <div style={{ ...alertStyle, borderColor: sc.border, background: sc.bg }}>
                              {req.status === 'approved'
                                ? `✅ Request approved — Pickup Date: ${req.pickupDate}`
                                : '❌ This request has been rejected.'}
                            </div>
                          ) : (
                            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'flex-end' }}>
                              <div style={{ flex: '1 1 200px' }}>
                                <label style={{ ...labelStyle, marginBottom: 6 }}>📅 Pickup Date</label>
                                <input
                                  type="date"
                                  value={pickupDates[req.id] || ''}
                                  onChange={e => setPickupDates(prev => ({ ...prev, [req.id]: e.target.value }))}
                                  style={{ ...selectStyle, marginBottom: 0 }}
                                />
                              </div>
                              <button onClick={() => handleDecision(req.id, 'approved')}
                                style={{ ...btnGoldStyle, width: 'auto', padding: '11px 26px', background: 'linear-gradient(135deg,#2e7d32,#43a047)' }}>
                                ✅ Approve
                              </button>
                              <button onClick={() => handleDecision(req.id, 'rejected')}
                                style={{ ...btnGoldStyle, width: 'auto', padding: '11px 26px', background: 'linear-gradient(135deg,#c62828,#e53935)' }}>
                                ❌ Reject
                              </button>
                            </div>
                          )}
                        </div>
                      </Collapse>
                    </div>
                  )
                })}
              </div>

            </GlassCard>
          </div>
        )}
      </div>

      <CircularMenu />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800&display=swap');
        input[type="date"]::-webkit-calendar-picker-indicator { filter: invert(1); }
        textarea::placeholder, input::placeholder { color: rgba(255, 255, 255, 0.4); }
        select option { background: #1a1a2e; color: #fff; }
        @media (max-width: 600px) { table { font-size: 12px; } }
      `}</style>
    </>
  )
}

// ── GlassCard ─────────────────────────────────────────────────────────────────
function GlassCard({ title, children, style = {} }) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(14px)',
      WebkitBackdropFilter: 'blur(14px)', border: '1px solid rgba(255,255,255,0.12)',
      borderRadius: 18, padding: '28px 26px', ...style,
    }}>
      {title && <h2 style={{ color: '#c9860a', fontSize: 20, marginBottom: 22, fontWeight: 700 }}>{title}</h2>}
      {children}
    </div>
  )
}

// ── Shared styles ─────────────────────────────────────────────────────────────
const labelStyle   = { display: 'block', color: '#c9a96e', fontSize: 14, fontWeight: 600, marginBottom: 8 }
const selectStyle  = { width: '100%', padding: '11px 14px', borderRadius: 10, border: '1px solid rgba(201,134,10,0.35)', background: 'rgba(255,255,255,0.06)', color: '#fff', fontSize: 14, marginBottom: 16, outline: 'none' }
const btnGoldStyle = { padding: '11px 28px', borderRadius: 50, border: 'none', background: 'linear-gradient(135deg,#c9860a,#e6a820)', color: '#fff', fontWeight: 700, fontSize: 15, cursor: 'pointer', transition: 'opacity 0.2s', width: '100%' }
const alertStyle   = { padding: '12px 16px', borderRadius: 10, borderLeft: '4px solid', fontSize: 14, color: '#eee', marginBottom: 0 }
const tableStyle   = { width: '100%', borderCollapse: 'collapse', fontSize: 14 }
const thStyle      = { padding: '10px 14px', background: 'rgba(201,134,10,0.12)', color: '#c9860a', fontWeight: 700, textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.08)' }
const tdStyle      = { padding: '11px 14px', color: '#ddd', borderBottom: '1px solid rgba(255,255,255,0.05)', verticalAlign: 'middle' }
