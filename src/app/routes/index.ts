import express from "express";
import { UserRoutes } from "../modules/user/user.route";
import { BookRoutes } from "../modules/book/Book.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/books",
    route: BookRoutes,
  },
  {
    path: "/users",
    route: UserRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
