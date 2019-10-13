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
        <!-- 스크랩북 본문 -->
        <v-container id="feeds">
            <v-layout wrap justify-center>
                <v-flex xs12 sm9 md6>
                    <!-- 스크랩북 양식 (데이터 반복자 사용) - 실제로는 백엔드에서 DB내용을 싹 읽어서 data() 양식안에 배열로 넣어주고 반복문 돌려서 프론트에 추가해주는 것으로 만들 예정-->
                    <v-data-iterator :items="Scraps" :rows-per-page-items="RowsPerPage" :pagination.sync="Pagination" content-tag="v-layout" row wrap>
                        <v-flex xs12 slot="item" slot-scope="props">
                            <v-card class="feed" style="margin: 15px;">
                                <v-card-title primary-title class="feed_title">
                                    <div>
                                        <h3 class="headline mb-0" style="width:100%;"> {{props.item.scrap_UserId}} </h3>
                                    </div>
                                </v-card-title>
                                <v-card-text class="feed_text">
                                    <v-list-item-avatar>
                                        <v-img :src=props.item.scrap_Profile_img></v-img>
                                    </v-list-item-avatar>
                                    <div> {{props.item.scrap_UserBio}} </div>
                                </v-card-text>
                                <v-card-action>
                                    <v-btn text>방문하기</v-btn>
                                    <v-btn text>스크랩 해제</v-btn>
                                </v-card-action>
                            </v-card>
                        </v-flex>
                    </v-data-iterator>
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
                {title: '스크랩 북', url:'/scrap'},
                {title: '쪽지함', url:'/msgbox'},
                {title: '설정', url:'/setting'}
            ],
            rowsPerPageItems: [1],
            pagination: {
                rowsPerPage: 1
            },
            Scraps: [
                {
                    scrap_Profile_img: "https://randomuser.me/api/portraits/men/78.jpg",
                    scrap_UserId: "testuser1",
                    scrap_UserBio: "testuser1 유저 소개가 들어갈 칸입니다 어쩌고 저쩌고 앗쌀라말라이꿈~",
                },
                {
                    scrap_Profile_img: "https://randomuser.me/api/portraits/men/78.jpg",
                    scrap_UserId: "testuser2",
                    scrap_UserBio: "testuser2 유저 소개가 들어갈 칸입니다 어쩌고 저쩌고 앗쌀라말라이꿈~",
                }
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