import { Router } from "express";
import { validateRequest } from "../../../shared/middleware/auth/validateRequest";
import { registerSchema } from "../validators/register.validators";
import { registerController } from "../controllers/register.controller"

const router = Router();

router.post(
    "/register",
    validateRequest(registerSchema),
    registerController
);

export default router;
