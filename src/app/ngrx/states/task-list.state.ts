export interface Task {
  id: string;
  title: string;
  description?: string;
}

export interface TaskListState {
  entities: Task[];
  isLoading: boolean;
}
