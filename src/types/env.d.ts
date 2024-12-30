export declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_APPWRITE_PROJECT_ID: string;
      NEXT_APPWRITE_ENDPOINT: string;
      NEXT_APPWRITE_API_KEY: string;
      NEXT_MONGODB_URI: string;
    }
  }
}
