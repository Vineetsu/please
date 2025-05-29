import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const envPath = join(__dirname, '..', '.env');

console.log('Checking environment setup...');
console.log('Looking for .env file at:', envPath);
console.log('.env file exists:', existsSync(envPath));

dotenv.config({ path: join(__dirname, '..', '.env') });

console.log('\nEnvironment variables:');
console.log('PORT:', process.env.PORT);
console.log('MONGODB_URI:', process.env.MONGODB_URI);
console.log('JWT_SECRET:', process.env.JWT_SECRET); 