import { Client, Account, ID } from "appwrite";
import { loginTypes, signUpTypes } from "../types/authTypes";
import conf from "../conf/conf.ts"; //chng

export class AuthService {
  private client: Client;
  private account: Account;

  constructor() {
    this.client = new Client()
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async signUp({ email, password, name }: signUpTypes) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  async login({ email, password }: loginTypes) {
    try {
      return await this.account.createEmailPasswordSession(email, password); //chng
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Appwrite servicer :: getCurrentUser :: error", error);
    }
    return null;
  }

  async logout() {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      console.log("Appwrite servicer :: logout :: error", error);

    }
  }
}

const authService = new AuthService();

export default authService;
