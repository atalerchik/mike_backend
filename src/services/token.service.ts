import { HttpError } from "../utils/HttpError";
import { User } from "../models/User";
import { generateToken } from "../utils/generateToken";

export async function activateToken(token: string) {
  const user = await User.findOne({ where: { activationToken: token } });

  if (!user) {
    throw new HttpError(404, "User not found");
  }

  user.activationToken = null;
  await user.save();
  return user;
}

export async function authorizeToken(token: string) {
  const user = await User.findOne({ where: { authorizationToken: token } });

  if (!user) {
    throw new HttpError(404, "User not found");
  }

  return user;
}

export async function createAuthorizeToken(userId: string) {
  const user = await User.findOne({ where: { id: userId } });
  if (!user) {
    throw new HttpError(404, "User not found");
  }

  user.authorizationToken = await generateToken();
  await user.save();
  return user;
}
