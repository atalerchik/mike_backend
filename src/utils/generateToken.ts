import { v4 as UUIDV4 } from "uuid";

export async function generateToken() {
  return UUIDV4();
}
