// контроллер принимает HTTP-запрос и возвращает данные справочника.
import { listProblems } from '../services/problems.service.js'; // подключаем запрос к базе.

// обработчик GET /api/problems.
export async function getProblems(_req, res, next) {
  try {
    // получаем записи из сервиса и отправляем их в формате JSON.
    const problems = await listProblems();
    res.json(problems);
  } catch (error) {
    // передаём ошибку общему обработчику express.
    next(error);
  }
}
