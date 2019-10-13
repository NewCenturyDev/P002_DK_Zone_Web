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
                                    <v-img style="width: 200px; height: 200px;" src="http://placehold.it/200x200"></v-img>
                                    <a style>프로필 사진 변경</a>
                                </v-flex>
                                <v-flex xs12 md7 sytle="margin: 20px;">
                                    <h1 style="margin: 20px;"> {{ Current_UserName }} </h1>
                                    <h5 style="margin: 20px; font-weight: normal;"> {{Current_UserBiography}}</h5>
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
                                            <td>{{Current_UserName}}</td>
                                        </tr>
                                        <tr>
                                            <td>성명(실명):</td>
                                            <td>{{Current_RealName}}</td>
                                        </tr>
                                        <tr>
                                            <td>전화번호:</td>
                                            <td>{{Current_UserPhone}}</td>
                                        </tr>
                                        <tr>
                                            <td>E - Mail:</td>
                                            <td>{{Current_UserEmail}}</td>
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
            Current_UserName: "TestUser",
            Current_RealName: "홍길동",
            Current_UserEmail: "test@service.com",
            Current_UserPhone: "010-1111-2222",
            Current_UserBiography: "저는 그러니까 어쩌고 저쩌고 이러쿵 저러쿵 아쌀라말라잇꿈~ 이러니까 저러니까 Lorem ipsum 아무말 대잔치 테스트 케이스 이것은 유저 설명 자기소개를 쓰는 칸이고요 어쩌고 저쩌고 테스트 데이터라고요 내용은 신경쓰지 마세요 ",
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
</style>