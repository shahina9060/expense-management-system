const Expense = require('../models/expenseModel');
const UserAuth = require('../models/userModel')
// @desc    Add new expense
// @route   POST /api/expenses
const addExpense = async (req, res) => {
  const { date, category, amount, description, userId } = req.body;

  console.log("req.file.filename", req.file.filename);
  try {
    const expense = new Expense({
      userId,
      date,
      category,
      amount,
      description,
      receipt: req.file ? req.file.filename : null // Store only the filename
    });

    await expense.save();
    res.status(201).json({
      message: "Added successfully",
      expense,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
  }
};


// Get all expenses for user

const getExpenses = async (req, res) => {
  try {
   
    // const {userId} = req.body
    const {userId} = req.params
    console.log("userId",userId)
    const expenses = await Expense.find({userId});
    res.status(201).json({
        expenses,
        message: "fetched all expenses",
        success: true
    });
    
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Server error' });
  }
};

// get expense by id
const getExpenseById = async (req, res) => {
  const { id } = req.params;
  console.log(id);  // Check if the id is being correctly received
  try {
    const getExpense = await Expense.findById(id);
    console.log(getExpense);  // Check if the expense is found
    if (!getExpense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    return res.json(getExpense);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};


// edit expense
const editExpenses = async (req, res) => {
  console.log('Request body:', req.body);
  console.log('Uploaded file:', req.file);
  
  // Extract fields from req.body
  const { id, date, category, amount, description } = req.body;

  // Check if ID is present in the body
  if (!id) {
      return res.status(400).json({ message: 'Expense ID is missing.' });
  }

  // File handling: Check if a new file is uploaded or keep the existing file
  let receipt = req.body.receipt;  // Existing file
  if (req.file) {
      receipt = req.file.filename;  // New uploaded file path
  }

  // Update the expense in your database
  try {
      const updatedExpense = await Expense.findByIdAndUpdate(id, {
          date,
          category,
          amount,
          description,
          receipt
      }, { new: true });

      if (!updatedExpense) {
          return res.status(404).json({ message: 'Expense not found.' });
      }

      res.status(200).json({ message: 'Expense updated successfully', updatedExpense });
  } catch (error) {
      console.error('Error updating expense:', error);
      res.status(500).json({ message: 'Failed to update expense' });
  }
};




// delete expense

const deleteExpense = async(req,res)=>{
try {
  const {id} = req.params;
console.log("id for delete ", id)
  if(!id){
    return res.status(401).json({
      message: "id not found",
      success: false
    })
  }

  await Expense.findByIdAndDelete(id)
  return res.status(201).json({
    message: "deleted successfully",
    success: true
  })
} catch (error) {
  console.log(error)
  return res.status(401).json({
    message: "something went wrong",
    success: false
  })
}
}

module.exports = {addExpense, getExpenses, editExpenses, getExpenseById, deleteExpense}
