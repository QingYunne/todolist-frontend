# 📝 TodoList Frontend

**Backend Repository:** [github.com/QingYunne/todolist-backend](https://github.com/QingYunne/todolist-backend)

---

## 🚀 Quick Start

### Prerequisites
- Docker Desktop 3.6+
- Git

### Run the entire stack

```bash
# 1. Clone this repo
git clone https://github.com/QingYunne/todolist-frontend.git
cd todolist-frontend

# 2. Start all services (frontend, backend, database)
docker-compose up -d

# 3. Open in browser
# Frontend: http://localhost:3000
# Backend API: http://localhost:1122
```

### Check status

```bash
# View running containers
docker-compose ps

# View logs
docker-compose logs -f
```

---

## 🧹 Cleanup

**Linux/Mac:**
```bash
chmod +x cleanup.sh
./cleanup.sh
```

**Windows (PowerShell):**
```powershell
.\cleanup.bat
```

---

## 🔗 Related Repositories

- **Backend (Spring Boot):** [todolist-backend](https://github.com/QingYunne/todolist-backend)
- **Frontend (React + Vite):** [todolist-frontend](https://github.com/QingYunne/todolist-frontend)

---

## 📚 Tech Stack

- React.js + Vite
- TanStack Query
- Material-UI
- Nginx
- Docker

---

## 🧪 Test the app

1. Open http://localhost:3000
2. Create, edit, delete todos
3. Refresh page to verify persistence

---

## 📞 Backend Issues?

Check the backend repository for backend-specific setup and troubleshooting: [todolist-backend](https://github.com/QingYunne/todolist-backend)
