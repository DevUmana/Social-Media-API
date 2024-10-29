import { Request, Response } from "express";
import { Thought, User } from "../models/index.js";

/**
 * GET All Thoughts /thoughts
 * @returns an array of Thoughts
 */
export const getAllThoughts = async (_req: Request, res: Response) => {
  try {
    const thoughts = await Thought.find().select("-__v");
    res.json(thoughts);
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/**
 * GET Thought based on id /thought/:id
 * @param string id
 * @returns a single Thought object
 */

export const getThoughtById = async (req: Request, res: Response) => {
  const { thoughtId } = req.params;
  try {
    const thought = await Thought.findById(thoughtId).select("-__v");
    if (thought) {
      res.json(thought);
    } else {
      res.status(404).json({
        message: "Thought not found",
      });
    }
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/**
 * POST Thought /thoughts
 * @param object username
 * @returns a single Thought object
 */

export const createThought = async (req: Request, res: Response) => {
  const { userId } = req.body;
  try {
    const newThought = await Thought.create(req.body);
    const thoughtWithoutV = await Thought.findById(newThought._id).select(
      "-__v"
    );

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $push: { thoughts: newThought._id } },
      { new: true }
    ).select("-__v");

    if (!updatedUser) {
      res.status(404).json({
        message: "User not found",
      });
    }

    res.status(201).json(thoughtWithoutV);
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};

/**
 * PUT Thought based on id /thoughts/:id
 * @param string id
 * @returns a single Thought object
 */

export const updateThought = async (req: Request, res: Response) => {
  const { thoughtId } = req.params;
  try {
    const updatedThought = await Thought.findByIdAndUpdate(
      thoughtId,
      req.body,
      { new: true }
    ).select("-__v");
    if (updatedThought) {
      res.json(updatedThought);
    } else {
      res.status(404).json({
        message: "Thought not found",
      });
    }
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/**
 * DELETE Thought based on id /thoughts/:id
 * @param string id
 * @returns string
 */

export const deleteThought = async (req: Request, res: Response) => {
  const { thoughtId } = req.params;
  try {
    const thought = await Thought.findByIdAndDelete(thoughtId).select("-__v");

    if (thought) {
      // Remove the thought ID from the user's thoughts array
      await User.updateMany(
        { thoughts: thoughtId },
        { $pull: { thoughts: thoughtId } }
      );

      res.json({ message: "Thought deleted and removed from user's thoughts" });
    } else {
      res.status(404).json({ message: "Thought not found" });
    }
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/**
 * POST Reaction /thoughts/:thoughtId/reactions
 * @param string thoughtId
 * @returns a single Thought object
 */

export const createReaction = async (req: Request, res: Response) => {
  const { thoughtId } = req.params;
  try {
    const updatedThought = await Thought.findByIdAndUpdate(
      thoughtId,
      { $push: { reactions: req.body } },
      { new: true }
    ).select("-__v");
    if (updatedThought) {
      res.json(updatedThought);
    } else {
      res.status(404).json({
        message: "Thought not found",
      });
    }
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/**
 * DELETE Reaction based on id /thoughts/:thoughtId/reactions/:reactionId
 * @param string thoughtId, reactionId
 * @returns string
 */

export const deleteReaction = async (req: Request, res: Response) => {
  const { thoughtId, reactionId } = req.params;

  try {
    const updatedThought = await Thought.findByIdAndUpdate(
      thoughtId,
      { $pull: { reactions: { _id: reactionId } } },
      { new: true }
    ).select("-__v");

    if (updatedThought) {
      res.json({ message: "Reaction deleted" });
    } else {
      res.status(404).json({
        message: "Thought not found",
      });
    }
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};
