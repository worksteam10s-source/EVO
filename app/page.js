'use client'

import { useEffect } from 'react'
import NewsCarousel from './components/NewsCarousel'
import Header from './components/Header'

export default function Home() {
  useEffect(() => {
    // Cursor Glow
    const handleMouseMove = (e) => {
      const glow = document.getElementById('cursor-glow')
      if (glow) {
        glow.style.left = e.clientX + 'px'
        glow.style.top = e.clientY + 'px'
      }
    }

    document.addEventListener('mousemove', handleMouseMove)
    return () => document.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <main>
      <Header />
      
      <div className="container-fluid p-3" id="div2">
        <h3 id="h3">Introduction</h3>
        <div className="container-fluid p-4" id="div2-1">
          <h3>Helwan International Technical University</h3>
          <p>
            جامعة حلوان التكنولوجية الدولية هي إحدى الجامعات التكنولوجية الحكومية الحديثة في مصر، وتعمل على تقديم تعليم تطبيقي يجمع بين الدراسة النظرية والتدريب العملي داخل المعامل والورش المتخصصة. تهدف الجامعة إلى تأهيل خريجين قادرين على مواكبة التطور الصناعي والتكنولوجي، وتلبية احتياجات سوق العمل المحلّي والإقليمي من الفنيين والمهندسين التطبيقيين بمستوى احترافي.
          </p>
          <p>
            تتميز الجامعة بأنها تركّز على التعليم القائم على المهارات العملية، وتُتيح للطلاب فرص تدريب داخل المصانع والشركات، مما يعزز جاهزيتهم للعمل فور التخرج. كما تعتمد الجامعة مناهج حديثة تتماشى مع التطورات العالمية في المجالات التكنولوجية.
          </p>
        </div>
      </div>

      <NewsCarousel />
    </main>
  )
}
