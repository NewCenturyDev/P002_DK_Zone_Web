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
    var defphoto = "https://randomuser.me/api/portraits/men/78.jpg";
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

module.exports = router;