const express = require('express')
const router = express.Router()

const {
    homePostCustomerDetails,
    getMenu,
    placeOrderFromMenu,
    previewOrder,
    deleteCustomer,
    sendMail
} = require('../controllers/customerControls')
router.use(express.json())

//to:save customer details in data base 
//use:customer/detail component 
router.post('/home/tableNo=:id', homePostCustomerDetails)
//to:fetch menu from database 
//use:customer/menu 
router.get('/menu/tableNo=:id', getMenu)
//to:save the selected food items in customer.desireItem array
//use:customer/menu
router.post('/menu/tableNo=:id', placeOrderFromMenu);
//to:to display the all data of customer
//use 1:customer/preview 
//use 2:kitchen/order
//use 3:customer/thankyou
router.get('/preview/tableNo=:id', previewOrder)
//to:to delete customers data
//use 1:customer/preview
//use 2:kitchen/order 
router.delete('/delete/tableNo=:id', deleteCustomer)
//to:to send mail using nodemailer
//use:customer/preview
router.post('/sendMail/:id',sendMail)

module.exports = router