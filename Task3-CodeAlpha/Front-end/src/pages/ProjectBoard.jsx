/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { useAuth } from '../context/AuthContext';

export const ProjectBoard = () => {
  const [task, setTask] = useState([]);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [showModal, setShowModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [members, setMembers] = useState([]);
  const [newAssignedTo, setNewAssignedTo] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const { token } = useAuth();
  const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  const fetchTasks = async () => {
    const res = await fetch(`${API}/tasks/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setTask(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    fetchTasks();
    fetch(`${API}/projects/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setMembers(data.members || []));
  }, [id]);

  const createTask = async () => {
    try {
      await fetch(`${API}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: newTitle,
          description: newDesc,
          projectId: id,
          assignedTo: newAssignedTo,
        }),
      });
      await fetchTasks();
      setShowModal(false);
      setNewTitle('');
      setNewDesc('');
      setNewAssignedTo('');
      if (fetchTasks) {
        setMessage({ text: 'task Created Successfully!', type: 'success' });
        return;
      }
    } catch {
      setMessage({ text: 'Error creating task', type: 'danger' });
    }
  };

  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      await fetch(`${API}/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      await fetchTasks();
    } catch {
      setMessage({ text: 'Error updating task', type: 'danger' });
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await fetch(`${API}/tasks/${taskId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      await fetchTasks();
      if (fetchTasks) {
        setMessage({ text: 'Task removed Successfully!', type: 'success' });
        return;
      }
    } catch {
      setMessage({ text: 'Error deleting task', type: 'danger' });
    }
  };

  const updateTask = async () => {
    try {
      await fetch(`${API}/tasks/${editingTask._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: editingTask.title,
          description: editingTask.description,
          assignedTo: editingTask.assignedTo,
        }),
      });
      await fetchTasks();
      if (fetchTasks) {
        setMessage({ text: 'Task updated Successfully!', type: 'success' });
        return;
      }
      setEditingTask(null);
    } catch {
      setMessage({ text: 'Error updating task', type: 'danger' });
    }
  };

  const onDragEnd = async (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId) return;
    await updateTaskStatus(draggableId, destination.droppableId);
  };

  return (
    <div className="container mt-4">
      <button
        className="btn btn-outline-info mb-3 me-2"
        onClick={() => navigate('/')}
      >
        ← Back
      </button>
      <button
        className="btn btn-outline-info mb-3"
        onClick={() => setShowModal(true)}
      >
        + Add Task
      </button>
      {message.text && (
        <div className={`alert alert-${message.type} mt-3 w-auto small`}>
          {message.text}
        </div>
      )}

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="row mt-4">
          {['todo', 'inProgress', 'done'].map((status) => (
            <div
              key={status}
              className={`col-md-4 col-sm-12 kanban-col col-${status}`}
            >
              <h5 className="text-capitalize pb-4">{status}</h5>
              <Droppable droppableId={status}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    style={{ minHeight: '100px' }}
                  >
                    {task
                      .filter((t) => t.status === status)
                      .map((t, index) => (
                        <Draggable
                          key={t._id}
                          draggableId={t._id}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="card p-3 mb-2 task-card"
                            >
                              {editingTask?._id === t._id ? (
                                <>
                                  <input
                                    className="form-control mb-2"
                                    value={editingTask.title}
                                    onChange={(e) =>
                                      setEditingTask({
                                        ...editingTask,
                                        title: e.target.value,
                                      })
                                    }
                                  />
                                  <textarea
                                    className="form-control mb-2"
                                    value={editingTask.description}
                                    onChange={(e) =>
                                      setEditingTask({
                                        ...editingTask,
                                        description: e.target.value,
                                      })
                                    }
                                  />
                                  <select
                                    className="form-select mb-2"
                                    value={
                                      editingTask.assignedTo?._id ||
                                      editingTask.assignedTo ||
                                      ''
                                    }
                                    onChange={(e) =>
                                      setEditingTask({
                                        ...editingTask,
                                        assignedTo: e.target.value,
                                      })
                                    }
                                  >
                                    <option value="">Assign to...</option>
                                    {members.map((m) => (
                                      <option key={m._id} value={m._id}>
                                        {m.name}
                                      </option>
                                    ))}
                                  </select>
                                  <div className="d-flex gap-2">
                                    <button
                                      className="btn btn-sm btn-outline-info"
                                      onClick={updateTask}
                                    >
                                      Save
                                    </button>
                                    <button
                                      className="btn btn-sm btn-outline-secondary"
                                      onClick={() => setEditingTask(null)}
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                </>
                              ) : (
                                <>
                                  <h6
                                    className="m-2"
                                    onClick={() => navigate(`/task/${t._id}`)}
                                    style={{ cursor: 'pointer' }}
                                  >
                                    {t.title}
                                    <small className="timestamp ms-2">
                                      {t.createdAt
                                        ? new Date(
                                            t.createdAt
                                          ).toLocaleDateString()
                                        : 'Just now'}
                                    </small>
                                    {t.assignedTo && (
                                      <small
                                        className="small d-block px-2"
                                        style={{
                                          color: 'rgba(222, 251, 255, 0.43)',
                                        }}
                                      >
                                        <i className="fas fa-user"></i>{' '}
                                        {t.assignedTo?.name || 'Unassigned'}
                                      </small>
                                    )}
                                  </h6>
                                  <p className="small px-2">{t.description}</p>
                                  <select
                                    className="form-select form-select-sm mt-2"
                                    value={t.status}
                                    onChange={(e) =>
                                      updateTaskStatus(t._id, e.target.value)
                                    }
                                  >
                                    <option value="todo">Todo</option>
                                    <option value="inProgress">
                                      In Progress
                                    </option>
                                    <option value="done">Done</option>
                                  </select>
                                  <div className="d-flex gap-2 mt-2">
                                    <button
                                      className="btn btn-sm btn-outline-warning"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setEditingTask(t);
                                      }}
                                    >
                                      <i className="fas fa-edit"></i>
                                    </button>
                                    <button
                                      className="btn btn-sm btn-outline-danger"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        deleteTask(t._id);
                                      }}
                                    >
                                      <i className="fas fa-trash"></i>
                                    </button>
                                  </div>
                                </>
                              )}
                            </div>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>

      {showModal && (
        <div
          className="modal show d-block"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Create Task</h5>
                <button
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <input
                  className="form-control mb-2"
                  placeholder="Title"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                />
                <textarea
                  className="form-control mb-2"
                  placeholder="Description"
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                />
                <select
                  className="form-select mt-2"
                  value={newAssignedTo}
                  onChange={(e) => setNewAssignedTo(e.target.value)}
                >
                  <option value="">Assign to...</option>
                  {members.map((m) => (
                    <option key={m._id} value={m._id}>
                      {m.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button className="btn btn-outline-info" onClick={createTask}>
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectBoard;
