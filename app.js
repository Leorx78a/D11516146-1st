// 這段程式用來管理待辦清單的資料與畫面渲染
const STORAGE_KEY = 'todo-list-items';

const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const emptyState = document.getElementById('empty-state');
const todoCount = document.getElementById('todo-count');

// 讀取 localStorage 中的待辦資料，若沒有資料則回傳空陣列
function loadTodos() {
  try {
    const storedTodos = localStorage.getItem(STORAGE_KEY);
    return storedTodos ? JSON.parse(storedTodos) : [];
  } catch (error) {
    console.error('讀取待辦資料失敗:', error);
    return [];
  }
}

// 儲存待辦資料到 localStorage
function saveTodos(todos) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

// 更新底部未完成數量顯示
function updateTodoCount(todos) {
  const remainingCount = todos.filter((todo) => !todo.completed).length;
  todoCount.textContent = `未完成: ${remainingCount} 項`;
}

// 渲染待辦清單
function renderTodos() {
  const todos = loadTodos();

  if (todos.length === 0) {
    todoList.innerHTML = '';
    emptyState.hidden = false;
  } else {
    emptyState.hidden = true;
    todoList.innerHTML = todos
      .map(
        (todo) => `
          <li class="todo-item ${todo.completed ? 'completed' : ''}" data-id="${todo.id}">
            <input type="checkbox" ${todo.completed ? 'checked' : ''} aria-label="標記為完成" />
            <span class="todo-text">${escapeHtml(todo.text)}</span>
            <button type="button" class="delete-btn" aria-label="刪除此待辦">刪除</button>
          </li>
        `
      )
      .join('');
  }

  updateTodoCount(todos);
}

// 轉義 HTML 特殊字元，避免 XSS 問題
function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// 新增待辦事項
function addTodo(text) {
  const trimmedText = text.trim();

  if (!trimmedText) {
    return;
  }

  const todos = loadTodos();
  const newTodo = {
    id: Date.now() + Math.random(),
    text: trimmedText,
    completed: false,
  };

  todos.push(newTodo);
  saveTodos(todos);
  renderTodos();
}

// 切換待辦完成狀態
function toggleTodo(id) {
  const todos = loadTodos();
  const updatedTodos = todos.map((todo) =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  );

  saveTodos(updatedTodos);
  renderTodos();
}

// 刪除待辦事項
function deleteTodo(id) {
  const todos = loadTodos().filter((todo) => todo.id !== id);
  saveTodos(todos);
  renderTodos();
}

// 表單送出事件：新增待辦
todoForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const inputValue = todoInput.value;

  addTodo(inputValue);
  todoInput.value = '';
  todoInput.focus();
});

// 清單 click 事件：處理勾選與刪除
todoList.addEventListener('click', (event) => {
  const deleteButton = event.target.closest('.delete-btn');
  const checkbox = event.target.closest('input[type="checkbox"]');

  if (deleteButton) {
    const item = deleteButton.closest('.todo-item');
    const todoId = Number(item.dataset.id);
    deleteTodo(todoId);
    return;
  }

  if (checkbox) {
    const item = checkbox.closest('.todo-item');
    const todoId = Number(item.dataset.id);
    toggleTodo(todoId);
  }
});



// 初始渲染
renderTodos();
