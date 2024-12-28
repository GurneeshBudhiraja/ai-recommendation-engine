import { Account, Databases } from "node-appwrite";
import { Models } from "appwrite";


export type SessionClient = {
  account: Account,
  db: Databases,
} | null;


export type LoginInfo = {
  email: string,
  password: string,
}

export type SignupInfo = {
  email: string
  password: string
  confirmPassword: string
}

export type Session = Models.Session;


