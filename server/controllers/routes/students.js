const express = require("express");
const router=express.Router();
const studentcontroller=require("../studentcontrol")

//For viewing records
router.get("/",studentcontroller.view);

//For Saving Records
router.get("/adduser",studentcontroller.adduser);
router.post("/adduser",studentcontroller.save);

//updating records
router.get("/edituser/:id",studentcontroller.edituser);
router.post("/edituser/:id",studentcontroller.edit);

//delete records
router.get("/deleteuser/:id",studentcontroller.delete);

module.exports=router;