const Budget = require('../models/budgetModel');
const UserAuth = require('../models/userModel')
// @desc    Add new expense
// @route   POST /api/expenses
const addBudget = async (req, res) => {
  const {category, amount, startDate,userId,endDate } = req.body;

  try {
    const budget = new Budget({
      userId,
      category,
      amount,
      startDate,
      endDate
    });

    await budget.save();
    res.status(201).json({
        message: "Added successfully",
        budget,
        success: true
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all expenses for user

const getBudget = async (req, res) => {
  try {
   
    // const {userId} = req.body
    const {userId} = req.params
    console.log("userId",userId)
    const budgets = await Budget.find({userId});
    res.status(201).json({
        budgets,
        message: "fetched all expenses",
        success: true
    });
    
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Server error' });
  }
};

// get budget by id
const getBudgetById = async (req, res) => {
  const { id } = req.params;
  console.log(id);  // Check if the id is being correctly received
  try {
    const getBudget = await Budget.findById(id);
    console.log(getBudget);  // Check if the expense is found
    if (!getBudget) {
      return res.status(404).json({ message: "Expense not found" });
    }
    return res.json(getBudget);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};


// edit expense
const editBudget = async(req,res)=>{
  const { date, userId, category, amount, startDate, endDate,_id} = req.body;
try {
  console.log(_id)
  const getBudget = await Budget.findOne({_id});
  console.log(getBudget)

   // If the expense is not found, handle the error
   if (!getBudget) {
    return res.status(404).json({
      message: "Budget not found",
      success: false,
    });
  }

  const updatedData = await Budget.findByIdAndUpdate(_id,{
    userId,
    amount,
    category,
    startDate,
    endDate
  }, {new:true})
  return res.status(201).json({
    message: " Edited successfully",
    updatedData,
    success: true
  })
} catch (error) {
  console.log(error)
  return res.status(404).json({
    message: "server error",
    success: false
  })
}
}

// delete budget

const deleteBudget = async(req,res)=>{
  try {
    const {id} = req.params;
  console.log("id for delete ", id)
    if(!id){
      return res.status(401).json({
        message: "id not found",
        success: false
      })
    }
  
    await Budget.findByIdAndDelete(id)
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

module.exports = {addBudget, getBudget, getBudgetById, editBudget, deleteBudget}
