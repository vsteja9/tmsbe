import { configDotenv } from 'dotenv';

configDotenv();
const loggerConfig = {
  pinoHttp: {
    name: 'Nestjs',
    
    level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
    transport: {
      targets: [
        {
          target: 'pino-pretty',
          level: 'debug',
          options: {
            colorize: true,
            ignore: 'req.headers,res.headers',
          },
        },
        {
          target: 'pino/file',
          level: 'debug',
          options: {
            destination: './logs/app.log',
            mkdir: true,
          },
        },
        {
          target: 'pino/file',
          level: 'error',
          options: {
            destination: './logs/app-error.log',
            mkdir: true,
          },
        },
      ],
    },
  },
};

export default loggerConfig;
