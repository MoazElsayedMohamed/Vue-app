import { StatusCodes } from "http-status-codes";
import Job from "../models/JobModel.js";
import User from "../models/UserModel.js";

export const getCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId });
  const userWithourPassword = user.toJSON();
  res.status(StatusCodes.OK).json({ user: userWithourPassword });
};
export const getApplicationStats = async (req, res) => {
  const users = await User.countDocuments();
  const jobs = await Job.countDocuments();
  return res.status(StatusCodes.OK).json({ users, jobs });
};
export const updateUser = async (req, res) => {
  const obj = { ...req.body };
  delete obj.password;
  const updateUser = await User.findByIdAndDelete(req.user.userId, obj);
  res.status(StatusCodes.OK).json({ updateUser });
};
