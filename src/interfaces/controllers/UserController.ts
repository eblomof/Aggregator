import { Request, Response } from "express";
import { RegisterUser } from "../../application/use-cases/RegisterUser";
import { AuthenticateUser } from "../../application/use-cases/AuthenticateUser";
export class UserController {
    constructor(
        private registerUser: RegisterUser,
        private authenticateUser: AuthenticateUser
    ) {}

    async register(req: Request, res: Response): Promise<void> {
        const { username, password } = req.body;
        console.log("UserController.register called with:", { username, password });
        if (!username || !password) {
            res.status(400).send({ message: "Username and password must be provided" });
            return;
        }
        await this.registerUser.execute(username, password);
        res.status(201).send({ message: "User registered successfully" });
    }

    async login(req: Request, res: Response): Promise<void> {
        const { username, password } = req.body;
        console.log("UserController.login called with:", { username, password });
        if (!username || !password) {
            res.status(400).send({ message: "Username and password must be provided" });
            return;
        }
        const token = await this.authenticateUser.execute(username, password);
        if (!token) {
            res.status(401).send({ message: "Invalid credentials" });
        } else {
            res.status(200).send({ token });
        }
    }
}
