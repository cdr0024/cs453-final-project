import { Router } from 'express';
import { db } from '../database.js';
import {
  authenticateToken,
  requireRole
} from "../middleware/auth.js";

export const tasksRouter = Router();

function part3NotImplemented(req, res, next) {
  return res.status(501).json({
    error: "Part 3 middleware has not been implemented."
  });
}

tasksRouter.get(
    "/",
    // TODO(PART 3): Replace part3NotImplemented with the required
    // authentication and role-authorization middleware.
    authenticateToken,
    requireRole("student", "instructor"),
    (req, res) => {
      res.json({
        userId: req.user.sub,
        tasks: []
      });
    }
);

tasksRouter.get('/:id',
    // TODO(PART 4): Add the required authentication and authorization middleware.
    authenticateToken,
    requireRole("student", "instructor"),
    async (req, res, next) => {
  // TODO(PART 4): Query req.params.id with parameterized SQL using db.query(sql, parameters).
  // req.params.id, req.user.sub, req.user.role, db.query(), and next(error) are available here.
  try {
    const result = await db.query(
      `SELECT
        id,
        title,
        course,
        student_id AS studentId,
        completed
      FROM tasks
      WHERE id = ?`,
      [req.params.id]
    );


    // TODO(PART 4): Return 404 when no task exists, allow instructors, and check student ownership.
    if (result.rows.length === 0) {
      return res.status(404).json({
        error: 'Not found'
      });
    }
    const task = result.rows[0];
    // TODO(PART 4): Return 403 for another student's task; return the task on success.
    if (req.user.role === "student" && task.studentId !== req.user.sub) {
      return res.status(403).json({
        error: 'Forbidden'
      });
    }


    return res.status(200).json({ ...task, completed: Boolean(task.completed)});

  } catch (error) {
    return next(error);
  }

  
});

tasksRouter.delete(
    "/:id",
    // TODO(PART 3): Replace part3NotImplemented with authentication
    // and instructor-only authorization middleware.
    authenticateToken,
    requireRole("instructor"),
    async (req, res, next) => {
      try {
        const result = await db.run(
            "DELETE FROM tasks WHERE id = ?",
            [req.params.id]
        );

        if (result.changes === 0) {
          return res.status(404).json({ error: "Not Found" });
        }

        return res.status(204).end();
      } catch (error) {
        return next(error);
      }
    }
);
