import PropTypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

import { CheckIcon, DetailsIcon, LoaderIcon, TrashIcon } from "../assets/icons";
import Button from "./Button";

const TaskItem = ({ task, handleCheckboxClick, onDeleteSucess }) => {
  const [deleteIsLoading, setDeleteIsLoading] = useState(false);

  const handleDeleteClick = async () => {
    setDeleteIsLoading(true);
    // Chamar API para deletar essa tarefa
    const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      setDeleteIsLoading(false);
      return toast.error("Erro ao deletar tarefa. Por favor, tente novamente.");
    }
    onDeleteSucess(task.id);
    setDeleteIsLoading(false);
  };
  const getStatusClasses = () => {
    if (task.status === "done") {
      return "bg-brand-primary text-brand-primary";
    }

    if (task.status === "in_progress") {
      return "bg-brand-process text-brand-process";
    }

    if (task.status === "not_started") {
      return "bg-brand-dark-blue bg-opacity-10 text-brand-dark-blue";
    }
  };

  return (
    <div
      className={`flex items-center justify-between gap-2 rounded-lg bg-opacity-10 px-4 py-3 text-sm transition ${getStatusClasses()}`}
    >
      <div className="flex items-center gap-2">
        <label
          className={`relative flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg ${getStatusClasses()}`}
        >
          <input
            type="checkbox"
            checked={task.status === "done"}
            className="absolute h-full w-full cursor-pointer opacity-0"
            onChange={() => handleCheckboxClick(task.id)}
          />
          {task.status === "done" && <CheckIcon />}
          {task.status === "in_progress" && (
            <LoaderIcon className="animate-spin text-brand-white" />
          )}
        </label>

        {task.title}
      </div>

      <div className="flex items-center gap-2">
        <Button
          color="ghost"
          onClick={handleDeleteClick}
          disabled={deleteIsLoading}
        >
          {deleteIsLoading ? (
            <LoaderIcon className="animate-spin text-brand-text-gray" />
          ) : (
            <TrashIcon className="text-brand-text-gray" />
          )}
        </Button>
        <Link to={`/task/${task.id}`} className="transition hover:opacity-75">
          <DetailsIcon />
        </Link>
      </div>
    </div>
  );
};

TaskItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    time: PropTypes.oneOf(["morning", "afternoon", "evening"]).isRequired,
    status: PropTypes.oneOf(["done", "in_progress", "not_started"]).isRequired,
  }).isRequired,
  handleCheckboxClick: PropTypes.func.isRequired,
  handleDeleteClick: PropTypes.func.isRequired,
  // task: objeto que representa a tarefa, contendo id, título , descricao, tempo e status
  // handleCheckboxClick: função chamada ao clicar no checkbox, recebe o id da tarefa
  // handleDeleteClick: função chamada ao clicar no botão de deletar, recebe o id da tarefa
};

export default TaskItem;
