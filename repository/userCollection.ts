import { db } from '../config/firebaseConfig';
import { User, CreateUserDTO, UpdateUserDTO } from '../entities/user';

const COLLECTION_NAME = 'users';

export class UserRepository {
  private collection = db.collection(COLLECTION_NAME);

  async create(userData: CreateUserDTO): Promise<User> {
    const docRef = this.collection.doc();
    const user: User = {
      id: docRef.id,
      email: userData.email,
      name: userData.name,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await docRef.set(user);
    return user;
  }

  async findById(id: string): Promise<User | null> {
    const doc = await this.collection.doc(id).get();
    return doc.exists ? (doc.data() as User) : null;
  }

  async update(id: string, userData: UpdateUserDTO): Promise<User | null> {
    const docRef = this.collection.doc(id);
    const updateData = {
      ...userData,
      updatedAt: new Date(),
    };

    await docRef.update(updateData);
    return this.findById(id);
  }

  async delete(id: string): Promise<boolean> {
    try {
      await this.collection.doc(id).delete();
      return true;
    } catch (error) {
      return false;
    }
  }

  async findAll(): Promise<User[]> {
    const snapshot = await this.collection.get();
    return snapshot.docs.map(doc => doc.data() as User);
  }
} 