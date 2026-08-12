import Todo from "../model/todo.js";

export const createTodo = async (req, res) => {
  try {
    const { text, completed } = req.body;
    const Todos = new Todo({
      text,
      completed,
      user: req.user.id,
    });

    await Todos.save();

    res.status(200).json({ message: "Todo Created Successfully", Todos });
  } catch (error) {
    res.status(400).json({ message: "Todo Creation Failed" });
  }
};

export const fetchTodo = async (req, res) => {
  try {
    const Todos = await Todo.find({user:req.user.id});
    res.status(200).json({ message: "Todo Fetched Successfully", Todos });
  } catch (error) {
    res.status(400).json({ message: "Fetching Todos Failed" });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const todos = await Todo.findByIdAndUpdate(
      id,
      {
        text: req.body.text,
        completed: req.body.completed,
      },
      {
        new: true,
      },
    );
    res.status(200).json({ message: "Todo Updated Successfully", todos });
  } catch (error) {
    res.status(400).json({ message: "Failed To update Todo", error });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findByIdAndDelete(id);

    res.status(200).json({ message: "Todo Deleted Successfully", todo });
  } catch (error) {
    res.status(400).json({ message: "Failed To Delete Todo", error });
  }
};
