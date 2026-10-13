// в этом файле описаны адреса API для справочника проблем растений.
import { Router } from 'express'; // импортируем маршрутизатор express.
import { getProblems } from '../controllers/problems.controller.js'; // подключаем обработчик запроса.

const router = Router(); // создаём отдельный маршрутизатор.
router.get('/', getProblems); // GET /api/problems возвращает список записей.

export default router; // отдаём маршрутизатор приложению.
