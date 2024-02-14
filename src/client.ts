import { Client } from 'appwrite';


const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('65ca1ff9e112343b97ab');

export default client