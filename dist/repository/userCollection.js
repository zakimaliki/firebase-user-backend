"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const firebaseConfig_1 = require("../config/firebaseConfig");
const COLLECTION_NAME = 'users';
class UserRepository {
    constructor() {
        this.collection = firebaseConfig_1.db.collection(COLLECTION_NAME);
    }
    async create(userData) {
        const docRef = this.collection.doc();
        const user = {
            id: docRef.id,
            email: userData.email,
            name: userData.name,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        await docRef.set(user);
        return user;
    }
    async findById(id) {
        const doc = await this.collection.doc(id).get();
        return doc.exists ? doc.data() : null;
    }
    async update(id, userData) {
        const docRef = this.collection.doc(id);
        const updateData = {
            ...userData,
            updatedAt: new Date(),
        };
        await docRef.update(updateData);
        return this.findById(id);
    }
    async delete(id) {
        try {
            await this.collection.doc(id).delete();
            return true;
        }
        catch (error) {
            return false;
        }
    }
}
exports.UserRepository = UserRepository;
