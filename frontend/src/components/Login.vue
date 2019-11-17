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
                                <h3 style="width:100%;">DK-Zone Login</h3>
                            </div>
                        </v-card-title>
                        <v-form style="margin: 0 20%;">
                            <v-text-field label="아이디" v-model="user.userid"></v-text-field>
                            <v-text-field @keyup.enter="Login" type="password" label="패스워드" v-model="user.userpw" style="margin-top:-15px;"></v-text-field>
                            <v-btn @click="Login" large outlined style="width:60%; margin: 0 20%;">로그인</v-btn>
                        </v-form>
                        <br/>
                        <br/>
                        <v-card-text>
                            <v-btn @click="gotoRegister" text small style="margin-right: 10px;">회원 가입</v-btn>
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
                userpw: ''
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
        Login: function (event) {
            let self = this;
            this.$http.post('/users/login',{
                user: this.user
            })
            .then((res) => {
                if(res.data.success == 1){
                    alert(res.data.message);
                    self.clear();
                    this.$router.push('/lists');
                }
                else{
                    alert(res.data.message);
                    self.clear();
                    this.$router.push('/auth');
                }
            })
            .catch(function (err) {
                self.clear();
                alert(err);
            })
        },
        gotoIntro: function(){
            this.$router.push('/');
        },
        gotoRegister: function (){
            this.$router.push('/auth/register');
        },
        gotoFinder: function(){
            this.$router.push('/auth/finder');
        },
        clear: function(){
            this.user.userid = '';
            this.user.userpw = '';
        }
    },
    created() {
        this.CheckSession();
    }
}
</script>

<style scoped>
</style>