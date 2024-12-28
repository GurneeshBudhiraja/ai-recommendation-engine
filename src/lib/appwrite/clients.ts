import { cookies } from 'next/headers';
import { Account, Client, Databases } from 'node-appwrite';
import { type SessionClient } from '@/types/appwrite.types';

// Session client
export async function createSessionClient(): Promise<SessionClient> {
  const client = new Client()
    .setEndpoint(process.env.NEXT_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_APPWRITE_PROJECT_ID);

  const session = (await cookies()).get("session");
  if (!session || !session.value) {
    return null
  }

  client.setSession(session.value);

  return {
    get account() {
      return new Account(client);
    },
    get db() {
      return new Databases(client)
    }
  };
}

// Admin client 
export async function createAdminClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_APPWRITE_PROJECT_ID)
    .setKey(process.env.NEXT_APPWRITE_API_KEY);

  return {
    get account() {
      return new Account(client);
    },
    get db() {
      return new Databases(client)
    }
  };
}

