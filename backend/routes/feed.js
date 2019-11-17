/* --------------------------------------------------------------------------- */
/* ------------------------- 기본 정의 (Module, DB) -------------------------- */
/* --------------------------------------------------------------------------- */

/* 의존관계 정보 */
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var multer = require('multer');
var fs = require("fs-extra");

/* DB 정보 */
var connection = mysql.createConnection({
  host : 'localhost',
  user : 'dkzone',
  password : 'dkzone',
  database : 'dkzone',
  charset : 'utf8'
})

/* mysql 접속 및 이용할 데이터베이스 설정 */
connection.connect();
connection.query('USE dkzone', function(err){
  if(!err)
    console.log('DB OK_ (feed)');
  else
    console.log('DB ERR_', err);
})

/* --------------------------------------------------------------------------- */
/* ------------------------ 기본 정의 끝 (Module, DB) ------------------------- */
/* --------------------------------------------------------------------------- */

//Vue.js 기반으로 개발하여 페이지뷰 라우팅은 Vue-router 측에서 실행하므로 페이지뷰(EJS 등록)은 불필요함.

/*------------------------------ 게시물 목록 로드 기능 ------------------------------*/
router.get('/load', function(req, res){
    var user = req.session.user;
    var sql1 = 'SELECT friend_nick FROM friend where my_id = "' + user.id + '"';
    var sql2 = 'SELECT * FROM feed where feed_nick = "' + user.nick + '"';

    connection.query(sql1, function(err1, rows1){
        if(err1){
            console.log('게시물 조회를 위한 친구 정보 조회 실패 - ', err1);
            res.json(null);
            return;
        }
        else{
            //모든 친구 닉네임을 게시물 검색조건에 덧붙임
            for(var i = 0; i < rows1.length; i++){
                sql2 += ' or feed_nick = "' + rows1[i].friend_nick + '"';
            }
            connection.query(sql2, function(err2, rows2){
                if(err2){
                    console.log('게시물 정보 조회 실패 - ', err2);
                    res.json(null);
                    return;
                }
                else{
                    /* 엔터 쳐주는 기능이나.. Vue에 Raw HTML 출력 옵션을 주면 XSS 공격에 취약하다고 하여 일단 보류
                    for(var i = 0; i < rows2.length; i++){
                        rows[i].feed_text.replace(/(?:\r\n|\r|\n)/g, '<br />');
                    }
                    */
                    res.json(rows2);
                }
            });
        }
    });
});
/*---------------------------- 게시물 목록 로드 기능 끝 ----------------------------*/

/*------------------------------ 게시물 작성 기능(기본) ------------------------------*/
router.post('/write', function(req, res){
    //텍스트의 feed_type == 0
    //이미지의 feed_type == 1
    //동영상의 feed_type == 2
    //외부 동영상의 feed_type == 3
    var user = req.session.user;
    var url = req.body.url;
    var title = req.body.title;
    var text = req.body.text;
    var rawtag = req.body.tag;
    var tags;
    var type = req.body.type;
    var sql = 'INSERT INTO feed (feed_file, feed_type, feed_title, feed_text, feed_tag1, feed_tag2, feed_tag3, feed_tag4, feed_tag5, feed_nick) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    var params;

    //게시물 양식 검증
    if(title == ''){
        fs.unlink('public/' + url);
        res.json({
            success: 0,
            message: '게시물 제목을 작성해주세요'
        });
        return;
    }
    if(title.length > 50){
        fs.unlink('public/' + url);
        res.json({
            success: 0,
            message: '게시물 제목은 50자 이하여야 합니다.'
        });
        return;
    }
    if(text == ''){
        fs.unlink('public/' + url);
        res.json({
            success: 0,
            message: '게시물 내용을 작성해주세요'
        });
        return;
    }
    if(text.length > 5000){
        fs.unlink('public/' + url);
        res.json({
            success: 0,
            message: '게시물 내용은 5000자 이하여야 합니다.'
        });
        return;
    }

    //태그 5개 구분
    tags = rawtag.split(',', 5);

    params = [url, type, title, text, tags[0], tags[1], tags[2], tags[3], tags[4], user.nick]
    connection.query(sql, params, function(err){
        if(err){
            console.log('게시물 작성 실패 - ', err);
            fs.unlink('public/' + url);
            res.json({
                success: 0,
                message: 'DB 오류'
            });
        }
        else{
            res.json({
                success: 1,
                message: '작성 되었습니다.'
            });
        }
    });
});
/*---------------------------- 게시물 작성 기능 (기본) 끝 ----------------------------*/

/*------------------------------ 게시물 작성 기능(파일) ------------------------------*/
router.post('/uploadfile', function(req, res){
    var user = req.session.user;
    var fileroute;
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            const ls = 'public/Files/' + user.id;
            console.log(ls);
            cb(null, ls);
        },
        filename: function (req, file, cb) {
            const name = file.originalname;
            console.log(name);
            cb(null, name);
        }
    });
    var upload = multer({storage: storage}).single("files");
    upload(req, res, function(err) {
        if (err) {
            console.log(err);
            res.json({
                success: 0,
                message: '파일 업로드 실패'
            });
        }
        else {
            console.log('업로드 완료');
            fileroute = 'Files/' + user.id + '/' + req.file.originalname;
            console.log(fileroute);
            res.json({
                success: 1,
                message: '파일 업로드 완료',
                route: fileroute
            });
        }
    });
});
/*---------------------------- 게시물 작성 기능 (파일) 끝 ----------------------------*/

/*------------------------------ 게시물 삭제 기능 ------------------------------*/
router.post('/remove', function(req, res){
    var keyword = req.body.keyword;
    var sql1 = 'SELECT feed_file FROM feed where feed_num = "' + keyword + '"';
    var sql2 = 'DELETE FROM feed where feed_num = "' + keyword + '"';
    connection.query(sql1, function(err1, rows1){
        if(err1){
            console.log('게시물 정보 조회 실패 - ', err);
            res.json({
                success: 0,
                message: 'DB 조회 오류'
            });
            return;
        }
        else{
            fs.unlink('public/' + rows1[0].feed_file);
            connection.query(sql2, function(err2){
                if(err2){
                    res.json({
                        success: 0,
                        message: 'DB 삭제 오류'
                    });
                    return;
                }
                else{
                    res.json({
                        success: 1,
                        message: '삭제되었습니다'
                    });
                }
            });
        }
    });
});
/*---------------------------- 게시물 삭제 기능 끝 ----------------------------*/

module.exports = router;