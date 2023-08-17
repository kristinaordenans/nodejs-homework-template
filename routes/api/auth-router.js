import express from 'express';
import validateBody from '../../decorators/validateBody.js';
import usersSchemas from '../../schemas/user-schemas.js';
import authController from '../../controllers/auth-controller.js';

const authRouter = express.Router();

authRouter.post("/users/register", validateBody(usersSchemas.userSignupSchema),authController.signup);
authRouter.post("/users/login", validateBody(usersSchemas.userLoginSchema),authController.signin);
// http://localhost:3000/api/auth/users/login

export default authRouter;