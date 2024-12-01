// Updated JavaScript for Carbon Footprint Calculator

document.getElementById('footprintForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get values from form
    let milesDriven = parseFloat(document.getElementById('miles_driven').value);
    let fuelEfficiency = parseFloat(document.getElementById('fuel_efficiency').value);
    let electricityUsage = parseFloat(document.getElementById('electricity_usage').value);
    let foodType = document.getElementById('food_type').value;

    // Constants
    const emissionsPerGallon = 8.89; // kg CO2 per gallon of gasoline
    const emissionsPerKWh = 0.92; // kg CO2 per kWh (US average)

    // Calculate transportation footprint
    let gallonsUsed = milesDriven / fuelEfficiency;
    let transportationFootprint = gallonsUsed * emissionsPerGallon;

    // Calculate energy footprint
    let energyFootprint = electricityUsage * emissionsPerKWh;

    // Calculate food footprint
    let foodFootprint = 0;
    if (foodType === 'vegan') {
        foodFootprint = 1.5;
    } else if (foodType === 'vegetarian') {
        foodFootprint = 2.5;
    } else {
        foodFootprint = 4.5;
    }

    // Calculate total footprint
    let totalFootprint = transportationFootprint + energyFootprint + foodFootprint;

    // Display results
    document.getElementById('transportationResult').innerText = `Transportation: ${transportationFootprint.toFixed(2)} kg of CO2 per day`;
    document.getElementById('energyResult').innerText = `Energy Use: ${energyFootprint.toFixed(2)} kg of CO2 per day`;
    document.getElementById('foodResult').innerText = `Food Consumption: ${foodFootprint.toFixed(2)} kg of CO2 per day`;
    document.getElementById('totalResult').innerText = `Total Carbon Footprint: ${totalFootprint.toFixed(2)} kg of CO2 per day`;

    // Generate recommendations based on total footprint
    let recommendations = generateRecommendations(totalFootprint, {
        transportationFootprint,
        energyFootprint,
        foodFootprint,
        foodType
    });

    // Display recommendations
    document.getElementById('recommendationsResult').innerHTML = recommendations;

    // Hide the form and show the result
    document.getElementById('calculator').style.display = 'none';
    document.getElementById('resultContainer').style.display = 'block';
});

function generateRecommendations(totalFootprint, breakdownData) {
    let recommendationHTML = '<h3>Personalized Carbon Reduction Recommendations</h3>';

    // Overall footprint recommendations
    if (totalFootprint < 10) {
        recommendationHTML += `
            <p class="good-rating">🌿 Great job! Your carbon footprint is quite low.</p>
            <ul>
                <li>Continue your sustainable practices and inspire others!</li>
                <li>Consider sharing your strategies with friends and family.</li>
            </ul>
        `;
    } else if (totalFootprint < 20) {
        recommendationHTML += `
            <p class="moderate-rating">🌱 Your carbon footprint is moderate. Here are some improvements:</p>
            <ul>
                <li>Look for opportunities to further reduce your environmental impact.</li>
                <li>Start implementing small, consistent changes in your daily routine.</li>
            </ul>
        `;
    } else {
        recommendationHTML += `
            <p class="high-rating">⚠️ Your carbon footprint is high. Urgent action is recommended:</p>
            <ul>
                <li>Prioritize significant lifestyle changes to reduce your carbon emissions.</li>
                <li>Consider consulting with an environmental expert for personalized advice.</li>
            </ul>
        `;
    }

    // Transportation recommendations
    if (breakdownData.transportationFootprint > 5) {
        recommendationHTML += `
            <h4>Transportation Recommendations:</h4>
            <ul>
                <li>Consider carpooling or using public transportation.</li>
                <li>Explore electric or hybrid vehicle options.</li>
                <li>Bike or walk for short-distance trips.</li>
                <li>Work from home when possible to reduce commuting.</li>
            </ul>
        `;
    }

    // Energy recommendations
    if (breakdownData.energyFootprint > 3) {
        recommendationHTML += `
            <h4>Energy Efficiency Recommendations:</h4>
            <ul>
                <li>Switch to energy-efficient appliances.</li>
                <li>Use LED light bulbs.</li>
                <li>Unplug electronics when not in use.</li>
                <li>Consider solar panels or renewable energy sources.</li>
                <li>Improve home insulation to reduce energy consumption.</li>
            </ul>
        `;
    }

    // Food recommendations
    if (breakdownData.foodType === 'omnivore') {
        recommendationHTML += `
            <h4>Food Consumption Recommendations:</h4>
            <ul>
                <li>Reduce meat consumption, especially beef.</li>
                <li>Try meat-free days each week.</li>
                <li>Choose locally sourced and seasonal produce.</li>
                <li>Minimize food waste by planning meals and composting.</li>
                <li>Consider transitioning to a vegetarian or vegan diet gradually.</li>
            </ul>
        `;
    }

    return recommendationHTML;
}

function goBack() {
    document.getElementById('resultContainer').style.display = 'none';
    document.getElementById('calculator').style.display = 'block';
    
    // Reset form fields and styles if needed
    document.getElementById('footprintForm').reset();
    document.querySelectorAll('input, select').forEach((element) => {
        element.style = '';
    });
}
