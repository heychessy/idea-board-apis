import winston from "winston";

// define the custom settings for each transport (file, console)
const options = {
  file: {
    level: "info",
    filename: "logs/app.log",
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false
  },
  console: {
    level: "debug",
    handleExceptions: true,
    json: false,
    colorize: true
  }
};

// instantiate a new Winston Logger with the settings defined above
export let logger: winston.Logger = winston.createLogger({
  transports: [
    new winston.transports.File(options.file),
    new winston.transports.Console(options.console)
  ],
  exitOnError: false // do not exit on handled exceptions
});

export const stream = {
  write: (message: string) => {
    logger.info(message);
  }
};
