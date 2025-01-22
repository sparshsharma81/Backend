# Express.js Routing and Query Parameters Documentation

## Static and Dynamic Routing in Express.js

Routing refers to defining application endpoints (URIs) and handling client requests in web applications. In **Express.js**, routing can be categorized into **static routing** and **dynamic routing**.

---

### 1. Static Routing
Static routing is when the route path is predefined and doesn't change. It matches specific, hardcoded paths in the application.

#### Example
```javascript
const express = require('express');
const app = express();

// Static routes
app.get('/home', (req, res) => {
    res.send('Welcome to the Home Page!');
});

app.get('/about', (req, res) => {
    res.send('This is the About Page!');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
```

#### Usage
- The route `/home` will always render the same response: `Welcome to the Home Page!`.
- Static routes are straightforward but limited to predefined paths.

#### URL Examples
- `/home` -> Displays "Welcome to the Home Page!"
- `/about` -> Displays "This is the About Page!"

---

### 2. Dynamic Routing
Dynamic routing allows routes to handle variable data within the URL. Dynamic segments are denoted using `:` in the route definition and can capture values passed as part of the URL.

#### Example
```javascript
const express = require('express');
const app = express();

// Dynamic routes
app.get('/user/:id', (req, res) => {
    const userId = req.params.id; // Access dynamic parameter
    res.send(`User ID: ${userId}`);
});

app.get('/product/:category/:id', (req, res) => {
    const category = req.params.category;
    const productId = req.params.id;
    res.send(`Category: ${category}, Product ID: ${productId}`);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
```

#### Usage
- Routes can accept variable parts (parameters) and handle them dynamically.
- Useful for cases where paths depend on input data.

#### URL Examples
- `/user/123` -> Displays "User ID: 123"
- `/product/electronics/567` -> Displays "Category: electronics, Product ID: 567"

---

### Key Differences

| **Feature**            | **Static Routing**                              | **Dynamic Routing**                            |
|-------------------------|------------------------------------------------|-----------------------------------------------|
| **Path Structure**      | Fixed and predefined.                          | Contains dynamic segments (e.g., `:id`).      |
| **Flexibility**         | Limited to specific paths.                     | Flexible and adapts to different inputs.      |
| **Use Case**            | Simple and repetitive routes (e.g., `/home`).  | Routes requiring dynamic data (e.g., `/user/:id`). |
| **Parameters Handling** | None                                           | Extracted via `req.params`.                   |

---

### Combination of Static and Dynamic Routes
You can mix both static and dynamic routes in your application to handle diverse requirements:
```javascript
app.get('/profile', (req, res) => {
    res.send('Static Profile Page');
});

app.get('/profile/:username', (req, res) => {
    const username = req.params.username;
    res.send(`Dynamic Profile Page for: ${username}`);
});
```

### Best Practices
- Use static routes for general pages (e.g., home, about).
- Use dynamic routes for personalized or data-driven pages (e.g., user profiles, product details).
- Always validate and sanitize dynamic route parameters to prevent vulnerabilities.

---


## Middleware in Express.js

Middleware functions are functions that execute during the lifecycle of a request to the server. They have access to the request and response objects and can modify them or end the request-response cycle.

---

### Types of Middleware
1. **Application-Level Middleware**: Applied globally to the app.
2. **Router-Level Middleware**: Applied to specific routes.
3. **Error-Handling Middleware**: Handles errors in the application.
4. **Built-in Middleware**: Provided by Express.js (e.g., `express.json()`).
5. **Third-Party Middleware**: Installed via npm (e.g., `morgan`, `cors`).

---

### Example
#### Application-Level Middleware
```javascript
const express = require('express');
const app = express();

// Middleware to log request details
app.use((req, res, next) => {
    console.log(`${req.method} request for ${req.url}`);
    next(); // Pass control to the next middleware
});

app.get('/home', (req, res) => {
    res.send('Home Page');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
```
