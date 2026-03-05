const searchInput = document.getElementById('faqSearch');
const faqContainer = document.getElementById('faqContainer');
const faqBoxes = document.querySelectorAll('.faq-box');
const noResults = document.getElementById('noResults');
const searchResults = document.getElementById('searchResults');

// Collect all FAQ items data
const faqData = Array.from(faqBoxes).map((box, index) => ({
  element: box,
  index: index,
  question: box.querySelector('.question span').textContent,
  answer: box.querySelector('.answer').textContent
}));

// Search functionality
searchInput.addEventListener('input', function(e) {
  const searchTerm = e.target.value.trim().toLowerCase();

  if (searchTerm === '') {
    // Show all items when search is empty
    faqBoxes.forEach(box => {
      box.classList.remove('hidden', 'highlighted');
      closeAnswer(box);
    });
    searchResults.innerHTML = '';
    noResults.classList.add('d-none');
    return;
  }

  let matchedItems = [];
  faqBoxes.forEach(box => {
    const questionText = box.querySelector('.question span').textContent.toLowerCase();
    const answerText = box.querySelector('.answer').textContent.toLowerCase();
    
    if (questionText.includes(searchTerm) || answerText.includes(searchTerm)) {
      box.classList.remove('hidden');
      box.classList.add('highlighted');
      matchedItems.push({
        question: box.querySelector('.question span').textContent,
        element: box
      });
    } else {
      box.classList.add('hidden');
    }
  });

  // Show search results dropdown
  if (matchedItems.length > 0) {
    searchResults.innerHTML = matchedItems.map((item, i) => `
      <div class="search-result-item" data-index="${i}">
        ${highlightText(item.question, searchTerm)}
      </div>
    `).join('');

    // Add click handlers to search results
    document.querySelectorAll('.search-result-item').forEach(item => {
      item.addEventListener('click', function() {
        const index = this.dataset.index;
        matchedItems[index].element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        toggleAnswer(matchedItems[index].element);
      });
    });

    noResults.classList.add('d-none');
  } else {
    searchResults.innerHTML = '';
    noResults.classList.remove('d-none');
  }
});

// Highlight matching text
function highlightText(text, searchTerm) {
  const regex = new RegExp(`(${searchTerm})`, 'gi');
  return text.replace(regex, '<span class="highlight">$1</span>');
}

// Toggle answer function
function toggleAnswer(box) {
  const answer = box.querySelector('.answer');
  const icon = box.querySelector('.toggle-icon');
  const isOpen = answer.style.display === 'block';

  // Close all other answers
  document.querySelectorAll('.faq-box').forEach(item => {
    if (item !== box && !item.classList.contains('hidden')) {
      const otherAnswer = item.querySelector('.answer');
      const otherIcon = item.querySelector('.toggle-icon');
      otherAnswer.style.display = 'none';
      otherIcon.textContent = '▼';
      otherAnswer.classList.remove('show');
    }
  });

  // Toggle current answer
  if (isOpen) {
    answer.style.display = 'none';
    icon.textContent = '▼';
    answer.classList.remove('show');
  } else {
    answer.style.display = 'block';
    icon.textContent = '▲';
    answer.classList.add('show');
  }
}

// Close answer helper
function closeAnswer(box) {
  const answer = box.querySelector('.answer');
  const icon = box.querySelector('.toggle-icon');
  answer.style.display = 'none';
  icon.textContent = '▼';
  answer.classList.remove('show');
}

// Initialize Bootstrap tooltips
document.addEventListener('DOMContentLoaded', function() {
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.map(function(tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });
});

// Add click effect to icons
document.querySelectorAll('.icon-box').forEach(icon => {
  icon.addEventListener('click', function() {
    this.style.transform = 'scale(1.15) rotate(5deg)';
    setTimeout(() => {
      this.style.transform = 'scale(1)';
    }, 300);
  });
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
  // Ctrl/Cmd + K to focus search
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    searchInput.focus();
  }
  // Escape to clear search
  if (e.key === 'Escape') {
    searchInput.value = '';
    searchInput.dispatchEvent(new Event('input'));
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('faqSearch');
  const searchResults = document.getElementById('searchResults');
  const bookCards = Array.from(document.querySelectorAll('.book-card'));

  if (!searchInput || bookCards.length === 0) return;

  // حفظ العناوين الأصلية
  bookCards.forEach(card => {
    const h = card.querySelector('h3');
    if (h) card.dataset.title = h.textContent.trim();
  });

  searchInput.addEventListener('input', (e) => {
    const q = e.target.value.trim().toLowerCase();
    if (!q) {
      // إظهار كل الكتب وإزالة التظليل والنتائج
      bookCards.forEach(card => {
        card.style.display = '';
        restoreTitle(card);
      });
      if (searchResults) searchResults.innerHTML = '';
      return;
    }

    const matches = [];
    bookCards.forEach(card => {
      const title = (card.dataset.title || '').toLowerCase();
      if (title.includes(q)) {
        card.style.display = '';
        highlightTitle(card, q);
        matches.push(card);
      } else {
        card.style.display = 'none';
      }
    });

    renderResults(matches);
  });

  function renderResults(matches) {
    if (!searchResults) return;
    if (matches.length === 0) {
      searchResults.innerHTML = '<div class="px-3 py-2 text-white-50">No results</div>';
      return;
    }
    searchResults.innerHTML = matches.map((card, i) => {
      return `<div class="search-result-item px-3 py-2" data-index="${i}" style="cursor:pointer;border-bottom:1px solid rgba(255,255,255,0.06)">${escapeHtml(card.dataset.title)}</div>`;
    }).join('');

    // ربط النقرات على نتائج البحث
    Array.from(searchResults.querySelectorAll('.search-result-item')).forEach(el => {
      el.addEventListener('click', () => {
        const idx = +el.dataset.index;
        const card = matches[idx];
        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        focusCard(card);
      });
    });
  }

  function highlightTitle(card, q) {
    const h = card.querySelector('h3');
    const original = card.dataset.title || '';
    const regex = new RegExp(escapeRegExp(q), 'ig');
    h.innerHTML = original.replace(regex, m => `<mark style="background:rgba(255,255,0,0.35);color:#000;padding:0 2px;border-radius:3px">${m}</mark>`);
  }

  function restoreTitle(card) {
    const h = card.querySelector('h3');
    if (h && card.dataset.title) h.textContent = card.dataset.title;
  }

  function focusCard(card) {
    const prev = card.style.boxShadow;
    card.style.transition = 'box-shadow 0.25s, transform 0.25s';
    card.style.boxShadow = '0 10px 30px rgba(0,0,0,0.6)';
    card.style.transform = 'translateY(-6px)';
    setTimeout(() => {
      card.style.boxShadow = prev || '';
      card.style.transform = '';
    }, 900);
  }

  function escapeRegExp(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function escapeHtml(unsafe) {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
});