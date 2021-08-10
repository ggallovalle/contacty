import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    switch (ctx.getType()) {
      case 'http': {
        const c = ctx.switchToHttp();
        const request = c.getRequest();
        // const user = request.user;
        let user = request.headers['authorization'];
        user = user?.split(' ')[1] ?? null;
        user = { userId: parseInt(user) };
        const userSlice = data ? user?.[data] : user;
        return userSlice ?? { userId: 1046 };
        break;
      }
      default: {
        throw new Error(`Execution Context "${ctx.getType()}" not handled`);
      }
    }
  }
);
