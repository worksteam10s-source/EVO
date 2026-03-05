'use client'

import Header from '@/app/components/Header'

export default function ControlPage() {
  return (
    <>
      <Header />
      <div className="container-fluid p-4">
        <h1>Control Panel</h1>

        <div id="div2">
          <h3 id="h3">Administration Control Panel</h3>
          <div id="div2-1">
            <p>Access administrative functions and manage system settings.</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '30px' }}>
              <div
                style={{
                  padding: '20px',
                  backgroundColor: 'rgba(100, 200, 255, 0.1)',
                  border: '1px solid rgba(100, 200, 255, 0.3)',
                  borderRadius: '8px',
                  textAlign: 'center',
                }}
              >
                <h4>User Management</h4>
                <p>Manage user accounts and permissions</p>
                <button>Manage Users</button>
              </div>

              <div
                style={{
                  padding: '20px',
                  backgroundColor: 'rgba(255, 107, 107, 0.1)',
                  border: '1px solid rgba(255, 107, 107, 0.3)',
                  borderRadius: '8px',
                  textAlign: 'center',
                }}
              >
                <h4>System Settings</h4>
                <p>Configure system parameters</p>
                <button>Settings</button>
              </div>

              <div
                style={{
                  padding: '20px',
                  backgroundColor: 'rgba(100, 200, 255, 0.1)',
                  border: '1px solid rgba(100, 200, 255, 0.3)',
                  borderRadius: '8px',
                  textAlign: 'center',
                }}
              >
                <h4>Reports</h4>
                <p>View analytics and reports</p>
                <button>View Reports</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
