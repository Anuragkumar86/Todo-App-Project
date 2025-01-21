const express = require("express");
const { createTodo, updateTodo } = require("./types");
const {todo} = require("./db")
const cors = require("cors")

const app = express();


app.use(express.json());
app.use(cors());

app.post("/todo", async function(req, res){
    const createPayload = req.body;
    const parsedPayload = createTodo.safeParse(createPayload)

    if(!parsedPayload.success){
        res.status(411).json({
            msg : "You are giving wrong input"
        })
        return
    }
    await todo.create({
        title: createPayload.title,
        description: createPayload.description,
        completed: false
    })
    res.json({
        msg: "Todo created Successfully"
    })


})

app.get("/todos", async function(req, res){
    const todos = await todo.find({})

    res.json({
        todos
    })

})

// app.put("/completed", async function(req, res){
//     const updatePayload = req.body;
//     const parsedPayload = updatePayload.safeParse(updatePayload)

//     if(!updatePayload.success){
//         res.status(411).json({
//             msg : "You are giving wrong input"
//         })
//         return
//     }

//     await todo.update({
//         _id : req.body.id
//     }, {
//         completed: true
//     })

//     res.json({
//         msg : "Todo marked as Completed"
//     })
   
// })

app.put("/completed", async function(req, res) {
    const { id } = req.body;  // Destructure the ID from the request body

    if (!id) {
        return res.status(400).json({ msg: "ID is required" });
    }

    try {
        // Find and update the todo item by its _id and mark it as completed
        const updatedTodo = await todo.updateOne(
            { _id: id },  // Find the todo by _id
            { $set: { completed: true } }  // Set completed to true
        );

        // If no document was modified, return a 404 error
        if (updatedTodo.modifiedCount === 0) {
            return res.status(404).json({ msg: "Todo not found or already marked as completed" });
        }

        res.json({ msg: "Todo marked as completed" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
});

app.delete("/todo/:id", async function(req, res) {
    const { id } = req.params; // Get the todo ID from the request parameters

    if (!id) {
        return res.status(400).json({ msg: "ID is required" });
    }

    try {
        // Delete the todo by its _id
        const deletedTodo = await todo.deleteOne({ _id: id });

        if (deletedTodo.deletedCount === 0) {
            return res.status(404).json({ msg: "Todo not found" });
        }

        res.json({ msg: "Todo deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
});


app.listen(3000 , () => {
    console.log("App is listining at port 3000")
});
