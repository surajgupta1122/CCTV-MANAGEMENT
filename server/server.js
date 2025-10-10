import express from "express";
const app = express();
const PORT = 5000;

// Root route (optional)
app.get("/", (req, res) => {
  res.send("Backend is running successfully 🚀");
});

// Data route
app.get("/users", (req, res) => {
  res.json([
    { id: 1, name: "Ayushi" },
    { id: 2, name: "Riya" },
    { id: 3, name: "Ankit" }
  ]);
});

app.listen(PORT, () => {
  console.log(`Backend is running successfully 🚀 on port ${PORT}`);
});
