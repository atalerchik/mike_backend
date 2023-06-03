import { User } from "../models/User";
import { UpdateUserBody } from "../types/user";
import { generateToken } from "../utils/generateToken";

export async function getUser(searchParams: Record<string, any>) {
  return await User.findOne(searchParams);
}

export async function createUser(name: string, email: string, password: string) {
  const activationToken = generateToken();
  return await User.create({ name, email, password, activationToken });
}

export async function updateUser(id: string, updateBody: UpdateUserBody) {
  return await User.update(
    { ...updateBody },
    {
      where: {
        id,
      },
    },
  );
}

export async function deleteUser(id: string) {
  return await User.destroy({
    where: {
      id,
    },
  });
}
