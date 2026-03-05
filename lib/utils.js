/**
 * Utility functions for the HITU Next.js application
 */

/**
 * Simulate file upload
 * @param {string} filename - Name of the file
 * @param {function} onProgress - Callback for progress updates
 */
export const simulateUpload = (filename, onProgress) => {
  return new Promise((resolve) => {
    let progress = 0
    const interval = setInterval(() => {
      progress += Math.random() * 30
      if (progress > 100) progress = 100
      if (onProgress) onProgress(progress)
      if (progress >= 100) {
        clearInterval(interval)
        resolve(true)
      }
    }, 500)
  })
}

/**
 * Format date to readable string
 * @param {Date} date - Date object
 * @returns {string} Formatted date
 */
export const formatDate = (date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date))
}

/**
 * Validate email
 * @param {string} email - Email address
 * @returns {boolean} Is valid email
 */
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

/**
 * Validate password strength
 * @param {string} password - Password
 * @returns {object} Validation result
 */
export const validatePassword = (password) => {
  const requirements = {
    minLength: password.length >= 8,
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasNumbers: /\d/.test(password),
  }

  const isStrong =
    requirements.minLength &&
    requirements.hasUppercase &&
    requirements.hasLowercase &&
    requirements.hasNumbers

  return { ...requirements, isStrong }
}

/**
 * Get initials from name
 * @param {string} name - Full name
 * @returns {string} Initials
 */
export const getInitials = (name) => {
  return name
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase())
    .join('')
}
