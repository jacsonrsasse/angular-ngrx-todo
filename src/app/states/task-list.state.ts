export interface Task {
  id: number;
  title: string;
  description?: string;
}

export interface TaskListState {
  entities: Task[];
  isLoading: boolean;
}
