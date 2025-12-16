import { Request, Response } from "express";

import { userServices } from "./user.setvices";

const createUser = async (req: Request, res: Response) => {

  try {
    const result = await userServices.createUser(req.body)
    res.status(201).json({
      success: true,
      message: "Data inserted successfully",
      data: result.rows[0],
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

const getUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getUser()
    res.status(200).json({
      success: true,
      message: "Users created successfully",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      details: error,
    });
  }
}

const getSingleUser = async (req: Request, res: Response) => {
  const result = await userServices.getSingleUser(req.params.id as string)
  if (result.rows.length === 0) {
    res.status(404).json({
      success: false,
      message: "user not found",
    });
  } else {
    res.status(200).json({
      success: true,
      message: "user fetched successfully",
      data: result.rows[0],
    });
  }
}

const updateUser = async (req: Request, res: Response) => {
  const { name, email } = req.body;

  try {
    const result = await userServices.updateUser(name,email,req.params.id as string)
    console.log(result.rows.length)
    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "user not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "user fetched successfully",
        data: result.rows[0],
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

const deleteUser = async (req: Request, res: Response) => {
  const result = await userServices.deleteUser(req.params.id as string)
  if (result.rowCount === 0) {
    res.status(404).json({
      success: false,
      message: "user not found",
    });
  } else {
    res.status(200).json({
      success: true,
      message: "user DELETE successfully",
      data: null
    });
  }
}

export const userControllers = {
    createUser,
    getUser,
    getSingleUser,
    updateUser,
    deleteUser
}