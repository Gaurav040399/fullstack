const express = require("express");
const { NoteModel } = require("../model/note.model");
const noteRoute = express.Router();
const jwt = require("jsonwebtoken")

noteRoute.get("/",async(req,res)=>{
    const token = req.headers.authorization
    const decoded = jwt.verify(token,"masai");
    if(decoded){
        // console.log(decoded)
        const note = await NoteModel.find({"userID":decoded.userID}) 
        res.status(200).send(note)
    }else{
        res.status(400).send({"msg":err.message})

    }
    
})
noteRoute.get("/:id",async(req,res)=>{
    const {id} = req.params
    const token = req.headers.authorization
    const decoded = jwt.verify(token,"masai");
    if(decoded){
        // console.log(decoded)
        const note = await NoteModel.findOne({_id:id}) 
        res.status(200).send(note)
    }else{
        res.status(400).send({"msg":err.message})

    }
    
})
noteRoute.post("/add",async(req,res)=>{
        const {title,note,sub} = req.body
        try {
            const notes = new NoteModel(req.body)
        await notes.save();
        res.status(200).send({"msg":"New notes has been Added"})
        } catch (err) {
            res.status(400).send({"msg":err.message});
        }

})
noteRoute.patch("/update/:id",async(req,res)=>{
    try {
        const id= req.params.id;
        // console.log(noteid)
        const note  = await NoteModel.findByIdAndUpdate({_id :id} , req.body)
        res.status(200).send({msg : "Note Updated Successfully"})
    } catch (error) {
        res.status(400).send({msg: error.message})
    }
})
noteRoute.delete("/delete/:id",async(req,res)=>{
     const {id} =req.params;
     await NoteModel.findByIdAndDelete({_id:id});
     res.status(200).send({"msg":"Note has been Deleted"});         

})


module.exports = {
    noteRoute
}
