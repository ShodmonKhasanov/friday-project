const userRouter = require('express').Router();
const { User } = require('../../db/models');

userRouter.get('/', async (req, res) =>  {
    try {
        const users = await User.findAll({
        attributes: {exclude: ['password']}
        
    }); 
    res.json(users);
    } catch (error) {
        res.status(500).json('Internal server error');
    }
});

module.exports = userRouter