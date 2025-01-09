import { FC, use } from "react";
import { IApiResponse, ITask } from "../../../entities/task/types/types";
import TaskCard from "./taskCard";
import { DeleteActionState, DeleteTaskAction } from "../libs/actions/actions";

interface ITaskList {
  tasksPromise: Promise<IApiResponse<ITask>>;
  action: DeleteTaskAction<DeleteActionState>;
}

const TaskList: FC<ITaskList> = ({ tasksPromise, action }) => {
  const { data: tasks } = use(tasksPromise);
  return (
    <section className="flex flex-col space-y-2">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} action={action} />
      ))}
    </section>
  );
};

export default TaskList;
