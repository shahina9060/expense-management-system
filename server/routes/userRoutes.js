const express = require('express');
const routes = express.Router();
const multer = require('multer');
const {register, login} = require('../controllers/user');
const { addExpense, getExpenses, editExpenses, getExpenseById, deleteExpense} = require('../controllers/expenseController');
const { addBudget, getBudget, editBudget, getBudgetById, deleteBudget } = require('../controllers/budgetController');


routes.post('/register', register)
routes.post('/login',login)


//  routes.post('/addExpense',addExpense)

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './files'); // Directory where the file is saved
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + file.originalname;
      cb(null, uniqueSuffix); // Save only the unique filename
    }
  });
  const upload = multer({ storage: storage });
  

// Route for adding expense with file upload
routes.post('/addExpense', upload.single('receipt'), addExpense); // Directly pass addExpense after multer

// expenses routes
// routes.post('/editExpense/',editExpenses)
routes.post('/editExpense', upload.single('receipt'), editExpenses);
// routes.post('/editExpense', upload.single('receipt'), (req, res) => {
//     console.log('Request body:', req.body);  // Check form fields
//     console.log('Uploaded file:', req.file); // Check file details
  
//     // Extract fields from req.body
//     const {date, category, amount, description } = req.body;
//     const {id} = req.query;

//     if (!id) {
//       return res.status(400).json({ message: 'Expense ID is missing.' });
//     }
  
//     // Further logic for editing the expense...
//   });

routes.get('/getExpenseById/:id',getExpenseById)
routes.get('/getExpenses/:userId',getExpenses)
routes.delete('/deleteExpense/:id',deleteExpense)

// budgets routes
routes.post('/addBudget',addBudget)
routes.post('/editBudget/',editBudget)
routes.get('/getBudgets/:userId',getBudget)
routes.get('/getBudgetById/:id',getBudgetById)
routes.delete('/deleteBudget/:id',deleteBudget)


module.exports = routes