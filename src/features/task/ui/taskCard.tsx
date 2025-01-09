import { FC, useActionState } from "react";
import { ITask } from "../../../entities/task/types/types";
import { DeleteActionState, DeleteTaskAction } from "../libs/actions/actions";

interface ITaskCard {
  task: ITask;
  action: DeleteTaskAction<DeleteActionState>;
}

const TaskCard: FC<ITaskCard> = ({ task, action }) => {
  const [state, dispatch, isPending] = useActionState(action, {});

  return (
    <div className="p-5 flex justify-between items-center cursor-pointer border bg-rose-100 border-rose-600 rounded-lg">
      <h4>{task.title}</h4>
      <form action={dispatch}>
        <input type="hidden" name="taskId" value={task.id} />
        <button
          disabled={isPending}
          type="submit"
          value={task.id}
          className="p-2 flex justify-center px-5 border bg-rose-400 border-rose-600 rounded-lg"
        >
          Удалить
        </button>
      </form>
      {state.error && <span className="text-red-500">{state.error}</span>}
    </div>
  );
};

export default TaskCard;
