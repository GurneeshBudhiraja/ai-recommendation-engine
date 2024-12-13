import { Client, Account, OAuthProvider, Role } from "appwrite";

export class Auth {
  client;
  account;
  constructor() {
    this.client = new Client()
      .setEndpoint('https://cloud.appwrite.io/v1')
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);
    this.account = new Account(this.client);
  }
  microsoftLogin() {
    return this.account.createOAuth2Session(
      OAuthProvider.Microsoft,
      "http://localhost:3000/demo",
      "http://localhost:3000/demo/login"
    )
  }

  googleLogin() {
    return this.account.createOAuth2Session(
      OAuthProvider.Google,
      "http://localhost:3000/demo",
      "http://localhost:3000/demo/login"
    )
  }

  getSession() {
    return this.account.getSession("current");
  }

  getAccount() {
    return this.account.get();
  }

  loginWithEmail({ email, password }: {
    email: string,
    password: string
  }) {
    return this.account.createEmailPasswordSession(email, password)
  }

  deleteSession() {
    return this.account.deleteSessions();
  }

}

