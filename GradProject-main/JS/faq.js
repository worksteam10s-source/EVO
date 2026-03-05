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