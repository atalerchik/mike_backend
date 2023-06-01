import { User } from "../models/User";

export async function getUser(searchParams: Record<string, any>) {
  return User.findOne(searchParams);
}

export async function createUser(name: string, email: string, password: string) {
  return User.create({ name, email, password });
}
