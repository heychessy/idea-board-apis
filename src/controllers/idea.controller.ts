import { Router } from "express";
import { IdeaService } from "../services/idea.services";
import { IdeaValidators } from "../validators/idea.validors";
export class IdeaController {
  private ideaService: IdeaService;
  private ideaValidator: IdeaValidators;
  public router: Router;
  constructor() {
    this.ideaService = new IdeaService();
    this.ideaValidator = new IdeaValidators();
    this.router = Router();
    this.routes();
  }
  public routes() {
    this.router.route("/").get(this.ideaService.welcomeMessage);
    this.router.route("/ideas").get(this.ideaService.getAllIdeas);
    this.router
      .route("/create")
      .post(
        this.ideaValidator.createIdeaValidators(),
        this.ideaService.createIdea
      );
    this.router.route("/view/:id").get(this.ideaService.viewIdea);
    this.router.route("/delete/:id").delete(this.ideaService.deleteIdea);
    this.router
      .route("/update")
      .put(
        this.ideaValidator.updateIdeaValidators(),
        this.ideaService.updateIdea
      );
  }
}
