const { Initiative } = require('../../db/models');

async function checkOwner(req, res, next) {
  const initiative = await Initiative.findByPk(req.params.id);

  if (!initiative) return res.status(400).json({ message: 'No initiative found' });

  if (initiative.userId !== res.locals.user.id) {
    return res.status(403).json({ message: 'Not your initiative!' });
  }

  return next();
}
module.exports = checkOwner;
