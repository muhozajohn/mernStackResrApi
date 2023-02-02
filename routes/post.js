const router = require("express").Router();
const cloudinary = require("cloudinary").v2;
const multer  =  require ("multer");
const Post = require("../model/post")

// Createblog
const path = require("path"); 
// Multer config

 var upload = multer({
    storage: multer.diskStorage({}),
    fileFilter: (req, file, cb) => {
      let ext = path.extname(file.originalname);
        if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
        cb(new Error("File type is not supported"), false);
        return;
      }
      cb(null, true);
    },
  });
//  console.log(upload);

router.post("/", upload.single("image") , async (req,res)=>{
       try {
    const result = await cloudinary.uploader.upload(req.file.path);
    // console.log(req.body,req.file);
        const newPost = new Post({
            image: result.secure_url,
            title: req.body.title,
            desc:req.body.desc,
            // desc: "The software includes two external entities; user,admin/doctor.This software will firstly ail)it will alsoasks for other useful information ,after account creation user will be directed to home page to accessthe information of pregnancy from 1st week to 40th week .The account holder will use that information due to her situation ,if there is some inconvenience to hersituation ,she will inform directly the doctor /admin through contacts listed in footer, and doctor willrespond and recommend directly the user special treatment .Admin will also have an account with required credentials where he/she will get the control of everyaction taking place ,Admin will be able to delete ,update user’s information and will also respond to thequestions questioned by users.",
            username: req.body.username,
        })

        const savePost = await  newPost.save();

        res.status(200).json(savePost)   ;

    } catch (error) {
        res.status(500).json(error)
        
    }
})

// Updateblog

router.put("/:id", async (req,res)=>{
    try {
       const post = await Post.findById(req.params.id)

       if(post.username !== req.body.username){
            try {
                const updatePost = await Post.findByIdAndUpdate(req.params.id ,{
                    $set : req.body
                },{
                    new: true,
                })

                res.status(200).json(updatePost)            
            } 
                catch (error) {
                res.status(200).json(error)            
            }
        }
        else{
           res.status(401).json("You Can only Update Your only PostData")            

       }
        
    } catch (error) {
        res.status(500).json(error)
        
    }
})

// DeleTe
router.delete("/:id", async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id)
        if(post.username !== req.body.username){
            try {
                await post.delete()
                res.status(200).json("BlogPost Has been Deleted! ")
            } catch (error) {
                res.status(500).json(error)
            }
            
        }
        else{
            res.status(401).json("You Can Delete Only Post")
        }
    } catch (error) {
        res.status(500).json(error)
        
    }


})

// getpost

router.get("/:id", async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id)
        res.status(200).json(post)
    } catch (error) {
        res.status(404).json(error)
        
    }
})
// GetAll Post

router.get("/", async(req,res)=>{
    const username = req.query.user
    const catName = req.query.cat
    
    try {
        let posts
        if(posts){
            posts = await Post.find({username: username})
        }
        else if(catName){
            posts = await Post.find({
                categories: {
                    $in: [catName],
                },
            })
        }
        else{
            posts = await Post.find()
        }
        res.status(200).json(posts)
    } catch (error) {
        res.status(404).json(error)
    }
})






module.exports = router