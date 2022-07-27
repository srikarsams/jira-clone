import { PrismaClient } from '@prisma/client';

declare global {
  var __db: PrismaClient | undefined;
}

let db: PrismaClient;
const env = process.env.NODE_ENV;

if (env === 'production') {
  db = new PrismaClient();
} else if (env === 'development') {
  if (!global.__db) {
    global.__db = new PrismaClient({ log: ['query', 'info', 'warn', 'error'] });
  }
  db = global.__db;
}

export { db };
