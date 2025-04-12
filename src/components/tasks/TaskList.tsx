import React, { useState } from 'react';
import { Task, TaskFilter as TaskFilterType, TaskStatus } from '../../types/task';
import TaskItem from './TaskItem';
import TaskFilter from './TaskFilter';
import EmptyState from '../common/EmptyState';

interface TaskListProps {
  tasks: Task[];
  statuses: TaskStatus[];
  onUpdate: (task: Task) => void;
  onDelete: (taskId: number) => void;
  onEdit: (task: Task) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks = [], statuses = [], onUpdate, onDelete, onEdit }) => {
  const [filter, setFilter] = useState<TaskFilterType>({});

  const filteredTasks = tasks.filter(task => {
    if (filter.status_id && task.status_id !== filter.status_id) return false;
    if (filter.priority && task.priority !== filter.priority) return false;
    if (filter.owner && !task.owner.toLowerCase().includes(filter.owner.toLowerCase())) return false;
    if (filter.assigned && !task.assigned.toLowerCase().includes(filter.assigned.toLowerCase())) return false;
    if (filter.project_name && !task.project_name.toLowerCase().includes(filter.project_name.toLowerCase())) return false;
    if (filter.task_number && !task.task_number.toLowerCase().includes(filter.task_number.toLowerCase())) return false;
    if (filter.due_date_from && task.due_date < filter.due_date_from) return false;
    if (filter.due_date_to && task.due_date > filter.due_date_to) return false;
    return true;
  });

  return (
    <div className="task-list">
      <TaskFilter
        filter={filter}
        onFilterChange={setFilter}
        statuses={statuses}
      />
      
      {filteredTasks.length === 0 ? (
        <EmptyState
          title="No Tasks Found"
          message="There are no tasks matching your current filters. Try adjusting your filter criteria or create a new task."
          action={{
            label: "Create New Task",
            onClick: () => {/* TODO: Implement create task action */},
          }}
        />
      ) : (
        <div className="tasks-grid">
          {filteredTasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              statuses={statuses}
              onUpdate={onUpdate}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList; 