'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { SendIcon, PaperclipIcon, FileTextIcon, ArrowLeftIcon } from '@/app/components/Icons'

export default function LiveLecturePage() {
  const params = useParams()
  const router = useRouter()
  const lectureId = params.id
  
  const [messages, setMessages] = useState([
    { id: 1, sender: 'Dr. Sherif Ibrahim', text: 'Welcome everyone! We will start in 5 minutes.', time: '1:55 PM', isInstructor: true },
    { id: 2, sender: 'Ahmed Ali', text: 'Hello doctor.', time: '1:56 PM', isInstructor: false },
    { id: 3, sender: 'Sara Mahmoud', text: 'Is the audio clear?', time: '1:58 PM', isInstructor: false },
  ])
  const [newMessage, setNewMessage] = useState('')

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    const message = {
      id: messages.length + 1,
      sender: 'You',
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isInstructor: false
    }

    setMessages([...messages, message])
    setNewMessage('')
  }

  return (
    <div className="container-fluid py-4" style={{ backgroundColor: '#1a1a2e', minHeight: '100vh', color: '#fff' }}>
      
      {/* Header section */}
      <div className="d-flex align-items-center mb-4" style={{ gap: '15px' }}>
        <button 
          onClick={() => router.back()} 
          style={{
            background: 'none',
            border: 'none',
            color: '#6fc3ff',
            display: 'flex',
            alignItems: 'center',
            fontSize: '1.2rem',
            padding: '5px'
          }}
        >
          <ArrowLeftIcon size={24} style={{ marginRight: '8px' }} />
          Back
        </button>
        <h2 style={{color: '#6fc3ff', fontWeight: 'bold', margin: '0'}}>
          Live Lecture: Mechatronics Systems
        </h2>
        <div style={{
          backgroundColor: '#ff6b6b',
          color: 'white',
          padding: '5px 15px',
          borderRadius: '20px',
          fontWeight: 'bold',
          marginLeft: 'auto',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          animation: 'pulse 2s infinite'
        }}>
          <div style={{ width: '10px', height: '10px', backgroundColor: '#fff', borderRadius: '50%' }}></div>
          LIVE
        </div>
      </div>

      <div className="row g-4 h-100">
        
        {/* Left Column: Video and Resources (8 cols) */}
        <div className="col-lg-8" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Video Player Area */}
          <div style={{
            backgroundColor: '#000',
            border: '1px solid #6fc3ff',
            borderRadius: '12px',
            overflow: 'hidden',
            aspectRatio: '16/9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
          }}>
            {/* Placeholder for Video Player */}
            <div style={{ textAlign: 'center', color: '#6fc3ff', opacity: '0.7' }}>
              <div style={{ fontSize: '4rem', marginBottom: '15px' }}>▶</div>
              <h4>Stream Starting Soon...</h4>
              <p>Waiting for Dr. Sherif Ibrahim to start the broadcast</p>
            </div>
            
            {/* Custom Controls Overlays */}
            <div style={{
              position: 'absolute',
              bottom: '0',
              left: '0',
              right: '0',
              padding: '15px',
              background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                <span style={{ color: '#fff' }}>00:05:21</span>
              </div>
              <div style={{ display: 'flex', gap: '15px' }}>
                {/* Volume, Fullscreen placeholders */}
                <div style={{ width: '20px', height: '20px', backgroundColor: '#fff', opacity: '0.8', borderRadius: '3px' }}></div>
                <div style={{ width: '20px', height: '20px', backgroundColor: '#fff', opacity: '0.8', borderRadius: '3px' }}></div>
              </div>
            </div>
          </div>

          {/* Instructor & Lecture Details */}
          <div style={{
            backgroundColor: '#162447',
            border: '1px solid #6fc3ff',
            borderRadius: '12px',
            padding: '20px',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
          }}>
            <div className="d-flex align-items-center mb-3" style={{ gap: '15px' }}>
              <img src="/Pics/logo.png" width="60" style={{ borderRadius: '50%', border: '2px solid #6fc3ff' }} alt="Instructor" />
              <div>
                <h4 style={{ margin: '0', color: '#c19a6b' }}>Dr. Sherif Ibrahim</h4>
                <span style={{ color: '#a0aec0' }}>Department of Mechatronics</span>
              </div>
            </div>
            <p style={{ color: '#e2e8f0', lineHeight: '1.6', marginBottom: '0' }}>
              In today's lecture, we will cover the fundamentals of intelligent feedback control loop designs and their modern industrial applications.
            </p>
          </div>

          {/* Attached Resources */}
          <div style={{
            backgroundColor: '#162447',
            border: '1px solid #6fc3ff',
            borderRadius: '12px',
            padding: '20px',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
          }}>
             <h5 style={{ color: '#6fc3ff', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
               <FileTextIcon size={20} /> Today's Materials
             </h5>
             <div style={{
               backgroundColor: '#1a1a2e',
               border: '1px solid rgba(111, 195, 255, 0.3)',
               borderRadius: '8px',
               padding: '15px',
               display: 'flex',
               justifyContent: 'space-between',
               alignItems: 'center',
               transition: 'all 0.3s ease'
             }} className="resource-item">
               <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                 <div style={{
                   backgroundColor: '#e53e3e',
                   color: '#fff',
                   padding: '10px',
                   borderRadius: '8px',
                   fontWeight: 'bold',
                   fontSize: '0.8rem'
                 }}>PDF</div>
                 <div>
                   <h6 style={{ margin: '0', color: '#fff' }}>Lecture_3_Feedback_Loops.pdf</h6>
                   <small style={{ color: '#a0aec0' }}>Uploaded at 1:50 PM • 2.4 MB</small>
                 </div>
               </div>
               <button style={{
                 backgroundColor: '#c19a6b',
                 color: '#fff',
                 border: 'none',
                 padding: '8px 16px',
                 borderRadius: '6px',
                 fontWeight: 'bold',
                 transition: 'transform 0.2s',
                 cursor: 'pointer'
               }}>
                 Download
               </button>
             </div>
          </div>

        </div>

        {/* Right Column: Chat (4 cols) */}
        <div className="col-lg-4">
          <div style={{
            backgroundColor: '#162447',
            border: '1px solid #6fc3ff',
            borderRadius: '12px',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
          }}>
            {/* Chat Header */}
            <div style={{
              padding: '15px 20px',
              borderBottom: '1px solid #6fc3ff',
              backgroundColor: 'rgba(26, 26, 46, 0.5)',
              borderTopLeftRadius: '12px',
              borderTopRightRadius: '12px'
            }}>
              <h5 style={{ margin: '0', color: '#6fc3ff' }}>Live Discussion</h5>
              <small style={{ color: '#a0aec0' }}>142 students watching</small>
            </div>

            {/* Chat Messages */}
            <div style={{
              flex: '1',
              padding: '20px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '15px',
              minHeight: '400px',
              maxHeight: '600px'
            }}>
              {messages.map(msg => (
                <div key={msg.id} style={{
                  alignSelf: msg.sender === 'You' ? 'flex-end' : 'flex-start',
                  maxWidth: '85%'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', paddingLeft: '4px', paddingRight: '4px' }}>
                    <small style={{ 
                      color: msg.isInstructor ? '#c19a6b' : '#6fc3ff', 
                      fontWeight: msg.isInstructor ? 'bold' : 'normal' 
                    }}>
                      {msg.sender} {msg.isInstructor && '🎓'}
                    </small>
                    <small style={{ color: '#64748b', fontSize: '0.7rem' }}>{msg.time}</small>
                  </div>
                  <div style={{
                    backgroundColor: msg.sender === 'You' ? '#2a4365' : (msg.isInstructor ? 'rgba(213, 157, 1, 0.2)' : '#1a1a2e'),
                    border: `1px solid ${msg.sender === 'You' ? '#4299e1' : (msg.isInstructor ? '#c19a6b' : '#2d3748')}`,
                    padding: '10px 15px',
                    borderRadius: '12px',
                    borderBottomRightRadius: msg.sender === 'You' ? '4px' : '12px',
                    borderBottomLeftRadius: msg.sender !== 'You' ? '4px' : '12px',
                    color: '#fff',
                    wordBreak: 'break-word'
                  }}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <div style={{
              padding: '15px',
              borderTop: '1px solid #6fc3ff',
              backgroundColor: 'rgba(26, 26, 46, 0.5)',
              borderBottomLeftRadius: '12px',
              borderBottomRightRadius: '12px'
            }}>
              <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: '10px', alignItems: 'flex-end' }}>
                <div style={{ flex: '1', position: 'relative' }}>
                  <input 
                    type="text" 
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    style={{
                      width: '100%',
                      backgroundColor: '#1a1a2e',
                      border: '1px solid #4a5568',
                      borderRadius: '8px',
                      padding: '12px 15px',
                      paddingRight: '40px',
                      color: '#fff',
                      outline: 'none',
                      transition: 'border-color 0.2s',
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#6fc3ff'}
                    onBlur={(e) => e.target.style.borderColor = '#4a5568'}
                  />
                  <button type="button" style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: '#a0aec0',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <PaperclipIcon size={18} />
                  </button>
                </div>
                <button 
                  type="submit"
                  disabled={!newMessage.trim()}
                  style={{
                    backgroundColor: newMessage.trim() ? '#c19a6b' : '#4a5568',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '12px 15px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: newMessage.trim() ? 'pointer' : 'not-allowed',
                    transition: 'background-color 0.2s'
                  }}
                >
                  <SendIcon size={18} />
                </button>
              </form>
            </div>

          </div>
        </div>

      </div>

      <style>{`
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(255, 107, 107, 0.7); }
          70% { box-shadow: 0 0 0 10px rgba(255, 107, 107, 0); }
          100% { box-shadow: 0 0 0 0 rgba(255, 107, 107, 0); }
        }
        .resource-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(111, 195, 255, 0.15);
          border-color: #6fc3ff !important;
        }
      `}</style>
    </div>
  )
}
