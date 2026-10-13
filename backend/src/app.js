// express отвечает за HTTP-сервер и маршруты приложения.
import express from 'express';
// cors разрешает запросы с адреса фронтенда.
import cors from 'cors';

// создаём приложение express, к которому подключаем middleware и маршруты.
const app = express();

// разрешаем браузеру обращаться к API с указанного адреса.
app.use(cors({
  origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
}));
// разбираем JSON-тело запроса и ограничиваем его размер.
app.use(express.json({ limit: '2mb' }));

// проверочный маршрут показывает, что сервер запущен.
app.get('/api/health', (_req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'florup-api',
    timestamp: new Date().toISOString(),
  });
});

// подключаем API каталога растений.
app.use('/api/plants', (await import('./routes/plants.routes.js')).default);
// подключаем API справочника болезней и вредителей.
app.use('/api/problems', (await import('./routes/problems.routes.js')).default);

// если маршрут не найден, возвращаем понятный ответ 404.
app.use((req, res) => {
  res.status(404).json({ error: 'Маршрут не найден' });
});

// единый обработчик непредвиденных ошибок не раскрывает детали клиенту.
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: 'Внутренняя ошибка сервера' });
});

export default app;
