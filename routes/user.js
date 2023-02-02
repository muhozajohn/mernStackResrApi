const router = require("express").Router()
const User = require("../model/user")
const Post = require("../model/post")
const bcrypt = require("bcrypt")

// Update User
router.put("/:id", async (req,res) =>{
    if(req.body.userId === req.params.id){
        if(req.body.password){
            const salt = await bcrypt.genSalt(10)
            req.body.password = await bcrypt.hash(req.body.password, salt)
        }
        try{
            updateUser = await User.findByIdAndUpdate(
                req.params.id , {
                    $set:req.body
                },{
                    new: true, //ForPostMan
                }
            )
            res.status(200).json(updateUser)
        }
        catch(error){
            res.status(500).json(error)
        }

    }
    else{
        res.status(401).json("You Can't update your Account")
    }
})


// Deelete User

router.delete("/:id", async(req,res) =>{
if(req.body.userId !== req.params.id){
        // Delete all user and user Acount
        try {
            const user = await User.findById(req.params.id)
            try {
                await Post.deleteMany({ username: user.username })

                // ony delete user Account

                await User.findByIdAndDelete(req.params.id)
                res.status(200).json("User Deleted Well!...")
            } catch (error) {
                res.status(500).json(error)
                
            }
        } catch (error) {
            res.status(404).json("User Not Found!...")
        }
    }
    else{
        res.status(401).json("You Can only delete your Account Well!...")
    }
})


// UpdateUser

router.put("/:id",async(req,res)=>{
   try {
    const user = await User.findById(req.params.id)
    const { password, ...other } = user._doc
    res.status(200).json(other)
} catch (error) {
       res.status(400).json(other)    
   }
})



module.exports = router
