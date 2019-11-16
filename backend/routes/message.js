/* --------------------------------------------------------------------------- */
/* ------------------------- 기본 정의 (Module, DB) -------------------------- */
/* --------------------------------------------------------------------------- */

/* 의존관계 정보 */
var express = require('express');
var router = express.Router();
var mysql = require('mysql');

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
    console.log('DB OK_ (message)');
  else
    console.log('DB ERR_', err);
})

/* --------------------------------------------------------------------------- */
/* ------------------------ 기본 정의 끝 (Module, DB) ------------------------- */
/* --------------------------------------------------------------------------- */

//Vue.js 기반으로 개발하여 페이지뷰 라우팅은 Vue-router 측에서 실행하므로 페이지뷰(EJS 등록)은 불필요함.

/*------------------------------ 메시지 목록 로드 기능 ------------------------------*/
router.get('/load', function(req, res){
    var user = req.session.user;
    var sql = 'SELECT * FROM message where res_id = "' + user.id + '"';

    connection.query(sql, function(err, rows){
        if(err){
            console.log('메시지 정보 조회 실패 - ', err);
            res.json(null);
            return;
        }
        else{
            /* 엔터 쳐주는 기능이나.. Vue에 Raw HTML 출력 옵션을 주면 XSS 공격에 취약하다고 하여 일단 보류
            for(var i = 0; i < rows.length; i++){
                rows[i].msg_text.replace(/(?:\r\n|\r|\n)/g, '<br />');
            }
            */
            res.json(rows);
        }
    });
});
/*---------------------------- 메시지 목록 로드 기능 끝 ----------------------------*/

/*------------------------------ 메시지 전송 기능 ------------------------------*/
router.post('/send', function(req, res){
    var user = req.session.user;
    var receiver = req.body.res_id;
    var text = req.body.text;
    var sql = 'INSERT INTO message (res_id, msg_id, msg_nick, msg_text) VALUES(?, ?, ?, ?)';
    var params;

    if(text == ''){
        res.json({
            success: 0,
            message: '메시지 내용을 작성해주세요'
        });
        return;
    }
    if(text.length > 1000){
        res.json({
            success: 0,
            message: '메시지 내용은 1000자 미만이어야 합니다.'
        });
        return;
    }
    params = [receiver, user.id, user.nick, text]
    connection.query(sql, params, function(err){
        if(err){
            console.log('전송 실패 - ', err);
            res.json({
                success: 0,
                message: 'DB 오류'
            });
        }
        else{
            res.json({
                success: 1,
                message: '메시지가 전송되었습니다.'
            });
        }
    });
});
/*---------------------------- 메시지 전송 기능 끝 ----------------------------*/

/*------------------------------ 메시지 삭제 기능 ------------------------------*/
router.post('/remove', function(req, res){
    var keyword = req.body.keyword;
    var sql = 'DELETE FROM message where msg_num = "' + keyword + '"';

    connection.query(sql, function(err){
        if(err){
            console.log('메시지 삭제 실패 - ', err);
            res.json({
                success: 0,
                message: 'DB 오류'
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
});
/*---------------------------- 메시지 삭제 기능 끝 ----------------------------*/

module.exports = router;