import PocketBase from 'pocketbase';

const POCKETBASE_ADMIN_EMAIL = process.env.POCKETBASE_ADMIN_EMAIL || 'danilo.m.marano@gmail.com';
const POCKETBASE_ADMIN_PASSWORD = process.env.POCKETBASE_ADMIN_PASSWORD || 'MatoAlto24@$';
export const BACKEND_URL = process.env.BAKCEND_URL || "http://localhost:8080"
const pb = new PocketBase(BACKEND_URL);
pb.admins.authWithPassword(POCKETBASE_ADMIN_EMAIL, POCKETBASE_ADMIN_PASSWORD);

export default pb; 
