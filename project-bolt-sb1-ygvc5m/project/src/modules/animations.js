export function animateCounter(elementId, start, end, duration) {
    const element = document.getElementById(elementId);
    let current = start;
    const increment = (end - start) / (duration / 1000 * 60);
    
    const interval = setInterval(() => {
        current += increment;
        element.innerHTML = `₸${current.toFixed(2)}`;
        
        if (current >= end) {
            clearInterval(interval);
            element.innerHTML = `₸${end.toFixed(2)}`;
        }
    }, 16);
}