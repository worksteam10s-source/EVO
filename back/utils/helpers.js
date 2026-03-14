// ============================================
// HELPER UTILITY FUNCTIONS
// ============================================

// ============================================
// DATE & TIME UTILITIES
// ============================================

/**
 * Add minutes to a time string
 * @param {string} timeString - Time in HH:MM format
 * @param {number} minutes - Minutes to add
 * @returns {string} New time in HH:MM format
 */
const addMinutes = (timeString, minutes) => {
  const [hours, mins] = timeString.split(':').map(Number);
  const totalMinutes = hours * 60 + mins + minutes;
  const newHours = Math.floor(totalMinutes / 60) % 24;
  const newMins = totalMinutes % 60;
  return `${String(newHours).padStart(2, '0')}:${String(newMins).padStart(2, '0')}`;
};

/**
 * Calculate time difference in minutes
 * @param {string} startTime - Start time in HH:MM format
 * @param {string} endTime - End time in HH:MM format
 * @returns {number} Difference in minutes
 */
const getTimeDifferenceInMinutes = (startTime, endTime) => {
  const [startHour, startMin] = startTime.split(':').map(Number);
  const [endHour, endMin] = endTime.split(':').map(Number);
  
  const startMinutes = startHour * 60 + startMin;
  const endMinutes = endHour * 60 + endMin;
  
  return endMinutes - startMinutes;
};

/**
 * Check if a time is between two times
 * @param {string} time - Time to check
 * @param {string} startTime - Start time
 * @param {string} endTime - End time
 * @returns {boolean}
 */
const isTimeBetween = (time, startTime, endTime) => {
  const [hour, min] = time.split(':').map(Number);
  const [startHour, startMin] = startTime.split(':').map(Number);
  const [endHour, endMin] = endTime.split(':').map(Number);
  
  const timeMinutes = hour * 60 + min;
  const startMinutes = startHour * 60 + startMin;
  const endMinutes = endHour * 60 + endMin;
  
  return timeMinutes >= startMinutes && timeMinutes <= endMinutes;
};

/**
 * Get day name from day number
 * @param {number} dayNumber - 0 (Sunday) to 6 (Saturday)
 * @returns {string} Day name
 */
const getDayName = (dayNumber) => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[dayNumber] || 'Unknown';
};

/**
 * Format date to YYYY-MM-DD
 * @param {Date} date - Date object
 * @returns {string} Formatted date
 */
const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Get date range for next N days
 * @param {number} days - Number of days
 * @returns {Array} Array of date strings
 */
const getNextDays = (days = 7) => {
  const dates = [];
  const today = new Date();
  
  for (let i = 0; i < days; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    dates.push(formatDate(date));
  }
  
  return dates;
};

/**
 * Check if date is today
 * @param {string} dateString - Date in YYYY-MM-DD format
 * @returns {boolean}
 */
const isToday = (dateString) => {
  const today = formatDate(new Date());
  return dateString === today;
};

/**
 * Check if date is in the future
 * @param {string} dateString - Date in YYYY-MM-DD format
 * @returns {boolean}
 */
const isFutureDate = (dateString) => {
  const date = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date > today;
};

// ============================================
// PRICE & CURRENCY UTILITIES
// ============================================

/**
 * Format price with currency
 * @param {number} price - Price value
 * @param {string} currency - Currency symbol (default: EGP)
 * @returns {string} Formatted price
 */
const formatPrice = (price, currency = 'EGP') => {
  return `${parseFloat(price).toFixed(2)} ${currency}`;
};

/**
 * Calculate discount price
 * @param {number} originalPrice - Original price
 * @param {number} discountPercent - Discount percentage
 * @returns {number} Discounted price
 */
const calculateDiscount = (originalPrice, discountPercent) => {
  const discount = (originalPrice * discountPercent) / 100;
  return parseFloat((originalPrice - discount).toFixed(2));
};

// ============================================
// RATING UTILITIES
// ============================================

/**
 * Calculate average rating
 * @param {Array} ratings - Array of rating numbers
 * @returns {number} Average rating (rounded to 2 decimals)
 */
const calculateAverageRating = (ratings) => {
  if (!ratings || ratings.length === 0) return 0;
  const sum = ratings.reduce((acc, rating) => acc + rating, 0);
  return parseFloat((sum / ratings.length).toFixed(2));
};

/**
 * Get rating stars representation
 * @param {number} rating - Rating value (1-5)
 * @returns {string} Star representation
 */
const getRatingStars = (rating) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  
  return '★'.repeat(fullStars) + 
         (hasHalfStar ? '⯨' : '') + 
         '☆'.repeat(emptyStars);
};

// ============================================
// STRING UTILITIES
// ============================================

/**
 * Capitalize first letter of each word
 * @param {string} str - Input string
 * @returns {string} Capitalized string
 */
const capitalizeWords = (str) => {
  return str.replace(/\b\w/g, char => char.toUpperCase());
};

/**
 * Truncate text with ellipsis
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text
 */
const truncateText = (text, maxLength = 100) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

/**
 * Generate random string
 * @param {number} length - Length of string
 * @returns {string} Random string
 */
const generateRandomString = (length = 8) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

// ============================================
// ARRAY UTILITIES
// ============================================

/**
 * Group array by key
 * @param {Array} array - Array to group
 * @param {string} key - Key to group by
 * @returns {Object} Grouped object
 */
const groupBy = (array, key) => {
  return array.reduce((result, item) => {
    const groupKey = item[key];
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    result[groupKey].push(item);
    return result;
  }, {});
};

/**
 * Remove duplicates from array
 * @param {Array} array - Array with duplicates
 * @returns {Array} Array without duplicates
 */
const removeDuplicates = (array) => {
  return [...new Set(array)];
};

/**
 * Sort array by key
 * @param {Array} array - Array to sort
 * @param {string} key - Key to sort by
 * @param {string} order - 'asc' or 'desc'
 * @returns {Array} Sorted array
 */
const sortBy = (array, key, order = 'asc') => {
  return [...array].sort((a, b) => {
    if (a[key] < b[key]) return order === 'asc' ? -1 : 1;
    if (a[key] > b[key]) return order === 'asc' ? 1 : -1;
    return 0;
  });
};

// ============================================
// VALIDATION UTILITIES
// ============================================

/**
 * Check if value is empty
 * @param {*} value - Value to check
 * @returns {boolean}
 */
const isEmpty = (value) => {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string') return value.trim().length === 0;
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return false;
};

/**
 * Check if all required fields are present
 * @param {Object} obj - Object to check
 * @param {Array} requiredFields - Array of required field names
 * @returns {Object} { valid: boolean, missing: Array }
 */
const checkRequiredFields = (obj, requiredFields) => {
  const missing = requiredFields.filter(field => isEmpty(obj[field]));
  return {
    valid: missing.length === 0,
    missing
  };
};

// ============================================
// PAGINATION UTILITIES
// ============================================

/**
 * Calculate pagination metadata
 * @param {number} total - Total items
 * @param {number} limit - Items per page
 * @param {number} offset - Current offset
 * @returns {Object} Pagination metadata
 */
const getPaginationMeta = (total, limit = 10, offset = 0) => {
  const currentPage = Math.floor(offset / limit) + 1;
  const totalPages = Math.ceil(total / limit);
  const hasNext = offset + limit < total;
  const hasPrev = offset > 0;
  
  return {
    total,
    limit,
    offset,
    currentPage,
    totalPages,
    hasNext,
    hasPrev,
    nextOffset: hasNext ? offset + limit : null,
    prevOffset: hasPrev ? Math.max(0, offset - limit) : null
  };
};

// ============================================
// ERROR HANDLING UTILITIES
// ============================================

/**
 * Create standardized error response
 * @param {string} message - Error message
 * @param {number} statusCode - HTTP status code
 * @param {Object} details - Additional error details
 * @returns {Object} Error response object
 */
const createErrorResponse = (message, statusCode = 500, details = null) => {
  const error = {
    error: message,
    statusCode,
    timestamp: new Date().toISOString()
  };
  
  if (details) {
    error.details = details;
  }
  
  return error;
};

/**
 * Create standardized success response
 * @param {*} data - Response data
 * @param {string} message - Success message
 * @returns {Object} Success response object
 */
const createSuccessResponse = (data, message = 'Success') => {
  return {
    success: true,
    message,
    data,
    timestamp: new Date().toISOString()
  };
};

// ============================================
// BOOKING UTILITIES
// ============================================

/**
 * Generate time slots for a day
 * @param {string} startTime - Day start time (HH:MM)
 * @param {string} endTime - Day end time (HH:MM)
 * @param {number} slotDuration - Slot duration in minutes
 * @returns {Array} Array of time slot objects
 */
const generateTimeSlots = (startTime, endTime, slotDuration = 30) => {
  const slots = [];
  let currentTime = startTime;
  
  while (currentTime < endTime) {
    const slotEnd = addMinutes(currentTime, slotDuration);
    if (slotEnd <= endTime) {
      slots.push({
        start: currentTime,
        end: slotEnd,
        duration: slotDuration
      });
    }
    currentTime = addMinutes(currentTime, 15); // 15-minute intervals
  }
  
  return slots;
};

/**
 * Check if two time ranges overlap
 * @param {string} start1 - First range start
 * @param {string} end1 - First range end
 * @param {string} start2 - Second range start
 * @param {string} end2 - Second range end
 * @returns {boolean}
 */
const doTimeRangesOverlap = (start1, end1, start2, end2) => {
  return start1 < end2 && start2 < end1;
};

module.exports = {
  // Date & Time
  addMinutes,
  getTimeDifferenceInMinutes,
  isTimeBetween,
  getDayName,
  formatDate,
  getNextDays,
  isToday,
  isFutureDate,
  
  // Price & Currency
  formatPrice,
  calculateDiscount,
  
  // Rating
  calculateAverageRating,
  getRatingStars,
  
  // String
  capitalizeWords,
  truncateText,
  generateRandomString,
  
  // Array
  groupBy,
  removeDuplicates,
  sortBy,
  
  // Validation
  isEmpty,
  checkRequiredFields,
  
  // Pagination
  getPaginationMeta,
  
  // Error Handling
  createErrorResponse,
  createSuccessResponse,
  
  // Booking
  generateTimeSlots,
  doTimeRangesOverlap
};