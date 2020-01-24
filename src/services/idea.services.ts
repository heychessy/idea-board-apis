import { Request, Response, NextFunction } from "express";
import { MongooseDocument } from "mongoose";
import { Idea } from "../models/Idea";
import { ErrorHandler } from "../controllers/error.controller";
import { validationResult } from "express-validator";
export class IdeaService {
  public welcomeMessage(req: Request, res: Response) {
    return res.status(200).send("Welcome to Idea-board App.");
  }

  public getAllIdeas(req: Request, res: Response, next: NextFunction) {
    Idea.find({}, (err: Error, idea: MongooseDocument) => {
      if (err) return next(new ErrorHandler(400, err.message));
      res.status(200).json(idea);
    });
  }
  public createIdea(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return next(new ErrorHandler(400, "Invalid parameters!"));
    const { title, description } = req.body;
    new Idea({ title: title, description: description }).save(
      (err: Error, idea: MongooseDocument) => {
        if (err) next(new ErrorHandler(400, err.message));
        else res.status(201).json(idea);
      }
    );
  }
  public viewIdea(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return next(new ErrorHandler(400, "Invalid parameters!"));
    const { id } = req.params;
    Idea.findById(id, (err: Error, idea: MongooseDocument) => {
      if (err) return next(new ErrorHandler(404, err.message));
      if (idea) res.status(200).json(idea);
      else next(new ErrorHandler(404, "Idea not found."));
    });
  }
  public deleteIdea(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return next(new ErrorHandler(400, "Invalid parameters!"));
    const { id } = req.params;
    Idea.findByIdAndDelete(id, (err: Error, deleted: any) => {
      if (err) return next(new ErrorHandler(404, err.message));
      if (deleted) {
        const msg = "Idea deleted!";
        res.status(200).send(msg);
      } else next(new ErrorHandler(404, "Idea not found."));
    });
  }
  public updateIdea(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return next(new ErrorHandler(400, "Invalid parameters!"));
    const { id, title, description } = req.body;

    Idea.findByIdAndUpdate(
      id,
      { title: title, description: description },
      (err: Error, idea: any) => {
        if (err) return next(new ErrorHandler(400, err.message));
        if (idea) {
          const msg = "Idea updated!";
          res.status(200).send(msg);
        } else next(new ErrorHandler(404, "Idea not found."));
      }
    );
  }
}
