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
                    <v-img :src=Current_UserInfo.photo></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                    <v-list-item-title> {{ Current_UserInfo.nick }} </v-list-item-title>
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
                    <v-dialog v-model="betamodal" width="400">
                        <v-card>
                            <v-card-title>
                                <h4> 베타 버전 </h4>
                                </v-card-title>
                            <v-card-text>
                                본 기능은 네이버 뉴스 및 몇몇 포털 사이트에서 기사나 포스트를 크롤링하고, 크롤링한 정보를 표시하게 설계되었습니다.
                                하지만, 네이버 및 각종 포털사이트의 정책상, 직접적인 뉴스기사, 포스트 크롤링은 차단되어 있으며, 네이버와의 약정을 통해
                                네이버의 크롤링 API를 통해서 가져오게 되어 있습니다. 허나 해당 약정 및 API는 유료로 제공되어 기능의 컨셉을 나타내기 위해
                                직접 수작업으로 몇몇 뉴스기사 정보를 복사해와서 테스트 데이터를 넣어 두었습니다.
                            </v-card-text>
                            <v-divider></v-divider>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="primary" text @click="betamodal = false">확인</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
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
                {title: '친구 목록', url:'/scrap'},
                {title: '쪽지함', url:'/msgbox'},
                {title: '설정', url:'/setting'}
            ],
            betamodal: true,
            rowsPerPageItems: [1],
            pagination: {
                rowsPerPage: 1
            },
            News: [
                {
                    news_image: "https://imgnews.pstatic.net/image/003/2019/11/22/NISI20191020_0000414509_web_20191020082312_20191122160814766.jpg?type=w647",
                    news_title: "갤럭시폴드 vs 메이트X, 첫 대결 '무승부'…1분도 안돼 매진",
                    news_text: "삼성전자-화웨이, 22일 오전 폴더블폰 동시 판매해 모두 '완판',판매물량 공개하지 않아 승패 가리기 어려워,마케팅 효과 위해 물량 소량 풀고 매진 유도하는 것 아니냐는 분석도",
                    news_source: "https://news.naver.com/main/read.nhn?mode=LSD&mid=shm&sid1=105&oid=003&aid=0009571556",
                    news_timestamp: "2019-11-22"
                },
                {
                    news_image: "https://imgnews.pstatic.net/image/003/2019/11/22/NISI20191122_0000434503_web_20191122174656_20191122181010433.jpg?type=w647",
                    news_title: "네오위즈, PC 패키지 게임 '스컬' 퍼블리싱 계약 체결",
                    news_text: "로그라이트 장르의 2D 플랫포머 액션 게임,2020년 1분기 내 스팀 출시 예정,이후 다양한 콘솔 플랫폼으로 선보일 계획",
                    news_source: "https://news.naver.com/main/read.nhn?mode=LSD&mid=shm&sid1=105&oid=003&aid=0009571825",
                    news_timestamp: "2019-11-22"
                },
                {
                    news_image: "http://image.itdonga.com/files/2019/11/15/IMG_6227-1.jpg",
                    news_title: "[지스타 2019] 게임에 관련된 다양한 볼거리도 풍성.. 이번 주말 지스타 어때요?",
                    news_text: "[IT동아 남시현 기자] 한국게임산업협회가 주최하고, 지스타 조직위원회 및 부산정보산업진흥원이 주관하는 지스타 2019가 부산 해운대 벡스코(BEXCO)에서 개최되고 있다. 올해 지스타는 개막 첫날에만 4만 2천 여명이 몰려 전년보다 2.1% 이상 더 많은 방문자 수를 기록했고, 11월 15일인 오늘을 포함해 17일까지 개최될 예정이다. 입장 시간은 오전 10시부터 오후 6시 30분 사이다.",
                    news_source: "http://it.donga.com/29739/",
                    news_timestamp: "2019-11-15"
                },
            ]
        }
    },
    methods: {
        CheckSession: function () {
            this.$http.get('/users/check')
            .then((res) => {
                if(res.data.islogin != true){
                    alert("로그인한 사용자만 이용할 수 있는 기능입니다.");
                    this.$router.push('/');
                }
            })
            .catch(function (err) {
                alert(err);
            })
        },
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
        LoadProfile: function () {
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
        gotoMain: function(){
            this.$router.push('/lists');
        },
        gotoCreate: function(){
            this.$router.push('/create');
        },
        gotoSearch: function (){
            this.$router.push('/search');
        }
    },
    beforeMount() {
        this.LoadProfile();
    },
    created() {
        this.CheckSession();
    }
}
</script>

<style scoped>
</style>