// Sample sensor data
const sensorData = [
  // ... (insert the provided sensor data here)
];

// Function to filter data based on bounding box
function filterByBoundingBox(
  data,
  latitudeSouth,
  latitudeNorth,
  longitudeWest,
  longitudeEast,
) {
  return data.filter((sensor) => {
    const latitude = sensor.sensor.latitude;
    const longitude = sensor.sensor.longitude;

    return (
      latitude >= latitudeSouth &&
      latitude <= latitudeNorth &&
      longitude >= longitudeWest &&
      longitude <= longitudeEast
    );
  });
}

// Function to calculate the average value of a specific property
function calculateAverage(data, property) {
  const sum = data.reduce((acc, sensor) => acc + sensor.sensor[property], 0);
  const count = data.length;
  return count > 0 ? sum / count : 0;
}

// Example bounding box coordinates
const latitudeSouth = 20;
const latitudeNorth = 60;
const longitudeWest = -120;
const longitudeEast = -70;

// Filter data based on the bounding box
const filteredData = filterByBoundingBox(
  sensorData,
  latitudeSouth,
  latitudeNorth,
  longitudeWest,
  longitudeEast,
);

// Calculate average values
const averagePM25 = calculateAverage(filteredData, "pm2.5");
const averageTemperature = calculateAverage(filteredData, "temperature");
const averageHumidity = calculateAverage(filteredData, "humidity");
const averagePressure = calculateAverage(filteredData, "pressure");
const averageConfidence = calculateAverage(filteredData, "confidence");
const averagePM10 = calculateAverage(filteredData, "pm10.0");
// Add more properties as needed

// Log the results
console.log("Average PM2.5 Concentration:", averagePM25);
console.log("Average Temperature:", averageTemperature);
console.log("Average Humidity:", averageHumidity);
console.log("Average Pressure:", averagePressure);
console.log("Average Confidence Level:", averageConfidence);
console.log("Average PM10.0 Concentration:", averagePM10);
// Log more results as needed
