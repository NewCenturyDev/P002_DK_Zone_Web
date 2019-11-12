<template>
    <v-app>
        <!-- 상단바 -->
        <nav>
            <v-toolbar color="cyan" light>
                <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
                <v-toolbar-title @click="gotoMain" style="color: white; margin-left: 20px; cursor: pointer;">DK-Zone</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                    <v-btn icon @click="gotoCreate"><v-icon>create</v-icon></v-btn>
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
        <!-- 피드 본문 -->
        <v-container id="feeds">
            <v-layout wrap justify-center>
                <v-flex xs12 sm9 md6>
                    <!-- 피드 양식 (데이터 반복자 사용) - 실제로는 백엔드에서 DB내용을 싹 읽어서 data() 양식안에 배열로 넣어주고 반복문 돌려서 프론트에 추가해주는 것으로 만들 예정-->
                    <v-data-iterator :items="Feeds" :rows-per-page-items="RowsPerPage" :pagination.sync="Pagination" content-tag="v-layout" row wrap>
                        <v-flex xs12 slot="item" slot-scope="props">
                            <v-card class="feed" style="margin: 15px;">
                                <v-img class="feed_image" :src=props.item.feed_image></v-img>
                                <v-card-title primary-title class="feed_title">
                                    <div>
                                        <h3 class="headline mb-0" style="width:100%;"> {{props.item.feed_title}} </h3>
                                    </div>
                                </v-card-title>
                                <v-card-text class="feed_text">
                                    <div> {{props.item.feed_text}} </div>
                                    <br/>
                                    <div style="float: left; font-size: 13px;"> {{props.item.feed_user_id}} </div>
                                    <div style="float: right; font-size: 11px;"> {{props.item.feed_timestamp}} </div>
                                </v-card-text>
                                <v-card-text class="feed_tags">
                                    <v-btn small text disabled>{{props.item.feed_tags[0]}}</v-btn>
                                    <v-btn small text disabled>{{props.item.feed_tags[1]}}</v-btn>
                                    <v-btn small text disabled>{{props.item.feed_tags[2]}}</v-btn>
                                    <v-btn small text disabled>{{props.item.feed_tags[3]}}</v-btn>
                                    <v-btn small text disabled>{{props.item.feed_tags[4]}}</v-btn>
                                    <v-btn small text disabled>{{props.item.feed_tags[5]}}</v-btn>
                                    <v-btn small text disabled>{{props.item.feed_tags[6]}}</v-btn>
                                    <v-btn small text disabled>{{props.item.feed_tags[7]}}</v-btn>
                                    <v-btn small text disabled>{{props.item.feed_tags[8]}}</v-btn>
                                    <v-btn small text disabled>{{props.item.feed_tags[9]}}</v-btn>
                                </v-card-text>
                                <v-card-actions>
                                    <v-btn icon><v-icon>thumb_up_alt</v-icon> {{props.item.feed_likes}} </v-btn>
                                    <v-btn icon><v-icon>share</v-icon></v-btn>
                                </v-card-actions>
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
            rowsPerPageItems: [1],
            pagination: {
                rowsPerPage: 1
            },
            Feeds: [
                {
                    feed_profile_img: "http://placehold.it/30x30",
                    feed_image: "http://placehold.it/500x300",
                    feed_title: "피드1 제목",
                    feed_text: "피드의 내용(텍스트)가 들어갈 자리입니다. Lorem ipsum dolor sit amet",
                    feed_likes: 3,
                    feed_tags: ["#굿즈","#마블","#카카오프렌즈","#악세사리"],
                    feed_user_id: "testuser1",
                    feed_timestamp: "2018-01-02"
                },
                {
                    feed_profile_img: "http://placehold.it/30x30",
                    feed_image: "http://placehold.it/500x300",
                    feed_title: "피드2 제목",
                    feed_text: "피드의 내용(텍스트)가 들어갈 자리입니다. Lorem ipsum dolor sit amet",
                    feed_likes: 8,
                    feed_tags: ["#테스트","#과연이거만들수있을까"],
                    feed_user_id: "testuser2",
                    feed_timestamp: "2019-08-02"
                },
                {
                    feed_profile_img: "http://placehold.it/30x30",
                    feed_image: "http://placehold.it/500x300",
                    feed_title: "피드3 제목",
                    feed_text: "피드의 내용(텍스트)가 들어갈 자리입니다. Lorem ipsum dolor sit amet",
                    feed_likes: 22,
                    feed_tags: ["#테스트2","#과연이거만들수있을까22","#콩진호"],
                    feed_user_id: "testuser3",
                    feed_timestamp: "2019-09-20"
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
    }
}
</script>

<style scoped>
</style>