const initiativesRouter = require('express').Router();
const { Initiative, User } = require('../../db/models');

// Получить все инициативы
initiativesRouter.get('/', async (req, res) => {
  try {
    const initiatives = await Initiative.findAll();
    res.json(initiatives);
  } catch (error) {
    res.status(500).json('Ошибка сервера');
  }
});

// Добавить новую инициативу
initiativesRouter.post('/add', async (req, res) => {
  try {
    console.log('Полученные данные:', req.body);
    const { title, description, userId, initiativeTypeId, initLevelId, endDate } = req.body;

    const initiative = await Initiative.create({
      title,
      description,
      userId,
      initiativeTypeId,
      initLevelId,
      endDate,
      votesCount: 0,
      percentFor: 0,
    });

    return res.status(201).json(initiative);
  } catch (error) {
    console.error('Ошибка на сервере:', error);
    return res.status(400).json({ error: 'Ошибка при добавлении инициативы' });
  }
});

// Получить инициативу по ID с данными пользователя
initiativesRouter.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const initiative = await Initiative.findByPk(id, {
      include: [{ model: User }],
    });

    if (!initiative) {
      return res.status(404).json({ error: 'Инициатива не найдена' });
    }

    return res.json(initiative);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

// Обновить инициативу по ID
initiativesRouter.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      userId,
      initiativeTypeId,
      initLevelId,
      endDate,
      votesCount,
      percentFor,
    } = req.body;

    const initiative = await Initiative.findByPk(id);

    if (!initiative) {
      return res.status(404).json({ error: 'Инициатива не найдена' });
    }

    await initiative.update({
      title,
      description,
      userId,
      initiativeTypeId,
      initLevelId,
      endDate,
      votesCount,
      percentFor,
    });

    return res.json(initiative);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

// Голосование за инициативу
initiativesRouter.put('/:id/vote', async (req, res) => {
  try {
    const { id } = req.params;
    const { voteType } = req.body;
    const initiative = await Initiative.findByPk(id);

    if (!initiative) {
      return res.status(404).json({ error: 'Инициатива не найдена' });
    }

    let updatedVotesCount = initiative.votesCount + 1;
    let updatedPercentFor = initiative.percentFor;

    if (voteType === 'for') {
      const totalForVotes = (initiative.percentFor / 100) * initiative.votesCount + 1;
      updatedPercentFor = (totalForVotes / updatedVotesCount) * 100;
    } else if (voteType === 'against') {
      const totalForVotes = (initiative.percentFor / 100) * initiative.votesCount;
      updatedPercentFor = (totalForVotes / updatedVotesCount) * 100;
    }

    await initiative.update({
      votesCount: updatedVotesCount,
      percentFor: updatedPercentFor,
    });

    return res.json(initiative);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

initiativesRouter.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    console.log(`Запрос инициатив юзера по ID: ${userId}`);

    const initiatives = await Initiative.findAll({
      where: { userId },
      include: [{ model: User }],
    });

    if (!initiatives.length) {
      return res.status(404).json({ error: 'Инициативы не найдены' });
    }

    return res.json(initiatives);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: error.message });
  }
});


module.exports = initiativesRouter;
