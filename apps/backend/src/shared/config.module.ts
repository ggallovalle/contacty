import { ConfigModule as Module } from '@nestjs/config';

export type Configuration = {
  port: number;
};

export const ConfigModule = Module.forRoot({
  load: [
    (): Configuration => {
      const env = process.env;
      return {
        port: parseInt(env.PORT || env.BACKEND_EXPOSE_PORT) || 3333,
      };
    },
  ],
});
