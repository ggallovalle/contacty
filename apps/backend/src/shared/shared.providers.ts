import { ProvidenciaNestjs } from '@contacty/providencia-nestjs';
import { PrismaService } from './prisma.service';

export const prismaSrv = new ProvidenciaNestjs<PrismaService>(PrismaService);
