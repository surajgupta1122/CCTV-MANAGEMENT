Server setup

1. Copy `.env.example` to `.env` and update `MONGO_URI` and `JWT_SECRET`.
2. From the `server` folder run:

```powershell
npm install
npm run dev
```

3. Endpoints:
- POST /api/register  { name, email, password }
- POST /api/login     { email, password }

Responses are JSON. On successful login a JWT token is returned.
