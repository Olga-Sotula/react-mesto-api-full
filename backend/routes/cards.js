const express = require('express');

const cardRouter = express.Router();
const {
  getCards,
  createCard,
  deleteCardById,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');
const { createCardValidator, idValidator } = require('../middlewares/validation');

cardRouter.get('/cards', getCards);
cardRouter.post('/cards', createCardValidator, createCard);
cardRouter.delete('/cards/:id', idValidator, deleteCardById);
cardRouter.put('/cards/:id/likes', idValidator, likeCard);
cardRouter.delete('/cards/:id/likes', idValidator, dislikeCard);

module.exports = {
  cardRouter,
};
