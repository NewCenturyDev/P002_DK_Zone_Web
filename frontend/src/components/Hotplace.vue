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
        <!-- 핫플레이스 본문 -->
        <v-container id="feeds">
            <v-layout wrap justify-center>
                <v-dialog v-model="betamodal" width="400">
                    <v-card>
                        <v-card-title>
                            <h4> 베타 버전 </h4>
                            </v-card-title>
                        <v-card-text>
                            본 기능은 전시장 운영회사(COEX, KINTEX 등) 사이트에서 기사나 포스트를 크롤링하고, 크롤링한 정보를 표시하게 설계되었습니다.
                            하지만, 해당 홈페이지의 정책상, 전시회 정보 크롤링은 차단되어 있어 기능의 컨셉을 나타내기 위해
                            직접 수작업으로 몇몇 전시회 정보를 복사해와서 테스트 데이터를 넣어 두었습니다.
                        </v-card-text>
                        <v-divider></v-divider>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="primary" text @click="betamodal = false">확인</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
                <v-flex xs12 sm5>
                    <v-card style="margin: 10px;">
                        <v-img src="map.PNG"></v-img>
                    </v-card>
                </v-flex>
                <v-flex xs12 sm5>
                    <v-card style="margin: 10px;">
                        <v-card-title>
                            <div>
                                <h3 style="width:100%;">덕후 핫플레이스 </h3>
                            </div>
                            <v-menu offset-y>
                                <template v-slot:activator="{ on }">
                                    <v-btn color="primary" text v-on="on">
                                    지역
                                    </v-btn>
                                </template>
                                <v-list>
                                    <v-list-item>
                                        <v-list-item-title>수도권</v-list-item-title>
                                    </v-list-item>
                                </v-list>
                            </v-menu>
                        </v-card-title>
                        
                        <v-tabs v-model="active" color="cyan" light>
                            <v-tab>강남 코엑스</v-tab>
                            <v-tab-item>
                                <v-list-item two-line>
                                    <v-list-item-content>
                                        <v-list-item-title>VR 엑스포</v-list-item-title>
                                        <v-list-item-subtitle>http://vrexpo.kr/</v-list-item-subtitle>
                                        <v-list-item-subtitle>VR EXPO 2019는 5G를 활용한 VR/AR 관련 제조, 국방, 의료, 교육, 건축, 플랫폼, 게임, 테마파크, 영상 등 전 산업분야가 함께 하는 국내 최대 VR/AR 전문 산업 전시회입니다.</v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>
                                <v-list-item two-line>
                                    <v-list-item-content>
                                        <v-list-item-title>2019 K-POP 굿즈 플리마켓</v-list-item-title>
                                        <v-list-item-subtitle>http://www.kpopmarket.co.kr/</v-list-item-subtitle>
                                        <v-list-item-subtitle>제1회를 맞이하는 "2019 K-POP 굿즈 플리마켓"은 국내 최대 규모의 K-Pop 굿즈 중심으로 열리는 플리마켓으로 각종 아이돌 굿즈와 애장품을 자유롭게 사고 팔고, 다양한 부대행사와 이벤트, 공연 등의 콘텐츠를 한곳에 모아놓은 아이돌 굿즈 공유의 장이자 축제입니다.</v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>
                                <v-list-item two-line>
                                    <v-list-item-content>
                                        <v-list-item-title>글로벌 게임 챌린지 2019</v-list-item-title>
                                        <v-list-item-subtitle>http://www.k-game.org/</v-list-item-subtitle>
                                        <v-list-item-subtitle>전국 게임관련 학과 학생들의 우수 아이디어 및 게임작품 한 자리에서 공동 발표</v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-tab-item>
                            <v-tab>양재 AT센터</v-tab>
                            <v-tab-item>
                                <v-list-item two-line>
                                    <v-list-item-content>
                                        <v-list-item-title>제 171회 서울 코믹월드</v-list-item-title>
                                        <v-list-item-subtitle>http://www.comicw.co.kr//</v-list-item-subtitle>
                                        <v-list-item-subtitle>코믹월드는 "아마추어 만화 종합 행사"입니다. 아마추어 만화가들이 자신의 작품을 소개하고 서로 교류할 뿐 아니라 만화인들간의 커뮤니케이션을 공유하는 장을 만드는 것을 목표로 합니다.</v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-tab-item>
                            <v-tab>대치 SETEC</v-tab>
                            <v-tab-item>
                                <v-list-item two-line>
                                    <v-list-item-content>
                                        <v-list-item-title>제 170회 서울 코믹월드</v-list-item-title>
                                        <v-list-item-subtitle>http://www.comicw.co.kr//</v-list-item-subtitle>
                                        <v-list-item-subtitle>코믹월드는 "아마추어 만화 종합 행사"입니다. 아마추어 만화가들이 자신의 작품을 소개하고 서로 교류할 뿐 아니라 만화인들간의 커뮤니케이션을 공유하는 장을 만드는 것을 목표로 합니다.</v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-tab-item>
                            <v-tab>마곡 컨벤션</v-tab>
                            <v-tab-item>
                                <v-list-item two-line>
                                    <v-list-item-content>
                                        <v-list-item-title>전시회 정보가 없습니다.</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-tab-item>
                            <v-tab>일산 KINTEX</v-tab>
                            <v-tab-item>
                                <v-list-item two-line>
                                    <v-list-item-content>
                                        <v-list-item-title>제 12회 서울모터쇼</v-list-item-title>
                                        <v-list-item-subtitle>http://www.motorshow.or.kr/main.do</v-list-item-subtitle>
                                        <v-list-item-subtitle>SustainableㆍConnectedㆍMobility(지속가능하고 지능화된 이동혁명)</v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-tab-item>
                            <v-tab>송도 컨벤시아</v-tab>
                            <v-tab-item>
                                <v-list-item two-line>
                                    <v-list-item-content>
                                        <v-list-item-title>전시회 정보가 없습니다.</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
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
                {title: '친구 목록', url:'/scrap'},
                {title: '쪽지함', url:'/msgbox'},
                {title: '설정', url:'/setting'}
            ],
            betamodal: true
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