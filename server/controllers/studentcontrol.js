const mysql=require("mysql");
const conn=mysql.createPool({
    connectionLimit:10,
    host:process.env.DB_HOST,
    user: process.env.DB_USER,
    password:process.env.DB_PASS,
    database:process.env.DB_NAME
});


exports.view=(req,res)=>{

    conn.getConnection((err,connection)=>{
    if(err) throw err
    connection.query("select * from tb_user",(err,rows)=>{
        connection.release();
        if(!err){
           
            res.render("home",{rows});
        }
        else{
            console.log("Error occured"+err);
        }
    });
}); 
    
}
exports.adduser=(req,res)=>{
    res.render("adduser");
}

exports.save=(req,res)=>{
    conn.getConnection((err,connection)=>{
        if(err) throw err

        const{name,age,city}=req.body;
        connection.query("insert into tb_user (NAME,AGE,CITY) values(?,?,?)",[name,age,city],(err,rows)=>{
            connection.release();
            if(!err){
               
                res.render("adduser",{msg:"Details saved successfully!"});
            }
            else{
                console.log("Error occured"+err);
            }
        });
    }); 
}

exports.edituser=(req,res)=>{

    conn.getConnection((err,connection)=>{
        if(err) throw err

        //getting id from url
        let id=req.params.id;

        connection.query("select * from tb_user where id=?",[id],(err,rows)=>{
            connection.release();
            if(!err){
               
                res.render("edituser",{rows});
            }
            else{
                console.log("Error occured"+err);
            }
        });
    }); 
}

exports.edit=(req,res)=>{

    conn.getConnection((err,connection)=>{
        if(err) throw err

        let id=req.params.id;

        const{name,age,city}=req.body;
        connection.query("update tb_user set NAME=?,AGE=?,CITY=? where ID=?",[name,age,city,id],(err,rows)=>{
            connection.release();
            if(!err){
               
                res.render("edituser",{msg:"Changes saved successfully!"});
            }
            else{
                console.log("Error occured"+err);
            }
        });
    }); 

}


exports.delete=(req,res)=>{
    conn.getConnection((err,connection)=>{
        if(err) throw err
        let id=req.params.id;
        connection.query("delete from tb_user where id=?",[id],(err,rows)=>{
            connection.release();
            if(!err){
                res.redirect("/");
            }
            else{
                console.log(err);
            }
        });
    });
}