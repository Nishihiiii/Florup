// PrismaClient генерируется на основе схемы базы данных.
import { PrismaClient } from '@prisma/client';

// создаём общий клиент, через который сервисы обращаются к PostgreSQL.
export const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
});
