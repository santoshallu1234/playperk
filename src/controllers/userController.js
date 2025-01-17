const User = require("../models/User");
const mongoose = require("mongoose");

// exports.signup = async (req, res) => {
//   try {
//     const data = await req.body;
//     // checking if user already exists
//     const user = await User.findOne({ email: data.email });

//     if (user) {
//       res.status(200).json({ message: "User already exists" });
//     } else {
//       const result = await User.create({
//         email: data.email,
//         name: data.name,
//         password: data.password,
//       });
//       res.status(201).json({ message: "User Created!", result });
//     }
//   } catch (error) {
//     res.status(500).json({ message: "an error occurred", error });
//   }
// };
exports.login = async (req, res) => {
  try {
    const data = await req.body;
    console.log("BODY: ", data);

    // checking if user already exists
    const user = await User.findOne({ email: data.email });

    if (user) {
      console.log("user exists");
      //   check password

      res.status(200).json({ message: "Account found, returning doc", result: user });
    } else {
      console.log("user doesnt exist, creating new account");
      const result = await User.create({
        email: data.email,
      });
      res.status(201).json({ message: "User Created!", result });
    }
  } catch (error) {
    res.send("error: " + error.message);
    console.log("error: " + error.message);
  }
};

exports.getData = async (req, res) => {
  try {
    const id = await req.params.id;
    console.log(id);

    if (id) {
      const result = await User.findById(id);
      if (result) {
        console.log("YEAH GOT DATA");
        res.status(200).json({ message: "YES", result });
      } else {
        console.log("NOOOOO DATA");

        res.status(400).json({ message: "no data found" });
      }
    } else {
      res.send("NO ID GIVEN");
    }
  } catch (error) {
    res.send("error: " + error.message);
  }
};

exports.updateUserProgress = async (req, res) => {
  const { userId, progress } = req.body; // Assuming userId and progress are passed in the request body
  const date = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD

  try {
    // Check if the provided userId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      console.log("INVALID USER ID")
      return res.status(400).json({ message: "Invalid userId format" });
    }

    // Find user by ObjectId
    let user = await User.findById(userId); // Directly query by ObjectId

    // If user not found, create a new user with the provided userId
    if (!user) {
      // user = new User({ _id: userId, progress: new Map() });
      console.log("USER NOT FOUND")
      res.status(400).json({ message: "User not found" });
    }

    // Get current progress for the specific date or initialize with default values
    const currentProgress = user.progress.get(date) || {
      linesCreated: 0,
      linesDeleted: 0,
      totalLinesChanged: 0,
      filesCreated: 0,
      filesDeleted: 0,
    };

    console.log("----------------------------------------------------------------")
    console.log("Current Progress: ");
    console.log(currentProgress)
    console.log("----------------------------------------------------------------")
    console.log("New Progress: ");
    console.log(progress)
    console.log("----------------------------------------------------------------")

    // Update progress for the specific date by adding the new values
    const updatedProgress = {
      linesCreated: currentProgress.linesCreated + (progress.linesCreated || 0),
      linesDeleted: currentProgress.linesDeleted + (progress.linesDeleted || 0),
      totalLinesChanged: currentProgress.totalLinesChanged + (progress.totalLinesChanged || 0),
      filesCreated: currentProgress.filesCreated + (progress.filesCreated || 0),
      filesDeleted: currentProgress.filesDeleted + (progress.filesDeleted || 0),
    };
    
    try {
      await user.progress.set(date, updatedProgress);

    } catch (e){
      console.log(e.message, e)
    }

    // Debug log to confirm the updated progress data
    console.log("Updated Progress in Map : " );
    console.log(user.progress.get(date))
    console.log("----------------------------------------------------------------")
    console.log("---------------------------END----------------------------------")



    // Mark the 'progress' field as modified before saving
    user.markModified('progress');

    // Save the user document
    await user.save();

    // Debug: Confirm that the user is saved and the progress has been updated
    const updatedUser = await User.findById(userId);
    // console.log("Saved User: ", updatedUser);

    // Return updated progress data as an object (for the response)
    res.status(200).json({
      message: "Successfully updated progress",
      progress: Object.fromEntries(updatedUser.progress.entries()),
    });
  } catch (error) {
    console.error('Error updating progress:', error);
    res.status(500).json({ message: "Server error", error, progress: null });
  }
};


