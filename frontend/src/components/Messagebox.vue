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
        <!-- 쪽지함 본문 -->
        <v-container id="feeds">
            <v-layout wrap justify-center>
                <v-flex xs12 sm8 sytle="margin: 20px;">
                    <v-card>
                        <v-card-title>
                            <h3>쪽지함</h3>
                        </v-card-title>
                        <v-simple-table>
                            <thead>
                                <tr>
                                    <th style="width: 25%">발신자</th>
                                    <th style="width: 55%">쪽지 내용</th>
                                    <th style="width: 20%">수신 시각</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in Msgs" :key="item.Msg_UserName">
                                    <td>{{item.Msg_UserName}}</td>
                                    <td>{{item.Msg_Text}}</td>
                                    <td>{{item.Msg_Time}}</td>
                                </tr>
                            </tbody>
                        </v-simple-table>
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
            drawer: null,
            Menuitems: [
                {title: '덕후 타임라인', url:'/lists'},
                {title: '덕후 핫이슈', url:'/issue'},
                {title: '덕후 핫플레이스', url:'/place'},
            ],
            Menuitems2: [
                {title: '내 프로필', url:'/profile'},
                {title: '친구 목록', url:'/scrap'},
                {title: '쪽지함', url:'/msgbox'},
                {title: '설정', url:'/setting'}
            ],
            Msgs: [
                {
                    Msg_UserName: "testuser1",
                    Msg_Text: "testuser1 유저가 보낸 메시지 내용이 들어갈 칸입니다 어쩌고 저쩌고 앗쌀라말라이꿈~",
                    Msg_Time: "2019-10-01"
                },
                {
                    Msg_UserName: "testuser1",
                    Msg_Text: "testuser1 유저가 보낸 메시지 내용이 들어갈 칸입니다 어쩌고 저쩌고 앗쌀라말라이꿈~",
                    Msg_Time: "2019-10-01"
                },
                {
                    Msg_UserName: "testuser1",
                    Msg_Text: "testuser1 유저가 보낸 메시지 내용이 들어갈 칸입니다 어쩌고 저쩌고 앗쌀라말라이꿈~",
                    Msg_Time: "2019-10-01"
                },
                {
                    Msg_UserName: "testuser1",
                    Msg_Text: "testuser1 유저가 보낸 메시지 내용이 들어갈 칸입니다 어쩌고 저쩌고 앗쌀라말라이꿈~",
                    Msg_Time: "2019-10-01"
                },
                {
                    Msg_UserName: "testuser1",
                    Msg_Text: "testuser1 유저가 보낸 메시지 내용이 들어갈 칸입니다 어쩌고 저쩌고 앗쌀라말라이꿈~",
                    Msg_Time: "2019-10-01"
                },
                {
                    Msg_UserName: "testuser1",
                    Msg_Text: "testuser1 유저가 보낸 메시지 내용이 들어갈 칸입니다 어쩌고 저쩌고 앗쌀라말라이꿈~",
                    Msg_Time: "2019-10-01"
                },
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