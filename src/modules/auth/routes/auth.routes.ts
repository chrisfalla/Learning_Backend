import { Router } from "express";
import { validateRequest } from "../../../shared/middleware/auth/validateRequest";
import { registerValidator } from "../validators/register.validators";
import { registerController } from "../controllers/register.controller";
import { loginController } from "../controllers/login.controller";
import { loginValidator } from "../validators/login.validator";

const router = Router();

router.post(
    "/register",
    validateRequest(registerValidator),
    registerController
);

router.post(
    "/login",
    validateRequest(loginValidator),
    loginController
);

export default router;
