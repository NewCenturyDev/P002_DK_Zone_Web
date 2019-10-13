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
    console.log('DB OK_ (users)');
  else
    console.log('DB ERR_', err);
})

/* --------------------------------------------------------------------------- */
/* ------------------------ 기본 정의 끝 (Module, DB) ------------------------- */
/* --------------------------------------------------------------------------- */

//Vue.js 기반으로 개발하여 페이지뷰 라우팅은 Vue-router 측에서 실행하므로 페이지뷰(EJS 등록)은 불필요함.

/*------------------------------ 회원 관련 기능 ------------------------------*/
//로그인 처리 알고리즘
router.post('/login', function(req, res){
  /* 변수 선언 */
  var auth = {
    "id": req.body.user.userid,
    "pw": req.body.user.userpw
  } //양식을 임시 저장할 객체
  var sql = 'SELECT * FROM member'; //Mysql 쿼리 양식

  /* 알고리즘 */

  //디버깅용 로그
  console.log(auth);

  //DB에서 회원정보 읽어와서 사용자가 입력한 내용과 대조
  connection.query(sql, function(err, rows){
     if(err){
      console.log(err);
    }
    else {
      for(var i=0; i<rows.length; i++){
        if(rows[i].id == auth.id && rows[i].pw == auth.pw){
          //세션 생성
          req.session.user = {
            "id" : rows[i].id,
            "nick" : rows[i].nick,
            "name" : rows[i].name
          }
          console.log('로그인 처리 - 세션 저장');
          res.json({
            success: 1,
            message: '로그인 되었습니다!'
          })
          return;
        }
      }
      //일치하는 id,pw가 없음
      res.json({
        success: 0,
        message: 'ID와 PW를 다시 확인하여 주십시오!'
      })
     }
  });
});

// 로그아웃 처리 알고리즘
router.get('/logout', function(req, res){
  req.session.destroy();
  console.log('로그아웃 처리 - 세션 삭제');
  res.json({
    success: 1,
    message: '로그아웃 되었습니다!'
  })
});

//회원가입 처리 알고리즘
router.post('/signup', function(req, res){
  /* 변수 선언 */
  //양식을 임시 저장할 객체
  var info = {
    'userid': req.body.user.userid,
    'userpw': req.body.user.userpw,
    'userpwck': req.body.user.userpwck,
    'name': req.body.user.name,
    'nick': req.body.user.nick,
    'email': req.body.user.email,
    'phone': req.body.user.phone
  };
  //양식 검증용 정규식
  var RegExp1 = /^[0-9]*$/;
  var RegExp2 = /^[-A-Za-z0-9_]+[-A-Za-z0-9_.]*[@]{1}[-A-Za-z0-9_]+[-A-Za-z0-9_.]*[.]{1}[A-Za-z]{1,5}$/;
  //Mysql 쿼리 양식
  var sql = 'INSERT INTO member (id, pw, name, nick, email, phone, photo, bio) VALUES(?, ?, ?, ?, ?, ?, NULL, NULL)';
  var params = [info.userid,info.userpw,info.name,info.nick,info.email,info.phone];
  var sql2 = 'SELECT * FROM member WHERE id = "' + info.userid + '"';

  /* 알고리즘 */
  /* const salt = bcrypt.genSaltSync();
  const encryptedPW = bcrypt.hashSync(user.userpw, salt);
  */
  //개인 프로젝트이므로 비밀번호 암호화는.. 생.략.한.다.
  
  //사용자가 입력한 회원가입 양식 검증
  if(info.userid==""||info.userpw==""||info.userpwck==""||info.name==""||info.nick==""||info.email==""||info.phone==""){
    res.json ({
      success: 0,
      message: '회원가입 페이지의 모든 양식을 채워 주십시오. 공백은 허용되지 않습니다.'
    });
    return;
  }
  else if(info.userpw!=info.userpwck){
    res.json ({
      success: 0,
      message: '비밀번호와 비밀번호 확인 필드의 값이 서로 다릅니다!'
    });
    return;
  }
  else if(!RegExp1.test(info.phone)){
    res.json ({
      success: 0,
      message: '전화번호는 숫자만 입력하여 주십시오! ( - 는 생략해 주십시오.)'
    });
    return;
  }
  else if(!RegExp2.test(info.email)){
    res.json ({
      success: 0,
      message: '이메일 양식이 올바르지 않습니다! ( example@service.com 형식으로 입력해 주십시오)'
    });
    return;
  }

  //양식에 문제 없으면 DB에 저장
  connection.query(sql2, function(err, rows2){
    if(err){
      console.log(err);
    }
    else {
      for(var i=0; i<rows2.length; i++){
        if(rows2[i].id == info.userid){
          console.log('아이디 중복');
          res.json ({
            success: 0,
            message: '해당 아이디는 이미 다른 사람이 사용하고 있습니다. 다른 아이디를 입력해 주세요.'
          });
          return;
        }
        else if(rows2[i].email == info.email){
          console.log('닉네임 중복');
          res.json ({
            success: 0,
            message: '이미 가입한 유저의 이메일 주소입니다. 다른 이메일을 입력하거나 기존 아이디로 로그인 해 주세요.'
          });
          return;
        }
      }
      connection.query(sql, params, function(err, rows){
        if(err){
          console.log(err);
          res.json ({
            success: 0,
            message: '서버측 사정으로 DB오류가 발생하였습니다. 다음에 다시 이용해 주십시오.'
          });
          return;
        }
        else {
          res.json ({
            success: 1,
            message: '회원가입이 완료되었습니다.'
          });
        }
      });
    }
    //디버깅용 로그
    console.log(info);
  });
});

/*---------------------------- 회원 관련 기능 끝 ----------------------------*/


module.exports = router;
