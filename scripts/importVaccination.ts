import fs from 'fs';
import path from 'path';
import connectDB from '@root/lib/mongodb';
import Vaccination from '@root/models/vaccination';

async function importData() {
  try {
    // Connect to MongoDB
    await connectDB();

    // Get full file path to public/pet-vaccination.json
    const filePath = path.join(process.cwd(), 'public', 'pet-vaccination.json');

    // Read and parse the file
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const jsonData = JSON.parse(fileContent);

    // Optional: wipe existing data
    await Vaccination.deleteMany({});
    
    // Insert new data
    await Vaccination.insertMany(jsonData);

    console.log('✅ Vaccination data imported successfully.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Failed to import data:', error);
    process.exit(1);
  }
}

importData();
