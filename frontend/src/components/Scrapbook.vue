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
        <!-- 친구목록 본문 -->
        <v-container id="feeds">
            <v-layout wrap justify-center>
                <v-flex xs12 sm9>
                    <!-- 친구 추가-->
                    <v-dialog v-model="addmodal" width="400">
                        <template v-slot:activator="{ on }">
                            <v-spacer></v-spacer>
                            <v-btn color="cyan" light v-on="on">친구 추가</v-btn>
                            <v-spacer></v-spacer>
                        </template>
                        <v-card>
                            <v-card-title>
                                친구 추가
                            </v-card-title>
                            <v-card-text>
                                E-mail 주소를 입력하여 친구를 검색할 수 있습니다.
                                <v-form>
                                    <v-text-field v-model="keyword" label="친구 E-mail"></v-text-field>
                                </v-form>
                            </v-card-text>
                            <v-divider></v-divider>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="primary" text @click="AddFriends">추가</v-btn>
                                <v-btn color="primary" text @click="addmodal = false">취소</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                    <!-- 친구목록 양식 (데이터 반복자 사용)-->
                    <v-data-iterator :items="Friends" :items-per-page.sync="itemsPerPage" no-data-text="친구가 없습니다. 친구를 추가해 보세요.">
                        <v-flex xs12 sm6 md4 slot="item" slot-scope="props">
                            <v-card class="feed" style="margin: 15px;">
                                <v-card-title primary-title class="feed_title">
                                    <div>
                                        <h3 class="headline mb-0" style="width:100%;"> {{props.item.friend_nick}} </h3>
                                    </div>
                                </v-card-title>
                                <v-flex xs12>
                                    <v-img :src=props.item.friend_photo></v-img>
                                </v-flex>
                                <v-card-text class="feed_text">
                                    <div> {{props.item.friend_bio}} </div>
                                </v-card-text>
                                <v-card-action>
                                    <!--메시지 보내기-->
                                    <v-btn text @click.stop="$set(msgsendmodal, props.item.friend_id, true)">쪽지 보내기</v-btn>
                                    <v-dialog v-model="msgsendmodal[props.item.friend_id]" width="400">
                                        <v-card>
                                        <v-card-title>
                                            <h4> 메시지 답장 </h4>
                                        <v-card-title>
                                        </v-card-title>
                                            <h6> To: {{props.item.friend_nick}} </h6>
                                        </v-card-title>
                                        <v-card-text>
                                            <v-form>
                                                <v-textarea label="메시지 내용" auto-grow=true; v-model="newMsg"></v-textarea>
                                            </v-form>
                                        </v-card-text>
                                        <v-divider></v-divider>
                                        <v-card-actions>
                                            <v-spacer></v-spacer>
                                            <v-btn color="primary" text @click="SendMsg(props.item.friend_id)">보내기</v-btn>
                                            <v-btn color="primary" text @click.stop="$set(msgsendmodal, props.item.friend_id, false)">취소</v-btn>
                                        </v-card-actions>
                                        </v-card>
                                    </v-dialog>
                                    <v-btn text @click="RemoveFriends(props.item.friend_nick)">친구 삭제</v-btn>
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
            itemsPerPage: 10000,
            addmodal: false,
            msgsendmodal: {},
            keyword: '',
            newMsg: '',
            Friends: []
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
        LoadFriends: function (){
            let self = this;
            this.$http.get('/friend/load')
            .then((res) => {
                if(res.data == null){
                    alert("DB 오류");
                    this.$router.push('/lists');
                    return;
                }
                else{
                    self.Friends = res.data;
                }
            })
            .catch(function (err) {
                alert(err);
            });
        },
        AddFriends: function(){
            this.$http.post('/friend/add', {
                keyword: this.keyword
            })
            .then((res) => {
                if(res.data.success == 1){
                    alert(res.data.message);
                    this.$router.go('/scrap');
                    return;
                }
                else{
                    alert(res.data.message);
                    this.$router.go('/scrap');
                }
            })
            .catch(function (err) {
                alert(err);
            });
        },
        RemoveFriends: function(removethis){
            this.$http.post('/friend/remove', {
                keyword: removethis
            })
            .then((res) => {
                if(res.data.success == 1){
                    alert(res.data.message);
                    this.$router.go('/scrap');
                    return;
                }
                else{
                    alert(res.data.message);
                    this.$router.go('/scrap');
                }
            })
            .catch(function (err) {
                alert(err);
            });
        },
        SendMsg: function (receiver){
            this.$http.post('/message/send', {
                res_id: receiver,
                text: this.newMsg
            })
            .then((res) => {
                if(res.data.success == 1){
                    alert(res.data.message);
                    this.$router.go('/msgbox');
                }
                else{
                    alert(res.data.message);
                    this.$router.go('/msgbox');
                }
            })
            .catch(function (err){
                alert(err);
            });
        }
    },
    beforeMount() {
        this.LoadFriends();
        this.LoadProfile();
    }
}
</script>

<style scoped>
</style>