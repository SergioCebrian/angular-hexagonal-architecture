import { ITask } from "@task:domain/models/task.model";
import { taskValidationGroup } from "@task:domain/validations/task-validation"

export const taskValidation = (task: ITask) => {
    return taskValidationGroup(task);
}