import { initMap } from './modules/map.js';
import { initCharts } from './modules/charts.js';
import { animateCounter } from './modules/animations.js';

// Initialize all components
document.addEventListener('DOMContentLoaded', () => {
    initMap();
    initCharts();
    animateCounter('totalSales', 0, 1234567.89, 3000);
});