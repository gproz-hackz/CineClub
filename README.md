## 🚀 Quick Start

1. **Clone the repo**

   ```bash
   git clone [https://github.com/your-org/stream-platform.git](https://github.com/your-org/stream-platform.git)
   cd stream-platform

3. **Environment Setup Copy the example env file:**

   ```bash
   cp .env.example .env

4. **Launch Infrastructure This spins up Postgres, Redis, MeiliSearch, and the Node apps.**

   ```bash
   docker-compose up --build -d

5. **Initialize Database Run the migrations inside the backend container:**

   ```bash
   docker-compose exec backend npx prisma migrate deploy
