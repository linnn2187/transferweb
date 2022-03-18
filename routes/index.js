// 各頁router
//load module
const express = require("express");
const router = express.Router();
const fs = require('fs');
const path = require('path');

//load dbconfig
const dbConfig = require('../config/db.config');

//display 首頁 page
router.get('/', function (req, res) {
    res.render('index', {
        'title': '網站簡介',
    });
});

//display 各校資訊 page
router.get('/school', function (req, res) {
    var term = 1092;
    dbConfig.query('SELECT * from school'+term, function(err, rows){
        if (err) throw err;
        res.render('school', {
           'title': '各校資訊',
            data: rows
        });
    });
});

//select different term(各校資訊)
router.post('/school', function (req, res) {    
    let term = req.body.term;
    
    dbConfig.query('SELECT * from school'+term, function(err, rows){
        if (err) throw err;
        res.render('school', {
           'title': '各校資訊',
            data: rows
        });
    });
});

//display 心得分享 page
router.get('/experience', function (req, res) {

    dbConfig.query('SELECT * from experience', function(err, rows){
        if (err) throw err;
        if (req.session.loggedin == true){
            res.render('adminExperience', {
                'title': '心得分享',
                 data: rows
            });           
        }
        else {
            res.render('experience', {
                'title': '心得分享',
                 data: rows
            });
        }
    });
});

// 刪除心得文章(只有管理者可以)
router.get('/adminExperience/:id', (req, res) => {
    let ID = req.params.id;
     
    dbConfig.query('DELETE FROM experience WHERE ID = ' + ID, function(err, result) {
        if (err) throw err;
        else {
            res.redirect('/experience')
        }
    })
});

router.get('/addExperience', function (req, res) {   
    res.render('addExperience', { 
        'title': '心得分享',
    });
});

//select different term(心得分享)
router.post('/experience', function (req, res) {    
    let postterm = req.body.postterm;
    var sql;
        
    if (postterm != "all"){
        sql = 'SELECT * from experience where TERM = '+ postterm;
    }
    else{
        sql = 'SELECT * from experience';
    }

    dbConfig.query(sql, function(err, rows){
        if (err) throw err;
        res.render('experience', {
           'title': '心得分享',
            data: rows
        });
    });
});

//add 心得分享 page
router.post('/addExperience', function (req, res) {       
    const sql = {
        TITLE: req.body.title,
        AUTHOR: req.body.author,
        TERM: req.body.term,
        EXPERIENCE: req.body.experience
    };

    dbConfig.query('INSERT INTO experience set ?', sql, function(err, rows){
        if (err) throw err;
        res.setHeader('Content-Type', 'application/json');
        res.redirect('/experience');
    });
});

//display 解題區 page
router.get('/solution', function (req, res) {
    dbConfig.query('SELECT * from solution', function(err, rows){
        if (err) throw err;
        if (req.session.loggedin == true){
            res.render('adminSolution', {
                'title': '解題區',
                 data: rows
            });           
        }
        else {
            res.render('solution', {
                'title': '解題區',
                 data: rows
            });
        }
    });
});

router.get('/addSolution', function (req, res) {   
    res.render('addSolution', { 
        'title': '解題區',
    });
});

// 刪除問題(只有管理者可以)
router.get('/adminSolution/:id', (req, res) => {
    let ID = req.params.id;
     
    dbConfig.query('DELETE FROM solution WHERE ID = ' + ID, function(err, result) {
        if (err) throw err;
        else {
            res.redirect('/solution')
        }
    })
});

//add 解題區 page
router.post('/addSolution', function (req, res) {   
    let TITLE = req.body.title;
    let AUTHOR = req.body.author;
    let SUBJECT = req.body.subject;
    let QUESTION = req.body.question;
    let FILENAME = TITLE + AUTHOR + SUBJECT;
    if (req.files){
        var file = req.files.file;
        var filename = file.name;
        file.mv("./public/question/"+ FILENAME + filename,function(err){
            if (err) throw err;
            else {
                const sql = {
                    TITLE: TITLE,
                    AUTHOR: AUTHOR,
                    SUBJECT: SUBJECT,
                    QUESTION: QUESTION,
                    FILENAME: "/question/" + FILENAME + filename  
                };
                
                dbConfig.query('INSERT INTO solution set ?', sql, function(err, rows){
                    if (err) throw err;
                    res.setHeader('Content-Type', 'application/json');
                    res.redirect('/solution');
                 });
            }
        })
    }    
});

//select different subject
router.post('/solution', function (req, res) {    
    let subject = req.body.subject;
    var sql;
        
    if (subject != "all"){
        sql = "SELECT * from solution where SUBJECT = '"+ subject + "'";
    }
    else{
        sql = 'SELECT * from solution';
    }

    dbConfig.query(sql, function(err, rows){
        if (err) throw err;
        res.render('solution', {
           'title': '解題區',
            data: rows
        });
    });
});

//display the selected question
router.get('/solution/:id', function (req, res) {   
    let ID = req.params.id;

    const folder = './public/question';
    var fileArr = [];
    fs.readdir(folder, function (err, files) {
        if (err) throw err;
        files.forEach(function (file) {
            fileArr.push(file);
    });
    dbConfig.query('SELECT * from solution where ID = '+ID, function(err, rows){
        if (err) throw err;
        dbConfig.query('SELECT * from comment where solutionID = '+ID, function(err, comment){
            if (err) throw err;
            if (req.session.loggedin == true){
                res.render('adminSolutioned', {
                    'title': '解題區',
                    data: rows,
                    comment: comment,
                    files: fileArr
                });           
            }
            else {
                res.render('solutioned', {
                    'title': '解題區',
                    data: rows,
                    comment: comment,
                    files: fileArr
                });
            }
            });
        });
    });
});

//answer the selected question
router.post('/solution/:id', function (req, res) {   
    let ID = req.params.id;
    const sql = {
        AUTHOR: req.body.username,
        COMMENT: req.body.comment,
        SOLUTIONID: ID
    };
    
    dbConfig.query('INSERT INTO comment set ?', sql, function(err, rows){
        if (err) throw err;
        res.setHeader('Content-Type', 'application/json');
        res.redirect('/solution/' + ID);
     });
});

// 刪除留言(只有管理者可以)
router.get('/adminSolutioned/:id', (req, res) => {
    let ID = req.params.id;
    let sql = 'SELECT SOLUTIONID FROM comment WHERE ID = '+ ID;
     
    dbConfig.query('SELECT SOLUTIONID FROM comment WHERE ID = '+ ID, function(err, rows){
        let SOLUTIONID = rows[0].SOLUTIONID;
        dbConfig.query('DELETE FROM comment WHERE ID = ' + ID, function(err, result) {
            if (err) throw err;
            else {
                res.redirect('/solution/' + SOLUTIONID);
            }
        })
    });   
});

//display 書審參考區 page
router.get('/application_packet', function (req, res) {
    const folder = './public/upload';
    var fileArr = [];
    fs.readdir(folder, function (err, files) {
        if (err) throw err;
        files.forEach(function (file) {
            fileArr.push(file);
    });
    dbConfig.query("SELECT NAME from school1091 where TEST_DATE = '書審' or REMARK LIKE '%書審%'", function(err, school){
        if (err) throw err;
        dbConfig.query('SELECT * from application_packet', function(err, rows){
            if (err) throw err;
            if (req.session.loggedin == true){
                res.render('adminApplication_packet', {
                    'title': '書審參考區',
                    school: school,
                    data: rows,
                    files: fileArr
                });             
            }
            else {
                res.render('application_packet', {
                    'title': '書審參考區',
                    school: school,
                    data: rows,
                    files: fileArr
                });
            }
            });
        });
    });
});

// 刪除備審(只有管理者可以)
router.get('/adminApplication_packet/:id', (req, res) => {
    let ID = req.params.id;
     
    dbConfig.query('DELETE FROM application_packet WHERE ID = ' + ID, function(err, result) {
        if (err) throw err;
        else {
            res.redirect('/application_packet')
        }
    })
});

//add 書審參考區 page
router.post('/application_packet', function (req, res) {
    let TERM = req.body.term;
    let SCHOOL = req.body.school;
    let RANKING = req.body.ranking1 + req.body.ranking2;
    let MAJOR = req.body.major;
    let FILENAME = TERM + SCHOOL + RANKING + MAJOR;
    if (req.files){
        var file = req.files.file;
        var filename = file.name;
        file.mv("./public/upload/"+ FILENAME + filename,function(err){
            if (err) throw err;
            else {
                const sql = {
                    TERM: TERM,
                    SCHOOL: SCHOOL,
                    RANKING: RANKING,
                    MAJOR: MAJOR,
                    FILENAME: "/upload/" + FILENAME + filename  
                };
                
                dbConfig.query('INSERT INTO application_packet set ?', sql, function(err, rows){
                    if (err) throw err;
                    res.setHeader('Content-Type', 'application/json');
                    res.redirect('/application_packet');
                 });
            }
        })
    }
});

//管理者登入
router.get('/admin', function(req, res) {
    res.render('admin', {
        'title': '管理者登入',
    });
});

router.post('/admin', function(req, res) {
	let adminName = req.body.adminName;
	let adminPwd = req.body.adminPwd;
	if (adminName && adminPwd) {
		dbConfig.query('SELECT * FROM admininfo WHERE ADMINNAME = ? AND ADMINPWD = ?', [adminName, adminPwd], function(err, rows) {
			if (rows.length > 0) {
				req.session.loggedin = true;
				req.session.adminName = adminName;
				res.redirect('/');
            } 
            else res.send('帳號密碼錯誤');	
			res.end();
		});
    } 
    else {
		res.send('請輸入帳號密碼');
		res.end();
	}
});

//管理者登出
router.get('/adminlogout', function (req, res) {
    req.session.destroy();
    res.redirect('/admin');
  });

module.exports = router;