import winston from "winston";

const { timestamp, combine, printf, colorize } = winston.format;

const logFormat = printf(({ message, timestamp, stack }) => {
    return `[services-api] - ${timestamp}: ${stack || message}`;
});

const logger = winston.createLogger({
    levels: winston.config.syslog.levels,
    format: combine(
        timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        winston.format.errors({ stack: true }),
        colorize({ all: true }),
        logFormat
    ),
    transports: [new winston.transports.Console()],
    exitOnError: false,
});

logger.info("Logger Online");

export default logger;
