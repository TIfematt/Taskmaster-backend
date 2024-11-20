import Task from "../model/task";

// Create Task
const createTask = async (req, res) => {
  const { title, description, deadline, priority, status } = req.body;

  console.log(req.user);
  try {
    const task = await Task.create({
      title,
      description,
      deadline,
      priority,
      status,
      userId: req.user._id,
    });
    res.status(201).json({ message: "Task created successfully", task });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// Get Task
const getTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findById(id);
    res.status(200).json({ message: "Task fetched successfully", task });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Tasks with Filters
const getTasks = async (req, res) => {
  const { status, priority, deadline } = req.query;
  try {
    let query = { userId: req.user._id };

    if (status) query.status = status;
    if (priority) query.priority = priority;
    if (deadline) {
      query.deadline = {
        $lte: new Date(deadline)
      };
    }

    const tasks = await Task.find(query).sort({ deadline: 1 });
    res.status(200).json({ message: "Tasks fetched successfully", tasks });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Task
const updateTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ message: "Task updated successfully", task });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Task
const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    await Task.findByIdAndDelete(id);
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { createTask, getTask, getTasks, updateTask, deleteTask };
