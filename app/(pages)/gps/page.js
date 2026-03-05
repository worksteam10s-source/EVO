'use client'

import Header from '@/app/components/Header'

export default function GPSPage() {
  return (
    <>
      <Header />
      <div className="container-fluid p-4">
        <h1>Campus GPS & Map</h1>

        <div id="div2">
          <h3 id="h3">Find Your Way Around Campus</h3>
          <div id="div2-1">
            <p>
              Our interactive campus map will help you navigate and find important
              locations including classrooms, libraries, cafeterias, and more.
            </p>

            <div
              style={{
                backgroundColor: 'rgba(100, 200, 255, 0.1)',
                border: '1px solid rgba(100, 200, 255, 0.3)',
                borderRadius: '8px',
                padding: '40px',
                textAlign: 'center',
                marginTop: '20px',
                minHeight: '400px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div>
                <p>Interactive Map Coming Soon</p>
                <p style={{ fontSize: '0.9rem', color: '#b0b0b0' }}>
                  Campus map and GPS functionality will be available soon
                </p>
              </div>
            </div>

            <h4 style={{ marginTop: '30px' }}>Important Locations</h4>
            <ul style={{ color: '#b0b0b0' }}>
              <li>Main Building - Admin & Academic Offices</li>
              <li>Library - Study & Research Center</li>
              <li>Cafeteria - Student Services</li>
              <li>Laboratory Complex - Practical Training</li>
              <li>Sports Complex - Student Activities</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
