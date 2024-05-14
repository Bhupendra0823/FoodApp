const express = require('express')
const router = express.Router()

const {
    registerAdmin,
    loginAdmin,
    getAllCustomers,
    fetchMenu,
    addmenu,
    updatemenu,
    deleteMenu,
    orderStatus
} = require('../controllers/kitchenControls')

router.use(express.json())

//to:create admin account
//use:once using postman 
router.post('/register', registerAdmin)
//to:to login into dashboard
//use:kitchen/login
router.post('/login', loginAdmin)
//to:to fetch all orders
//use:kitchen/dashboard 
router.get('/home', getAllCustomers)
//to:to read menu for menu management
//use:kitchen/menu
router.get('/getmenu',fetchMenu) //done
//to:to update menu at menu mangement
//use:kitchen/menu
router.patch('/update/:id',updatemenu)
//to:to add new menu item in menu management
//use:kitchen/menu
router.post('/addmenu', addmenu) 
//to:to delete menu item in menu management
//use:kitchen/menu 
router.delete('/delete/:id',deleteMenu)
router.post('/orderstatus/:id',orderStatus)

module.exports = router 