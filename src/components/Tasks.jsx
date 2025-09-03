import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { CloudSunIcon, MoonIcon, SunIcon } from "../assets/icons";
import { useGetTasks } from "../hooks/data/use-get-tasks";
import { taskQueryKeys } from "../keys/queries";
import Header from "./Header";
import TaskItem from "./TaskItem";
import TasksSeparator from "./TasksSeparator";

const Tasks = () => {
  const queryClient = useQueryClient();
  const { data: tasks } = useGetTasks();

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
    queryClient.setQueryData(taskQueryKeys.getAll(), newTasks);
  };

  return (
    // HEADER
    <div className="w-full space-y-6 px-8 py-16">
      <Header subtitle="Minhas Tarefas" title="Minhas Tarefas" />

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
