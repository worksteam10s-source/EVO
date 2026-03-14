import { useState, useEffect } from 'react'
import { CalendarIcon } from '@/app/components/Icons'

export default function ActivitiesComponent() {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchActivities()
  }, [])

  const fetchActivities = async () => {
    try {
      // TODO: استبدل بـ API call الفعلي
      setActivities([
        { 
          id: 1, 
          title: 'Programming Competition', 
          date: '2024-03-15', 
          status: 'upcoming',
          category: 'Competitions',
          description: 'Programming competition on algorithms'
        },
        { 
          id: 2, 
          title: 'Guest Lecture - AI in Medicine', 
          date: '2024-03-10',
          status: 'completed',
          category: 'Guest Lectures',
          description: 'Lecture by AI specialist in medical field'
        },
        { 
          id: 3, 
          title: 'Workshop - Web Development', 
          date: '2024-03-20',
          status: 'upcoming',
          category: 'Workshops',
          description: 'Advanced workshops in web development'
        },
        { 
          id: 4, 
          title: 'Graduation Ceremony', 
          date: '2024-05-01',
          status: 'upcoming',
          category: 'Celebrations',
          description: 'Graduation celebration of current batch'
        },
      ])
    } catch (err) {
      console.error('Error:', err)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status) => {
    return status === 'upcoming' ? 'warning' : 'success'
  }

  const getStatusText = (status) => {
    return status === 'upcoming' ? 'Coming Soon' : 'Completed'
  }

  return (
    <>
      {loading ? (
        <div className="alert alert-info">Loading activities...</div>
      ) : (
        <>
          <h2 style={{color: '#6fc3ff', fontWeight: 'bold'}} className="mb-4">University Activities & Events</h2>
          
          <div className="row g-4">
            {activities.map((activity) => (
              <div key={activity.id} className="col-lg-6">
                <div style={{
                  background: 'rgba(255,255,255,0.05)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid #6fc3ff',
                  borderRadius: '8px',
                  padding: '20px'
                }}>
                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'start'}}>
                    <div>
                      <h5 style={{color: '#6fc3ff'}}>{activity.title}</h5>
                      <small style={{color: '#999'}}>Category: {activity.category}</small>
                    </div>
                    <span className={`badge bg-${getStatusColor(activity.status)}`}>
                      {getStatusText(activity.status)}
                    </span>
                  </div>
                  
                  <p style={{color: '#ccc', margin: '10px 0'}}>{activity.description}</p>
                  
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderTop: '1px solid #333',
                    paddingTop: '10px',
                    marginTop: '10px'
                  }}>
                    <small style={{color: '#999'}}><CalendarIcon size={13} color="#999" style={{marginRight: '4px'}} />{activity.date}</small>
                    <button className="btn btn-outline-info btn-sm">
                      Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {activities.length === 0 && (
            <div className="alert alert-info mt-4">
              No activities currently available
            </div>
          )}
        </>
      )}
    </>
  )
}
