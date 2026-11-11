import { useEffect, useState } from 'react';
import service from './service';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [loading, setLoading] = useState(true);
  const username = localStorage.getItem('username');

  async function getTodos() {
    try {
      const data = await service.getTasks();
      setTodos(data);
    } catch {
      // שגיאות כבר נרשמות ב-interceptor (וב-401 הוא מעביר ללוגין)
    } finally {
      setLoading(false);
    }
  }

  async function createTodo(e) {
    e.preventDefault();
    const name = newTodo.trim();
    if (!name) return;
    await service.addTask(name);
    setNewTodo('');
    await getTodos();
  }

  async function updateCompleted(todo, isComplete) {
    await service.setCompleted(todo.id, isComplete);
    await getTodos();
  }

  async function deleteTodo(id) {
    await service.deleteTask(id);
    await getTodos();
  }

  useEffect(() => {
    getTodos();
  }, []);

  const doneCount = todos.filter(t => t.isComplete).length;

  return (
    <div className="page">
      <div className="card">
        <header className="app-header">
          <div>
            <h1>המשימות שלי</h1>
            {username && <p className="greeting">שלום, {username} 👋</p>}
          </div>
          <button className="btn btn-ghost" onClick={service.logout}>התנתקות</button>
        </header>

        <form className="add-form" onSubmit={createTodo}>
          <input
            className="input"
            placeholder="מה צריך לעשות?"
            value={newTodo}
            onChange={e => setNewTodo(e.target.value)}
          />
          <button className="btn btn-primary" type="submit">הוספה</button>
        </form>

        {loading ? (
          <p className="empty">טוען...</p>
        ) : todos.length === 0 ? (
          <p className="empty">אין משימות עדיין. אפשר להתחיל להוסיף ✨</p>
        ) : (
          <ul className="todo-list">
            {todos.map(todo => (
              <li key={todo.id} className={`todo-item ${todo.isComplete ? 'done' : ''}`}>
                <input
                  type="checkbox"
                  checked={!!todo.isComplete}
                  onChange={e => updateCompleted(todo, e.target.checked)}
                />
                <span className="todo-name">{todo.name}</span>
                <button
                  className="delete-btn"
                  onClick={() => deleteTodo(todo.id)}
                  aria-label="מחיקה"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}

        {todos.length > 0 && (
          <p className="footer">{doneCount} מתוך {todos.length} הושלמו</p>
        )}
      </div>
    </div>
  );
}

export default App;
