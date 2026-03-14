"use client";

import React, { useState } from "react";
import Header from '@/app/components/Header'
import CircularMenu from '@/app/components/CircularMenu'
import { FilterIcon } from '@/app/components/Icons'

export default function LibraryPage() {

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Departments from Home page
  const categories = [
    "All",
    "Data Science",
    "Cybersecurity",
    "Artificial Intelligence",
    "Mechatronics",
    "Electrical",
    "Mechanical",
    "Production & Industrial",
    "Energy",
    "Operation & Maintenance"
  ];

  const books = [
    {
      id: 1,
      title: "AI World",
      category: "Artificial Intelligence",
      image: "/Pics/1.jpg",
      readUrl:
        "https://docs.google.com/viewerng/viewer?hl=ar&t=19&url=https://www.alarabimag.com/books/22375.pdf",
      downloadUrl: "#",
    },
    {
      id: 2,
      title: "Artificial Intelligence",
      category: "Artificial Intelligence",
      image: "/Pics/2.jpg",
      readUrl: "#",
      downloadUrl: "#",
    },
    {
      id: 3,
      title: "Cyber Security Guide",
      category: "Cybersecurity",
      image: "/Pics/3.jpg",
      readUrl: "#",
      downloadUrl: "#",
    },
    {
      id: 4,
      title: "Data Science Fundamentals",
      category: "Data Science",
      image: "/Pics/4.jpg",
      readUrl: "#",
      downloadUrl: "#",
    },
    {
      id: 5,
      title: "Creative Autoronics",
      category: "Electrical",
      image: "/Pics/5.jpg",
      readUrl: "#",
      downloadUrl: "#",
    },
    {
      id: 6,
      title: "Mechatronic Systems",
      category: "Mechatronics",
      image: "/Pics/6.jpg",
      readUrl: "#",
      downloadUrl: "#",
    },
  ];

  const filteredBooks = books.filter((book) => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <Header title="University Library" />
      <div
        style={{
          minHeight: "100vh",
          backgroundImage: "url('/Pics/backlogo.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "40px",
        }}
      >


      {/* Search & Filter */}

      <div style={{ display: "flex", justifyContent: "center", marginBottom: "50px", position: "relative" }}>

        <div style={{ position: "relative", display: "flex", gap: "12px", alignItems: "center" }}>
          
          <input
            type="text"
            placeholder="Search books..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              padding: "14px 20px",
              width: "380px",
              borderRadius: "30px",
              border: "none",
              outline: "none",
              fontSize: "16px",
              boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
              background: "rgba(255,255,255,0.9)",
            }}
          />

          {/* Filter Button */}
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              border: "none",
              background: isFilterOpen ? "linear-gradient(90deg,#0b3a6e,#1a5fa8)" : "white",
              color: isFilterOpen ? "white" : "#0b3a6e",
              boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "0.3s",
              position: "relative",
            }}
            title="Filter by Category"
          >
            {/* FilterIcon from Icons.js */}
            <FilterIcon size={22} color={isFilterOpen ? "white" : "#0b3a6e"} />
            
            {/* Notification Dot if active */}
            {selectedCategory !== "All" && (
              <span style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#e4bd63",
                boxShadow: "0 0 5px rgba(228,189,99,0.8)"
              }}></span>
            )}
          </button>

          {/* Dropdown Menu */}
          {isFilterOpen && (
            <div style={{
              position: "absolute",
              top: "100%",
              right: "0",
              marginTop: "15px",
              background: "white",
              borderRadius: "15px",
              padding: "10px",
              width: "250px",
              boxShadow: "0 15px 40px rgba(0,0,0,0.2)",
              zIndex: 100,
              display: "flex",
              flexDirection: "column",
              gap: "4px",
            }}>
              <div style={{ padding: "8px 12px", fontSize: "12px", fontWeight: "bold", color: "#888", borderBottom: "1px solid #eee", marginBottom: "5px" }}>
                FILTER BY DEPARTMENT
              </div>
              {categories.map((cat) => (
                <div
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setIsFilterOpen(false);
                  }}
                  style={{
                    padding: "10px 15px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontSize: "14px",
                    color: selectedCategory === cat ? "white" : "#333",
                    background: selectedCategory === cat ? "#0b3a6e" : "transparent",
                    transition: "0.2s",
                  }}
                  onMouseEnter={(e) => {
                    if (selectedCategory !== cat) e.currentTarget.style.background = "#f0f5fa";
                  }}
                  onMouseLeave={(e) => {
                    if (selectedCategory !== cat) e.currentTarget.style.background = "transparent";
                  }}
                >
                  {cat}
                </div>
              ))}
            </div>
          )}

        </div>
      </div>


      {/* Books Grid */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,240px)",
          gap: "35px",
          justifyContent: "center",
        }}
      >

        {filteredBooks.map((book) => (

          <div
            key={book.id}
            style={{
              background: "rgba(255,255,255,0.85)",
              backdropFilter: "blur(10px)",
              borderRadius: "18px",
              textAlign: "center",
              boxShadow: "0 15px 30px rgba(0,0,0,0.2)",
              transition: "transform 0.3s, box-shadow 0.3s",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 15px 30px rgba(0,0,0,0.2)";
            }}
          >

            {/* Book Cover Full Width */}
            <div style={{ width: "100%", height: "220px", overflow: "hidden" }}>
              <img
                src={book.image}
                alt={book.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>

            {/* Card Content with Padding */}
            <div style={{ padding: "20px", flex: 1, display: "flex", flexDirection: "column" }}>
              <h3 style={{ color: "#0b3a6e", marginBottom: "auto", fontSize: "1.2rem", fontWeight: "bold" }}>
                {book.title}
              </h3>

              <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "20px" }}>

                {book.id === 1 ? (
                  <a href={book.readUrl} target="_blank" rel="noreferrer" style={{flex: 1}}>
                    <button style={{...readBtn, width: '100%'}}>
                      Read
                    </button>
                  </a>
                ) : (
                  <button style={{...readBtn, flex: 1}}>
                    Read
                  </button>
                )}

                <button style={{...downloadBtn, flex: 1}}>
                  Download
                </button>

              </div>
            </div>

          </div>

        ))}

      </div>


      </div>
      <CircularMenu />
    </>
  );
}

const readBtn = {
  background: "#0b3a6e",
  color: "white",
  border: "none",
  padding: "9px 16px",
  borderRadius: "20px",
  cursor: "pointer",
};

const downloadBtn = {
  background: "linear-gradient(90deg,#caa13c,#e4bd63)",
  color: "white",
  border: "none",
  padding: "9px 16px",
  borderRadius: "20px",
  cursor: "pointer",
};

