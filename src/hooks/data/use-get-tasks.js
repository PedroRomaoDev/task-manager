import { useQuery } from "@tanstack/react-query";

import { taskQueryKeys } from "../../keys/queries";
import { api } from "../../lib/axios";

export const useGetTasks = () => {
  return useQuery({
    queryKey: taskQueryKeys.getAll(),
    queryFn: async () => {
      // preciso pegar os dados da API, atualizar o meu state "tasks"
      const { data: tasks } = await api.get("/tasks");
      return tasks;
    },
  });
};
