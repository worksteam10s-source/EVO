'use client'

import { useState } from 'react'

export default function LoginPage() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })
  const [message, setMessage] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.username && formData.password) {
      setMessage({
        type: 'success',
        text: `Welcome! Logged in as ${formData.username}`,
      })
      setTimeout(() => setMessage(''), 3000)
    } else {
      setMessage({
        type: 'error',
        text: 'Please fill in all fields',
      })
    }
  }

  const handleLearnMore = () => {
    alert('Learn more about HITU coming soon!')
  }

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: "Segoe UI", Tahoma, sans-serif;
        }

        .container {
          width: 1200px;
          height: 600px;
          display: flex;
          border-radius: 15px;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
          background-image: url("/Pics/backlogo.png");
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          flex-direction: row-reverse;
        }

        .left-section {
          flex: 1;
          color: white;
          padding: 60px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding-right: 100px;
        }

        .logo {
          width: 180px;
          margin-bottom: 20px;
          margin-right: 40px;
        }

        .left-section h1 {
          font-size: 52px;
          font-weight: 800;
          margin-bottom: 20px;
          text-shadow: 2px 2px 10px rgba(0,0,0,0.6);
        }

        .left-section p {
          font-size: 18px;
          font-weight: 500;
          line-height: 1.8;
          width: 85%;
          margin-bottom: 35px;
          text-shadow: 1px 1px 8px rgba(0,0,0,0.6);
        }

        .learn-btn {
          background: linear-gradient(90deg, #caa13c, #e4bd63);
          border: none;
          padding: 12px 30px;
          color: white;
          border-radius: 25px;
          font-size: 16px;
          cursor: pointer;
          width: 160px;
        }

        .login-box {
          width: 320px;
          height: auto;
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          padding: 35px;
          border-radius: 15px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          margin: auto 40px;
        }

        .login-box h2 {
          color: #0b3a6e;
          font-size: 28px;
          margin-bottom: 25px;
          text-align: center;
        }

        .login-box input {
          width: 100%;
          padding: 12px 15px;
          margin-bottom: 15px;
          border: none;
          border-radius: 25px;
          background: rgba(255, 255, 255, 0.8);
          outline: none;
          font-size: 14px;
        }

        .login-btn {
          margin-top: 10px;
          padding: 12px;
          border: none;
          border-radius: 30%;
          background: linear-gradient(90deg, #caa13c, #e4bd63);
          color: white;
          font-size: 16px;
          cursor: pointer;
          font-weight: bold;
          width: 100%;
        }

        .login-btn:hover {
          opacity: 0.9;
        }

        .learn-btn:hover {
          opacity: 0.9;
        }
      `}</style>

      <div
        style={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: 0,
          padding: 0,
        }}
      >
        <div className="container">

          {/* Left Section */}
          <div
            className="left-section"
            style={{
              backgroundImage: "url('/Pics/logoHITU.png')",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "400px",  // Enlarged logo
            }}
          >
            <h1>Welcome to HITU</h1>
            <p>
              Your gateway to innovation, learning, and academic excellence. Please log in to
              continue
            </p>
            <button onClick={() => window.location.href = '/'} className="learn-btn">
              Learn More
            </button>
          </div>

          {/* Login Box */}
          <div className="login-box">
            <h2>Sign In</h2>

            {message && (
              <div
                style={{
                  marginBottom: '15px',
                  padding: '10px',
                  background: message.type === 'success' ? '#d4edda' : '#f8d7da',
                  color: message.type === 'success' ? '#155724' : '#721c24',
                  borderRadius: '5px',
                  width: '100%',
                  textAlign: 'center',
                  fontSize: '14px',
                }}
              >
                {message.text}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              style={{ width: '100%', display: 'flex', flexDirection: 'column' }}
            >
              <input
                type="text"
                name="username"
                placeholder="User Name"
                value={formData.username}
                onChange={handleChange}
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />

              <button type="submit" className="login-btn">
                Login
              </button>
            </form>
          </div>

        </div>
      </div>
    </>
  )
}