"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const userCollection_1 = require("../repository/userCollection");
class UserController {
    constructor() {
        this.userRepository = new userCollection_1.UserRepository();
    }
    async createUser(req, res) {
        try {
            const userData = req.body;
            const user = await this.userRepository.create(userData);
            res.status(201).json(user);
        }
        catch (error) {
            res.status(500).json({ message: 'Error creating user' });
        }
    }
    async getUser(req, res) {
        try {
            const userId = req.params.id;
            const user = await this.userRepository.findById(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(user);
        }
        catch (error) {
            res.status(500).json({ message: 'Error fetching user' });
        }
    }
    async updateUser(req, res) {
        try {
            const userId = req.params.id;
            const userData = req.body;
            const updatedUser = await this.userRepository.update(userId, userData);
            if (!updatedUser) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(updatedUser);
        }
        catch (error) {
            res.status(500).json({ message: 'Error updating user' });
        }
    }
    async deleteUser(req, res) {
        try {
            const userId = req.params.id;
            const success = await this.userRepository.delete(userId);
            if (!success) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(204).send();
        }
        catch (error) {
            res.status(500).json({ message: 'Error deleting user' });
        }
    }
}
exports.UserController = UserController;
