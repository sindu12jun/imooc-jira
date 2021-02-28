import { useLocation } from "react-router";
import { useProject } from "utils/project";
import { useKanbans } from "utils/kanban";
import { useTasks } from "utils/task";

export const useProjectIdInUrl = () => {
  const { pathname } = useLocation();
  const id = pathname.match(/projects\/(\d+)/)?.[1];
  return Number(id);
};

export const useProjectInUrl = () => useProject(useProjectIdInUrl());

export const useKanbansInProject = () =>
  useKanbans({ projectId: useProjectIdInUrl() });

export const useTasksInProject = () =>
  useTasks({ projectId: useProjectIdInUrl() });
