import express, { Application } from "express";
import bodyParser from "body-parser";
import { IdeaController } from "./controllers/idea.controller";
import { ErrorController } from "./controllers/error.controller";
import mongoose from "mongoose";
import { MONGO_URI } from "./config/config";
import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "./swagger/swagger.json";
class App {
  public app: Application;
  public ideaController: IdeaController;
  public errorController: ErrorController;
  constructor() {
    this.app = express();
    this.setConfig();
    this.setMongooseConfig();

    this.ideaController = new IdeaController();
    this.errorController = new ErrorController();
    this.setRoutes();
  }
  private setConfig() {
    this.app.use(bodyParser.json({ limit: "50mb" }));
    this.app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
  }
  private setMongooseConfig() {
    mongoose
      .connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      .catch(err => {
        console.log(`Mongodb first connection failed: ${err.stack}`);
        process.exit(1);
      });
  }
  private setRoutes(): void {
    this.app.use("/ideas", this.ideaController.router);
    this.app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    this.app.use(this.errorController.router);
    this.app.use(this.errorController.errorHandler);
  }
}
export default new App().app;
