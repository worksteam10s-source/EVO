'use client'

import { useState } from 'react'
import Header from '@/app/components/Header'

export default function LoginPage() {
  const [formData, setFormData] = useState({
    id: '',
    password: '',
    rememberMe: false,
  })
  const [message, setMessage] = useState('')

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.id && formData.password) {
      setMessage({
        type: 'success',
        text: `Welcome back! Logged in as ${formData.id}`,
      })
      // Here you would normally call an API to authenticate
      setTimeout(() => setMessage(''), 3000)
    } else {
      setMessage({
        type: 'error',
        text: 'Please fill in all fields',
      })
    }
  }

  const handleGoogleLogin = () => {
    setMessage({
      type: 'info',
      text: 'Google login functionality coming soon',
    })
  }

  return (
    <>
      <Header />
      <div id="bgimg">
        <img src="/Pics/BGPIC.png" alt="Background" />
      </div>

      <div className="container-fluid justify-content-between">
        <div className="d-flex justify-content-between" id="div1-1">
          <img src="/Pics/Evo.png" id="EVO" alt="EVO Logo" />

          <div className="container-fluid d-flex flex-column gap-3" id="div1-3">
            <h1 id="h11">Login Page</h1>

            {message && (
              <div
                className={`alert alert-${
                  message.type === 'success'
                    ? 'success'
                    : message.type === 'error'
                      ? 'danger'
                      : 'info'
                }`}
              >
                {message.text}
              </div>
            )}

            <form onSubmit={handleSubmit} id="form1">
              <input
                type="text"
                name="id"
                placeholder="Enter Your ID"
                value={formData.id}
                onChange={handleChange}
              />

              <input
                type="password"
                name="password"
                placeholder="Enter Your Password"
                value={formData.password}
                onChange={handleChange}
              />

              <div style={{ marginBottom: '15px' }}>
                <label>
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                  />{' '}
                  Remember Me
                </label>
              </div>

              <button type="submit" id="Loginbtn">
                Login
              </button>
            </form>

            <button id="google" onClick={handleGoogleLogin}>
              Login with Google
            </button>
          </div>

          <img src="/Pics/HITU.png" alt="HITU Logo" />
        </div>
      </div>
    </>
  )
}
