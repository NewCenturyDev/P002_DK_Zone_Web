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
                                <h3 style="width:100%;">Lost ID or PW?</h3>
                            </div>
                        </v-card-title>
                        <v-tabs v-model="active" color="cyan" light>
                            <v-tab>
                                ID 찾기
                            </v-tab>
                            <v-tab-item>
                                <v-form style="margin: 0 20%;">
                                    <v-text-field v-model="user.name" label="성명"></v-text-field>
                                    <v-text-field v-model="user.email" label="이메일" style="margin-top:-15px;"></v-text-field>
                                    <v-btn @click="Findid" large outlined style="width:60%; margin: 0 20%;">ID 찾기</v-btn>
                                </v-form>
                            </v-tab-item>
                            <v-tab>
                                PW 찾기
                            </v-tab>
                            <v-tab-item>
                                <v-form style="margin: 0 20%;">
                                    <v-text-field v-model="user.id" label="아이디"></v-text-field>
                                    <v-text-field v-model="user.name" label="성명" style="margin-top:-15px;"></v-text-field>
                                    <v-text-field v-model="user.email" label="이메일" style="margin-top:-15px;"></v-text-field>
                                    <v-btn @click="Findpw" large outlined style="width:60%; margin: 0 20%;">PW 찾기</v-btn>
                                </v-form>
                            </v-tab-item>
                        </v-tabs>
                        <br/>
                        <br/>
                        <v-card-text>
                            <v-btn @click="gotoLogin" text small style="margin-right: 10px;">로그인</v-btn>
                            <v-btn @click="gotoRegister" text small style="margin-right: 10px;">회원 가입</v-btn>
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
                id: '',
                name: '',
                email: ''
            }
        }
    },
    methods:{
        Findid: function(){
            this.$http.post('/users/idfinder',{
                user: this.user
            })
            .then((res) => {
                if(res.data.success == 1){
                    alert(res.data.message);
                    this.$router.push('/auth');
                }
                else{
                    alert(res.data.message);
                    this.$router.push('/auth/finder');
                }
            })
            .catch(function (err) {
                alert(err);
            })
        },
        Findpw: function(){
            this.$http.post('/users/pwfinder',{
                user: this.user
            })
            .then((res) => {
                if(res.data.success == 1){
                    alert(res.data.message);
                    this.$router.push('/auth');
                }
                else{
                    alert(res.data.message);
                    this.$router.push('/auth/finder');
                }
            })
            .catch(function (err) {
                alert(err);
            })
        },
        gotoIntro: function(){
            this.$router.push('/');
        },
        gotoLogin: function(){
            this.$router.push('/auth');
        },
        gotoRegister: function (){
            this.$router.push('/auth/register');
        },
    }
}
</script>

<style scoped>
</style>