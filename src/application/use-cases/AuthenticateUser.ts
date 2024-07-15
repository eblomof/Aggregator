import { UserRepository } from "../../domain/repositories/UserRepository";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export class AuthenticateUser {
    constructor(private userRepository: UserRepository) {}

    async execute(username: string, password: string): Promise<string | null> {
        const user = await this.userRepository.findByUsername(username);
        if (!user) return null;

        const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
        if (!isPasswordValid) return null;

        const token = jwt.sign({ id: user.id }, "secret_key", { expiresIn: "1h" });
        return token;
    }
}
