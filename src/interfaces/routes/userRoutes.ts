import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { RegisterUser } from "../../application/use-cases/RegisterUser";
import { AuthenticateUser } from "../../application/use-cases/AuthenticateUser";
import { InMemoryUserRepository } from "../../domain/repositories/InMemoryUserRepository";


const userRepository = new InMemoryUserRepository();
const registerUser = new RegisterUser(userRepository);
const authenticateUser = new AuthenticateUser(userRepository);
const userController = new UserController(registerUser, authenticateUser);

const router = Router();

router.post("/register", (req, res) => userController.register(req, res));
router.post("/login", (req, res) => userController.login(req, res));

export default router;
