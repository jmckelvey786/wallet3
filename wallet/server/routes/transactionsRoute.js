const router = require('express').Router();
const Transaction = require('../models/transactionsModel');
const AuthMiddleWare = require('../middleware/authmiddleware');

//transfer money from a - b

router.post('/transfer-funds', AuthMiddleWare, async (req, res) => {
    try {
        //save transction
        const newTransaction = new Transaction(req.body);
        await newTransaction.save();

        // decrease sender balance
        await User.findByIdAndUpdate(req.body.sender, {
            $inc: { balance: -req.body.amout },
        });

        //increase reciever balance
        await User.findByIdAndUpdate(req.body.sender, {
            $inc: { balance: -req.body.amout },
        });
        res.send({
            message: "Transaction Successful",
            data : newTransaction,
            success: true
        })
    } catch (error) {
        res.send({
            message: "Transaction Failed",
            data: error.message,
            success: false
        });
    }
})


//verify reviever account number
router.post('/transfer-fund', AuthMiddleWare, async (req, res) => {
    try {
        const user = await User.findOne({_id: req.body.reciever });
        if (user) {
            res.send({
                message: "Account Verified",
                data: null,
                success: true
            });
        } else {
            res.send({
                message: "Account not Found",
                data: null,
                success: false,
            });
        }
    } catch (error) {
        res.send({
                message: "Account not Found",
                data: null,
                success: false,
            });
    }
});

//get all transactions for user

router.post('/get-all-transactions-by-user', authMiddleware, async(req, res) => {
    try {
        const transactions = await Transaction.find({$or : [{sender :req.body.userId}, {reciever : req.body.userId}]})
        .sort({ createdAt: -1})
        .populate("sender").populate("receiver");
        res.send({
            message: "Transaction Fetched",
            data: transactions,
            success: true,
        });
    } catch (error){
        res.send({
            message: "Transaction Not Fetched",
            data: error.message,
            success: false,
        })
    }
})

module.exports = router;