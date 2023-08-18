import express from 'express';
import validateBody from '../../decorators/validateBody.js';
import usersSchemas from '../../schemas/user-schemas.js';
import authController from '../../controllers/auth-controller.js';
import { authenticate } from '../../middlewares/index.js';

const authRouter = express.Router();

authRouter.post("/users/register", validateBody(usersSchemas.userSignupSchema), authController.signup);

authRouter.post("/users/login", validateBody(usersSchemas.userLoginSchema), authController.signin);

authRouter.get("/users/current", authenticate, authController.getCurrent);

authRouter.post("/users/signout", authenticate, authController.signout);

export default authRouter;