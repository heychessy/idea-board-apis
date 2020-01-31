import express, { Application } from "express";
import bodyParser from "body-parser";
import { IdeaController } from "./controllers/idea.controller";
import { ErrorController } from "./controllers/error.controller";
import mongoose from "mongoose";
import { MONGO_URI } from "./config/config";
import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "./swagger/swagger.json";
import morgan from "morgan";
import compression from "compression";
import { stream, logger } from "./config/winston";
import helmet from "helmet";
class App {
  public app: Application;
  public ideaController: IdeaController;
  public errorController: ErrorController;
  constructor() {
    this.app = express();
    this.setConfig();
    this.setMongooseConfig();
    this.setLogger();
    this.ideaController = new IdeaController();
    this.errorController = new ErrorController();
    this.setRoutes();
  }
  private setConfig() {
    this.app.use(helmet());
    this.app.use(bodyParser.json({ limit: "50mb" }));
    this.app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
    //this.app.use(cors);
    this.app.use(compression());
  }
  private setLogger() {
    this.app.use(morgan("combined", { stream: stream }));
  }
  private setMongooseConfig() {
    mongoose
      .connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
      })
      .catch(err => {
        logger.error(`Mongodb first connection failed: ${err.stack}`);
        process.exit(1);
      });

    mongoose.connection.on("connected", () => {
      logger.info("Mongoose default connection is open.");
    });

    mongoose.connection.on("error", err => {
      logger.error("Mongoose default connection has occured " + err + " error");
    });

    mongoose.connection.on("disconnected", () => {
      logger.info("Mongoose default connection is disconnected");
    });
  }
  private setRoutes() {
    this.app.use("/ideas", this.ideaController.router);
    this.app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    this.app.use(this.errorController.router);
    this.app.use(this.errorController.errorHandler);
  }
}
export default new App().app;
