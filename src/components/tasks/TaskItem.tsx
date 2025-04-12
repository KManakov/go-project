import React, { useEffect, useState } from 'react';
import { Task, TaskStatus } from '../../types/task';
import ConfirmDialog from '../common/ConfirmDialog';

interface TaskItemProps {
  task: Task;
  statuses: TaskStatus[];
  onEdit: (task: Task) => void;
  onUpdate: (task: Task) => void;
  onDelete: (taskId: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, statuses,onEdit, onUpdate, onDelete }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleStatusChange = (newStatusId: number) => {
    onUpdate({ ...task, status_id: newStatusId });
  };

  const handlePriorityChange = (newPriority: Task['priority']) => {
    onUpdate({ ...task, priority: newPriority });
  };

  const handleDateChange = (dateStr: string) => {
    onUpdate({ ...task, due_date: new Date(dateStr) });
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = () => {
    onDelete(task.id);
    setShowDeleteConfirm(false);
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirm(false);
  };

  return (
    <>
      <div className="task-item">
        <div className="task-header">
          <h3>{task.title}</h3>
          <span className="task-number">{task.task_number}</span>
        </div>
        
        <div className="task-content">
          <p className="description">{task.description}</p>
          
          <div className="task-meta">
            <div className="meta-item">
              <label>Status:</label>
              <select 
                value={task.status_id} 
                onChange={(e) => handleStatusChange(Number(e.target.value))}
              >
                {statuses.map(status => (
                  <option key={status.id} value={status.id}>
                    {status.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="meta-item">
              <label>Priority:</label>
              <select 
                value={task.priority} 
                onChange={(e) => handlePriorityChange(e.target.value as Task['priority'])}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            
            <div className="meta-item">
              <label>Due Date:</label>
              <input 
                type="date" 
                value={task.due_date instanceof Date ? task.due_date.toISOString().split('T')[0] : ''} 
                onChange={(e) => handleDateChange(e.target.value)}
              />
            </div>
            
            <div className="meta-item">
              <label>Owner:</label>
              <span>{task.owner}</span>
            </div>
            
            <div className="meta-item">
              <label>Assigned:</label>
              <span>{task.assigned}</span>
            </div>
          </div>
        </div>
        
        <div className="task-actions">
            <button className="delete-button" onClick={handleDeleteClick}>Delete</button>
            <button className="edit-button" onClick={() => onEdit(task)}>Edit</button>
        </div>
      </div>

      {showDeleteConfirm && (
        <ConfirmDialog
          title="Delete Task"
          message="Are you sure you want to delete this task? This action cannot be undone."
          confirmLabel="Delete"
          cancelLabel="Cancel"
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
        />
      )}
    </>
  );
};

export default TaskItem; 