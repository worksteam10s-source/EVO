'use client'

import Header from '@/app/components/Header'

export default function NewsPage() {
  const newsList = [
    {
      id: 1,
      title: 'انطلاق دوري كرة القدم',
      date: '2024-03-01',
      content: 'أعلنت جامعة حلوان التكنولوجية الدولية عن انطلاق فعاليات دوري كرة القدم...',
    },
    {
      id: 2,
      title: 'زيارة علمية للمتحف القومي',
      date: '2024-02-28',
      content: 'في إطار حرص جامعة حلوان التكنولوجية الدولية على دمج الجانب النظري...',
    },
    {
      id: 3,
      title: 'تكريم الطلاب المتميزين',
      date: '2024-02-25',
      content: 'تم تكريم الطلاب المتميزين في برنامج خاص...',
    },
  ]

  return (
    <>
      <Header />
      <div className="container-fluid p-4">
        <h1>Latest News</h1>

        <div id="div2">
          <h3 id="h3">University News</h3>
          <div id="div2-1">
            {newsList.map((news) => (
              <article key={news.id} style={{ marginBottom: '30px', paddingBottom: '30px', borderBottom: '1px solid rgba(100, 200, 255, 0.2)' }}>
                <h3>{news.title}</h3>
                <p style={{ color: '#64c8ff', fontSize: '0.9rem' }}>{news.date}</p>
                <p>{news.content}</p>
                <a href="#">Read more →</a>
              </article>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
