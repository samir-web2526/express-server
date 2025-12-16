import { Request, Response } from "express";
import { pool } from "../../config/db";
import { todosServices } from "./todos.services";

const createTodos = async (req: Request, res: Response) => {
  // const { user_id, title } = req.body;
  try {
    const result = await todosServices.createTodos(req.body)
    res.status(201).json({
      success: true,
      message: "todo created successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      suceess: false,
      message: error.message,
    });
  }
};

const getTodos = async (req: Request, res: Response) => {
  try {
    const result = await todosServices.getTodos()
    res.status(200).json({
      success: true,
      message: "todos retrived successfully",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      details: error,
    });
  }
};

const getSingleTodos = async (req: Request, res: Response) => {
  const result = await todosServices.getSingleTodo(req.params.id as string)
  if (result.rows.length === 0) {
    res.status(404).json({
      success: false,
      message: "todos not found",
    });
  } else {
    res.status(200).json({
      success: true,
      message: "todos fetched successfully",
      data: result.rows[0],
    });
  }
};

const updateTodos = async (req: Request, res: Response) => {

  try {
    const result = await todosServices.updateTodos(req.body,req.params.id as string)
    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "todos not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "todos updated successfully",
        data: result.rows[0],
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteTodos = async (req: Request, res: Response) => {
  const result = await todosServices.deleteTodos(req.params.id!)
  if (result.rowCount === 0) {
    res.status(404).json({
      success: false,
      message: "todos not found",
    });
  } else {
    res.status(200).json({
      success: true,
      message: "todos DELETE successfully",
      data: null
    });
  }
};

export const todosCollections = {
    createTodos,
    getTodos,
    getSingleTodos,
    updateTodos,
    deleteTodos
}