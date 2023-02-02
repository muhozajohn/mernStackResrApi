const router = require('express').Router()
const Cate = require("../model/category")


// createCategory
router.post("/", async (req,res)=>{
    const newCat = new Cate(req.body)

    try {
        const saveCat = await newCat.save()
        res.status(200).json(saveCat)        
    } catch (error) {
        res.status(500).json(error)
        
    }
})

// getCate

router.get("/", async(req,res)=>{
    try {
        const cat = await Cate.find()
        res.status(200).json(cat)
    } catch (error) {
        res.status(500).json(error)
        
    }
})


module.exports = router