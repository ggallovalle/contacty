import { PrismaClient } from '@prisma/client';

export class PrismaService extends PrismaClient {
  constructor() {
    super({
      // log: ['query', 'info'],
    });
  }

  async down(...promises: ('contact' | 'user')[]) {
    await this.$transaction(
      promises.map((it) => (this[it] as any).deleteMany())
    );
  }
}
