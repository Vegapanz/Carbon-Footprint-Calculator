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

    // Hide the form and show the result
    document.getElementById('calculator').style.display = 'none';
    document.getElementById('resultContainer').style.display = 'block';
});

function goBack() {
    // Hide the result and show the form again
    document.getElementById('resultContainer').style.display = 'none';
    document.getElementById('calculator').style.display = 'block';
}
