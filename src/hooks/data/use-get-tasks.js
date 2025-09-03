import { useQuery } from "@tanstack/react-query";

export const useGetTasks = () => {
  return useQuery({
    queryKey: "tasks",
    queryFn: async () => {
      // preciso pegar os dados da API, atualizar o meu state "tasks"
      const response = await fetch("http://localhost:3000/tasks", {
        method: "GET",
      });
      const tasks = await response.json();
      return tasks;
    },
  });
};
