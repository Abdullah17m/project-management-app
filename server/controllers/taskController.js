import Notice from "../models/notification.js";
import Task from "../models/task.js";
import User from "../models/user.js";

export const createTask = async (req, res) => {
  try {
    const { userId } = req.user;

    const { title, team, stage, date, priority, assets } = req.body;

    let text = "New task has been assigned to you";
    if (team?.length > 1) {
      text = text + ` and ${team?.length - 1} others.`;
    }

    text =
      text +
      ` The task priority is set a ${priority} priority, so check and act accordingly. The task date is ${new Date(
        date
      ).toDateString()}. Thank you!!!`;

    const activity = {
      type: "assigned",
      activity: text,
      by: userId,
    };

    const task = await Task.create({
      title,
      team,
      stage: stage.toLowerCase(),
      date,
      priority: priority.toLowerCase(),
      assets,
      activities: activity,
      createdBy: userId
    });

    await Notice.create({
      team,
      text,
      task: task._id,
    });

    res
      .status(200)
      .json({ status: true, task, message: "Task created successfully." });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};

export const duplicateTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id);

    const newTask = await Task.create({
      ...task,
      title: task.title + " - Duplicate",
    });

    newTask.team = task.team;
    newTask.subTasks = task.subTasks;
    newTask.assets = task.assets;
    newTask.priority = task.priority;
    newTask.stage = task.stage;

    await newTask.save();

    //alert users of the task
    let text = "New task has been assigned to you";
    if (task.team.length > 1) {
      text = text + ` and ${task.team.length - 1} others.`;
    }

    text =
      text +
      ` The task priority is set a ${
        task.priority
      } priority, so check and act accordingly. The task date is ${task.date.toDateString()}. Thank you!!!`;

    await Notice.create({
      team: task.team,
      text,
      task: newTask._id,
    });

    res
      .status(200)
      .json({ status: true, message: "Task duplicated successfully." });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};

export const postTaskActivity = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.user;
    const { type, activity } = req.body;

    const task = await Task.findById(id);

    const data = {
      type,
      activity,
      by: userId,
    };

    task.activities.push(data);

    await task.save();

    res
      .status(200)
      .json({ status: true, message: "Activity posted successfully." });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};

export const dashboardStatistics = async (req, res) => {
  try {
    const { userId, isAdmin } = req.user;
    console.log(req.user);
    const allTasks = isAdmin
      ? await Task.find({
          isTrashed: false,
          team: { $all: [userId] }
        })
          .populate({
            path: "team",
            select: "name role title email",
          })
          .sort({ _id: -1 })
      : await Task.find({
          isTrashed: false,
          team: { $all: [userId] },
        })
          .populate({
            path: "team",
            select: "name role title email",
          })
          .sort({ _id: -1 });

    const users = await User.find({ isActive: true })
      .select("name title role isAdmin isActive createdAt") // Ensure isActive is included
      .limit(10)
      .sort({ _id: -1 });

    // Group tasks by stage and calculate counts
    const groupTaskks = allTasks.reduce((result, task) => {
      const stage = task.stage;

      if (!result[stage]) {
        result[stage] = 1;
      } else {
        result[stage] += 1;
      }

      return result;
    }, {});

    // Group tasks by priority
    const groupData = Object.entries(
      allTasks.reduce((result, task) => {
        const { priority } = task;

        result[priority] = (result[priority] || 0) + 1;
        return result;
      }, {})
    ).map(([name, total]) => ({ name, total }));

    // Calculate total tasks
    const totalTasks = allTasks?.length;
    const last10Task = allTasks?.slice(0, 10);
    console.log(totalTasks);
    const summary = {
      totalTasks,
      last10Task,
      users: isAdmin ? users : [],
      tasks: groupTaskks,
      graphData: groupData,
    };

    res.status(200).json({
      status: true,
      message: "Successfully",
      ...summary,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};
export const getTasks = async (req, res) => {
  try {
    const { stage, id } = req.params;
    const { isTrashed } = req.query; // Fetch the query parameter
    const { userId } = req.user;
    let query = {};

    if (stage && stage !== 'trashed') {
      query.stage = stage;
    }

    query.team = id;
    
    // Set the isTrashed flag based on the stage or query parameter
    query.isTrashed = stage === 'trashed' || isTrashed === 'true';
    if(query.isTrashed){
      query.createdBy = userId;
    }
    console.log("Query:", query);

    const tasks = await Task.find(query)
      .populate({
        path: "team",
        select: "name title email",
      })
      .sort({ _id: -1 });

    console.log("Tasks:", tasks);

    res.status(200).json({
      status: true,
      tasks,
    });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(400).json({ status: false, message: error.message });
  }
};



// export const getTasks = async (req, res) => {
//   try {
//     console.log(req.query)
//     const { stage,id } = req.params;
   
//     let query = {};

//     if (stage) {
//       query.stage = stage;
//     }
    
//     query.team = id;
//     // query.team = { $in: [id] };
//     query.isTrashed = false;
//     if(stage === 'trashed'){
//       query.isTrashed=true;
//       query.stage='';
//     }
//     console.log(query)
//     const tasks = await Task.find(query)
//       .populate({
//         path: "team",
//         select: "name title email",
//       })
//       .sort({ _id: -1 });
//       console.log(tasks)
//     res.status(200).json({
//       status: true,
//       tasks,
//     });
//   } catch (error) {
//     console.error("Error fetching tasks:", error);
//     res.status(400).json({ status: false, message: error.message });
//   }
// };







export const getTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id)
      .populate({
        path: "team",
        select: "name title role email",
      })
      .populate({
        path: "activities.by",
        select: "name",
      });
      console.log(task);

    res.status(200).json({
      status: true,
      task,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};

export const createSubTask = async (req, res) => {
  try {
    const { title, tag, date } = req.body;

    const { id } = req.params;

    const newSubTask = {
      title,
      date,
      tag,
    };

    const task = await Task.findById(id);

    task.subTasks.push(newSubTask);

    await task.save();

    res
      .status(200)
      .json({ status: true, message: "SubTask added successfully." });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, date, team, stage, priority, assets } = req.body;

    const task = await Task.findById(id);

    task.title = title;
    task.date = date;
    task.priority = priority.toLowerCase();
    task.assets = assets;
    task.stage = stage.toLowerCase();
    task.team = team;

    await task.save();

    res
      .status(200)
      .json({ status: true, message: "Task duplicated successfully." });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};

export const trashTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id);

    task.isTrashed = true;

    await task.save();

    res.status(200).json({
      status: true,
      message: `Task trashed successfully.`,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};
export const leaveTask = async (req,res) => {
  const { id } = req.params;
  const { userId } = req.user;
 
  try {
    const task = await Task.findById(id);
    console.log(task);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Check if the user is in the team
    const userIndex = task.team.indexOf(userId);
    if (userIndex === -1) {
      return res.status(403).json({ message: 'You are not part of this task' });
    }

    // Prevent the last remaining user from leaving the task
    if (task.team.length === 1 && task.team[0].equals(userId)) {
      return res.status(403).json({ message: 'You cannot leave the task as the last remaining member' });
    }

    // Remove the user from the team
    task.team.splice(userIndex, 1);

    // Check if the user is the creator
    if (task.createdBy.equals(userId)) {
      if (task.team.length > 0) {
        // Assign a new creator from the remaining team members
        task.createdBy = task.team[0];
      } else {
        // If no team members are left, set createdBy to null
        task.createdBy = null;
      }
    }

    await task.save();

    res.json({ message: 'You have left the task successfully', task });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}
export const deleteRestoreTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { actionType } = req.query;
    const {userId} = req.user;
    console.log(actionType);
    if (actionType === "delete") {
      await Task.findByIdAndDelete(id);
    } else if (actionType === "deleteAll") {
      await Task.deleteMany({ isTrashed: true, createdBy:userId });
    } else if (actionType === "restore") {
      const resp = await Task.findById(id);

      resp.isTrashed = false;
      resp.save();
    } else if (actionType === "restoreAll") {
      await Task.updateMany(
        { isTrashed: true ,createdBy:userId},
        { $set: { isTrashed: false } }
      );
    }

    res.status(200).json({
      status: true,
      message: `Operation performed successfully.`,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};

// export const getTrashedTasks = async (req, res) => {
//   try {
//     const { id } = req.params;
//     let query = {};

    
//       query.isTrashed = true;
    
//     query.team = id;
//     // Fetch trashed tasks for the user
//     const tasks = await Task.find(query)
//       .populate({
//         path: "team",
//         select: "name title email",
//       })
//       .sort({ _id: -1 });

//     res.status(200).json({
//       status: true,
//       tasks,
//     });
//   } catch (error) {
//     console.error("Error fetching trashed tasks:", error);
//     res.status(400).json({ status: false, message: error.message });
//   }
// };
