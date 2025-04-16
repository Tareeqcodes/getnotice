import { Client, Account, ID } from 'appwrite';

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_API_ENDPOINT) // Your API Endpoint
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID); 

export const account = new Account(client);
export{ ID };