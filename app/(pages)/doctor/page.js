'use client'

import Header from '@/app/components/Header'

export default function DoctorPage() {
  const doctors = [
    {
      id: 1,
      name: 'Dr. Ahmed Mohamed',
      position: 'School Director',
      department: 'Administration',
      email: 'ahmed@hitu.edu.eg',
    },
    {
      id: 2,
      name: 'Dr. Fatima Hassan',
      position: 'Department Head',
      department: 'Technology',
      email: 'fatima@hitu.edu.eg',
    },
    {
      id: 3,
      name: 'Dr. Mohammad Ali',
      position: 'Instructor',
      department: 'Engineering',
      email: 'mohammad@hitu.edu.eg',
    },
  ]

  return (
    <>
      <Header />
      <div className="container-fluid p-4">
        <h1>Faculty & Administration</h1>

        <div id="div2">
          <h3 id="h3">Meet Our Faculty</h3>
          <div id="div2-1">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
              {doctors.map((doctor) => (
                <div
                  key={doctor.id}
                  style={{
                    padding: '20px',
                    backgroundColor: 'rgba(100, 200, 255, 0.05)',
                    border: '1px solid rgba(100, 200, 255, 0.2)',
                    borderRadius: '8px',
                  }}
                >
                  <h4>{doctor.name}</h4>
                  <p style={{ color: '#64c8ff', marginBottom: '10px' }}>
                    {doctor.position}
                  </p>
                  <p style={{ color: '#b0b0b0', marginBottom: '10px' }}>
                    {doctor.department}
                  </p>
                  <p>
                    <a href={`mailto:${doctor.email}`}>{doctor.email}</a>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
