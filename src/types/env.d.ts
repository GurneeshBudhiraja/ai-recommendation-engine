export declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_APPWRITE_PROJECT_ID: string;
      NEXT_APPWRITE_ENDPOINT: string;
      NEXT_APPWRITE_API_KEY: string;
      NEXT_MONGODB_URI: string;
      NEXT_AZURE_FURNITURE_CONNECTION_STRING: string;
      NEXT_ACCOUNT_NAME: string
      NEXT_CONTAINER_NAME: string
      NEXT_SAS_TOKEN: string
      NEXT_GEMINI_API_KEY: stirng
    }
  }
}
