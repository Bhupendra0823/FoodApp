const customerSchema = require('../models/schema');
const menuSchema = require('../models/menu');
const adminSchema = require('../models/adminSchema');
const { patch } = require('../routes/customersRoutes');

const registerAdmin = async (req, res) => {
  try {
    const { adminName, adminEmail, adminPassword, adminConfirmPassword, adminPhone } = req.body;

    if (!adminName || !adminEmail || !adminPassword || !adminConfirmPassword || !adminPhone) {
      return res.status(400).json({ msg: 'Please enter all fields' });
    }

    if (adminPassword !== adminConfirmPassword) {
      return res.status(400).json({ msg: 'Passwords do not match' });
    }

    const adminExists = await adminSchema.findOne({ adminEmail });
    if (adminExists) {
      return res.status(400).json({ msg: 'Admin already exists' });
    }

    const newAdmin = new adminSchema({
      adminName,
      adminEmail,
      adminPassword,
      adminPhone,
    });

    const savedAdmin = await newAdmin.save();
    res.json({ newAdmin: savedAdmin });
  } catch (err) {
    console.log("Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const loginAdmin = async (req, res) => {
  try {
    const { adminEmail, adminPassword } = req.body;

    if (!adminEmail || !adminPassword) {
      return res.status(400).json({ msg: 'Please enter all fields' });
    }

    const admin = await adminSchema.findOne({ adminEmail });

    if (!admin) {
      return res.status(400).json({ msg: 'Admin does not exist' });
    }

    if (adminPassword !== admin.adminPassword) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }
      res.json({
      admin: {
        id: admin.id,
        adminName: admin.adminName,
        adminEmail: admin.adminEmail,
        adminPhone: admin.adminPhone,
      }
    });
  } catch (err) {
    console.log("Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const fetchMenu = async (req, res) => {
  try {
    const menu = await menuSchema.find({});
    res.json(menu);
  } catch (err) {
    console.log("Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllCustomers = async (req, res) => {
  try {
    const orders = await customerSchema.find({});
    res.json(orders);
  } catch (err) {
    console.log("Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const addmenu = async (req, res) => {
  try {
    const { name, price, category, available } = req.body;
    const newMenu = new menuSchema({
      name,
      price,
      category,
      available
    });

    const savedMenu = await newMenu.save();
    console.log("Item Added");
    res.json({ msg: savedMenu });
  } catch (err) {
    console.log("Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updatemenu = async (req, res) => {
  try {
    const foodID = req.params.id;
    console.log(foodID);
    const { name, price, category, available } = req.body;
    const menu = await menuSchema.findOne({ _id: foodID });

    if (menu) {
      menu.name = name;
      menu.price = price;
      menu.category = category;
      menu.available = available;
      const updatedMenu = await menu.save();
      res.json({ msg: updatedMenu });
    } else {
      return res.status(404).json({ msg: 'Menu not found' });
    }
  } catch (err) {
    console.log("Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteMenu = async (req, res) => {
  try {
    console.log("Table ID", req.params.id);
    const foodID = req.params.id;
    const deletedMenu = await menuSchema.findOneAndDelete({ _id: foodID });

    if (deletedMenu) {
      res.json({ msg: 'Item deleted successfully' });
    } else {
      return res.status(404).json({ msg: 'Menu not found' });
    }
  } catch (err) {
    console.log("Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const orderStatus = async (req, res) => {
  try {
    const tableID = req.params.id;
    console.log(tableID);
    const data = await customerSchema.findOne({ tableID: tableID });

    if (!data) {
      return res.status(404).json({ error: 'Data not found' });
    }

    data.orderStatus = req.body.orderStatus;
    const updatedData = await data.save();
    res.json({ msg: updatedData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  registerAdmin,
  loginAdmin,
  getAllCustomers,
  addmenu,
  fetchMenu,
  updatemenu,
  deleteMenu,
  orderStatus
};
