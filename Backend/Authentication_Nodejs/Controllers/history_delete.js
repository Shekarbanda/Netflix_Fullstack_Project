const express = require('express');
const app = express();
const user = require('../Database/db.js');


const history_delete = async(req,res)=>{
    const { email, index } = req.body; 

    try {
        const user1 = await user.findOne({ email });
        if (!user1) {
            res.status(404).json({
               message: 'User not found',
               success:false
            });
        }
        
        user1.movieHistory.splice(index,1);
        await user1.save();

        return res.status(200).json({ message: 'History deleted successfully', history: user1.movieHistory });
    } catch (error) {
        console.error(error);
        return res.status(500).send('Server error');
    }
}

module.exports = {history_delete};
