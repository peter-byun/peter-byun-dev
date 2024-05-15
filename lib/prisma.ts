import { PrismaClient } from '@prisma/client';
import { isProd } from '../utils/environment-checker';

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient;
}

let prisma: PrismaClient;

if (isProd()) {
  prisma = new PrismaClient();
} else {
  prisma = reusePrismaClient();
}

function reusePrismaClient() {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
    return global.prisma;
  }

  return global.prisma;
}

export default prisma;
