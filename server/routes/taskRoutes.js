import express from "express";
import {
  createSubTask,
  createTask,
  dashboardStatistics,
  deleteRestoreTask,
  duplicateTask,
  getTask,
  getTasks,
  leaveTask,
  postTaskActivity,
  trashTask,
  updateTask,
} from "../controllers/taskController.js";
import { isAdminRoute, protectRoute } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create", protectRoute, createTask);
// router.post("/duplicate/:id", protectRoute, isAdminRoute, duplicateTask);
router.post("/activity/:id", protectRoute, postTaskActivity);
router.delete("/leave/:id",protectRoute,leaveTask);
router.get("/dashboard", protectRoute, dashboardStatistics);
router.get("/:stage/:id", protectRoute, getTasks);
router.get("/by-id/id/:id", protectRoute, getTask);
router.get("/:id", protectRoute, getTasks);
// router.get("/trashed/:id", protectRoute, getTrashedTasks);
router.put("/create-subtask/:id", protectRoute, isAdminRoute, createSubTask);
router.put("/update/:id", protectRoute, updateTask);
router.put("/trash/:id", protectRoute, trashTask);

router.delete(
  "/delete-restore/:id?",
  protectRoute,
  deleteRestoreTask
);

export default router;