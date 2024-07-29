import { Request, Response } from "express";
import { v4 } from "uuid";
import User from "../services/User";

const CreateUser = async (req: Request, res: Response) => {
  const user = req.body.user;
  const username = req.body.username;

  if (user === "" || user === null || username === "" || username === null) {
    return res.status(400).json({ error: "Por Favor Preencha os campos corretamente!" });
  }

  try {
    const newUser = {
      id: v4(),
      user: user,
      username: username,
      technologies: [],
    };

    await User.SaveUser(newUser);
    res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Houve um erro interno no servidor" });
  }
};

const TechnologiesUser = async (req: Request, res: Response) => {
  const username = req.headers.username as string;
  try {
    const list = await User.FindTechnologies(username);
    res.status(200).json(list);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Houve um erro interno no servidor" });
  }
};

const CreateTechnologies = async (req: Request, res: Response) => {
  const username = req.headers.username as string;
  const title = req.body.title;
  const deadline = req.body.deadline;

  if (title === "" || title === null || deadline === "" || deadline === null) {
    return res.status(400).json({ error: "Por Favor preencha os campos corretamente!" });
  }

  try {
    const newTechnology = {
      id: v4(),
      title: title,
      studied: false,
      deadline: new Date(deadline),
      created_at: new Date(),
    };
    const response = await User.SaveTechonolgy(newTechnology, username);
    res.status(201).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Houve um erro interno no servidor" });
  }
};

const UpdateTechnology = async (req: Request, res: Response) => {
  const id = req.params.id;
  const title = req.body.title;
  const deadline = req.body.deadline;
  const username = req.headers.username as string;

  if (id === "" || id === null) {
    return res.status(404).json({ error: "Atenção! Esta Tecnologia não foi encontrada." });
  }
  if (title === "" || title === null || deadline === "" || deadline === null) {
    return res.status(400).json({ error: "Por Favor preencha os campos corretamente!" });
  }
  try {
    const updateTech = {
      title: title,
      deadline: new Date(deadline),
    };
    const State = await User.CheckIdTechnology(username, id);
    if (State === false) {
      return res
        .status(404)
        .json({ error: "O ID fornecido não corresponde a nenhuma tecnologia existente." });
    }
    const user = await User.UpdateTechnology(updateTech, id, username);
    res.status(204).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Houve um erro interno no servidor" });
  }
};

const UpdateStatus = async (req: Request, res: Response) => {
    const id = req.params.id;
    const username = req.headers.username as string;
  
    if (id === "" || id === null) {
      return res.status(404).json({ error: "Atenção! Esta Tecnologia não foi encontrada." });
    }
    try {
      const State = await User.CheckIdTechnology(username, id);
      if (State === false) {
        return res
          .status(404)
          .json({ error: "O ID fornecido não corresponde a nenhuma tecnologia existente." });
      }
      const user = await User.UpdateStatus(id, username);
      res.status(204).json(user);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Houve um erro interno no servidor" });
    }
  };
  
  const DeleteTechnology = async (req: Request, res: Response) => {
    const id = req.params.id;
    const username = req.headers.username as string;
  
    if (id === "" || id === null) {
      return res.status(404).json({ error: "Atenção! Esta Tecnologia não foi encontrada." });
    }
    try {
      const State = await User.CheckIdTechnology(username, id);
      if (State === false) {
        return res
          .status(404)
          .json({ error: "O ID fornecido não corresponde a nenhuma tecnologia existente." });
      }
      const user = await User.DeleteTechnology(username, id);
      res.status(200).json(user);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Houve um erro interno no servidor" });
    }
  };

export default {
    CreateUser,
    TechnologiesUser,
    CreateTechnologies,
    UpdateTechnology,
    UpdateStatus,
    DeleteTechnology,
}