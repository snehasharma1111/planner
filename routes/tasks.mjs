import { Router } from "express";
import { getAllTaks, getTask } from "../controllers/tasks.mjs";
import auth from "../middleware/auth.mjs";

const router = Router();

router.get("/", auth, getAllTaks);
router.get("/:id", auth, getTask);

export default router;
