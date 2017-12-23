var express = require('express');
var router = express.Router();
var connection = require('./mysql');
router.get('/', function(req, res, next) {
    connection.query('select * from app', function (error, results) {
        if (error){
            res.end();
        }else{
            res.render('index', { data: results});
        }
    });
});
router.get('/add',function(req,res,next){
    res.render('add');
})
router.get('/addCon',function(req,res,next){
    var name=req.query.name;
    var age=req.query.age;
    var sex=req.query.sex;
    connection.query(`insert into app (name,age,sex) values ('${name}','${age}','${sex}')`, function (error, results) {
        if (error){
            console.log(error);
            res.end();
        }else{
            res.render('message', { message: "添加成功"});
        }
    });
})
router.get('/update',function (req,res,next) {
    var id=req.query.id;
    var name=req.query.name;
    var age=req.query.age;
    var sex=req.query.sex;
    res.render('update',{id:id,name:name,age:age,sex:sex});

});
router.get('/updateCon',function (req,res,next) {
    var id=req.query.id;
    var name=req.query.name;
    var age=req.query.age;
    var sex=req.query.sex;
    connection.query(`update app set name="${name}",age="${age}",sex="${sex}"  where id=${id}`,function (error,results) {
        if(error){
            console.log(error);
            res.end();
        }else{
            res.render("message",{message:'修改成功'});
        }
    })
});
router.get('/del',function(req,res,next){
    var id=req.query.id;
    connection.query(`delete from app where id=${id}`,function(error,results){
        if(error){
            console.log(error);
            res.end();
        }else{
            res.render('message',{message:"删除成功"})
        }
    })
})
module.exports = router;
