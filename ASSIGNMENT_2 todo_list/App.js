
const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

app.use(morgan('dev'));

const getTasksFromFile = () => {
    try {
        const data = fs.readFileSync(path.join(__dirname, 'data', 'tasks.json'));
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
};

const saveTasksToFile = (tasks) => {
    fs.writeFileSync(
        path.join(__dirname, 'data', 'tasks.json'),
        JSON.stringify(tasks, null, 2)
    );
};

app.get('/', (req, res) => {
    const tasks = getTasksFromFile();
    res.render('index', { tasks });
});

app.get('/api/tasks', (req, res) => {
    const tasks = getTasksFromFile();
    const { search, filter } = req.query;

    let filteredTasks = tasks;

    if (search) {
        filteredTasks = filteredTasks.filter(task => 
            task.title.toLowerCase().includes(search.toLowerCase())
        );
    }

    if (filter) {
        switch(filter) {
            case 'done':
                filteredTasks = filteredTasks.filter(task => task.completed);
                break;
            case 'pending':
                filteredTasks = filteredTasks.filter(task => !task.completed);
                break;
        }
    }

    res.json(filteredTasks);
});

app.post('/api/tasks', (req, res) => {
    const tasks = getTasksFromFile();
    const newTask = {
        id: Date.now(),
        title: req.body.title,
        completed: false,
        createdAt: new Date().toISOString()
    };
    
    tasks.push(newTask);
    saveTasksToFile(tasks);
    res.json(newTask);
});

app.patch('/api/tasks/:id', (req, res) => {
    const tasks = getTasksFromFile();
    const taskId = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(t => t.id === taskId);
    
    if (taskIndex !== -1) {
        tasks[taskIndex] = { ...tasks[taskIndex], ...req.body };
        saveTasksToFile(tasks);
        res.json(tasks[taskIndex]);
    } else {
        res.status(404).json({ error: 'Task not found' });
    }
});

app.delete('/api/tasks/:id', (req, res) => {
    const tasks = getTasksFromFile();
    const taskId = parseInt(req.params.id);
    const filteredTasks = tasks.filter(t => t.id !== taskId);
    
    saveTasksToFile(filteredTasks);
    res.json({ message: 'Task deleted successfully' });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

