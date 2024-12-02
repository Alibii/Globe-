import Chart from 'chart.js/auto';

export function initCharts() {
    // Error Distribution Chart
    const errorCtx = document.getElementById('errorChart').getContext('2d');
    new Chart(errorCtx, {
        type: 'pie',
        data: {
            labels: ['Client A', 'Client B', 'Client C'],
            datasets: [{
                data: [10, 15, 5],
                backgroundColor: ['#007bff', '#28a745', '#ffc107'],
            }]
        }
    });

    // Sales Trend Chart
    const salesTrendCtx = document.getElementById('salesTrendChart').getContext('2d');
    new Chart(salesTrendCtx, {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [
                {
                    label: 'Current Sales',
                    data: [120, 150, 180, 200, 220, 190, 210],
                    borderColor: '#007bff',
                    fill: false
                },
                {
                    label: 'Average Sales',
                    data: [100, 130, 150, 170, 190, 180, 200],
                    borderColor: '#28a745',
                    fill: false
                }
            ]
        }
    });

    // Top Sellers Chart
    const topSellersCtx = document.getElementById('topSellersChart').getContext('2d');
    new Chart(topSellersCtx, {
        type: 'bar',
        data: {
            labels: ['Seller A', 'Seller B', 'Seller C'],
            datasets: [{
                label: 'Sales',
                data: [5000, 7000, 4000],
                backgroundColor: ['#ffc107', '#007bff', '#28a745']
            }]
        }
    });
}