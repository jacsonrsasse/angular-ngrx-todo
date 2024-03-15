export interface Task {
  id: string;
  title: string;
  completed: boolean;
  description?: string;
}

export interface TaskState {
  tasks: Task[];
  isLoading: boolean;
}
