import express from 'express';
import dotenv from 'dotenv';
import userController from './controllers/user.controller.js';
import authRoutes from './routes/auth.routes.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('API running 🚀');
});

app.get('/api/users', userController.getAllUsers);
app.get('/api/users/:id', userController.getUserById);
app.get('/api/users/email/:email', userController.getUserByEmail);
app.post('/api/users', userController.createUser);
app.put('/api/users/:id', userController.updateUser);
app.delete('/api/users/:id', userController.deleteUser);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});