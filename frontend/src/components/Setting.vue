<template>
    <v-app>
        <!-- 상단바 -->
        <nav>
            <v-toolbar color="cyan" light>
                <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
                <v-toolbar-title @click="gotoMain" style="color: white; margin-left: 20px; cursor: pointer;">DK-Zone</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                    <v-btn icon @click="gotoSearch"><v-icon>search</v-icon></v-btn>
                    <v-btn icon @click="Logout"><v-icon>exit_to_app</v-icon></v-btn>
                </v-toolbar-items>
            </v-toolbar>
        </nav>
        <!-- 좌측 탭 메뉴 -->
        <v-navigation-drawer v-model="drawer" absolute temporary>
            <v-list-item>
                <v-list-item-avatar>
                    <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                    <v-list-item-title> {{ Current_UserName }} </v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-list dense>
                <v-list-item v-for="item in Menuitems" :key="item.title" :to="item.url" link>
                    <v-list-item-title>
                        <v-list-item-title> {{ item.title }} </v-list-item-title>
                    </v-list-item-title>
                </v-list-item>
            </v-list>
            <v-divider></v-divider>
            <v-list dense>
                <v-list-item v-for="item in Menuitems2" :key="item.title" :to="item.url" link>
                    <v-list-item-title>
                        <v-list-item-title> {{ item.title }} </v-list-item-title>
                    </v-list-item-title>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <!-- 개인설정 본문 -->
        <v-container id="navigation">
            <v-layout wrap justify-center>
                <v-flex xs12 sm9 md6>
                    <!-- 개인설정 내용 -->
                    <v-card>
                        <v-tabs>
                            <v-tab>
                                정보수정
                            </v-tab>
                            <v-tab-item>
                                <v-form id="modifyform" :class="{ active: this.mode }" style="width: 50%; margin: 50px 25%">
                                    <v-text-field v-model="user.userid" label="아이디" style="margin-top: 15px;"></v-text-field>
                                    <v-text-field type="password" v-model="user.userpw" label="비밀번호" style="margin-top: 15px;"></v-text-field>
                                    <v-btn @click="Modify" large outlined style="width:40%; margin: 0 30%; margin-bottom: 50px;">본인 확인</v-btn>
                                </v-form>
                                <v-form id="remodifyform" :class="{ active: !this.mode }" style="width: 50%; margin: 50px 25%">
                                    <v-text-field v-model="user.userpw" type="password" label="비밀번호" style="margin-top:-15px;"></v-text-field>
                                    <v-text-field v-model="user.userpwck" type="password" label="비밀번호 확인" style="margin-top:-15px;"></v-text-field>
                                    <v-text-field v-model="user.nick" label="닉네임" style="margin-top:-15px;"></v-text-field>
                                    <v-text-field v-model="user.email" label="이메일" style="margin-top:-15px;"></v-text-field>
                                    <v-text-field v-model="user.phone" label="전화번호" style="margin-top:-15px;"></v-text-field>
                                    <v-btn @click="Remodify" large outlined style="width:40%; margin: 0 30%; margin-bottom: 50px;">정보수정</v-btn>
                                </v-form>
                            </v-tab-item>
                            <v-tab>
                                회원탈퇴
                            </v-tab>
                            <v-tab-item>
                                <v-form style="width: 50%; margin: 50px 25%">
                                    <div style="width: 100%; padding: 25px; border: 2px solid black; background-color: yellow;">
                                        <h5 style="text-align: center; color: red;">경고: 회원 탈퇴하면 사용자가 게시한 모든 게시물과 구독, 쪽지, 회원 정보가 DB에서 즉시 파기되며, 절대로 복구할 수 없게 됩니다.</h5>
                                    </div>
                                    <v-text-field v-model="user.userid" label="아이디" style="margin-top: 15px;"></v-text-field>
                                    <v-text-field type="password" v-model="user.userpw" label="비밀번호" style="margin-top: 15px;"></v-text-field>
                                    <v-btn @click="Resign" large outlined style="width:40%; margin: 0 30%; margin-bottom: 50px;">회원탈퇴</v-btn>
                                </v-form>
                            </v-tab-item>
                        </v-tabs>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </v-app>
</template>

<script>
export default {
    data: function(){
        return{
            drawer: null,
            user: {
                userid: '',
                userpw: '',
                userpwck: '',
                nick: '',
                email: '',
                phone: ''
            },
            mode: false,
            Menuitems: [
                {title: '덕후 타임라인', url:'/lists'},
                {title: '덕후 핫이슈', url:'/issue'},
                {title: '덕후 핫플레이스', url:'/place'},
            ],
            Menuitems2: [
                {title: '내 프로필', url:'/profile'},
                {title: '스크랩 북', url:'/scrap'},
                {title: '쪽지함', url:'/msgbox'},
                {title: '설정', url:'/setting'}
            ],
        }
    },
    methods: {
        //eslint-disable-next-line
        Logout: function (event) {
            this.$http.get('/users/logout')
            .then((res) => {
                if(res.data.success == 1){
                    alert(res.data.message);
                    this.$router.push('/');
                }
            })
            .catch(function (err) {
                alert(err);
            })
        },
        Modify: function () {
            let self = this;    //this.$http.post같이 안에서 뭔가 실행하면 this의 맥락이 바뀌는경우가 있음.
            //그렇게 되면 data 나 method 접근못하므로 맥락을 저장해줌
            this.$http.post('/users/modify',{
                user: this.user
            })
            .then(function (res) {
                if(res.data.success == 1){
                    //그리고 self로 다른 메소드 호출
                    //참고로 res.data에는 객체나 배열이 들어가도 잘 되지만..
                    //이상하게 json안에 객체 그러니까 { result: {id: ~~, pw: ~~} } 식으로 되면 안에 있는거 못읽더라.
                    //그러니까 그냥 데이터 받아올 땐 배열 쓰든지 걍 json 안에 변수 여러개쓰자.
                    self.Changemode(res.data.pw,res.data.nick,res.data.email,res.data.phone);
                }
                else{
                    alert(res.data.message);
                    this.$router.push('/setting');
                }
            })
            .catch(function (err) {
                alert(err);
            })
        },
        Changemode(pw,n,e,p){
            //내용수정 창으로 전환
            this.user.userpw = pw;
            this.user.userpwck = pw;
            this.user.nick = n;
            this.user.email = e;
            this.user.phone = p;
            this.mode = true;
        },
        Remodify: function () {
            let self = this;
            this.$http.post('/users/remodify',{
                user: this.user
            })
            .then((res) => {
                if(res.data.success == 1){
                    alert(res.data.message);
                    //수정 완료하였으니 다시 본인확인 창으로 전환
                    self.mode = false;  //this 맥락만 잘 관리해주면 data 내용을 갱신하는 methods 충분히 만들 수 있다.
                    //user 객체 내용 초기화
                    self.user.userid = '';
                    self.user.userpw = '';
                    self.user.userpwck = '';
                    self.user.nick = '';
                    self.user.email = '';
                    self.user.phone = '';
                    this.$router.push('/setting');
                }
                else{
                    alert(res.data.message);
                    this.$router.push('/setting');
                }
            })
            .catch(function (err) {
                alert(err);
            })
        },
        Resign: function () {
            this.$http.post('/users/resign',{
                user: this.user
            })
            .then((res) => {
                if(res.data.success == 1){
                    alert(res.data.message);
                    this.$router.push('/');
                }
                else{
                    alert(res.data.message);
                    this.$router.push('/setting');
                }
            })
            .catch(function (err) {
                alert(err);
            })
        },
        gotoMain: function(){
            this.$router.push('/lists');
        },
        gotoSearch: function (){
            this.$router.push('/search');
        }
    }
}
</script>

<style scoped>
    .active{
        display: none;
    }
</style>