
// ── STATE ──
let selectedDate = '';
let tasks = JSON.parse(localStorage.getItem('tasks_v2')) || {};
let currentFilter = 'all';
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// ── DROPDOWNS ──
const daySelect = document.getElementById('day');
const monthSelect = document.getElementById('month');
const yearSelect = document.getElementById('year');

for (let d = 1; d <= 31; d++) daySelect.innerHTML += `<option value="${d}">${d}</option>`;
months.forEach((m, i) => monthSelect.innerHTML += `<option value="${i}">${m}</option>`);
for (let y = 2020; y <= 2035; y++) yearSelect.innerHTML += `<option value="${y}">${y}</option>`;

// Set today
const today = new Date();
daySelect.value = today.getDate();
monthSelect.value = today.getMonth();
yearSelect.value = today.getFullYear();
updateSelectedDate();

function updateSelectedDate() {
    const d = daySelect.value, m = monthSelect.value, y = yearSelect.value;
    selectedDate = `${y}-${m}-${d}`;
    document.getElementById('selectedDateText').textContent = `${d} ${months[m]} ${y}`;

    // Year progress
    const date = new Date(y, m, d);
    const start = new Date(y, 0, 1);
    const end = new Date(y, 11, 31);
    const pct = Math.round(((date - start) / (end - start)) * 100);
    document.getElementById('yearProgress').style.width = pct + '%';
    document.getElementById('yearProgressText').textContent = `Day ${Math.floor((date - start) / (1000 * 60 * 60 * 24)) + 1} of ${y}`;

    showTasks();
}

daySelect.onchange = monthSelect.onchange = yearSelect.onchange = updateSelectedDate;

// ── ADD TASK ──
function addTask() {
    if (!selectedDate) { alert('Select a date first'); return; }
    const text = document.getElementById('taskInput').value.trim();
    if (!text) return;
    const priority = document.getElementById('prioritySelect').value;

    if (!tasks[selectedDate]) tasks[selectedDate] = [];
    tasks[selectedDate].push({
        text, priority, done: false,
        createdAt: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
    });
    localStorage.setItem('tasks_v2', JSON.stringify(tasks));
    document.getElementById('taskInput').value = '';
    showTasks();
}

// Enter key to add
document.getElementById('taskInput').addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); addTask(); }
});

// ── FILTER ──
function setFilter(f, btn) {
    currentFilter = f;
    document.querySelectorAll('.filter-chip').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    showTasks();
}

// ── SHOW TASKS ──
function showTasks() {
    const list = document.getElementById('taskList');
    let arr = tasks[selectedDate] || [];

    // Stats
    document.getElementById('statTotal').textContent = arr.length;
    document.getElementById('statDone').textContent = arr.filter(t => t.done).length;
    document.getElementById('statPending').textContent = arr.filter(t => !t.done).length;

    // Filter
    let filtered = arr;
    if (currentFilter === 'pending') filtered = arr.filter(t => !t.done);
    else if (currentFilter === 'done') filtered = arr.filter(t => t.done);
    else if (['high', 'medium', 'low'].includes(currentFilter)) filtered = arr.filter(t => t.priority === currentFilter);

    if (filtered.length === 0) {
        list.innerHTML = `
          <div class="empty-state">
            <div class="empty-icon">📋</div>
            <div class="empty-title">${arr.length === 0 ? 'No tasks yet' : 'Nothing here'}</div>
            <div class="empty-sub">${arr.length === 0 ? 'Add your first task above!' : 'Try a different filter'}</div>
          </div>`;
        return;
    }

    // Map back to real indices
    const realIndices = arr.reduce((acc, t, i) => {
        const match = filtered.includes(t);
        if (match) acc.push(i);
        return acc;
    }, []);

    list.innerHTML = `
        <div class="task-group-label">${filtered.length} Task${filtered.length !== 1 ? 's' : ''}</div>
        ${filtered.map((t, fi) => {
        const i = realIndices[fi];
        const badgeClass = `badge-${t.priority || 'medium'}`;
        const priLabel = t.priority === 'high' ? '🔴 High' : t.priority === 'low' ? '🟢 Low' : '🟡 Medium';
        return `
          <div class="todo-item pri-${t.priority || 'medium'} ${t.done ? 'done-item' : ''}" style="animation:slideIn 0.3s ${fi * 0.05}s ease both">
            <div class="custom-check ${t.done ? 'checked' : ''}" onclick="toggleDone(${i})">${t.done ? '✓' : ''}</div>
            <span class="task-text ${t.done ? 'done' : ''}">${t.text}</span>
            <span class="priority-badge ${badgeClass}">${priLabel}</span>
            <span class="task-time">${t.createdAt || ''}</span>
            <button class="delete-btn" onclick="deleteTask(${i})" title="Delete">✕</button>
          </div>`;
    }).join('')}`;
}

function toggleDone(i) {
    tasks[selectedDate][i].done = !tasks[selectedDate][i].done;
    localStorage.setItem('tasks_v2', JSON.stringify(tasks));
    showTasks();
}

function deleteTask(i) {
    tasks[selectedDate].splice(i, 1);
    localStorage.setItem('tasks_v2', JSON.stringify(tasks));
    showTasks();
}
