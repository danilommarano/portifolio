import PocketBase from 'pocketbase';

const pb = new PocketBase('http://localhost:8080');

export const authData = async (): Promise<void> => {
    // Consider using a secrets management service
    const pb_admin_email = process.env.POCKETBASE_ADMIN_EMAIL || '';
    const pb_admin_password = process.env.POCKETBASE_ADMIN_PASSWORD || '';

    try {
        await pb.admins.authWithPassword(pb_admin_email, pb_admin_password);
        console.log("Email: ", pb_admin_email);
    } catch (error) {
        console.error("Authentication Error:", error);
    }
};

export default pb; 
