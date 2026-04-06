import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userRepository from '../repositories/user.repository.js';

const JWT_SECRET = process.env.JWT_SECRET;

class AuthService {

    async register({ username, email, password }) {
        // vérifier si user existe
        const existingUser = await userRepository.findByEmail(email);
        if (existingUser) {
            throw new Error('User already exists');
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // créer user
        const user = await userRepository.create({
            username,
            email,
            password: hashedPassword
        });

        return user;
    }

    async login({ email, password }) {
        const user = await userRepository.findByEmail(email);

        if (!user) {
            throw new Error('Invalid credentials');
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            throw new Error('Invalid credentials');
        }

        // créer token
        const token = jwt.sign(
            { userId: user.id },
            JWT_SECRET,
            { expiresIn: '1d' }
        );

        return { token };
    }
}

export default new AuthService();