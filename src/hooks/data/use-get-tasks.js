import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetTasks = () => {
  return useQuery({
    queryKey: "tasks",
    queryFn: async () => {
      // preciso pegar os dados da API, atualizar o meu state "tasks"
      const { data: tasks } = await axios.get("http://localhost:3000/tasks");
      return tasks;
    },
  });
};
