import authService from '../services/auth.service.js';

class AuthController {

    async register(req, res) {
        try {
            const user = await authService.register(req.body);
            res.status(201).json(user);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    async login(req, res) {
        try {
            const result = await authService.login(req.body);
            res.json(result);
        } catch (err) {
            res.status(401).json({ error: err.message });
        }
    }
}

export default new AuthController();