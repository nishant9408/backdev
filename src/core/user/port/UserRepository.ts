import { User } from '../domain/data/User';

export interface UserRepository {
    findById(id: number): Promise<User | null>;

    findByEmail(email: string): Promise<User | null>;

    findByNotificationToken(notificationToken: string): Promise<User[]>;

    findNotifiable(): Promise<User[]>;

    save(user: User): Promise<User>;
}

const UserRepositoryType = Symbol.for('UserRepository');
export { UserRepositoryType };
