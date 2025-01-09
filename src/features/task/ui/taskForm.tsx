import { FC, memo, useActionState } from "react";
import { CreateActionState, CreateTaskAction } from "../libs/actions/actions";

interface ITaskForm {
  action: CreateTaskAction<CreateActionState>;
}

const TaskForm: FC<ITaskForm> = memo(({ action }) => {
  const [state, dispatch, isPending] = useActionState(action, {});

  return (
    <section>
      <form className="flex flex-col space-y-2" action={dispatch}>
        <input
          name="title"
          placeholder="Введите название.."
          className="outline-none p-3 px-5 border border-rose-600 rounded-lg"
        />
        <button
          disabled={isPending}
          type="submit"
          className="p-2 flex justify-center px-5 border bg-rose-400 border-rose-600 rounded-lg"
        >
          Add
        </button>
        {state.error && <span className="text-red-400">{state.error}</span>}
      </form>
    </section>
  );
});
export default TaskForm;
