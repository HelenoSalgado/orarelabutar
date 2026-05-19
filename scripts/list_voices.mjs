import { loadEnvFile } from 'node:process';

// Load .env file using Node's native method (available in Node 20.6+)
try {
  loadEnvFile();
} catch (e) {
  // .env file might not exist or be inaccessible
}

const XAI_API_KEY = process.env.XAI_API_KEY;

if (!XAI_API_KEY) {
  console.error('Error: XAI_API_KEY not found in .env file.');
  process.exit(1);
}

async function listVoices() {
  console.log('Fetching voices from xAI...');
  
  try {
    const response = await fetch('https://api.x.ai/v1/tts/voices', {
      headers: {
        'Authorization': `Bearer ${XAI_API_KEY}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log(JSON.stringify(data, null, 2));
    } else {
      console.error(`Error: ${response.status} - ${response.statusText}`);
      const text = await response.text();
      console.error(text);
    }
  } catch (error) {
    console.error('Failed to fetch voices:', error.message);
  }
}

listVoices();
