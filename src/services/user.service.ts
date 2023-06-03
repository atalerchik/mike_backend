import { User } from "../models/User";
import { UpdateUserBody } from "../types/user";

export async function getUser(searchParams: Record<string, any>) {
  return await User.findOne(searchParams);
}

export async function createUser(name: string, email: string, password: string) {
  return await User.create({ name, email, password });
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
