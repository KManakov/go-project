import React, { useState, useEffect } from 'react';
import { Task, Priority, TaskStatus } from '../../types/task';

interface TaskFormProps {
  task?: Task;
  statuses: TaskStatus[];
  onSubmit: (task: Omit<Task, 'id' | 'created_at' | 'updated_at'>) => void;
  onCancel: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ task, statuses, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<Omit<Task, 'id' | 'created_at' | 'updated_at'>>({
    title: '',
    description: '',
    status_id: statuses[0]?.id || 0,
    priority: 'medium',
    owner: '',
    assigned: '',
    project_name: '',
    task_number: '',
    due_date: new Date(),
  });

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description,
        status_id: task.status_id,
        priority: task.priority,
        owner: task.owner,
        assigned: task.assigned,
        project_name: task.project_name,
        task_number: task.task_number,
        due_date: task.due_date,
      });
    }
  }, [task]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === 'due_date') {
      // Convert date string to Date object at midnight UTC
      const [year, month, day] = value.split('-').map(Number);
      const date = new Date(Date.UTC(year, month - 1, day));
      setFormData(prev => ({ ...prev, [name]: date }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="status_id">Status</label>
          <select
            id="status_id"
            name="status_id"
            value={formData.status_id}
            onChange={handleChange}
            required
          >
            {statuses.map(status => (
              <option key={status.id} value={status.id}>
                {status.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="priority">Priority</label>
          <select
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            required
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="owner">Owner</label>
          <input
            type="text"
            id="owner"
            name="owner"
            value={formData.owner}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="assigned">Assigned To</label>
          <input
            type="text"
            id="assigned"
            name="assigned"
            value={formData.assigned}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="project_name">Project</label>
          <input
            type="text"
            id="project_name"
            name="project_name"
            value={formData.project_name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="task_number">Task Number</label>
          <input
            type="text"
            id="task_number"
            name="task_number"
            value={formData.task_number}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="due_date">Due Date</label>
        <input
          type="date"
          id="due_date"
          name="due_date"
          value={formData.due_date instanceof Date ? formData.due_date.toISOString().split('T')[0] : ''}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-actions">
        <button type="submit" className="submit-button">
          {task ? 'Update Task' : 'Create Task'}
        </button>
        <button type="button" className="cancel-button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default TaskForm; 