'use client'
import '@/styles/doctor.css'

import { useState, useEffect } from 'react'
import Header from '@/app/components/Header'
import CircularMenu from '@/app/components/CircularMenu'

export default function VideosPage() {
    const [uploadedFiles, setUploadedFiles] = useState([])
    const [isDragOver, setIsDragOver] = useState(false)
    const [uploadStatus, setUploadStatus] = useState('')
    const [videoTitle, setVideoTitle] = useState('')
    const [department, setDepartment] = useState('Mechatronics')
    const [year, setYear] = useState('Year 1')
    const [subject, setSubject] = useState('')

    // Mock Database for Subjects
    const subjectsDB = {
        'Mechatronics': {
            'Year 1': ['Math 1', 'Physics 1', 'Intro to Mechatronics', 'Mechanics'],
            'Year 2': ['Math 3', 'Thermodynamics', 'Fluid Mechanics', 'Programming'],
            'Year 3': ['Control Systems', 'Robotics 1', 'Machine Design', 'Sensors'],
            'Year 4': ['Robotics 2', 'PLC', 'AI in Mechatronics', 'Graduation Project']
        },
        'Autotronics': {
            'Year 1': ['Math 1', 'Physics 1', 'Intro to Automotive', 'Mechanics'],
            'Year 2': ['Engines', 'Automotive Electrical Systems', 'Dynamics'],
            'Year 3': ['Hybrid Vehicles', 'Control Systems', 'Diagnostics'],
            'Year 4': ['EV Technology', 'Advanced Diagnostics', 'Graduation Project']
        },
        'Computer Science': {
            'Year 1': ['Intro to CS', 'Math 1', 'Logic Design', 'Programming 1'],
            'Year 2': ['Data Structures', 'OOP', 'Math 3', 'Algorithms'],
            'Year 3': ['Databases', 'OS', 'Networks', 'Software Engineering'],
            'Year 4': ['AI', 'Machine Learning', 'Cloud Computing', 'Graduation Project']
        },
        'Civil': {
            'Year 1': ['Math 1', 'Physics 1', 'Statics', 'Drawing'],
            'Year 2': ['Structure 1', 'Surveying', 'Materials', 'Fluid Mechanics'],
            'Year 3': ['Structure 2', 'Soil Mechanics', 'Steel Design', 'Concrete Design'],
            'Year 4': ['Project Management', 'Foundations', 'Graduation Project']
        }
    }

    const availableSubjects = subjectsDB[department]?.[year] || []

    useEffect(() => {
        setSubject('') // Reset subject when dept or year changes
    }, [department, year])

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
                size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
                date: new Date().toLocaleDateString(),
                status: 'Preparing for Upload ⏳',
                title: videoTitle || file.name,
                department,
                subject: subject || 'Unspecified',
                year
            }
            setUploadedFiles((prev) => [newFile, ...prev])
        })
        setUploadStatus('Video(s) queued for database upload! 🎥')
        setTimeout(() => setUploadStatus(''), 4000)
        setVideoTitle('') // reset form
    }

    const handleDrop = (e) => {
        e.preventDefault()
        setIsDragOver(false)
        const files = Array.from(e.dataTransfer.files)

        const validFiles = files.filter(
            (file) =>
                file.name.endsWith('.mp4') ||
                file.name.endsWith('.mkv') ||
                file.name.endsWith('.avi') ||
                file.name.endsWith('.mov')
        )

        if (validFiles.length > 0) {
            handleFilesUpload(validFiles)
        } else {
            setUploadStatus('⚠️ Please upload supported video formats only (.mp4, .mkv, .avi, .mov)')
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

            <Header title="Video Lectures" />

            <div className="main-content container-fluid p-4" style={{ maxWidth: '1200px' }}>

                {/* Page Title */}
                <div className="text-center my-4">
                    <h1 style={{ color: '#2b3a55', fontWeight: 800, fontSize: '2.8rem' }}>
                        <i className="bi bi-camera-reels me-3" style={{ color: '#c4a16b' }}></i>
                        Video Lectures Manager
                    </h1>
                    <p style={{ fontSize: '1.1rem', color: '#666', fontWeight: 500 }}>
                        Upload, manage, and publish high-quality video content for your students
                    </p>
                </div>

                {/* Quick Stats */}
                <div className="row g-4 mb-5">
                    <div className="col-md-4">
                        <div className="p-4 d-flex flex-column justify-content-center align-items-center text-center text-white position-relative stat-card-anim" style={{ background: '#3a4f6d', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 6px 20px rgba(58,79,109,0.25)', overflow: 'hidden', transition: 'all 0.3s ease', cursor: 'default', minHeight: '150px' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: "url('/Pics/11.png')", opacity: 0.15, backgroundSize: 'cover', backgroundPosition: 'center', backgroundBlendMode: 'overlay', pointerEvents: 'none' }}></div>
                            <i className="bi bi-collection-play-fill position-absolute" style={{ fontSize: '8rem', right: '-20px', bottom: '-40px', opacity: 0.05, transform: 'rotate(-15deg)' }}></i>
                            <div className="position-relative z-1 w-100">
                                <i className="bi bi-camera-video-fill mb-3 d-block" style={{ opacity: 0.9, fontSize: '2.5rem' }}></i>
                                <div>
                                    <h6 style={{ color: 'rgba(255,255,255,0.8)', margin: '0 0 8px 0', fontSize: '1.05rem', fontWeight: 500 }}>Total Videos</h6>
                                    <h4 style={{ margin: 0, fontWeight: 800, fontSize: '1.8rem' }}>{24 + uploadedFiles.length}</h4>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="p-4 d-flex flex-column justify-content-center align-items-center text-center text-white position-relative stat-card-anim" style={{ background: 'linear-gradient(135deg, #b8905a, #d4ab7a)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 6px 20px rgba(196,161,107,0.3)', overflow: 'hidden', transition: 'all 0.3s ease', cursor: 'default', minHeight: '150px' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: "url('/Pics/11.png')", opacity: 0.1, backgroundSize: 'cover', backgroundPosition: 'center', pointerEvents: 'none' }}></div>
                            <i className="bi bi-cloud-arrow-up-fill position-absolute" style={{ fontSize: '8rem', right: '-10px', bottom: '-40px', opacity: 0.08, transform: 'rotate(-10deg)' }}></i>
                            <div className="position-relative z-1 w-100">
                                <i className="bi bi-hdd-network-fill mb-3 d-block" style={{ opacity: 0.9, fontSize: '2.5rem' }}></i>
                                <div>
                                    <h6 style={{ color: 'rgba(255,255,255,0.9)', margin: '0 0 8px 0', fontSize: '1.05rem', fontWeight: 500 }}>Storage Used</h6>
                                    <h4 style={{ margin: 0, fontWeight: 800, fontSize: '1.8rem' }}>12.4 GB</h4>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="p-4 d-flex flex-column justify-content-center align-items-center text-center text-white position-relative stat-card-anim" style={{ background: 'linear-gradient(135deg, #7a94ae, #a0bcd4)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 6px 20px rgba(140,163,186,0.3)', overflow: 'hidden', transition: 'all 0.3s ease', cursor: 'default', minHeight: '150px' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: "url('/Pics/11.png')", opacity: 0.15, backgroundSize: 'cover', backgroundPosition: 'center', backgroundBlendMode: 'overlay', pointerEvents: 'none' }}></div>
                            <i className="bi bi-journals position-absolute" style={{ fontSize: '8rem', right: '-20px', bottom: '-30px', opacity: 0.08, transform: 'rotate(10deg)' }}></i>
                            <div className="position-relative z-1 w-100">
                                <i className="bi bi-activity mb-3 d-block" style={{ opacity: 0.9, fontSize: '2.5rem' }}></i>
                                <div>
                                    <h6 style={{ color: 'rgba(255,255,255,0.9)', margin: '0 0 8px 0', fontSize: '1.05rem', fontWeight: 500 }}>Active Courses</h6>
                                    <h4 style={{ margin: 0, fontWeight: 800, fontSize: '1.8rem' }}>8</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Custom Upload Form */}
                <div className="row mb-5 g-4">
                    {/* Form Settings Column */}
                    <div className="col-lg-5">
                        <div className="p-4 h-100" style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.8), rgba(255,255,255,0.4))', backdropFilter: 'blur(10px)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.8)', boxShadow: '0 8px 32px rgba(0,0,0,0.04)' }}>
                            <h4 style={{ color: '#2b3a55', fontWeight: 700, marginBottom: '20px' }}>Video Details</h4>

                            <div className="mb-3">
                                <label style={{ fontWeight: 600, color: '#555', marginBottom: '8px' }}>Lecture Title</label>
                                <input
                                    type="text"
                                    className="form-control p-3"
                                    placeholder="e.g. Intro to Robotics"
                                    value={videoTitle}
                                    onChange={(e) => setVideoTitle(e.target.value)}
                                    style={{ borderRadius: '10px', border: '1px solid #ccc', background: 'rgba(255,255,255,0.9)' }}
                                />
                            </div>

                            <div className="mb-4">
                                <label style={{ fontWeight: 600, color: '#555', marginBottom: '10px', display: 'block' }}>Department</label>
                                <div className="d-flex flex-wrap gap-2">
                                    {['Mechatronics', 'Autotronics', 'Computer Science', 'Civil'].map(dept => (
                                        <button
                                            key={dept}
                                            onClick={() => setDepartment(dept)}
                                            style={{
                                                padding: '8px 16px',
                                                borderRadius: '8px',
                                                border: department === dept ? 'none' : '1px solid #ccc',
                                                background: department === dept ? 'linear-gradient(to right, #3a4f6d, #4e6b8c)' : '#fff',
                                                color: department === dept ? '#fff' : '#555',
                                                fontWeight: department === dept ? 600 : 500,
                                                fontSize: '0.9rem',
                                                cursor: 'pointer',
                                                boxShadow: department === dept ? '0 4px 10px rgba(58,79,109,0.3)' : 'none',
                                                transition: 'all 0.2s'
                                            }}
                                        >
                                            {dept}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="mb-4">
                                <label style={{ fontWeight: 600, color: '#555', marginBottom: '10px', display: 'block' }}>Year</label>
                                <div className="d-flex flex-wrap gap-2">
                                    {['Year 1', 'Year 2', 'Year 3', 'Year 4'].map(yr => (
                                        <button
                                            key={yr}
                                            onClick={() => setYear(yr)}
                                            style={{
                                                padding: '8px 16px',
                                                borderRadius: '8px',
                                                border: year === yr ? 'none' : '1px solid #ccc',
                                                background: year === yr ? 'linear-gradient(to right, #c4a16b, #d4ab7a)' : '#fff',
                                                color: year === yr ? '#fff' : '#555',
                                                fontWeight: year === yr ? 600 : 500,
                                                fontSize: '0.9rem',
                                                cursor: 'pointer',
                                                boxShadow: year === yr ? '0 4px 10px rgba(196,161,107,0.3)' : 'none',
                                                transition: 'all 0.2s'
                                            }}
                                        >
                                            {yr}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="mb-3">
                                <label style={{ fontWeight: 600, color: '#555', marginBottom: '10px', display: 'block' }}>Subject</label>
                                <div className="d-flex flex-wrap gap-2">
                                    {availableSubjects.length > 0 ? availableSubjects.map(sub => (
                                        <button
                                            key={sub}
                                            onClick={() => setSubject(sub)}
                                            style={{
                                                padding: '8px 16px',
                                                borderRadius: '8px',
                                                border: subject === sub ? 'none' : '1px solid #ccc',
                                                background: subject === sub ? 'linear-gradient(to right, #7a94ae, #94adca)' : '#fff',
                                                color: subject === sub ? '#fff' : '#555',
                                                fontWeight: subject === sub ? 600 : 500,
                                                fontSize: '0.9rem',
                                                cursor: 'pointer',
                                                boxShadow: subject === sub ? '0 4px 10px rgba(122,148,174,0.3)' : 'none',
                                                transition: 'all 0.2s'
                                            }}
                                        >
                                            {sub}
                                        </button>
                                    )) : (
                                        <div style={{ color: '#888', fontStyle: 'italic', fontSize: '0.9rem', padding: '8px 0' }}>No subjects available for this selection.</div>
                                    )}
                                </div>
                            </div>

                            <div className="p-3 mt-4 text-center rounded" style={{ background: 'rgba(58, 79, 109, 0.05)', border: '1px solid rgba(58, 79, 109, 0.1)' }}>
                                <i className="bi bi-server me-2 text-primary"></i> <span style={{ fontWeight: 600, color: '#3a4f6d' }}>Database Sync Ready</span>
                                <p className="mt-2 text-muted mb-0" style={{ fontSize: '0.9rem' }}>Files will be sent directly to the secure video server bucket.</p>
                            </div>
                        </div>
                    </div>

                    {/* Drag and Drop Zone */}
                    <div className="col-lg-7">
                        <style dangerouslySetInnerHTML={{
                            __html: `
              @keyframes pulse-border {
                0% { box-shadow: 0 0 0 0 rgba(196, 161, 107, 0.4); }
                70% { box-shadow: 0 0 0 15px rgba(196, 161, 107, 0); }
                100% { box-shadow: 0 0 0 0 rgba(196, 161, 107, 0); }
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
                        <div
                            className={`p-5 text-center position-relative h-100 d-flex flex-column justify-content-center ${!isDragOver ? 'upload-area-animated' : ''}`}
                            onClick={() => document.getElementById('videoFile').click()}
                            onDrop={handleDrop}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            style={{
                                background: isDragOver ? 'rgba(196, 161, 107, 0.1)' : 'linear-gradient(to bottom, rgba(255,255,255,0.7), rgba(255,255,255,0.3))',
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
                                <i className="bi bi-camera-video" style={{ fontSize: '4.5rem', color: '#c4a16b' }}></i>

                                <h3 style={{ color: '#2b3a55', marginTop: '20px', marginBottom: '10px', fontWeight: 600 }}>
                                    Drag Video File Here
                                </h3>

                                <p style={{ fontSize: '1.1rem', marginBottom: '20px', color: '#555', fontWeight: 500 }}>
                                    Or click to browse storage
                                </p>

                                <div className="d-inline-block px-4 py-2 mb-3" style={{ background: 'rgba(255,255,255,0.6)', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '8px', color: '#777', fontWeight: 500 }}>
                                    MP4 <span className="mx-2">|</span> MKV <span className="mx-2">|</span> AVI , MOV
                                </div>

                                <input
                                    type="file"
                                    id="videoFile"
                                    multiple
                                    accept=".mp4,.mkv,.avi,.mov"
                                    style={{ display: 'none' }}
                                    onChange={handleFileChange}
                                />

                                <div>
                                    <button className="btn mt-3 px-5 py-3" style={{ fontSize: '1.1rem', fontWeight: 'bold', borderRadius: '10px', background: 'linear-gradient(to right, #6b829c, #8ca3ba)', color: 'white', border: 'none', boxShadow: '0 4px 10px rgba(107,130,156,0.2)' }}>
                                        <i className="bi bi-upload me-2"></i> Select Video
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {uploadStatus && (
                    <div className="alert alert-success text-center fw-bold py-3 mb-5" style={{ borderRadius: '12px', fontSize: '1.1rem', boxShadow: '0 4px 15px rgba(40,167,69,0.2)' }}>
                        {uploadStatus}
                    </div>
                )}

                {/* Uploaded Videos List */}
                {uploadedFiles.length > 0 && (
                    <div className="mb-5">
                        <h4 className="mb-4" style={{ color: '#2b3a55', fontWeight: 700 }}>
                            <i className="bi bi-collection-play me-2"></i> Recent Uploads Queue
                        </h4>
                        <div className="row g-4">
                            {uploadedFiles.map((file) => (
                                <div key={file.id} className="col-md-6 col-lg-4">
                                    <div className="p-0" style={{ background: 'white', borderRadius: '16px', boxShadow: '0 8px 25px rgba(0,0,0,0.06)', border: '1px solid rgba(0,0,0,0.05)', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '100%' }}>
                                        {/* Thumbnail Placeholder */}
                                        <div style={{ background: 'linear-gradient(45deg, #2b3a55, #3a4f6d)', height: '150px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: "url('/Pics/11.png')", opacity: 0.2, backgroundSize: 'cover', backgroundPosition: 'center', backgroundBlendMode: 'overlay' }}></div>
                                            <i className="bi bi-play-circle-fill text-white position-relative z-1" style={{ fontSize: '3.5rem', cursor: 'pointer', transition: 'transform 0.2s', filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.3))' }} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.15)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}></i>
                                        </div>

                                        <div className="p-4 d-flex flex-column flex-grow-1">
                                            <div className="d-flex justify-content-between align-items-start mb-3">
                                                <div>
                                                    <h5 style={{ color: '#2b3a55', fontWeight: 700, fontSize: '1.15rem', marginBottom: '6px', maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{file.title}</h5>
                                                    <div className="d-flex gap-2 flex-wrap mb-2">
                                                        <span className="badge" style={{ background: 'rgba(43,58,85,0.1)', color: '#2b3a55', fontSize: '0.75rem' }}>{file.department}</span>
                                                        <span className="badge" style={{ background: 'rgba(196,161,107,0.15)', color: '#a38250', fontSize: '0.75rem' }}>{file.year}</span>
                                                    </div>
                                                </div>
                                                <button className="btn btn-sm btn-light text-danger shadow-sm ms-2" onClick={() => deleteFile(file.id)} style={{ borderRadius: '8px' }}>
                                                    <i className="bi bi-trash"></i>
                                                </button>
                                            </div>

                                            <p style={{ color: '#777', fontSize: '0.85rem', marginBottom: '15px', fontWeight: 500 }}>
                                                <i className="bi bi-journal-bookmark me-1" style={{ color: '#c4a16b' }}></i> {file.subject}
                                            </p>

                                            <div className="mt-auto d-flex justify-content-between align-items-center pt-3" style={{ borderTop: '1px solid rgba(0,0,0,0.05)' }}>
                                                <span style={{ color: '#888', fontSize: '0.8rem' }}><i className="bi bi-file-earmark-play-fill me-1"></i> {file.size}</span>
                                                <span className="text-success" style={{ fontWeight: 600, fontSize: '0.85rem' }}>
                                                    <i className="bi bi-cloud-check-fill me-1"></i> Syncing...
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            </div>

        <CircularMenu />
        
        </>
    )
}
