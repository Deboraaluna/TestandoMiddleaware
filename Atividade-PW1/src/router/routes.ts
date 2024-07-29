import { Router } from "express";
const route = Router();
import checkExistsUserAccount from "../middleware";

import controller from "../controller/controller";

route.post("/users", controller.CreateUser);
route.get("/technologies", checkExistsUserAccount, controller.TechnologiesUser);
route.post(
  "/technologies",
  checkExistsUserAccount,
  controller.CreateTechnologies
);
route.put(
  "/technologies/:id",
  checkExistsUserAccount,
  controller.UpdateTechnology
);
route.patch(
  "/technologies/:id/studied",
  checkExistsUserAccount,
  controller.UpdateStatus
);
route.delete(
  "/technologies/:id",
  checkExistsUserAccount,
  controller.DeleteTechnology
);

export default route;
