import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

import {
  AddIcon,
  CloudSunIcon,
  MoonIcon,
  SunIcon,
  TrashIcon,
} from "../assets/icons";
import { useGetTasks } from "../hooks/data/use-get-tasks";
import AddTaskDialog from "./AddTaskDialog";
import Button from "./Button";
import TaskItem from "./TaskItem";
import TasksSeparator from "./TasksSeparator";

const Tasks = () => {
  const queryClient = useQueryClient();
  const { data: tasks } = useGetTasks();
  const [addTaskDialogIsOpen, setAddTaskDialogIsOpen] = useState(false);

  const morningTasks = tasks?.filter((task) => task.time === "morning");
  const afternoonTasks = tasks?.filter((task) => task.time === "afternoon");
  const eveningTasks = tasks?.filter((task) => task.time === "evening");

  const handleTaskCheckboxClick = (taskId) => {
    const newTasks = tasks.map((task) => {
      if (task.id !== taskId) {
        return task;
      }
      // essa tarefa eu preciso atualizar

      if (task.status === "not_started") {
        toast.success("Tarefa iniciada com sucesso!");
        return {
          ...task,
          status: "in_progress",
        };
      }

      if (task.status === "in_progress") {
        toast.success("Tarefa concluída com sucesso!");
        // aqui eu preciso atualizar o status para "done"
        // e não preciso mais do toast, pois já foi feito na linha anterior
        return {
          ...task,
          status: "done",
        };
      }

      if (task.status === "done") {
        toast.success("Tarefa reiniciada!");
        // aqui eu preciso atualizar o status para "not_started"
        return {
          ...task,
          status: "not_started",
        };
      }

      return task;
    });
    queryClient.setQueryData("tasks", newTasks);
  };

  return (
    // HEADER
    <div className="w-full space-y-6 px-8 py-16">
      <div className="flex w-full justify-between">
        <div>
          <span className="text-xs font-semibold text-brand-primary">
            Minhas Tarefas
          </span>
          <h2 className="text-xl font-semibold">Minhas Tarefas</h2>
        </div>

        <div className="flex items-center gap-3">
          <Button color="ghost">
            Limpar tarefas
            <TrashIcon />
          </Button>

          <Button onClick={() => setAddTaskDialogIsOpen(true)}>
            <AddIcon />
            Nova tarefa
          </Button>
          <AddTaskDialog
            isOpen={addTaskDialogIsOpen}
            handleClose={() => setAddTaskDialogIsOpen(false)}
          />
        </div>
      </div>

      {/* MANHÃ */}
      <div className="rounded-xl bg-white p-6">
        <div className="space-y-3">
          <TasksSeparator title="Manhã" icon={<SunIcon />} />
          {morningTasks?.length === 0 && (
            <span className="text-sm text-brand-text-gray">
              Nenhuma tarefa para o período da manhã.
            </span>
          )}
          {/* TAREFAS DE MANHÃ */}
          {morningTasks?.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleCheckboxClick={handleTaskCheckboxClick}
            />
          ))}
        </div>

        {/* TARDE */}
        <div className="my-6 space-y-3">
          <TasksSeparator title="Tarde" icon={<CloudSunIcon />} />
          {afternoonTasks?.length === 0 && (
            <span className="text-sm text-brand-text-gray">
              Nenhuma tarefa para o período da tarde.
            </span>
          )}
          {/* TAREFAS DE TARDE */}
          {afternoonTasks?.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleCheckboxClick={handleTaskCheckboxClick}
            />
          ))}
        </div>

        {/* NOITE */}
        <div className="space-y-3">
          <TasksSeparator title="Noite" icon={<MoonIcon />} />
          {eveningTasks?.length === 0 && (
            <span className="text-sm text-brand-text-gray">
              Nenhuma tarefa para o período da noite.
            </span>
          )}
          {/* TAREFAS DE NOITE */}
          {eveningTasks?.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleCheckboxClick={handleTaskCheckboxClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default Tasks;
