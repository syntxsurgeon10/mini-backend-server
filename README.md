# Building a Zero-Dependency Mini Backend Server

## Project Overview
This repository contains a lightweight, 20-line backend server built using native Node.js core modules (`http`). It has zero external dependencies (no Express framework) and is designed to demystify the classic request-response loop by standing directly on the server side of the wire.

---

## Technical Notes: How I Built and Ran It

This log serves as a step-by-step roadmap detailing how I set up the environment, troubleshot standard Windows path errors, tested the endpoints, and deployed the repository.

### 1. Navigating the Environment (Node.js vs. XAMPP)
Initially, my workspace was located inside `C:\xampp\htdocs\BEintern`, as I am accustomed to using XAMPP for web projects. However, because this backend is written in JavaScript rather than PHP, **XAMPP was completely unnecessary**. Node.js acts as its own autonomous engine and server environment.

### 2. Resolving the "Term 'node' is not recognized" Error
When first executing `node -v` in the VS Code PowerShell terminal, I hit a classic Windows path restriction:
```powershell
node : The term 'node' is not recognized as the name of a cmdlet...

```

* **The Fix:** I downloaded and installed the **Node.js LTS** installer from [nodejs.org](https://nodejs.org/). Crucially, I had to **completely restart VS Code** afterward. Windows environment path variables do not refresh inside active program instances, so restarting forced VS Code to recognize the newly installed `node` command.

### 3. Running the Server Locally

Once the path error was cleared, I executed:

```powershell
node server.js

```

The terminal responded with `Server listening on http://localhost:3000` and entered a listening loop.

### 4. Testing the Endpoints & Debugging 404s

* **The `404 Not Found` Catch:** Navigating directly to `http://localhost:3000` inside the browser returned `{"error": "Not Found"}`. This proved the server was working perfectly. Because our specific routing rules only listened for `/status` and `/data`, any fallback URL appropriately triggered our custom 404 block.
* **Testing GET `/status`:** Navigating to `http://localhost:3000/status` successfully completed the request-response loop, outputting:
```json
{ "status": "healthy", "message": "Server is running smoothly" }

```


* **Testing POST `/data`:** Because base Windows PowerShell handles standard Linux `curl` syntax poorly, I tested the POST endpoint inside a secondary VS Code terminal window using the explicit PowerShell format:
```powershell
curl -Method Post http://localhost:3000/data

```



---

### 5. Overcoming Git Initialization Roadblocks

When attempting to link my online GitHub repository using `git remote add origin`, the terminal threw another error:

```powershell
fatal: not a git repository (or any of the parent directories): .git

```

This occurred because the local folder had not been initialized to track files yet. I solved this by strictly running the Git lifecycle sequence in order:

```powershell
# Initialize the folder as a Git workspace
git init

# Stage the backend code for tracking
git add server.js

# Commit the changes locally
git commit -m "feat: initial commit of server"

# Point the local workspace to the remote GitHub repository
git remote add origin [https://github.com/syntxsurgeon10/mini-backend-server.git](https://github.com/syntxsurgeon10/mini-backend-server.git)

# Enforce 'main' as the primary branch name
git branch -M main

# Push the local history up to the cloud
git push -u origin main

```

---

## Final Architecture Insights

Through this process, I learned that a backend REST API is nothing more than a digital traffic controller. Frontends can format an HTTP envelope, ship it down a local or public network port, and our backend processes that URL string to hand back structured JSON.

This core pattern underpins almost every scale of web applications—from small internship assignments to massive production enterprise apps.

```

```
