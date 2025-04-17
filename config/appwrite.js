import { Client, Account, Databases, Storage, ID } from 'node-appwrite';

const client = new Client()
  .setEndpoint('https://fra.cloud.appwrite.io/v1') 
  .setProject('67f5892b0015d73b3906'); 

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export{ ID }; 