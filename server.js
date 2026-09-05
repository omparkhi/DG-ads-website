import app from "./api/index.js";

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`\n🚀 Express API Backend Server running on http://localhost:${PORT}\n`);
});
