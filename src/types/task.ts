export type Priority = 'low' | 'medium' | 'high';

export interface Task {
  id: number;
  title: string;
  description: string;
  status_id: number;
  priority: Priority;
  owner: string;
  assigned: string;
  project_name: string;
  task_number: string;
  due_date: Date;
  created_at: Date;
  updated_at: Date;
  status?: TaskStatus;
}

export interface TaskStatus {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
}

export interface TaskFilter {
  status_id?: number;
  priority?: Priority;
  owner?: string;
  assigned?: string;
  project_name?: string;
  task_number?: string;
  due_date_from?: Date;
  due_date_to?: Date;
} 