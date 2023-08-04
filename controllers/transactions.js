const Transaction = require('../models/Transactions')

// Methods that will use the model with our DB

// @desc Get all transactions
// @route GET /api/v1/transactions
// @access Public
exports.getTransactions = async (req,res,next) => { // using async await because Mongoose returns a promise
    // res.send('GET transactions')
    try{
        const transactions = await Transaction.find();
        return res.status(200).json({
            success: true,
            count: transactions.length,
            data: transactions
        });
    } catch (err) {
        return res.send(500).json({
            success: false,
            error: 'Server Error'
        });
    }
}

// @desc Add transactions
// @route POST /api/v1/transactions
// @access Public
exports.addTransactions = async (req,res,next) => {
    res.send('POST transactions')
}

// @desc Delete transactions
// @route DELETE /api/v1/transactions/:id
// @access Public
exports.deleteTransactions = async (req,res,next) => {
    res.send('DELETE transactions')
}