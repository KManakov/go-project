import React from 'react';
import { TaskFilter as TaskFilterType, TaskStatus } from '../../types/task';

interface TaskFilterProps {
  filter: TaskFilterType;
  onFilterChange: (filter: TaskFilterType) => void;
  statuses: TaskStatus[];
}

const TaskFilter: React.FC<TaskFilterProps> = ({ filter, onFilterChange, statuses }) => {
  const handleChange = (field: keyof TaskFilterType, value: string | number | undefined) => {
    if (field === 'due_date_from' || field === 'due_date_to') {
      onFilterChange({ ...filter, [field]: value ? new Date(value) : undefined });
    } else {
      onFilterChange({ ...filter, [field]: value });
    }
  };

  const formatDate = (date: Date | undefined): string => {
    return date instanceof Date ? date.toISOString().split('T')[0] : '';
  };

  return (
    <div className="task-filter">
      <div className="filter-group">
        <div className="filter-item">
          <label>Status:</label>
          <select
            value={filter.status_id || ''}
            onChange={(e) => handleChange('status_id', e.target.value ? Number(e.target.value) : undefined)}
          >
            <option value="">All</option>
            {statuses.map(status => (
              <option key={status.id} value={status.id}>
                {status.name}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-item">
          <label>Priority:</label>
          <select
            value={filter.priority || ''}
            onChange={(e) => handleChange('priority', e.target.value as TaskFilterType['priority'] || undefined)}
          >
            <option value="">All</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="filter-item">
          <label>Owner:</label>
          <input
            type="text"
            value={filter.owner || ''}
            onChange={(e) => handleChange('owner', e.target.value || undefined)}
            placeholder="Filter by owner"
          />
        </div>

        <div className="filter-item">
          <label>Assigned:</label>
          <input
            type="text"
            value={filter.assigned || ''}
            onChange={(e) => handleChange('assigned', e.target.value || undefined)}
            placeholder="Filter by assigned"
          />
        </div>
      </div>

      <div className="filter-group">
        <div className="filter-item">
          <label>Project:</label>
          <input
            type="text"
            value={filter.project_name || ''}
            onChange={(e) => handleChange('project_name', e.target.value || undefined)}
            placeholder="Filter by project"
          />
        </div>

        <div className="filter-item">
          <label>Task Number:</label>
          <input
            type="text"
            value={filter.task_number || ''}
            onChange={(e) => handleChange('task_number', e.target.value || undefined)}
            placeholder="Filter by task number"
          />
        </div>

        <div className="filter-item">
          <label>Due Date From:</label>
          <input
            type="date"
            value={formatDate(filter.due_date_from)}
            onChange={(e) => handleChange('due_date_from', e.target.value || undefined)}
          />
        </div>

        <div className="filter-item">
          <label>Due Date To:</label>
          <input
            type="date"
            value={formatDate(filter.due_date_to)}
            onChange={(e) => handleChange('due_date_to', e.target.value || undefined)}
          />
        </div>
      </div>
    </div>
  );
};

export default TaskFilter; 