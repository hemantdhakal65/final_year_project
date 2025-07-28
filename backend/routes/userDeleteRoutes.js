const express = require('express');
const { getUsers, deleteUser } = require('../controllers/userDeleteControllers');

const router = express.Router();

router.get('', getUsers);
router.delete('/:username', deleteUser);

module.exports = router;
