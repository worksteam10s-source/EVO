import { useState, useEffect } from 'react'

export default function PaymentsComponent() {
  const [payments, setPayments] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPayments()
  }, [])

  const fetchPayments = async () => {
    try {
      // TODO: استبدل بـ API call الفعلي
      setPayments({
        totalTuition: 50000,
        totalPaid: 35000,
        balance: 15000,
        paymentMethod: 'Credit Card',
        semester: 'Spring 2023-2024',
        invoices: [
          {
            id: 1,
            description: 'Spring Semester Fees',
            amount: 25000,
            dueDate: '2024-02-01',
            status: 'paid',
            paidDate: '2024-01-30'
          },
          {
            id: 2,
            description: 'Laboratory and Practical Fees',
            amount: 10000,
            dueDate: '2024-02-15',
            status: 'paid',
            paidDate: '2024-02-14'
          },
          {
            id: 3,
            description: 'Student Activities & Services',
            amount: 5000,
            dueDate: '2024-03-01',
            status: 'pending',
            paidDate: null
          },
          {
            id: 4,
            description: 'Insurance & Health Coverage',
            amount: 10000,
            dueDate: '2024-03-15',
            status: 'pending',
            paidDate: null
          },
        ]
      })
    } catch (err) {
      console.error('Error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handlePayment = (invoiceId) => {
    alert(`Processing payment for invoice ${invoiceId}`)
  }

  const getStatusBadge = (status) => {
    return status === 'paid' ? 'bg-success' : 'bg-warning'
  }

  const getStatusText = (status) => {
    return status === 'paid' ? 'Paid' : 'Pending'
  }

  return (
    <>
      {loading ? (
        <div className="alert alert-info">Loading payment information...</div>
      ) : payments ? (
        <>
          <h2 style={{color: '#6fc3ff', fontWeight: 'bold'}} className="mb-2">Financial Record</h2>
          <p style={{color: '#999'}} className="mb-4">Semester: {payments.semester}</p>

          <div className="row g-4 mb-5">
            <div className="col-md-4">
              <div style={{
                background: 'rgba(255,255,255,0.05)',
                backdropFilter: 'blur(10px)',
                border: '2px solid #6fc3ff',
                borderRadius: '8px',
                padding: '20px',
                textAlign: 'center'
              }}>
                <h4 style={{color: '#ccc'}}>Total Tuition</h4>
                <h2 style={{color: '#6fc3ff'}}>₪{payments.totalTuition}</h2>
              </div>
            </div>

            <div className="col-md-4">
              <div style={{
                background: 'rgba(255,255,255,0.05)',
                backdropFilter: 'blur(10px)',
                border: '2px solid #99ff99',
                borderRadius: '8px',
                padding: '20px',
                textAlign: 'center'
              }}>
                <h4 style={{color: '#ccc'}}>Amount Paid</h4>
                <h2 style={{color: '#99ff99'}}>₪{payments.totalPaid}</h2>
              </div>
            </div>

            <div className="col-md-4">
              <div style={{
                background: 'rgba(255,255,255,0.05)',
                backdropFilter: 'blur(10px)',
                border: '2px solid #ff6b6b',
                borderRadius: '8px',
                padding: '20px',
                textAlign: 'center'
              }}>
                <h4 style={{color: '#ccc'}}>Remaining Balance</h4>
                <h2 style={{color: '#ff6b6b'}}>₪{payments.balance}</h2>
              </div>
            </div>
          </div>

          <h3 style={{color: '#6fc3ff'}} className="mb-3">Invoices & Payments</h3>
          <div className="table-responsive">
            <table className="table table-dark table-hover">
              <thead>
                <tr style={{borderBottom: '2px solid #6fc3ff'}}>
                  <th>Description</th>
                  <th>Amount</th>
                  <th>Due Date</th>
                  <th>Status</th>
                  <th>Payment Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {payments.invoices.map((invoice) => (
                  <tr key={invoice.id}>
                    <td style={{color: '#ccc'}}>{invoice.description}</td>
                    <td style={{color: '#6fc3ff', fontWeight: 'bold'}}>₪{invoice.amount}</td>
                    <td style={{color: '#999'}}>{invoice.dueDate}</td>
                    <td>
                      <span className={`badge ${getStatusBadge(invoice.status)}`}>
                        {getStatusText(invoice.status)}
                      </span>
                    </td>
                    <td style={{color: '#999'}}>
                      {invoice.paidDate ? invoice.paidDate : '-'}
                    </td>
                    <td>
                      {invoice.status === 'pending' ? (
                        <button 
                          className="btn btn-sm btn-outline-info"
                          onClick={() => handlePayment(invoice.id)}
                        >
                          Pay Now
                        </button>
                      ) : (
                        <button className="btn btn-sm btn-outline-secondary" disabled>
                          Paid
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="alert alert-info mt-4">
            <h5>Important Information:</h5>
            <ul style={{marginBottom: '0'}}>
              <li>You can pay via credit card or bank transfer</li>
              <li>Payment receipt will be sent via email</li>
              <li>Late payment may result in study suspension</li>
            </ul>
          </div>
        </>
      ) : null}
    </>
  )
}
