import { Client, Account, OAuthProvider } from "appwrite";

class OAuthLogin {
  client;
  account;
  constructor() {
    this.client = new Client()
      .setEndpoint('https://cloud.appwrite.io/v1')
      .setProject("<project_id>"); // TODO: replace with project id
    this.account = new Account(this.client);
  }
  async microsoftLogin() {
    return await this.account.createOAuth2Session(
      OAuthProvider.Microsoft,
      "http://localhost:3000/demo",
      "http://localhost:3000/demo/login"
    )
  }

  async googleLogin() {
    return await this.account.createOAuth2Session(
      OAuthProvider.Google,
      "http://localhost:3000/demo",
      "http://localhost:3000/demo/login"
    )
  }
  async getSession() {
    return await this.account.getSession("current");
  }

  async getAccount() {
    return await this.account.get();
  }

}

export default OAuthLogin;