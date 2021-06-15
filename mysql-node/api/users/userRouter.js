const { createUser, getUsers, getUserById, updateUser, deleteUser, userLogin } = require("./userController");
const router = require("express").Router();
const { checkToken } = require('../../middlewares/tokenValidation');

router.post('/', checkToken, createUser);
router.get('/', checkToken, getUsers);
router.get('/:id', checkToken, getUserById);
router.patch('/', checkToken, updateUser);
router.delete('/', checkToken, deleteUser);
router.post('/login', userLogin)

module.exports = router;