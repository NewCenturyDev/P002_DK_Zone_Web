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
        <!-- 핫이슈 본문 -->
        <!-- 추후 백엔드 구축시 네이버 연예뉴스 탭과 몇몇 동호회, 서브컬쳐, 취미 커뮤니티에서 최신글/기사 약간을 크롤링하도록 할것.-->
        <v-container id="feeds">
            <v-layout wrap justify-center>
                <v-flex xs12 sm8>
                    <v-data-iterator :items="News" :rows-per-page-items="RowsPerPage" :pagination.sync="Pagination" content-tag="v-layout" row wrap>
                        <v-flex xs12 slot="item" slot-scope="props">
                            <v-card class="feed" style="margin: 15px;">
                                <v-card-title primary-title class="feed_title">
                                    <div>
                                        <h3 class="headline mb-0" style="width:100%;"> {{props.item.news_title}} </h3>
                                    </div>
                                </v-card-title>
                                <v-card-text class="feed_text">
                                    <v-layout>
                                        <v-flex xs12 sm4 style="margin-bottom: 25px">
                                            <v-img class="feed_image" style="width: 300px; height: 150px;" :src=props.item.news_image></v-img>
                                        </v-flex>
                                        <v-flex xs12 sm8 style="margin-bottom: 25px;">
                                            <div> {{props.item.news_text}} </div>
                                            <br/>
                                            <div style="float: left; font-size: 13px;"><a :href=props.item.news_source> {{props.item.news_source}} </a></div>
                                            <div style="float: right; font-size: 11px;"> {{props.item.news_timestamp}} </div>
                                        </v-flex>
                                    </v-layout>
                                </v-card-text>
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
            News: [
                {
                    news_image: "https://ssl.pstatic.net/mimgnews/image/382/2019/10/08/0000767173_001_20191008132418003.jpg?type=w540",
                    news_title: "‘녹두전’ 장동윤♥김소현, 밤낮 너무 다르다 (ft.티격태격)",
                    news_text: "장동윤과 김소현의 ‘단짠’ 오가는 극과 극 낮과 밤이 포착됐다. KBS 2TV 월화드라마 ‘조선로코-녹두전’(극본 임예진·백소연 연출 김동휘·강수연) 제작진은 8일 밤과 낮이 다른 두 얼굴의 녹두(장동윤 분)와 동주(김소현 분)의 스틸컷을 공개했다.",
                    news_source: "https://entertain.naver.com/read?oid=382&aid=0000767173",
                    news_timestamp: "2019-10-08"
                },
            ]
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
        gotoCreate: function(){
            this.$router.push('/create');
        },
        gotoSearch: function (){
            this.$router.push('/search');
        }
    }
}
</script>

<style scoped>
</style>