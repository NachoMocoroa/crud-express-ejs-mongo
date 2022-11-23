const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('back/index');
});

module.exports = router;