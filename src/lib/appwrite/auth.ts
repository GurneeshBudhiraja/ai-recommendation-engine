import { createAdminClient } from "./clients";
import { type LoginInfo, Session } from "@/types/appwrite.types";

export async function createSession({ email, password }: LoginInfo): Promise<Session | null> {
  try {
    const { account } = await createAdminClient();
    return account.createEmailPasswordSession(
      email, password
    )
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error in createSession:", error.message);
    }
    return null;
  }
}


