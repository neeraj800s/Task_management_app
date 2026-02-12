const ErrorResponse = require('../utils/errorResponse');
const Task = require('../models/Task');
const User = require('../models/User');
const logActivity = require('../services/loggerService');

exports.getTasks = async (req, res, next) => {
    try {
        const tasks = await Task.findAll({ where: { userId: req.user.id } });

        res.status(200).json({
            success: true,
            count: tasks.length,
            data: tasks
        });
    } catch (err) {
        next(err);
    }
};

exports.getTask = async (req, res, next) => {
    try {
        const task = await Task.findOne({
            where: { id: req.params.id, userId: req.user.id }
        });

        if (!task) {
            return next(
                new ErrorResponse(`Task not found with id of ${req.params.id}`, 404)
            );
        }

        res.status(200).json({
            success: true,
            data: task
        });
    } catch (err) {
        next(err);
    }
};

exports.createTask = async (req, res, next) => {
    req.body.userId = req.user.id;

    try {
        const task = await Task.create(req.body);

        await logActivity(req.user.id, 'TASK_CREATED', req, { taskId: task.id, title: task.title });

        res.status(201).json({
            success: true,
            data: task
        });
    } catch (err) {
        next(err);
    }
};

exports.updateTask = async (req, res, next) => {
    let task = await Task.findOne({
        where: { id: req.params.id, userId: req.user.id }
    });

    if (!task) {
        return next(
            new ErrorResponse(`Task not found with id of ${req.params.id}`, 404)
        );
    }

    if (task.userId !== req.user.id) {
        return next(
            new ErrorResponse(
                `User ${req.user.id} is not authorized to update this task`,
                401
            )
        );
    }

    task = await task.update(req.body);

    await logActivity(req.user.id, 'TASK_UPDATED', req, { taskId: task.id });

    res.status(200).json({
        success: true,
        data: task
    });
};

exports.deleteTask = async (req, res, next) => {
    const task = await Task.findOne({
        where: { id: req.params.id, userId: req.user.id }
    });

    if (!task) {
        return next(
            new ErrorResponse(`Task not found with id of ${req.params.id}`, 404)
        );
    }

    if (task.userId !== req.user.id) {
        return next(
            new ErrorResponse(
                `User ${req.user.id} is not authorized to delete this task`,
                401
            )
        );
    }

    await task.destroy();

    await logActivity(req.user.id, 'TASK_DELETED', req, { taskId: task.id });

    res.status(200).json({
        success: true,
        data: {}
    });
};
