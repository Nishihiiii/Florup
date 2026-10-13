// контроллер принимает HTTP-запрос и передаёт работу сервисному слою.
import { listPlants } from '../services/plants.service.js'; // импортируем запрос к каталогу.

// обработчик GET /api/plants возвращает список растений в формате JSON.
export async function getPlants(_req, res, next) {
  try {
    // ждём результат запроса к базе и отправляем его клиенту.
    const plants = await listPlants();
    res.json(plants);
  } catch (error) {
    // передаём ошибку общему обработчику express, чтобы не дублировать ответы об ошибках.
    next(error);
  }
}
