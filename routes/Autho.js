const router = require("express").Router()
const User = require("../model/user")
const bcrypt = require("bcrypt")


// Register
router.post("/register", async(req,res)=>{
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password,salt);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPass,    
        })

        const user = await newUser.save()
        res.status(200).json(user)
    }
    catch(error){
        res.status(500).json(error)
    }


})

// Login

router.post("/login", async (req,res) =>{
    try{
        const user = await User.findOne({ username: req.body.username})
        // if no UserName
        !user && res.status(400).json("Wrong typed userName");

        // if same user then compare the Password
        const validate = await bcrypt.compare(req.body.password, user.password)

        // if not Validate
        !validate && res.status(400).json("Wrong typed passWord")

        const { password, ...other } = user._doc
        res.status(200).json(other)

    }
    catch(error){
        console.log(error)
    }
})

module.exports = router