📝 TodoList Frontend


Backend Repository: github.com/QingYunne/todolist-backend


🚀 Quick Start

Prerequisites


Docker Desktop 3.6+
Git


Run the entire stack

bash# 1. Clone this repo
git clone https://github.com/QingYunne/todolist-frontend.git
cd todolist-frontend

# 2. Start all services (frontend, backend, database)
docker-compose up -d

# 3. Open in browser
# Frontend: http://localhost:3000
# Backend API: http://localhost:1122

Check status

bash# View running containers
docker-compose ps

# View logs
docker-compose logs -f


🧹 Cleanup

Linux/Mac:

bashchmod +x cleanup.sh
./cleanup.sh

Windows (PowerShell):

powershell.\cleanup.bat


🔗 Related Repositories


Backend (Spring Boot): todolist-backend
Frontend (React + Vite): todolist-frontend



📚 Tech Stack


React.js + Vite
TanStack Query
Material-UI
Nginx
Docker



🧪 Test the app


Open http://localhost:3000
Create, edit, delete todos
Refresh page to verify persistence
