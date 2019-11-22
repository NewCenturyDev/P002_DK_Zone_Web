<template>
    <v-app>
        <nav>
            <v-toolbar color="cyan" light>
                <v-toolbar-title @click="gotoIntro" style="color: white; margin-left: 20px; cursor: pointer;">DK-Zone</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn @click="gotoRegister" icon><v-icon>person_add</v-icon></v-btn>
                <v-btn @click="gotoLogin" icon><v-icon>exit_to_app</v-icon></v-btn>
            </v-toolbar>
        </nav>
        <v-container>
            <v-layout style="margin: 20px" justify-center>
                <v-flex xs12 sm9>
                    <v-card>
                        <v-img src="main.jpg"></v-img>
                        <v-card-text>타인이 기획한 내용을 바탕으로 구현하였으며, 해당 기획안은 HyperTech99와 관련이 없습니다.</v-card-text>
                    </v-card>
                </v-flex>
            </v-layout>
            <v-layout wrap justify-center>
                <v-flex xs12 sm3>
                    <v-card style="margin: 15px">
                        <v-img src="http://placehold.it/600x250"></v-img>
                        <v-card-title primary-title>단순</v-card-title>
                        <v-card-text>직관적 인터페이스, 심플한 사진/텍스트</v-card-text>
                    </v-card>
                </v-flex>
                <v-flex xs12 sm3>
                    <v-card style="margin: 15px">
                        <v-img src="http://placehold.it/600x250"></v-img>
                        <v-card-title primary-title>선택</v-card-title>
                        <v-card-text>피드의 선택적 구성, 개인화된 저장, 검색</v-card-text>
                    </v-card>
                </v-flex>
                <v-flex xs12 sm3>
                    <v-card style="margin: 15px">
                        <v-img src="http://placehold.it/600x250"></v-img>
                        <v-card-title primary-title>재미</v-card-title>
                        <v-card-text>과시하는 즐거움, 공유하는 즐거움</v-card-text>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
        <v-footer>
            <v-container>
                <v-layout>
                    <v-flex xs12 justify-center>
                        덕후존 ver 0.0.5.0 | All-rights-reserved - HyperSoft - Dev. HyperTech99
                    </v-flex>
                </v-layout>
            </v-container>
        </v-footer>
    </v-app>
</template>

<script>
export default {
    data(){
        return{}
    },
    methods:{
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
        gotoIntro: function(){
            this.$router.push('/');
        },
        gotoLogin: function(){
            this.$router.push('/auth');
        },
        gotoRegister: function (){
            this.$router.push('/auth/register');
        }
    },
    created() {
        this.CheckSession();
    }
}
</script>

<style scoped>
</style>