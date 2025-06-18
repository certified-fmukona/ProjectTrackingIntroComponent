// Config
const BREAKPOINT = 768; // px
const STYLESHEETS = {
  mobile: 'mobile.css',
  desktop: 'desktop.css'
};

// Cache DOM elements
let currentStylesheet = null;

// Main function to load stylesheet
const loadStyleSheet = () => {
  // Remove old stylesheet if exists
  if (currentStylesheet) {
    currentStylesheet.remove();
  }

  // Determine which stylesheet to load
  const isMobile = window.innerWidth < BREAKPOINT;
  const stylesheetUrl = isMobile ? STYLESHEETS.mobile : STYLESHEETS.desktop;

  // Create new link element
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = stylesheetUrl;
  link.id = 'current-stylesheet'; // For easier identification

  // testing something 
  if (isMobile) {
    document.body.innerHTML = "<h1>Mobile</h1";
    document.body.style.backgroundColor= 'green';
  } else { 
    document.body.innerHTML ="<h1>Desktop</h1>";
    document.body.style.backgroundColor= 'red';
  }

  // Add to DOM
  document.head.appendChild(link);
  currentStylesheet = link; // Update cache

  // Optional: Dispatch custom event
  document.dispatchEvent(new CustomEvent('stylesheetChanged', {
    detail: { isMobile }
  }));
};

// Debounce function for resize events
const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
};

// Initial load
document.addEventListener('DOMContentLoaded', loadStyleSheet);

// Optimized resize handler
window.addEventListener('resize', debounce(() => {
  const newWidth = window.innerWidth;
  const currentIsMobile = newWidth < BREAKPOINT;
  const prevIsMobile = (currentStylesheet?.href || '').includes('mobile.css');
  
  // Only reload if crossing breakpoint
  if (currentIsMobile !== prevIsMobile) {
    loadStyleSheet();
  }
}, 100)); // 100ms debounce delay