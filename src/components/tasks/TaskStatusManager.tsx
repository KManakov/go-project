import React, { useState } from 'react';
import { TaskStatus } from '../../types/task';

interface TaskStatusManagerProps {
  statuses: TaskStatus[];
  onCreate: (name: string) => void;
  onUpdate: (id: number, name: string) => void;
  onDelete: (id: number) => void;
}

const TaskStatusManager: React.FC<TaskStatusManagerProps> = ({
  statuses,
  onCreate,
  onUpdate,
  onDelete,
}) => {
  const [newStatusName, setNewStatusName] = useState('');
  const [editingStatus, setEditingStatus] = useState<TaskStatus | null>(null);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (newStatusName.trim()) {
      onCreate(newStatusName.trim());
      setNewStatusName('');
    }
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingStatus && editingStatus.name.trim()) {
      onUpdate(editingStatus.id, editingStatus.name.trim());
      setEditingStatus(null);
    }
  };

  const startEditing = (status: TaskStatus) => {
    setEditingStatus(status);
  };

  const cancelEditing = () => {
    setEditingStatus(null);
  };

  return (
    <div className="task-status-manager">
      <h2>Task Statuses</h2>
      
      <form onSubmit={handleCreate} className="status-form">
        <div className="form-group">
          <input
            type="text"
            value={newStatusName}
            onChange={(e) => setNewStatusName(e.target.value)}
            placeholder="Enter new status name"
            required
          />
        </div>
        <button type="submit" className="add-button">
          Add Status
        </button>
      </form>

      <div className="statuses-list">
        {statuses.map(status => (
          <div key={status.id} className="status-item">
            {editingStatus?.id === status.id ? (
              <form onSubmit={handleUpdate} className="edit-form">
                <input
                  type="text"
                  value={editingStatus.name}
                  onChange={(e) => setEditingStatus({ ...editingStatus, name: e.target.value })}
                  required
                />
                <div className="edit-actions">
                  <button type="submit" className="save-button">
                    Save
                  </button>
                  <button type="button" className="cancel-button" onClick={cancelEditing}>
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <>
                <span className="status-name">{status.name}</span>
                <div className="status-actions">
                  <button
                    className="edit-button"
                    onClick={() => startEditing(status)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => onDelete(status.id)}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskStatusManager; 