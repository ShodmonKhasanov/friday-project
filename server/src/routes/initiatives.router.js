const initiativesRouter = require('express').Router();
const { Initiative } = require('../../db/models');

initiativesRouter.get('/', async (req, res) =>  {
    try {
        const initiatives = await Initiative.findAll(); 
    res.json(initiatives);
    } catch (error) {
        res.status(500).json('Internal server error');
    }
});

module.exports = initiativesRouter