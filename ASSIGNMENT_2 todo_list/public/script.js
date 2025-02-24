document.addEventListener('DOMContentLoaded', () => {
    const tasksList = document.getElementById('tasksList');
    const searchInput = document.getElementById('searchInput');
    const filterSelect = document.getElementById('filterSelect');
    const darkModeToggle = document.getElementById('darkModeToggle');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const addTaskModal = document.getElementById('addTaskModal');
    const addTaskForm = document.getElementById('addTaskForm');
    const newTaskInput = document.getElementById('newTaskInput');

    // Load dark mode preference
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark');
        darkModeToggle.textContent = '☀️';
    }

    // Fetch and render tasks
    const fetchTasks = async () => {
        const searchQuery = searchInput.value;
        const filterValue = filterSelect.value;
        const response = await fetch(`/api/tasks?search=${searchQuery}&filter=${filterValue}`);
        const tasks = await response.json();
        renderTasks(tasks);
    };

    const renderTasks = (tasks) => {
        tasksList.innerHTML = tasks.map(task => `
            <div class="task-item" data-id="${task.id}">
                <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
                <span class="task-title ${task.completed ? 'completed' : ''}">${task.title}</span>
            </div>
        `).join('');

        // Add event listeners to checkboxes
        document.querySelectorAll('.task-checkbox').forEach(checkbox => {
            checkbox.addEventListener('change', async (e) => {
                const taskId = e.target.closest('.task-item').dataset.id;
                await fetch(`/api/tasks/${taskId}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ completed: e.target.checked })
                });
                fetchTasks();
            });
        });
    };

    // Event Listeners
    searchInput.addEventListener('input', fetchTasks);
    filterSelect.addEventListener('change', fetchTasks);

    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark');
        const isDark = document.body.classList.contains('dark');
        localStorage.setItem('darkMode', isDark);
        darkModeToggle.textContent = isDark ? '☀️' : '🌙';
    });

    addTaskBtn.addEventListener('click', () => {
        addTaskModal.style.display = 'block';
        newTaskInput.focus();
    });

    addTaskForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const title = newTaskInput.value.trim();
        if (title) {
            await fetch('/api/tasks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title })
            });
            newTaskInput.value = '';
            addTaskModal.style.display = 'none';
            fetchTasks();
        }
    });

    document.querySelector('.cancel-btn').addEventListener('click', () => {
        addTaskModal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === addTaskModal) {
            addTaskModal.style.display = 'none';
        }
    });

    // Initial load
    fetchTasks();
});
