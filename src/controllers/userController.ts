import { Request, Response } from "express";
import { User, Thought } from "../models/index.js";

/**
 * GET All Users /users
 * @returns an array of Users
 */

export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    // Find all users hide __v field
    const users = await User.find().select("-__v");
    res.json(users);
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/**
 * GET User based on id /user/:id
 * @param string id
 * @returns a single User object
 */

export const getUserById = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId).select("-__v");
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({
        message: "User not found",
      });
    }
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/**
 * POST User /users
 * @param object username
 * @returns a single User object
 */

export const createUser = async (req: Request, res: Response) => {
  try {
    const newUser = await User.create(req.body);
    const userWithoutV = await User.findById(newUser._id).select("-__v");
    res.status(201).json(userWithoutV);
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};

/**
 * PUT User based on id /users/:id
 * @param string id
 * @param object username
 * @returns a single User object
 */

export const updateUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
    }).select("-__v");
    if (User) {
      if (updatedUser) {
        res.json(updatedUser);
      } else {
        res.status(404).json({
          message: "User not found",
        });
      }
    }
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};

/**
 * DELETE User based on id /users/:id
 * @param string id
 * @returns string
 */

export const deleteUser = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(userId).select("-__v");

    if (deletedUser) {
      // Remove the deleted user from friends lists of other users
      await User.updateMany(
        { friends: { $in: [userId] } },
        { $pull: { friends: userId } }
      );

      // Delete all thoughts associated with the user, if any
      if (deletedUser.thoughts && deletedUser.thoughts.length > 0) {
        await Thought.deleteMany({
          _id: { $in: deletedUser.thoughts },
        });
      }

      res.json({
        message:
          "User deleted, along with their thoughts, and removed from friends' lists",
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * POST Friend /users/:userId/friends/:friendId
 * @param string userId, friendId
 * @returns a single User object
 */

export const addFriend = async (req: Request, res: Response) => {
  const { userId, friendId } = req.params;

  try {
    // Check if the user is trying to add themselves as a friend
    if (userId === friendId) {
      return res.status(400).json({
        message: "Cannot add yourself as a friend",
      });
    }

    // Attempt to add the friend
    const newFriend = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { friends: friendId } },
      { new: true }
    ).select("-__v");

    // Check if the user was found and updated
    if (newFriend) {
      return res.json(newFriend);
    } else {
      return res.status(404).json({
        message: "User not found",
      });
    }
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

/**
 * DELETE Friend /users/:userId/friends/:friendId
 * @param string userId, friendId
 * @returns string
 */

export const deleteFriend = async (req: Request, res: Response) => {
  const { userId, friendId } = req.params;
  try {
    const deletedFriend = await User.findByIdAndUpdate(
      userId,
      { $pull: { friends: friendId } },
      { new: true }
    ).select("-__v");
    if (deletedFriend) {
      res.json("Friend deleted");
    } else {
      res.status(404).json({
        message: "Friend not found",
      });
    }
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};
