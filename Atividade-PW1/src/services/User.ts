import { promises as fs } from "fs";
import path from "path";
const database = path.join(__dirname, "..", "database", "db.json");

const SaveUser = async (Data: {}) => {
  try {
    const data = await fs.readFile(database, "utf-8");
    const jsonData = JSON.parse(data);
    jsonData.push(Data);
    fs.writeFile(database, JSON.stringify(jsonData));
  } catch (error) {
    console.log(error);
  }
};

const CheckUser = async (Data: any) => {
    try {
      const data = await fs.readFile(database, "utf-8");
      const jsonData = JSON.parse(data);
      const response = jsonData.some(
        (User: { username: string }) => User.username === Data
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  };


  const FindTechnologies = async (Data: string) => {
    try {
      const data = await fs.readFile(database, "utf-8");
      const jsonData = JSON.parse(data);
      const user = jsonData.find(
        (user: { username: string }) => user.username === Data
      );
      return user.technologies;
    } catch (error) {
      console.log(error);
    }
  };

  const SaveTechonolgy = async (Data: {}, User: string) => {
    try {
      const data = await fs.readFile(database, "utf-8");
      const jsonData = JSON.parse(data);
      const user = jsonData.find(
        (user: { username: string }) => user.username === User
      );
      user.technologies.push(Data);
      fs.writeFile(database, JSON.stringify(jsonData));
      return user;
    } catch (error) {
      console.log(error);
    }
  };

  
const UpdateTechnology = async (
    Data: { title: string; deadline: Date },
    Id: string,
    User: string
  ) => {
    try {
      const data = await fs.readFile(database, "utf-8");
      const jsonData = JSON.parse(data);
      const user = jsonData.find(
        (user: { username: string }) => user.username === User
      );
      const technology = user.technologies;
      technology.map((element: { id: string; title: string; deadline: Date }) => {
        if (element.id === Id) {
          element.title = Data.title;
          element.deadline = Data.deadline;
        }
      });
      await fs.writeFile(database, JSON.stringify(jsonData));
      return user;
    } catch (error) {
      console.log(error);
    }
  };

  const UpdateStatus = async (Id: string, User: string) => {
    try {
      const data = await fs.readFile(database, "utf-8");
      const jsonData = JSON.parse(data);
      const user = jsonData.find(
        (user: { username: string }) => user.username === User
      );
      const technology = user.technologies;
      technology.map((element: { studied: boolean; id: string }) => {
        if (element.id === Id) {
          element.studied = !element.studied;
        }
      });
      await fs.writeFile(database, JSON.stringify(jsonData));
      return user;
    } catch (error) {
      console.log(error);
    }
  };

  const DeleteTechnology = async (User: string, Id: string) => {
    try {
      const data = await fs.readFile(database, "utf-8");
      const jsonData = JSON.parse(data);
      const user = jsonData.find(
        (user: { username: string }) => user.username === User
      );
      user.technologies = user.technologies.filter(
        (element: { id: string }) => element.id !== Id
      );
      await fs.writeFile(database, JSON.stringify(jsonData));
      return user;
    } catch (error) {
      console.log;
    }
  };

  const CheckIdTechnology = async (User: string, Id: string) => {
    try {
      const data = await fs.readFile(database, "utf-8");
      const jsonData = JSON.parse(data);
      const user = jsonData.find(
        (user: { username: string }) => user.username === User
      );
      const state = user.technologies.some(
        (user: { id: string }) => user.id === Id
      );
      return state;
    } catch (error) {
      console.log(error);
    }
  };

export default {
    SaveUser,
    CheckUser,
    FindTechnologies,
    SaveTechonolgy,
    UpdateTechnology,
    UpdateStatus,DeleteTechnology,
    CheckIdTechnology,
}