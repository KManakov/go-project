import { Task, TaskStatus } from '../types/task';

const API_BASE_URL = '/api';

// Helper function to convert date strings to Date objects
const parseDates = (obj: any): any => {
  const dateFields = ['due_date', 'created_at', 'updated_at'];
  const result = { ...obj };
  
  for (const field of dateFields) {
    if (result[field]) {
      result[field] = new Date(result[field]);
    }
  }
  
  return result;
};

// Helper function to format dates for API requests
const formatDates = (obj: any): any => {
  const result = { ...obj };
  
  if (result.due_date instanceof Date) {
    result.due_date = result.due_date.toISOString();
  }

  // Convert status_id to number if it's a string
  if (typeof result.status_id === 'string') {
    result.status_id = parseInt(result.status_id, 10);
  }
  
  return result;
};

export const tasksApi = {
  // Tasks
  getTasks: async (): Promise<Task[]> => {
    const response = await fetch(`${API_BASE_URL}/tasks`);
    if (!response.ok) {
      throw new Error('Failed to fetch tasks');
    }
    const data = await response.json();
    return data ? data.map(parseDates) : [];
  },

  getTask: async (id: number): Promise<Task> => {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch task');
    }
    const data = await response.json();
    return parseDates(data);
  },

  createTask: async (task: Omit<Task, 'id' | 'created_at' | 'updated_at'>): Promise<Task> => {
    const formattedTask = formatDates(task);
    console.log('Отправка данных задачи:', formattedTask);
    
    // Ensure all required fields are present
    if (!formattedTask.title || !formattedTask.status_id || !formattedTask.priority || 
        !formattedTask.owner || !formattedTask.project_name || !formattedTask.task_number) {
      console.error('Отсутствуют обязательные поля:', {
        title: !!formattedTask.title,
        status_id: !!formattedTask.status_id,
        priority: !!formattedTask.priority,
        owner: !!formattedTask.owner,
        project_name: !!formattedTask.project_name,
        task_number: !!formattedTask.task_number
      });
      throw new Error('Missing required fields');
    }
    
    const response = await fetch(`${API_BASE_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formattedTask),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Ошибка сервера:', errorData);
      throw new Error('Failed to create task');
    }
    
    // const data = await response.json();
    const text = await response.text();
    const data = text ? JSON.parse(text) : {};
    console.log('Задача успешно создана:', data);
    return parseDates(data);
  },

  updateTask: async (id: number, task: Partial<Task>): Promise<Task> => {
    const formattedTask = formatDates(task);
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formattedTask),
    });
    if (!response.ok) {
      throw new Error('Failed to update task');
    }
    const text = await response.text();
    if (text) {
      const data = JSON.parse(text);
      return parseDates(data);
    } else {
      return parseDates({ id, ...formattedTask } as Task);
    }
  },

  deleteTask: async (id: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete task');
    }
  },

  // Task Statuses
  getStatuses: async (): Promise<TaskStatus[]> => {
    console.log('Запрос списка статусов...');
    const response = await fetch(`${API_BASE_URL}/statuses`);
    if (!response.ok) {
      console.error('Ошибка при получении статусов:', response.statusText);
      throw new Error('Failed to fetch task statuses');
    }
    const data = await response.json();
    console.log('Получены статусы:', data);
    return data ? data.map(parseDates) : [];
  },

  getStatus: async (id: number): Promise<TaskStatus> => {
    const response = await fetch(`${API_BASE_URL}/statuses/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch task status');
    }
    const data = await response.json();
    return parseDates(data);
  },

  createStatus: async (name: string): Promise<TaskStatus> => {
    const response = await fetch(`${API_BASE_URL}/statuses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    });
    if (!response.ok) {
      throw new Error('Failed to create task status');
    }
    const data = await response.json();
    return parseDates(data);
  },

  updateStatus: async (id: number, name: string): Promise<TaskStatus> => {
    const response = await fetch(`${API_BASE_URL}/statuses/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    });
    if (!response.ok) {
      throw new Error('Failed to update task status');
    }
    const data = await response.json();
    return parseDates(data);
  },

  deleteStatus: async (id: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/statuses/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete task status');
    }
  },
}; 