'use client'

import { useState } from 'react'
import Header from '@/app/components/Header'

export default function FAQPage() {
  const [openFAQ, setOpenFAQ] = useState(null)

  const faqs = [
    {
      id: 1,
      question: 'ما هي متطلبات القبول في الجامعة؟',
      answer: 'للقبول في جامعة حلوان التكنولوجية الدولية، يجب أن تستوفي معايير الثانوية العامة والشروط المحددة من قبل الجامعة...',
    },
    {
      id: 2,
      question: 'كيف يمكنني التسجيل في المقررات؟',
      answer: 'يتم التسجيل في المقررات من خلال بوابة الطالب الإلكترونية خلال فترة التسجيل المحددة...',
    },
    {
      id: 3,
      question: 'ما هي رسوم الدراسة؟',
      answer: 'تختلف رسوم الدراسة حسب البرنامج والتخصص. يرجى الاتصال بقسم القبول والتسجيل للمزيد من المعلومات...',
    },
    {
      id: 4,
      question: 'كيف أطلب وثيقة رسمية؟',
      answer: 'يمكنك طلب الوثائق الرسمية من خلال بوابة الطالب أو زيارة مكتب التسجيل...',
    },
  ]

  const toggleFAQ = (id) => {
    setOpenFAQ(openFAQ === id ? null : id)
  }

  return (
    <>
      <Header />
      <div className="container-fluid p-4">
        <h1>Frequently Asked Questions</h1>

        <div id="div2">
          <h3 id="h3">FAQ</h3>
          <div id="div2-1">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                style={{
                  marginBottom: '20px',
                  borderBottom: '1px solid rgba(100, 200, 255, 0.2)',
                  paddingBottom: '15px',
                }}
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#64c8ff',
                    cursor: 'pointer',
                    fontSize: '1.1rem',
                    width: '100%',
                    textAlign: 'right',
                    padding: '10px 0',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  {faq.question}
                  <span>{openFAQ === faq.id ? '−' : '+'}</span>
                </button>
                {openFAQ === faq.id && (
                  <p style={{ marginTop: '10px', color: '#b0b0b0' }}>
                    {faq.answer}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
