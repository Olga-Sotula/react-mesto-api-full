const Card = require('../models/card');
const { ErrorBadRequest } = require('../errors/ErrorBadRequest');
const { ErrorNotFound } = require('../errors/ErrorNotFound');
const { ErrorForbidden } = require('../errors/ErrorForbidden');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

const createCard = (req, res, next) => {
  const owner = req.user._id;
  const { name, link } = req.body;

  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((e) => {
      if (e.name === 'ValidationError') {
        next(ErrorBadRequest('Ошибка данных в запросе'));
      } else {
        next(e);
      }
    });
};

const deleteCardById = (req, res, next) => {
  Card.findById(req.params.id)
    .orFail(() => new ErrorNotFound('Карточка не найдена'))
    .then((card) => {
      if (!card.owner.equals(req.user._id)) {
        throw new ErrorForbidden('Отсутствуют права на удаление карточки');
      } else {
        return Card.findByIdAndDelete(req.params.id);
      }
    })
    .then((deletedCard) => res.send({ data: deletedCard }))
    .catch((e) => {
      if (e.name === 'CastError') {
        next(new ErrorBadRequest('Ошибка данных в запросе: некорректный Id'));
      } else {
        next(e);
      }
    });
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true, runValidators: true },
  )
    .orFail(() => new ErrorNotFound('Карточка не найдена'))
    .then((card) => {
      res.send({ data: card });
    })
    .catch((e) => {
      if (e.name === 'CastError') {
        next(ErrorBadRequest('Ошибка данных в запросе: некорректный Id'));
      } else {
        next(e);
      }
    });
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true, runValidators: true },
  )
    .orFail(() => new ErrorNotFound('Карточка не найдена'))
    .then((card) => {
      res.send({ data: card });
    })
    .catch((e) => {
      if (e.name === 'CastError') {
        next(new ErrorBadRequest('Ошибка данных в запросе: некорректный Id'));
      } else {
        next(e);
      }
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCardById,
  likeCard,
  dislikeCard,
};
