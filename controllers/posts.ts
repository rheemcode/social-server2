//import PostMessage, { Connection } from "../models/postMessage.js";
import PostMessage from "../models/postMessage.js";
import { Request, Response } from "express";
import { connection } from "mongoose";

interface PostBody {
  title: string;
  message: string;
  creator: string;
  tags: string | string[];
  selectedFile: string;
  likeCount:
    | {
        type: number;
        default?: 0;
      }
    | number
    | string;
  createdAt:
    | {
        type: Date;
        default?: Date;
      }
    | Date;
}
var num: number = 1;
export const getPost = async (req: Request, res: Response) => {
  try {
    let result = await PostMessage.findAll();
    res.status(200).json(result);
  } catch (err) {
    res.status(404).json(err);
    console.log(err);
  }
};

export const createPost = async (req: Request, res: Response) => {
  const post: PostBody = req.body;
  try {
    const result = await PostMessage.create({
      title: post.title,
      message: post.message,
      tags: post.tags,
      likeCount: post.likeCount,
      creator: post.creator,
      selectedFile: post.selectedFile,
    });

    res.status(201).json(result);
  } catch (error) {
    res.status(409).json(error);
    console.log(error);
  }
};

export const updatePost = async (req: Request, res: Response) => {
  try {
    const { id: _id } = req.params;
    const post: PostBody = req.body;
    const postToUpdate = await PostMessage.checkIsvalidAndUpdate(_id, post);

    res.json(postToUpdate);
  } catch (e) {
    res.status(404).json(e);
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const { id: _id } = req.params;
    await PostMessage.checkIsValidAndDelete(_id);
    res.json({ message: "deleted succesfully" });
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};
var a = Date();

export const likePost = async (req: Request, res: Response) => {
  try {
    const { id: _id } = req.params;
    var updatedPost = await PostMessage.checkIsValidAndUpdateLike(_id);
    res.json(updatedPost);
  } catch (error) {
    res.json(error);
  }
};
