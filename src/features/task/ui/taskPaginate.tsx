import { FC, use, useTransition } from "react";
import { IApiResponse, ITask } from "../../../entities/task/types/types";

interface IPagination {
  tasksPaginated: Promise<IApiResponse<ITask>>;
  onPageChange: (page: number) => void;
}

const TaskPaginate: FC<IPagination> = ({ tasksPaginated, onPageChange }) => {
  const [isPending, startTransition] = useTransition();
  const { last, first, next, prev, pages, page } = use(tasksPaginated);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement>) => {
    const page = Number(event.currentTarget.value);
    startTransition(() => onPageChange(page));
  };

  return (
    <nav className="flex items-center justify-between">
      <div className="flex justify-center w-full">
        <button
          disabled={isPending}
          value={String(first)}
          className="px-3 py-2 rounded-l"
          onClick={handleChangePage}
        >
          First {first}
        </button>
        {prev && (
          <button
            disabled={isPending}
            value={String(prev)}
            className="px-3 py-2"
            onClick={handleChangePage}
          >
            Prev {prev}
          </button>
        )}
        {next && (
          <button
            disabled={isPending}
            value={String(next)}
            className="px-3 py-2"
            onClick={handleChangePage}
          >
            Next {next}
          </button>
        )}
        <button
          disabled={isPending}
          value={String(last)}
          className="px-3 py-2 rounded-r"
          onClick={handleChangePage}
        >
          Last {last}
        </button>
      </div>
      <span className="text-sm w-20">
        Page {page} of {pages}
      </span>
    </nav>
  );
};

export default TaskPaginate;
