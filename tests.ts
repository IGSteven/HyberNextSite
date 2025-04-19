import * as fs from 'fs';
import * as path from 'path';
import axios from 'axios';

// Define the API endpoints
const routes = [
  '/status/components/clv6h3a9a37836b7n4aul61snm',
  '/status/components',
  '/status/maintenances',
  '/status/incidents',
  '/status/incidents/clv6jd06r94487b7n4tuty5cns'
  // Add more endpoints here
];

async function fetchAndSaveData(endpoint: string) {
  try {
    const apiUrl = `http://localhost:3000/api${endpoint}`;
    const outputPath = path.join(__dirname, 'example-data', `${endpoint}.json`);

    const response = await axios.get(apiUrl);
    const data = response.data;

    // Ensure the directory exists
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });

    // Write the data to the output file
    fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));

    console.log(`Data from ${apiUrl} saved to ${outputPath}`);
  } catch (error) {
    console.error(`Error fetching or saving data for ${endpoint}:`, error);
  }
}

async function main() {
  for (const route of routes) {
    await fetchAndSaveData(route);
  }
}

main().catch((error) => {
  console.error('Error in main execution:', error);
});