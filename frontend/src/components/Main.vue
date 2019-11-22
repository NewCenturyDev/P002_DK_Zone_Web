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
                    <v-data-iterator :items="Feeds" :rows-per-page-items="RowsPerPage" :pagination.sync="Pagination" no-data-text="본인 또는 친구가 올린 게시물이 없습니다. 게시물을 작성하거나 친구를 더 추가해 보세요." row wrap>
                        <v-flex xs12 slot="item" slot-scope="props">
                            <v-card class="feed" style="margin: 15px;">
                                <v-img :class="{ active: IsActive1(props.item.feed_type) }" style="width=500px; height=300px;" :src=props.item.feed_file></v-img>
                                <video :class="{ active: IsActive2(props.item.feed_type) }" controls width="100%" height="100%" :src=props.item.feed_file></video>
                                <v-card-title primary-title class="feed_title">
                                    <div>
                                        <h3 class="headline mb-0" style="width:100%;"> {{props.item.feed_title}} </h3>
                                    </div>
                                </v-card-title>
                                <v-card-text class="feed_text">
                                    <div> {{props.item.feed_text}} </div>
                                    <br/>
                                    <div style="float: left; font-size: 13px;"> {{props.item.feed_nick}} </div>
                                    <div style="float: right; font-size: 11px;"> {{props.item.feed_time}} </div>
                                </v-card-text>
                                <v-card-text class="feed_tags">
                                    <!-- 태그 5개 (v-for 태그로 반복자 처리해도 되나 검색 알고리즘 및 DB의 간소화를 위해 10개로 태그 갯수를 제한하였으므로 디버깅이 용이하도록 0~9 복붙 처리함) -->
                                    <v-btn small text disabled>{{props.item.feed_tag1}}</v-btn>
                                    <v-btn small text disabled>{{props.item.feed_tag2}}</v-btn>
                                    <v-btn small text disabled>{{props.item.feed_tag3}}</v-btn>
                                    <v-btn small text disabled>{{props.item.feed_tag4}}</v-btn>
                                    <v-btn small text disabled>{{props.item.feed_tag5}}</v-btn>
                                </v-card-text>
                                <v-card-actions>
                                    <v-btn icon @click="LikeFeed(props.item.feed_num);"><v-icon>thumb_up_alt</v-icon> {{props.item.feed_like}} </v-btn>
                                    <!-- <v-btn icon><v-icon>share</v-icon></v-btn> -->
                                    <v-btn icon :class="{ active: IsMyFeed(props.item.feed_nick) }" @click="ModifyFeedsLoad(props.item.feed_num)"><v-icon>edit</v-icon></v-btn>
                                    <v-dialog v-model="feedmodifymodal[props.item.feed_num]" width="400">
                                        <v-card>
                                            <v-card-title>
                                                <h4> 게시물 수정 </h4>
                                            </v-card-title>
                                            <v-card-text>
                                                사진이나 동영상을 수정하시려면 게시물을 삭제하시고 다시 작성하여 주십시오. 게시물 태그의 경우 기존 태그들이 전부 삭제되고 덮어쓰기 됩니다.
                                            </v-card-text>
                                            <v-form style="width: 350px; margin: 5px 25px;">
                                                <v-text-field label="제목" v-model="newFeed.title"></v-text-field>
                                                <v-textarea label="내용" auto-grow=true; v-model="newFeed.text" style="margin-top:-15px;"></v-textarea>
                                                <v-text-field label="태그 (쉼표로 구분 / 최대 5개)" v-model="newFeed.tag" style="margin-top:-15px;"></v-text-field>
                                            </v-form>
                                            <v-divider></v-divider>
                                            <v-card-actions>
                                                <v-spacer></v-spacer>
                                                <v-btn color="primary" text @click="ModifyFeeds(props.item.feed_num)">수정</v-btn>
                                                <v-btn color="primary" text @click="CloseModifyModal(props.item.feed_num)">취소</v-btn>
                                            </v-card-actions>
                                        </v-card>
                                    </v-dialog>
                                    
                                    <v-btn icon :class="{ active: IsMyFeed(props.item.feed_nick) }" @click.stop="$set(feedremovemodal, props.item.feed_num, true)"><v-icon>delete</v-icon></v-btn>
                                    <v-dialog v-model="feedremovemodal[props.item.feed_num]" width="400">
                                        <v-card>
                                            <v-card-title>
                                                <h4> 게시물 삭제 </h4>
                                            </v-card-title>
                                            <v-card-text>
                                                정말로 삭제하시겠습니까? 삭제한 게시물은 복구할 수 없습니다.
                                            </v-card-text>
                                            <v-divider></v-divider>
                                            <v-card-actions>
                                                <v-spacer></v-spacer>
                                                <v-btn color="primary" text @click="RemoveFeeds(props.item.feed_num)">삭제</v-btn>
                                                <v-btn color="primary" text @click.stop="$set(feedremovemodal, props.item.feed_num, false)">취소</v-btn>
                                            </v-card-actions>
                                        </v-card>
                                    </v-dialog>
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
            feedremovemodal: {},
            feedmodifymodal: {},
            newFeed: {
                title: "",
                text: "",
                tag: ""
            },
            myfeed: {},
            Feeds: [],
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
        gotoMain: function(){
            this.$router.push('/lists');
        },
        gotoCreate: function(){
            this.$router.push('/create');
        },
        gotoSearch: function (){
            this.$router.push('/search');
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
        LoadFeeds: function (){
            let self = this;
            this.$http.get('/feed/load')
            .then((res) => {
                if(res.data == null){
                    alert("DB 오류");
                    //self.Logout();
                    return;
                }
                else{
                    self.Feeds = res.data;
                }
            })
            .catch(function (err) {
                alert(err);
            });
        },
        LikeFeed: function(likethis){
            this.$http.post('/feed/like', {
                keyword: likethis
            })
            .then((res) => {
                alert(res.data.message);
                this.$router.go('/lists');
            })
            .catch(function (err) {
                alert(err);
            });
        },
        CloseModifyModal: function(modifythis) {
            this.newFeed.title = '';
            this.newFeed.text = '';
            this.newFeed.tag = '';
            this.feedmodifymodal[modifythis] = false;
        },
        ModifyFeedsLoad: function(modifythis){
            let self = this;
            this.$http.post('/feed/loadmodify', {
                keyword: modifythis
            })
            .then((res) => {
                if(res.data.success == 1){
                    self.newFeed.title = res.data.newtitle;
                    self.newFeed.text = res.data.newtext;
                    self.feedmodifymodal[modifythis] = true;
                }
                else{
                    alert(res.data.message);
                    this.$router.go('/lists');
                }
            })
            .catch(function (err) {
                alert(err);
            });
        },
        ModifyFeeds: function(removethis){
            let self = this;
            this.$http.post('/feed/modify', {
                keyword: removethis,
                newtitle: self.newFeed.title,
                newtext: self.newFeed.text,
                newtag: self.newFeed.tag
            })
            .then((res) => {
                if(res.data.success == 1){
                    self.newFeed.title = '';
                    self.newFeed.text = '';
                    self.newFeed.tag = '';
                    alert(res.data.message);
                    this.$router.go('/lists');
                }
                else{
                    alert(res.data.message);
                    this.$router.go('/lists');
                }
            })
            .catch(function (err) {
                alert(err);
            });
        },
        RemoveFeeds: function(removethis){
            this.$http.post('/feed/remove', {
                keyword: removethis
            })
            .then((res) => {
                if(res.data.success == 1){
                    alert(res.data.message);
                    this.$router.go('/lists');
                }
                else{
                    alert(res.data.message);
                    this.$router.go('/lists');
                }
            })
            .catch(function (err) {
                alert(err);
            });
        },
        IsActive1: function(type){
            if(type == 1){
                return false;
            }
            else{
                return true;
            }
        },
        IsActive2: function(type){
            if(type == 2 || type == 3){
                return false;
            }
            else{
                return true;
            }
        },
        IsMyFeed: function(nick){
            if(nick == this.Current_UserInfo.nick){
                return false;
            }
            else{
                return true;
            }
        }
    },
    beforeMount() {
        this.LoadFeeds();
        this.LoadProfile();
    },
    created() {
        this.CheckSession();
    }
}
</script>

<style scoped>
.active{
    display: none;
}
</style>