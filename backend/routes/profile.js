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
    console.log('DB OK_ (profile)');
  else
    console.log('DB ERR_', err);
})

/* --------------------------------------------------------------------------- */
/* ------------------------ 기본 정의 끝 (Module, DB) ------------------------- */
/* --------------------------------------------------------------------------- */

//Vue.js 기반으로 개발하여 페이지뷰 라우팅은 Vue-router 측에서 실행하므로 페이지뷰(EJS 등록)은 불필요함.

/*------------------------------ 프로필 로드 기능 ------------------------------*/
router.get('/load', function(req, res){
    /* 변수 선언 */
    var user = req.session.user;
    var sql = 'SELECT * FROM member WHERE id = "' + user.id + '"';
    var defphoto = "./Profiles/default.png";
    var defbio = "개인 메시지가 없습니다."

    connection.query(sql, function(err, rows){
        if(err) {
        console.log('회원 정보 조회 실패 - ', err);
            res.json ({
                success: 0,
                message: '서버측 사정으로 DB오류가 발생하였습니다. 다음에 다시 이용해 주십시오.'
            });
            return;
        }
        else {
            if(rows[0].bio != null){
                defbio = rows[0].bio;
            }
            if(rows[0].photo != null){
                defphoto = rows[0].photo;
            }
            console.log('회원 정보 조회 완료');
            res.json ({
                success: 1,
                nick: rows[0].nick,
                photo: defphoto,
                userbio: defbio,
                name: rows[0].name,
                email: rows[0].email,
                phone: rows[0].phone,
            });
        }
    });
});
/*---------------------------- 프로필 로드 기능 끝 ----------------------------*/

/*------------------------------ 개인 메시지 변경 기능 ------------------------------*/
router.post('/modifybio', function(req, res){
    /* 변수 선언 */
    var user = req.session.user;
    var sql = 'UPDATE member SET bio = ? WHERE id = ?';
    var newbio = req.body.newbio;
    var defbio = "개인 메시지가 없습니다.";
    var params = [newbio, user.id];
    
    if(newbio == ''){
        params = [defbio, user.id];
    }
    connection.query(sql, params, function(err){
        if(err) {
            console.log('개인 메세지 수정 실패 - ', err);
            res.json ({
                message: "서버측 사정으로 DB오류가 발생하였습니다. 다음에 다시 이용해 주십시오."
            });
        }
        else {
            console.log('개인 메시지 수정 완료');
            res.json ({
                message: "개인 메시지가 수정 되었습니다."
            });
        }
    });
});
/*---------------------------- 개인 메시지 변경 기능 끝 ----------------------------*/

/*------------------------------ 프로필 사진 변경 기능 ------------------------------*/
router.post('/modifyphoto', function(req, res){
    /* 변수 선언 */
    let user = req.session.user;
    let fileroute;
    let storage = multer.diskStorage({
        destination: function (req, file, cb) {
            const ls = 'public/Profiles/';
            console.log(ls);
            cb(null, ls);
        },
        filename: function (req, file, cb) {
            const name = req.session.user.id + '.png';
            console.log(name);
            cb(null, name);
        }
    });
    let upload = multer({storage: storage}).single("files");
    let sql = 'UPDATE member SET photo = ? WHERE id = ?';
    let params = [];

    /* 파일 저장 */
    if (fs.existsSync('public/Profiles/' + user.id + '.png')) {    //기존 파일이 있으면 삭제
        fs.unlink('public/Profiles/' + user.id + '.png');
    }
    upload(req, res, function(err) {
        if (err) {
            console.log(err);
            res.json({
                success: 0,
                message: '파일 업로드 실패'
            });
            return;
        }
        else {
            console.log('업로드 완료');
            fileroute = 'Profiles/' + user.id + '.png';
            console.log(fileroute);

            /* DB 갱신 */
            params = [fileroute, user.id];
            connection.query(sql, params, function(err){
                if(err) {
                    console.log('프로필 사진 수정 실패 - ', err);
                    res.json ({
                        success: 0,
                        message: "서버측 사정으로 DB오류가 발생하였습니다. 다음에 다시 이용해 주십시오."
                    });
                }
                else {
                    console.log('프로필 사진 수정 완료');
                    res.json ({
                        success: 1,
                        message: "프로필 사진이 변경 되었습니다."
                    });
                }
            });
        }
    });
});
/*---------------------------- 프로필 사진 변경 기능 끝 ----------------------------*/

/*------------------------------ 프로필 사진 삭제 기능 ------------------------------*/
router.get('/deletephoto', function(req, res){
    /* 변수 선언 */
    let user = req.session.user;
    let sql = 'UPDATE member SET photo = ? WHERE id = ?';
    let params = [null, user.id];

    /* DB 갱신 */
    connection.query(sql, params, function(err){
        if(err) {
            console.log('프로필 사진 삭제 실패 - ', err);
            res.json ({
                message: "서버측 사정으로 DB오류가 발생하였습니다. 다음에 다시 이용해 주십시오."
            });
        }
        else {
            console.log('프로필 사진 삭제 완료');
            res.json ({
                message: "프로필 사진이 기본 이미지로 변경 되었습니다."
            });
        }
    });
});
/*---------------------------- 프로필 사진 삭제 기능 끝 ----------------------------*/
module.exports = router;