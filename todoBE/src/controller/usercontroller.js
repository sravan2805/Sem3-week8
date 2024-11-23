import User from "../models/userSchema.js";
export const Signup = async(req, res) => {
    try {
        const { username, email, password } = req.body;

        const newUser = new User({
            username,
            email,
            password,
            todolist:[]
        });

        const savedUser = await newUser.save();
        
        res.status(200).json({ message: "User created successfully", success: true });
    } catch (error) {
        console.log("Error", error.message);
        res.status(500).json({ error: "Internal Server error" })
    }
}


export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found.", success: false });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials.", success: false });
    }

    // If login is successful
    res.status(200).json({
      message: "Login successful.",
      success: true,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        todolist: user.todolist,
      },
    });

  } catch (error) {
    console.log("Error", error.message);
    res.status(500).json({ error: "Internal Server Error", success: false });
  }
};


export const addTask = async (req, res) => {
    try {
      const { email, taskData } = req.body;
  
      // Find the user by email
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }
  
      user.todolist.push({
        data: taskData,
        
      });
  
      // Save the updated user
      await user.save();
  
      res.status(200).json({
        message: "Task added successfully.",
        success: true,
        todolist: user.todolist, // Return the updated todolist
      });
    } catch (error) {
      console.error("Error:", error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  
  export const getTask = async (req, res) => {
    try {
      const { email } = req.body;
  
      // Find the user by email
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }
  
  
      res.status(200).json({
        success: true,
        todolist: user.todolist, // Return the updated todolist
      });
    } catch (error) {
      console.error("Error:", error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  


  export const editTask = async (req, res) => {
    try {
      const { email, taskId, newTaskData } = req.body;
  
      // Find the user by email
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }
  
      // Find the task in the todolist by ID
      const task = user.todolist.id(taskId);
      if (!task) {
        return res.status(404).json({ message: "Task not found." });
      }
  
      // Update the task details
      task.data = newTaskData;
  
      // Save the updated user
      await user.save();
  
      res.status(200).json({
        success: true,
        todolist: user.todolist, // Return the updated todolist
      });
    } catch (error) {
      console.error("Error:", error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  

  export const editStatus = async (req, res) => {
    try {
      const { email, taskId } = req.body;
  
      // Find the user by email
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }
  
      // Find the task in the todolist by ID
      const task = user.todolist.id(taskId);
      if (!task) {
        return res.status(404).json({ message: "Task not found." });
      }
  
      // Update the task details
      task.isCompleted = true;
  
      // Save the updated user
      await user.save();
  
      res.status(200).json({
        success: true,
        todolist: user.todolist, // Return the updated todolist
      });
    } catch (error) {
      console.error("Error:", error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };


  export const deleteTask = async (req, res) => {
    try {
      const { email, taskId } = req.body;
  
      // Find the user by email
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }
  
      // Find the index of the task in the todolist by ID
      const taskIndex = user.todolist.findIndex(task => task._id.toString() === taskId);
  
      if (taskIndex === -1) {
        return res.status(404).json({ message: "Task not found." });
      }
  
      // Remove the task from the todolist
      user.todolist.splice(taskIndex, 1);
  
      // Save the updated user
      await user.save();
  
      res.status(200).json({
        message: "Task deleted successfully.",
        success: true,
        todolist: user.todolist, // Return the updated todolist
      });
    } catch (error) {
      console.error("Error:", error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  