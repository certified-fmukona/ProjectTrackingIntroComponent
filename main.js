// render correct dimensions
const loadStyleSheet = () => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';

    link.href = window.innerWidth < 768 ? 'mobile.css' : 'desktop.css';

    document.head.appendChild(link);
};

loadStyleSheet();

// rerun if window is resized
window.addEventListener('resize', () => {
    const oldLink = document.querySelector('link[rel="stylesheet]');
    if (oldLink) oldLink.remove();

    loadStyleSheet();
});