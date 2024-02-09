import winston from "winston";

// Define the logger configuration
const logger = winston.createLogger({
  levels: winston.config.npm.levels,
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.simple(),
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: "logs/error.log",
      level: "error",
    }),
    new winston.transports.File({ filename: "logs/combined.log" }),
  ],
});

export default logger;
