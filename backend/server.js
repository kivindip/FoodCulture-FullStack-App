const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const recipeRoutes = require("./routes/recipeRoutes");
const authRoutes = require("./routes/auth");
console.log("recipeRoutes loaded:", recipeRoutes);

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// database
connectDB();

app.post("/test", (req, res) => {
  console.log(req.body);
  res.json(req.body);
});

// routes
console.log("ROUTES ACTIVE");
app.use("/api/recipes", recipeRoutes);
app.use("/api/auth", require("./routes/auth"));

// test route
app.get("/", (req, res) => {
  res.json({ message: "API is working 🚀" });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});