import { Client, Account } from "appwrite";

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1") // Your API Endpoint
  .setProject("6759f3ff00205cd4be63"); // Your project ID

const account = new Account(client);

export { client, account };
