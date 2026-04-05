import express from 'express';
import dotenv from 'dotenv';
import userController from './controllers/user.controller.js';

dotenv.config();

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('API running 🚀');
});

app.get('/api/users', userController.getAllUsers);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});