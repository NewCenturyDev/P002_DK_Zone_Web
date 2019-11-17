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
        <!-- 쪽지함 본문 -->
        <v-container id="feeds">
            <v-layout wrap justify-center>
                <v-flex xs12 sm6 sytle="margin: 20px;">
                    <v-card>
                        <v-card-title>
                            <h3>쪽지함</h3>
                        </v-card-title>
                        <v-simple-table>
                            <thead>
                                <tr>
                                    <th style="width: 5%">no.</th>
                                    <th style="width: 40%">발신자</th>
                                    <th style="width: 40%">수신 시각</th>
                                    <th style="width: 7.5%"></th>
                                    <th style="width: 7.5%"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in Msgs" :key="item.msg_num">
                                    <td>{{item.msg_num}}</td>
                                    <td>{{item.msg_nick}}</td>
                                    <td>{{item.msg_time}}</td>
                                    <td>
                                        <v-btn color="primary" text @click.stop="$set(msgmodal, item.msg_num, true)">읽기</v-btn>
                                        <!--메시지 상세 내용-->
                                        <v-dialog v-model="msgmodal[item.msg_num]" width="400">
                                            <v-card>
                                                <v-card-title>
                                                    <h4> From: {{item.msg_nick}} </h4>
                                                <v-card-title>
                                                </v-card-title>
                                                    <h6> {{item.msg_time}}</h6>
                                                </v-card-title>
                                                <v-card-text>
                                                    {{item.msg_text}}
                                                </v-card-text>
                                                <v-divider></v-divider>
                                                <v-card-actions>
                                                    <v-spacer></v-spacer>
                                                    <!--메시지 답장-->
                                                    <v-btn color="primary" text @click.stop="$set(msgsendmodal, item.msg_num, true)">답장</v-btn>
                                                    <v-dialog v-model="msgsendmodal[item.msg_num]" width="400">
                                                        <v-card>
                                                        <v-card-title>
                                                            <h4> 메시지 답장 </h4>
                                                        <v-card-title>
                                                        </v-card-title>
                                                            <h6> To: {{item.msg_nick}} </h6>
                                                        </v-card-title>
                                                        <v-card-text>
                                                            <v-form>
                                                                <v-textarea label="메시지 내용" auto-grow=true; v-model="newMsg"></v-textarea>
                                                            </v-form>
                                                        </v-card-text>
                                                        <v-divider></v-divider>
                                                        <v-card-actions>
                                                            <v-spacer></v-spacer>
                                                            <v-btn color="primary" text @click="SendMsg(item.msg_id)">보내기</v-btn>
                                                            <v-btn color="primary" text @click.stop="$set(msgsendmodal, item.msg_num, false)">취소</v-btn>
                                                        </v-card-actions>
                                                        </v-card>
                                                    </v-dialog>
                                                    <v-btn color="primary" text @click.stop="$set(msgmodal, item.msg_num, false)">닫기</v-btn>
                                                </v-card-actions>
                                            </v-card>
                                        </v-dialog>
                                    </td>
                                    <td><v-btn color="primary" text @click="RemoveMsg(item.msg_num)">삭제</v-btn></td>
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
            msgmodal: {},
            msgsendmodal: {},
            newMsg: '',
            Msgs: []
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
        LoadMsgs: function (){
            let self = this;
            this.$http.get('/message/load')
            .then((res) => {
                if(res.data == null){
                    alert("DB 오류");
                    this.$router.push('/lists');
                    return;
                }
                else{
                    self.Msgs = res.data;
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
        },
        RemoveMsg: function (removethis){
            this.$http.post('/message/remove', {
                keyword: removethis
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
            .catch(function (err) {
                alert(err);
            });
        }
    },
    beforeMount() {
        this.LoadMsgs();
        this.LoadProfile();
    },
    created() {
        this.CheckSession();
    }
}
</script>

<style scoped>
</style>