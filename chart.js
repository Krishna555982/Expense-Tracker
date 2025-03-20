let barChartInstance = null;

// Bar Chart Function
document.getElementById('show-bar-chart').addEventListener('click', function() {
    const categoryData = {};

    transactions.forEach(transaction => {
        if (transaction.type !== 'income') {
            const category = transaction.category;
            const amount = Math.abs(transaction.amount); 
            categoryData[category] = (categoryData[category] || 0) + amount;
        }
    });

    const barLabels = Object.keys(categoryData);
    const barData = Object.values(categoryData);

    const barCtx = document.getElementById('expenseBarChart').getContext('2d');

    if (barChartInstance) {
        barChartInstance.destroy();
    }

    barChartInstance = new Chart(barCtx, {
        type: 'bar',
        data: {
            labels: barLabels,
            datasets: [{
                label: 'Expenses by Category',
                data: barData,
                backgroundColor: '#36A2EB'
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
});
