'use client'

import Header from '@/app/components/Header'

export default function StudentPage() {
  return (
    <>
      <Header />
      <div className="container-fluid p-4">
        <h1>Student Dashboard</h1>
        <p>Welcome to your student portal. This page is under construction.</p>
        
        <div id="div2">
          <h3 id="h3">Features Coming Soon</h3>
          <div id="div2-1">
            <h4>Academic Information</h4>
            <p>View your courses, grades, and academic progress</p>
            
            <h4>Course Registration</h4>
            <p>Register for courses and manage your schedule</p>
            
            <h4>Document Request</h4>
            <p>Request official documents and certificates</p>
            
            <h4>Messages</h4>
            <p>Communicate with your instructors and advisors</p>
          </div>
        </div>
      </div>
    </>
  )
}
