const userRouter = require('express').Router();
const { User, Initiative } = require('../../db/models');

userRouter.get('/', async (req, res) =>  {
    try {
        const users = await User.findAll({
        attributes: {exclude: ['password']}
        
    }); 
    res.json(users);
    } catch (error) {
        res.status(500).json('Ошибка сервера');
    }
});

userRouter.get('/:id/initiatives', async (req, res) => {
  try {
    const { id } = req.params;
    const initiatives = await Initiative.findAll({
      where: { userId: id },
      include: [{ model: User }],
    });

    if (!initiatives) {
      return res.status(404).json({ error: 'Инициативы не найдены' });
    }

    res.json(initiatives);
  } catch (error) {
    res.status(500).json('Ошибка сервера');
  }
});

module.exports = userRouter