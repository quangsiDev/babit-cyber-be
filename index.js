const express = require("express");

const app = express();
const cors = require("cors");
const pool = require("./db");
// middleware
app.use(cors());
app.use(express.json());

//Routes

//create a todo
app.post("/todos", async (req, res) => {
  console.log(req.body);
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES (?)",
      [description]
    );
    res.json("Todo was added");
  } catch (error) {}
});
// get all todo
app.get("/todos", async (req, res) => {
  try {
    const todos = await pool.query("SELECT * FROM todo");
    res.json(todos[0]);
  } catch (error) {}
});
// get a todo
app.get("/todos/:id", async (req, res) => {
  try {
    console.log("get a todo");
    const { id } = req.params;
    console.log("id", id);
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = ?", [id]);
    res.json(todo[0]);
  } catch (error) {}
});
// update a todo
app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;

    const updateTodo = await pool.query(
      "UPDATE todo SET description = ? WHERE todo_id = ?",
      [description, id]
    );
    res.json(updateTodo);
  } catch (error) {}
});
// delete a todo
app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    pool.query("DELETE FROM todo where todo_id = ?", [id]);
    res.json("todo was deleted");
  } catch (error) {}
});

app.listen(process.env.PORT || 5000, () => {
  console.log("server on");
});
