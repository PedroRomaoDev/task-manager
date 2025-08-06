import { useEffect, useState } from "react";
import { toast } from "sonner";

import {
  AddIcon,
  CloudSunIcon,
  MoonIcon,
  SunIcon,
  TrashIcon,
} from "../assets/icons";
import AddTaskDialog from "./AddTaskDialog";
import Button from "./Button";
import TaskItem from "./TaskItem";
import TasksSeparator from "./TasksSeparator";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [addTaskDialogIsOpen, setAddTaskDialogIsOpen] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      // preciso pegar os dados da API, atualizar o meu state "tasks"
      const response = await fetch("http://localhost:3000/tasks", {
        method: "GET",
      });

      const tasks = await response.json();

      // após pegar os dados, preciso atualizar o state
      setTasks(tasks);
    };

    fetchTasks();
  }, []);

  const morningTasks = tasks.filter((task) => task.time === "morning");
  const afternoonTasks = tasks.filter((task) => task.time === "afternoon");
  const eveningTasks = tasks.filter((task) => task.time === "evening");

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
    setTasks(newTasks);
  };

  const handleTaskDeleteClick = async (taskId) => {
    // chamar API para deletar essa tarefa
    const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      return toast.error("Erro ao deletar tarefa. Por favor, tente novamente.");
    }
    // apos chamar a API, preciso atualizar o state
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(newTasks);
    toast.success("Tarefa deletada com sucesso!");
  };

  const handleAddTaskSubmit = async (task) => {
    // chamar API para adicionar essa tarefa
    const response = await fetch("http://localhost:3000/tasks", {
      method: "POST",
      body: JSON.stringify(task),
    });
    if (!response.ok) {
      return toast.error(
        "Erro ao adicionar tarefa. Por favor, tente novamente.",
      );
    }
    setTasks([...tasks, task]);

    toast.success("Tarefa adicionada com sucesso!");
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
            handleSubmit={handleAddTaskSubmit}
          />
        </div>
      </div>

      {/* MANHÃ */}
      <div className="rounded-xl bg-white p-6">
        <div className="space-y-3">
          <TasksSeparator title="Manhã" icon={<SunIcon />} />
          {/* TAREFAS DE MANHÃ */}
          {morningTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleCheckboxClick={handleTaskCheckboxClick}
              handleDeleteClick={handleTaskDeleteClick}
            />
          ))}
        </div>

        {/* TARDE */}
        <div className="my-6 space-y-3">
          <TasksSeparator title="Tarde" icon={<CloudSunIcon />} />
          {/* TAREFAS DE TARDE */}
          {afternoonTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleCheckboxClick={handleTaskCheckboxClick}
              handleDeleteClick={handleTaskDeleteClick}
            />
          ))}
        </div>

        {/* NOITE */}
        <div className="space-y-3">
          <TasksSeparator title="Noite" icon={<MoonIcon />} />
          {/* TAREFAS DE NOITE */}
          {eveningTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleCheckboxClick={handleTaskCheckboxClick}
              handleDeleteClick={handleTaskDeleteClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default Tasks;
