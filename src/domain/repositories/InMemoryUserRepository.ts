import { UserRepository } from "../../domain/repositories/UserRepository";
import { User } from "../../domain/entities/User";

export class InMemoryUserRepository implements UserRepository {
    private users: User[] = [];

    async findByUsername(username: string): Promise<User | null> {
        const user = this.users.find(user => user.username === username);
        return user || null;
    }

    async save(user: User): Promise<void> {
        this.users.push(user);
    }
}
