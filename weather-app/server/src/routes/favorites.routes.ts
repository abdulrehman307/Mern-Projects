import { Router } from 'express';
import { getFavorites, addFavorite, removeFavorite } from '../controllers/favorites.controller';

const router = Router();

// GET /api/favorites
router.get('/', getFavorites);

// POST /api/favorites
router.post('/', addFavorite);

// DELETE /api/favorites/:id
router.delete('/:id', removeFavorite);

export default router;
