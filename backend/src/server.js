// загружаем переменные окружения из .env до запуска сервера.
import 'dotenv/config';
// создаём HTTP-сервер, на котором работает express.
import { createServer } from 'node:http';
// подключаем socket.io для будущих событий в реальном времени.
import { Server } from 'socket.io';
// импортируем настроенное express-приложение.
import app from './app.js';
// импортируем клиент базы данных для корректного завершения работы.
import { prisma } from './config/prisma.js';

// берём порт из настроек или используем 3000 по умолчанию.
const port = Number(process.env.PORT) || 3000;
// создаём сервер на основе express-приложения.
const httpServer = createServer(app);

// настраиваем socket.io на том же сервере.
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

// этот обработчик вызывается при подключении клиента по веб-сокету.
io.on('connection', (socket) => {
  console.log(`Socket.IO client connected: ${socket.id}`);

  // фиксируем отключение клиента, чтобы было проще проверять соединение.
  socket.on('disconnect', () => {
    console.log(`Socket.IO client disconnected: ${socket.id}`);
  });
});

// запускаем сервер и выводим адрес для разработчика.
httpServer.listen(port, () => {
  console.log(`Florup API listening on http://localhost:${port}`);
});

// при остановке закрываем сервер и соединение с базой данных.
async function shutdown() {
  console.log('Shutting down server...');
  httpServer.close(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
}

// обрабатываем остановку через ctrl+c.
process.on('SIGINT', shutdown);
// обрабатываем сигнал завершения от системы или контейнера.
process.on('SIGTERM', shutdown);
