const Transaction = require('../models/Transactions')

// Methods that will use the model with our DB

// @desc Get all transactions
// @route GET /api/v1/transactions
// @access Public
exports.getTransactions = async (req,res,next) => { // using async await because Mongoose returns a promise
    // res.send('GET transactions')
    try{
        const transactions = await Transaction.find().sort({createdAt: -1});
        return res.status(200).json({
            success: true,
            count: transactions.length,
            data: transactions
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
}

// @desc Add transactions
// @route POST /api/v1/transactions
// @access Public
exports.addTransactions = async (req,res,next) => {
    // res.send('POST transactions')

    try {
        const { text, amount } = req.body;

        // const transaction = await Transaction.create(req.body);

        const capitalizedText = text.charAt(0).toUpperCase() + text.slice(1);

        const transaction = await Transaction.create({
            text: capitalizedText,
            amount
        });

        return res.status(201).json({
            success: true,
            data: transaction
        });
    } catch (err) {
        // console.log(err);
        if(err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);
            return res.status(400).json({
                success: false,
                error: messages
            });
        } else {
            return res.status(500).json({
                success: false,
                error: 'Server Error'
            });
        }
    }
}

// @desc Update transactions
// @route PUT /api/v1/transactions/:id
// @access Public
exports.editTransactions = async (req,res,next) => {

    try {
        const transaction = await Transaction.findById(req.params.id);
        console.log(transaction)

        if(!transaction) {
            return res.status(404).json({
                success: false,
                error: 'No transaction found'
            });
        } 

        transaction.text = req.body.text;
        transaction.amount = req.body.amount;

        // await transaction.updateOne(req.body);
        await transaction.save();

        return res.status(200).json({
            success: true,
            data: {}
        });
        
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
}

// @desc Delete transactions
// @route DELETE /api/v1/transactions/:id
// @access Public
exports.deleteTransactions = async (req,res,next) => {
    // res.send('DELETE transactions')

    try {
        const transaction = await Transaction.findById(req.params.id);
        console.log(transaction)

        if(!transaction) {
            return res.status(404).json({
                success: false,
                error: 'No transaction found'
            });
        } 

        await transaction.deleteOne()
        return res.status(200).json({
            success: true,
            data: {}
        });
        
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
}