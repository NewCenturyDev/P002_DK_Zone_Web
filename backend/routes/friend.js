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
    console.log('DB OK_ (friend)');
  else
    console.log('DB ERR_', err);
})

/* --------------------------------------------------------------------------- */
/* ------------------------ 기본 정의 끝 (Module, DB) ------------------------- */
/* --------------------------------------------------------------------------- */

//Vue.js 기반으로 개발하여 페이지뷰 라우팅은 Vue-router 측에서 실행하므로 페이지뷰(EJS 등록)은 불필요함.

/*------------------------------ 친구목록 로드 기능 ------------------------------*/
router.get('/load', function(req, res){
    var user = req.session.user;
    var sql = 'SELECT * FROM friend where my_id = "' + user.id + '"';

    connection.query(sql, function(err, rows){
        if(err){
            console.log('친구 정보 조회 실패 - ', err);
            res.json(null);
            return;
        }
        else{
            res.json(rows);
        }
    });
});
/*---------------------------- 친구목록 로드 기능 끝 ----------------------------*/

/*------------------------------ 친구 추가 기능 ------------------------------*/
router.post('/add', function(req, res){
    var user = req.session.user;
    var keyword = req.body.keyword;
    var sql = 'SELECT * FROM member where email = "' + keyword + '"';
    var sql2 = 'INSERT INTO friend (my_id, friend_nick, friend_photo, friend_bio) VALUES(?, ?, ?, ?)';
    var params;

    connection.query(sql, function(err, rows){
        if(err){
            console.log('검색 실패 - ', err);
            res.json({
                success: 0,
                message: 'DB 오류'
            });
            return;
        }
        else{
            if(rows[0] == null){
                res.json({
                    success: 0,
                    message: '해당 E-mail과 일치하는 회원 정보가 없습니다.'
                });
                return;
            }
            else{
                params = [user.id, rows[0].nick, rows[0].photo, rows[0].bio]
                connection.query(sql2, params, function(err2){
                    if(err2){
                        console.log('추가 실패 - ', err2);
                        res.json({
                            success: 0,
                            message: 'DB 오류'
                        });
                    }
                    else{
                        res.json({
                            success: 1,
                            message: '친구로 추가되었습니다.'
                        });
                    }
                }); 
            }
        }
    });
});
/*---------------------------- 친구 추가 기능 끝 ----------------------------*/

/*------------------------------ 친구 삭제 기능 ------------------------------*/
router.post('/remove', function(req, res){
    var keyword = req.body.keyword;
    var sql = 'DELETE FROM friend where friend_nick = "' + keyword + '"';

    connection.query(sql, function(err){
        if(err){
            console.log('친구 삭제 실패 - ', err);
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
/*---------------------------- 친구 삭제 기능 끝 ----------------------------*/


module.exports = router;