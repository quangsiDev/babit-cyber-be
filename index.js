const express = require("express");

const app = express();
const cors = require("cors");
const pool = require("./db");
const { sequelize } = require("./models");
const { Habit } = require("./models");
// middleware
app.use(cors());
app.use(express.json());
//Routes
sequelize
    .authenticate()
    .then(() => {
        console.log("Connection has been established successfully.");
    })
    .catch((err) => {
        console.error("Unable to connect to the database:", err);
    });

sequelize.sync()
    //create a todo
app.post("/todos", async(req, res) => {
    console.log(req.body);
    try {
        const { description } = req.body;
        const newTodo = await pool.query(
            "INSERT INTO todo (description) VALUES (?)", [description]
        );
        res.json("Todo was added");
    } catch (error) {}
});
//create a todo
app.post("/habits", async(req, res) => {
    console.log(req.body);
    const { description } = req.body;
    let habit = await Habit.create({ description: description })
    res.json("habit was added");
    // }).catch(error => res.send(JSON.stringify(error, "fail")))

});
app.get("/habits", async(req, res) => {
    try {

        const habits = await Habit.findAll()
        res.json(habits);
    } catch (error) {}
});
// get all todo
app.get("/todos", async(req, res) => {
    try {
        const todos = await pool.query("SELECT * FROM todo");
        res.json(todos[0]);
    } catch (error) {}
});
// get a todo
app.get("/todos/:id", async(req, res) => {
    try {
        console.log("get a todo");
        const { id } = req.params;
        console.log("id", id);
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id = ?", [id]);
        res.json(todo[0]);
    } catch (error) {}
});
// update a todo
app.put("/todos/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;

        const updateTodo = await pool.query(
            "UPDATE todo SET description = ? WHERE todo_id = ?", [description, id]
        );
        res.json(updateTodo);
    } catch (error) {}
});
// delete a todo
app.delete("/todos/:id", async(req, res) => {
    try {
        const { id } = req.params;
        pool.query("DELETE FROM todo where todo_id = ?", [id]);
        res.json("todo was deleted");
    } catch (error) {}
});

app.listen(process.env.PORT || 5000, () => {
    console.log("server on");
});