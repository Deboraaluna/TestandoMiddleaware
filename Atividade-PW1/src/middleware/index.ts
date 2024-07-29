import { Request, Response, NextFunction } from "express";
import User from "../services/User";

const checkExistsUserAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = (req.headers.username as string) || undefined;

  if (user === undefined) {
    return res
      .status(400)
      .json({ error: "Cabeçalho 'Username' não está definido" });
  }

  const UserExist = await User.CheckUser(user);

  if (!UserExist) {
    return res.status(404).json({ error: "Este Usuário não existe" });
  }

  next();
};

export default checkExistsUserAccount;