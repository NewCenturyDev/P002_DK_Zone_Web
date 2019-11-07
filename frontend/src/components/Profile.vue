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
        <!-- 프로필 본문 -->
        <v-container id="navigation">
            <v-layout wrap justify-center>
                <v-flex xs12 sm9 md6>
                    <!--  -->
                    <v-card>
                        <v-tabs>
                            <v-tab>
                                프로필 요약
                            </v-tab>
                            <v-tab-item>
                                <v-layout row wrap>
                                <v-flex xs12 md4 style="margin: 20px">
                                    <v-img style="width: 200px; height: 200px;" :src=Current_UserInfo.photo></v-img>
                                    <v-btn small text @click="ChangePhoto" style="margin-top 10px;">프로필 사진 변경</v-btn>
                                    <v-btn small text @click="ChangeBio" style="margin-top 10px;">개인 메시지 변경</v-btn>
                                </v-flex>
                                <v-flex xs12 md7 sytle="margin: 20px;">
                                    <h1 style="margin: 20px;"> {{ Current_UserInfo.nick }} </h1>
                                    <h5 style="margin: 20px; font-weight: normal;"> {{Current_UserInfo.userbio}}</h5>
                                </v-flex>
                                </v-layout>
                            </v-tab-item>
                            <v-tab>
                                프로필 세부 정보
                            </v-tab>
                            <v-tab-item>
                                <v-flex sytle="margin: 20px;">
                                    <v-simple-table>
                                        <tbody>
                                        <tr>
                                            <td>덕후네임:</td>
                                            <td>{{Current_UserInfo.nick}}</td>
                                        </tr>
                                        <tr>
                                            <td>성명(실명):</td>
                                            <td>{{Current_UserInfo.name}}</td>
                                        </tr>
                                        <tr>
                                            <td>E - Mail:</td>
                                            <td>{{Current_UserInfo.email}}</td>
                                        </tr>
                                        <tr>
                                            <td>전화번호:</td>
                                            <td>{{Current_UserInfo.phone}}</td>
                                        </tr>
                                        </tbody>
                                    </v-simple-table>
                                </v-flex>
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
    data(){
        return{
            Current_UserInfo: {
                photo: "",
                nick: "",
                name: "",
                email: "",
                phone: "",
                userbio: ""
            },
            drawer: null,
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
        Loadinfo: function () {
            let self = this;
            this.$http.get('/profile/load')
            .then((res) => {
                if(res.data.success == 1){
                    self.Current_UserInfo.photo = res.data.photo;
                    self.Current_UserInfo.nick = res.data.nick;
                    self.Current_UserInfo.name = res.data.name;
                    self.Current_UserInfo.email = res.data.email;
                    self.Current_UserInfo.phone = res.data.phone;
                    self.Current_UserInfo.userbio = res.data.userbio;
                    return;
                }
                else{
                    alert(res.data.message);
                    this.$router.push('/lists');
                }
            })
            .catch(function (err) {
                alert(err);
            });
        },
        Changephoto: function(){
            //TODO
        },
        Changebio: function(){
            //TODO
        },
        gotoMain: function(){
            this.$router.push('/lists');
        },
        gotoSearch: function (){
            this.$router.push('/search');
        }
    },
    beforeMount() {
        this.Loadinfo();
    }
}
</script>

<style scoped>
</style>