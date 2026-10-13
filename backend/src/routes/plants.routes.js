// router позволяет держать адреса API отдельно от app.js.
import { Router } from 'express';
import { getPlants } from '../controllers/plants.controller.js';

// создаём маршрутизатор для растений.
const router = Router();

// GET /api/plants возвращает каталог растений.
router.get('/', getPlants);

// экспортируем маршрутизатор для подключения к приложению.
export default router;
