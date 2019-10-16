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

//회원탈퇴 처리 알고리즘
router.post('/resign', function(req, res){
  /* 변수 선언 */
  //양식을 임시 저장할 객체
  var user = req.session.user;
  var auth = {
    "id": req.body.user.userid,
    "pw": req.body.user.userpw
  }
  //Mysql 쿼리 양식
  var sql = 'SELECT id FROM member WHERE id = ? AND pw = ?';
  var params_s = [auth.id, auth.pw];
  var params_d;
  /* 알고리즘 */
  //세션정보 검증 (세션정보의 id값으로 DB에서 비밀번호 조회)
  connection.query(sql, params_s, function(err, rows, fields){
    if(err) {
      console.log(err);
    }
    else if (rows[0]==undefined || auth.id != user.id) {
      res.json ({
        success: 0,
        message: '2차 인증이 실패했습니다. ID와 PW를 다시 확인해 주십시오!'
      });
      return;
    } //일치하는 id,pw가 없음
    else {
      console.log('회원탈퇴 처리 시작');
      //회원탈퇴 쿼리
      sql = 'DELETE FROM member WHERE id = ?';
      params_d = auth.id;
      connection.query(sql, params_d, function(err, result){
        if(err) {
          console.log('회원탈퇴 처리 실패 - ', err);
          res.json ({
            success: 0,
            message: '서버측 사정으로 DB오류가 발생하였습니다. 다음에 다시 이용해 주십시오.'
          });
          return;
        }
        else {
          res.json ({
            success: 1,
            message: '회원 탈퇴 되었습니다!'
          });
          req.session.destroy();
        }
      });
    }
  });
  //디버깅용 로그
  console.log(auth);
});

//ID 찾기 알고리즘
router.post('/idfinder', function(req, res){
  /* 변수 선언 */
  //양식을 임시 저장할 객체
  var auth = {
    "email": req.body.user.email
  }
  let result;
  //Mysql 쿼리 양식
  var sql = 'SELECT * FROM member';

  /* 알고리즘 */
  connection.query(sql, function(err, rows, fields){
    if(err){
      console.log(err);
      res.json ({
        success: 0,
        message: '서버측 사정으로 DB오류가 발생하였습니다. 다음에 다시 이용해 주십시오.'
      });
      return;
    }
    else{
      for(var i=0; i<rows.length; i++){
        if(rows[i].email == auth.email){
          console.log('id조회 처리 시작');
          //email이 일치하는 member의 열에서 id 반환
          result = '해당 정보로 조회한 사용자의 ID는 ' + rows[i].id + ' 입니다.';
          res.json ({
            success: 1,
            message: result
          });
          return;
        }
      }
      //일치하는 id,pw가 없음
      res.json ({
        success: 0,
        message: '입력하신 내용과 일치하는 회원정보가 없습니다.'
      });
    }
  });
});

//PW 찾기 알고리즘
router.post('/pwfinder', function(req, res){
  /* 변수 선언 */
  //양식을 임시 저장할 객체
  var auth = {
    "id": req.body.user.id,
    "name": req.body.user.name,
    "email": req.body.user.email
  }
  let result;
  //Mysql 쿼리 양식
  var sql = 'SELECT * FROM member';

  /* 알고리즘 */
  connection.query(sql, function(err, rows, fields){
    if(err){
      console.log(err);
      res.json ({
        success: 0,
        message: '서버측 사정으로 DB오류가 발생하였습니다. 다음에 다시 이용해 주십시오.'
      });
      return;
    }
    else{
      for(var i=0; i<rows.length; i++){
        if(rows[i].email == auth.email && rows[i].name == auth.name && rows[i].id == auth.id){
          console.log('pw조회 처리 시작');
          //email,성명,id가 일치하는 member의 열에서 pw 반환
          result = '해당 정보로 조회한 사용자의 PW는 ' + rows[i].pw + ' 입니다.';
          res.json ({
            success: 1,
            message: result
          });
          return;
        }
      }
      //일치하는 id,pw가 없음
      res.json ({
        success: 0,
        message: '입력하신 내용과 일치하는 회원정보가 없습니다.'
      });
    }
  });
});

/*---------------------------- 회원 관련 기능 끝 ----------------------------*/

//아래 내용은 수정 필요
/* ------------------------- 회원 정보 수정 기능 시작 ------------------------- */

router.post('/modify',  function(req, res){  
  /* 변수 선언 */
  var user = req.session.user;
  var auth = {
    "id": req.body.user.userid,
    "pw": req.body.user.userpw
  }
  //Mysql 쿼리 양식
  var sql = 'SELECT * FROM member WHERE id = ? AND pw = ?';
  var params_s = [auth.id, auth.pw];
  //검증 (세션정보의 id값으로 DB에서 비밀번호 조회)
  connection.query(sql, params_s, function(err, rows, fields){
     if(err) {
      console.log(err);
    }
    else if (rows[0] == undefined || auth.id != user.id) {
      res.json ({
        success: 0,
        message: '2차 인증이 실패했습니다. ID와 PW를 다시 확인해 주십시오!'
      });
      return;
    } //일치하는 id,pw가 없음
    else {
      console.log('회원 정보 수정 시작');
      res.json ({
        success: 1,
        message: '',
        pw: rows[0].pw,
        nick: rows[0].nick,
        email: rows[0].email,
        phone: rows[0].phone
      });
    }
  });
});

router.post('/remodify', function(req, res){ 
  var user = req.session.user;
  var remodif = {
    "pw": req.body.user.userpw,
    "nick": req.body.user.nick,
    "email": req.body.user.email,
    "phone": req.body.user.phone
  }
  //양식 검증용 정규식
  var RegExp1 = /^[0-9]*$/;
  var RegExp2 = /^[-A-Za-z0-9_]+[-A-Za-z0-9_.]*[@]{1}[-A-Za-z0-9_]+[-A-Za-z0-9_.]*[.]{1}[A-Za-z]{1,5}$/;
  //사용자가 입력한 회원정보변경 양식 검증
  if(remodif.pw==""||remodif.nick==""||remodif.email==""||remodif.phone==""){
    res.json ({
      success: 0,
      message: '회원정보변경 양식의 모든 필드를 채워주셔야 합니다. 변경하지 않을 정보는 원래 정보를 입력하십시오 (보안강화 차원의 조치입니다.) 빈 칸은 허용되지 않습니다!'
    });
    return;
  }
  if(!RegExp1.test(remodif.phone)){
    res.json ({
      success: 0,
      message: '전화번호는 숫자만 입력하여 주십시오! ( - 는 생략해 주십시오.)'
    });
    return;
  }
  if(!RegExp2.test(remodif.email)){
    res.json ({
      success: 0,
      message: '이메일 양식이 올바르지 않습니다! (example@service.com 형식으로 입력해 주십시오)'
    });
    return;
  }
  else{
    var sql = 'UPDATE member SET pw = ?, nick = ?, email = ?, phone = ? WHERE id = ?';
    params_m = [remodif.pw, remodif.nick, remodif.email, remodif.phone, user.id];
    connection.query(sql, params_m, function(err, rows, fields){
      if(err) {
        console.log('회원 정보 수정 실패 - ', err);
        res.json ({
          success: 0,
          message: '서버측 사정으로 DB오류가 발생하였습니다. 다음에 다시 이용해 주십시오.'
        });
        return;
      }
     else {
        console.log('회원 정보 수정 완료');
        req.session.user.nick = remodif.nick;
        res.json ({
          success: 1,
          message: '회원 정보가 수정 되었습니다!'
        });
      }
    });
  }
});
/* ------------------------- 회원 정보 수정 기능 끝 ------------------------- */


module.exports = router;
