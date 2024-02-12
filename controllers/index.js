const router = require('express').Router();
const homeRoutes = require('./homeRoutes');
const apiRoutes = require('./api/index.js')
const dashboard =require('./dashboardRoutes.js')
router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/dashboard', dashboard);

module.exports = router;