import { ITask } from "@task:domain/models/task.model";
import { taskId } from "./task-id";
import { taskIsCompleted } from "./task-completed";
import { taskTitle } from "./task-title";

export const taskValidationGroup = (task: ITask) => {
    const { id, isCompleted, title } = task;
    if (!taskId(id)) {
        throw new Error(`Id field must be a string.`);
    }
    if (!taskIsCompleted(isCompleted)) {
        throw new Error(`IsCompleted field must be false.`);
    }
    if (!taskTitle(title)) {
        throw new Error(`Title field must be a string.`);
    }
};