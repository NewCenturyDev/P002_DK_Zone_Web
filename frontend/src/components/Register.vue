<template>
    <v-app>
        <nav>
            <v-toolbar color="cyan" light>
                <v-toolbar-title @click="gotoIntro" style="color: white; margin-left: 20px; cursor: pointer;">DK-Zone</v-toolbar-title>
                <v-spacer></v-spacer>
            </v-toolbar>
        </nav>
        <v-container>
            <v-layout style="margin: 50px 5px" justify-center>
                <v-flex xs12 sm6 md4>
                    <v-card>
                        <v-card-title>
                            <div>
                                <h3 style="width:100%;">DK-Zone Register</h3>
                            </div>
                        </v-card-title>
                        <v-form style="margin: 0 20%;">
                            <v-text-field label="아이디" v-model="user.userid"></v-text-field>
                            <v-text-field type="password" label="비밀번호" v-model="user.userpw" counter=20 style="margin-top:-15px;"></v-text-field>
                            <v-text-field type="password" label="비밀번호 확인" v-model="user.userpwck" counter=20 style="margin-top:-15px;"></v-text-field>
                            <v-text-field label="성명" v-model="user.name" counter=20 style="margin-top:-15px;"></v-text-field>
                            <v-text-field label="닉네임" v-model="user.nick" counter=20 style="margin-top:-15px;"></v-text-field>
                            <v-text-field label="이메일" v-model="user.email" counter=20 style="margin-top:-15px;"></v-text-field>
                            <v-text-field @keyup.enter="Signup" label="전화번호" v-model="user.phone" style="margin-top:-15px;"></v-text-field>
                            <v-btn large outlined @click="Signup" style="width:60%; margin: 0 20%;">회원가입</v-btn>
                        </v-form>
                        <br/>
                        <br/>
                        <v-card-text>
                            <v-btn @click="gotoLogin" text small style="margin-right: 10px;">로그인</v-btn>
                            <v-btn @click="gotoFinder" text small style="margin-right: 10px;">ID/PW 찾기</v-btn>
                        </v-card-text>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </v-app>
</template>

<script>
export default {
    data(){
        return{
            user: {
                userid: '',
                userpw: '',
                userpwck: '',
                name: '',
                nick: '',
                email: '',
                phone: ''
            }
        }
    },
    methods: {
        CheckSession: function () {
            this.$http.get('/users/check')
            .then((res) => {
                if(res.data.islogin != false){
                    alert("이미 로그인 되어 있습니다.");
                    this.$router.push('/lists');
                }
            })
            .catch(function (err) {
                alert(err);
            })
        },
        //eslint-disable-next-line
        Signup: function (event) {
            let self = this;
            this.$http.post('/users/signup',{
                user: this.user
            })
            .then((res) => {
                if(res.data.success == 1){
                    alert(res.data.message);
                    self.clear();
                    this.$router.push('/auth');
                }
                else{
                    alert(res.data.message);
                    this.$router.push('/auth/register');
                }
            })
            .catch(function (err) {
                alert(err);
            })
        },
        gotoIntro: function(){
            this.$router.push('/');
        },
        gotoLogin: function (){
            this.$router.push('/auth');
        },
        gotoFinder: function(){
            this.$router.push('/auth/finder');
        },
        clear: function(){
            this.user.userid = '';
            this.user.userpw = '';
            this.user.userpwck = '';
            this.user.name = '';
            this.user.nick = '';
            this.user.email = '';
            this.user.phone = '';
        }
    },
    created() {
        this.CheckSession();
    }
}
</script>

<style scoped>
</style>