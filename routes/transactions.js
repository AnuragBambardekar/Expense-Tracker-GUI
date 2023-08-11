const express = require('express');
const router = express.Router();
const { getTransactions, addTransactions, deleteTransactions, editTransactions } = require('../controllers/transactions')

// router.get('/',(req,res) => res.send('Hello'))
router
    .route('/')
    .get(getTransactions)
    .post(addTransactions);

router
    .route('/:id')
    .delete(deleteTransactions)
    .put(editTransactions);

module.exports = router;