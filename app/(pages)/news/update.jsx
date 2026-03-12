import NewsCard from "@/app/components/NewsCard";

const news = [
  {
    id: 1,
    title: "HITU Robotics Team Wins Competition",
    date: "20 April 2025",
    image: "/images/news1.jpg",
    description: "The robotics team at HITU won the national robotics competition."
  },
  {
    id: 2,
    title: "New Scholarship Announcement",
    date: "18 April 2025",
    image: "/images/news2.jpg",
    description: "HITU announces new scholarships for outstanding students."
  },
  {
    id: 3,
    title: "Technology Conference 2025",
    date: "15 April 2025",
    image: "/images/news3.jpg",
    description: "HITU hosts international technology conference."
  }
];

export default function NewsPage() {
  return (
    <div className="newsPage">

      <section className="hero">
        <h1>HITU Campus News</h1>
        <p>Latest news and announcements from Helwan International Technological University</p>
      </section>

      <section className="newsGrid">
        {news.map((item) => (
          <NewsCard key={item.id} news={item} />
        ))}
      </section>

    </div>
  );
}