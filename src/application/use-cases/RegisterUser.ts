import { UserRepository } from "../../domain/repositories/UserRepository";
import { User } from "../../domain/entities/User";
import bcrypt from "bcryptjs";

export class RegisterUser {
    constructor(private userRepository: UserRepository) {}

    async execute(username: string, password: string): Promise<void> {
        if (!username || !password) {
            throw new Error("Username and password must be provided");
        }
        const passwordHash = await bcrypt.hash(password, 10);
        const user = new User(Math.random().toString(), username, passwordHash);
        await this.userRepository.save(user);
    }
}
