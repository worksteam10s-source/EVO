import { useState, useEffect } from 'react'

export default function GradesComponent() {
  const [grades, setGrades] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchGrades()
  }, [])

  const fetchGrades = async () => {
    try {
      // TODO: استبدل بـ API call الفعلي
      // const response = await fetch('/api/student/grades')
      // const data = await response.json()
      // setGrades(data)

      setGrades([
        { id: 1, subject: 'Data Science', sup: 20, mid: 40, final: null, grade: 'A+', percentage: 95 },
        { id: 2, subject: 'Data Engineering', sup: 15, mid: 37, final: null, grade: 'A', percentage: 90 },
        { id: 3, subject: 'AI', sup: 7.5, mid: 25, final: null, grade: 'B', percentage: 78 },
        { id: 4, subject: 'English 2', sup: 8.5, mid: 20, final: null, grade: 'A', percentage: 88 },
        { id: 5, subject: 'Web Application', sup: 18, mid: 25, final: null, grade: 'A', percentage: 92 },
        { id: 6, subject: 'Expert System', sup: 18.5, mid: 45, final: null, grade: 'A+', percentage: 96 },
      ])
    } catch (err) {
      console.error('Error:', err)
    } finally {
      setLoading(false)
    }
  }

  const getGradeColor = (grade) => {
    const colorMap = {
      'A+': 'bg-success',
      'A': 'bg-info',
      'B': 'bg-warning',
      'C': 'bg-secondary',
      'D': 'bg-danger',
      'F': 'bg-dark'
    }
    return colorMap[grade] || 'bg-secondary'
  }

  return (
    <>
      {loading ? (
        <div className="alert alert-info">Loading grades...</div>
      ) : (
        <>
          <h2 style={{color: '#6fc3ff', fontWeight: 'bold'}} className="mb-4">Current Semester Grades</h2>
          
          <div className="table-responsive">
            <table className="table table-dark table-hover text-white">
              <thead>
                <tr style={{borderBottom: '2px solid #6fc3ff'}}>
                  <th>Subject</th>
                  <th>Assignments</th>
                  <th>Midterm</th>
                  <th>Final</th>
                  <th>Percentage</th>
                  <th>Grade</th>
                </tr>
              </thead>
              <tbody>
                {grades.map((g) => (
                  <tr key={g.id}>
                    <td>{g.subject}</td>
                    <td>{g.sup}</td>
                    <td>{g.mid}</td>
                    <td>{g.final || '-'}</td>
                    <td>
                      <div className="progress" style={{height: '20px'}}>
                        <div 
                          className="progress-bar bg-info" 
                          style={{width: `${g.percentage}%`}}
                        >
                          {g.percentage}%
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className={`badge ${getGradeColor(g.grade)}`}>
                        {g.grade}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="alert alert-info mt-4">
            <h5>Note:</h5>
            <p>Final grades will be updated after final exams</p>
          </div>
        </>
      )}
    </>
  )
}
