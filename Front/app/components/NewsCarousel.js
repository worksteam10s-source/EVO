'use client'

import { useState, useEffect } from 'react'

const newsItems = [
  {
    id: 1,
    title: 'انطلاق دوري كرة القدم بجامعة حلوان التكنولوجية الدولية',
    description: 'أعلنت جامعة حلوان التكنولوجية الدولية عن انطلاق فعاليات دوري كرة القدم بالكلية التكنولوجية بالجامعة، وذلك وسط أجواء حماسية تسودها روح التحدي والمنافسة الشريفة...',
    image: 'https://scontent.fcai30-1.fna.fbcdn.net/v/t39.30808-6/588581100_122282123072230475_7139467767949960584_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=833d8c',
  },
  {
    id: 2,
    title: 'زيارة علمية للمتحف القومي للحضارة المصرية',
    description: 'في إطار حرص جامعة حلوان التكنولوجية الدولية على دمج الجانب النظري بالتطبيق العملي وتعزيز خبرات طلابها...',
    image: 'https://scontent.fcai30-1.fna.fbcdn.net/v/t39.30808-6/588578623_122281486874230475_7280104640963997059_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=833d8c',
  },
  {
    id: 3,
    title: '#عيد_ميلاد_سعيد ❤️',
    description: 'يتقدم الدكتور السيد قنديل، رئيس جامعة حلوان، بخالص التهاني وأطيب الأمنيات...',
    image: 'https://scontent.fcai30-1.fna.fbcdn.net/v/t39.30808-6/585282033_122280933524230475_2868047917925682163_n.jpg?stp=dst-jpg_s960x960_tt6&_nc_cat=106&ccb=1-7&_nc_sid=833d8c',
  },
]

export default function NewsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? newsItems.length - 1 : prevIndex - 1
    )
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === newsItems.length - 1 ? 0 : prevIndex + 1
    )
  }

  const goToSlide = (index) => {
    setCurrentIndex(index)
  }

  return (
    <div className="mzaCarousel">
      <h3 id="h3">News</h3>
      <div className="mzaCarousel-viewport">
        <div className="mzaCarousel-track">
          {newsItems.map((item, index) => (
            <article
              key={item.id}
              className={`mzaCarousel-slide ${index === currentIndex ? 'active' : ''}`}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${newsItems.length}`}
              style={{
                display: index === currentIndex ? 'block' : 'none',
              }}
            >
              <div
                className="mzaCard"
                style={{
                  backgroundImage: `url('${item.image}')`,
                }}
              >
                <header className="mzaCard-head mzaPar-1">
                  <h2 className="mzaCard-title">{item.title}</h2>
                </header>
                <p className="mzaCard-text mzaPar-2">{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="mzaCarousel-controls">
        <button
          className="mzaCarousel-prev"
          aria-label="Previous slide"
          onClick={goToPrevious}
          type="button"
        >
          ‹
        </button>
        <button
          className="mzaCarousel-next"
          aria-label="Next slide"
          onClick={goToNext}
          type="button"
        >
          ›
        </button>
      </div>

      <div
        className="mzaCarousel-pagination"
        role="tablist"
        aria-label="Slide navigation"
      >
        {newsItems.map((_, index) => (
          <button
            key={index}
            className={`pagination-dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            role="tab"
            aria-label={`Go to slide ${index + 1}`}
            aria-selected={index === currentIndex}
          />
        ))}
      </div>
    </div>
  )
}
