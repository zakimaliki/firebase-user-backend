import { Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
import { UserRepository } from '../repository/userCollection';
import { CreateUserDTO, UpdateUserDTO } from '../entities/user';

export class UserController {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async createUser(req: AuthRequest, res: Response) {
    try {
      const userData: CreateUserDTO = req.body;
      const user = await this.userRepository.create(userData);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ message: 'Error creating user' });
    }
  }

  async getUser(req: AuthRequest, res: Response) {
    try {
      const userId = req.params.id;
      const user = await this.userRepository.findById(userId);
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching user' });
    }
  }

  async updateUser(req: AuthRequest, res: Response) {
    try {
      const userId = req.params.id;
      const userData: UpdateUserDTO = req.body;
      const updatedUser = await this.userRepository.update(userId, userData);
      
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: 'Error updating user' });
    }
  }

  async deleteUser(req: AuthRequest, res: Response) {
    try {
      const userId = req.params.id;
      const success = await this.userRepository.delete(userId);
      
      if (!success) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Error deleting user' });
    }
  }

  async getAllUsers(req: AuthRequest, res: Response) {
    try {
      const users = await this.userRepository.findAll();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching users' });
    }
  }
} 