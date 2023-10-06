const express = require ('express')
const router = express.Router()


const {registerUser, userLogin, sendMessage, viewMessage, deleteOne} = require('../controllers/user.controller')

router.post('/signup', registerUser)
router.post('/signin', userLogin)
router.post('/message', sendMessage)
router.post('/view', viewMessage)
router.post('/delete', deleteOne)



module.exports = router