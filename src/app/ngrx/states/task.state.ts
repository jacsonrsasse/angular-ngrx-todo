export interface Task {
  id: string;
  title: string;
  description?: string;
}

export interface TaskState {
  tasks: Task[];
  isLoading: boolean;
}
