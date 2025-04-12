import React, { useState, useEffect } from 'react';
import { Task, TaskStatus } from '../types/task';
import TaskList from '../components/tasks/TaskList';
import TaskForm from '../components/tasks/TaskForm';
import TaskStatusManager from '../components/tasks/TaskStatusManager';
import { tasksApi } from '../api/tasks';
import '../components/tasks/styles.css';

const TasksPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [statuses, setStatuses] = useState<TaskStatus[]>([]);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [showStatusManager, setShowStatusManager] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTasks();
    fetchStatuses();
  }, []);

  const fetchTasks = async () => {
    try {
      const data = await tasksApi.getTasks();
      setTasks(data || []);
    } catch (error) {
      setError('Failed to fetch tasks');
      console.error('Error fetching tasks:', error);
      setTasks([]);
    }
  };

  const fetchStatuses = async () => {
    try {
      const data = await tasksApi.getStatuses();
      setStatuses(data || []);
    } catch (error) {
      setError('Failed to fetch task statuses');
      console.error('Error fetching statuses:', error);
      setStatuses([]);
    }
  };

  const handleCreateTask = async (taskData: Omit<Task, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const newTask = await tasksApi.createTask(taskData);
      setTasks(prev => [...prev, newTask]);
      setShowTaskForm(false);
      setError(null);
    } catch (error) {
      setError('Failed to create task');
      console.error('Error creating task:', error);
    }
  };

  const handleUpdateTask = async (taskData: Omit<Task, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const updatedTask = await tasksApi.updateTask(editingTask!.id, taskData);
      setTasks(prev => prev.map(t => t.id === updatedTask.id ? updatedTask : t));
      setEditingTask(null);
      setShowTaskForm(false)
      setError(null);
    } catch (error) {
      setError('Failed to update task');
      console.error('Error updating task:', error);
    }
  };

  const handleDeleteTask = async (taskId: number) => {
    try {
      await tasksApi.deleteTask(taskId);
      setTasks(prev => prev.filter(t => t.id !== taskId));
      setError(null);
    } catch (error) {
      setError('Failed to delete task');
      console.error('Error deleting task:', error);
    }
  };

  const handleCreateStatus = async (name: string) => {
    try {
      const newStatus = await tasksApi.createStatus(name);
      await fetchStatuses();
      setError(null);
    } catch (error) {
      setError('Failed to create task status');
      console.error('Error creating status:', error);
    }
  };

  const handleUpdateStatus = async (id: number, name: string) => {
    try {
      const updatedStatus = await tasksApi.updateStatus(id, name);
      await fetchStatuses();
      setError(null);
    } catch (error) {
      setError('Failed to update task status');
      console.error('Error updating status:', error);
    }
  };

  const handleDeleteStatus = async (id: number) => {
    try {
      await tasksApi.deleteStatus(id);
      await fetchStatuses();
      setError(null);
    } catch (error) {
      setError('Failed to delete task status');
      console.error('Error deleting status:', error);
    }
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setShowTaskForm(true);
  };

  return (
    <div className="tasks-page">
      <div className="page-header">
        <h1>Tasks</h1>
        <div className="header-actions">
          <button
            className="secondary-button"
            onClick={() => setShowStatusManager(!showStatusManager)}
          >
            Manage Statuses
          </button>
          <button
            className="primary-button"
            onClick={() => {
              setEditingTask(null);
              setShowTaskForm(true);
            }}
          >
            Create Task
          </button>
        </div>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {showStatusManager && (
        <div className="status-manager-section">
          <TaskStatusManager
            statuses={statuses}
            onCreate={handleCreateStatus}
            onUpdate={handleUpdateStatus}
            onDelete={handleDeleteStatus}
          />
        </div>
      )}

      {showTaskForm && (
        <div className="task-form-section">
          <TaskForm
            task={editingTask || undefined}
            statuses={statuses}
            onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
            onCancel={() => {
              setShowTaskForm(false);
              setEditingTask(null);
            }}
          />
        </div>
      )}

      <div className="task-list-section">
        <TaskList
          tasks={tasks}
          statuses={statuses}
          onUpdate={handleUpdateTask}
          onDelete={handleDeleteTask}
          onEdit={handleEditTask}
        />
      </div>
    </div>
  );
};

export default TasksPage;