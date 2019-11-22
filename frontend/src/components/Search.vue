<template>
    <v-app>
        <!-- 상단바 -->
        <nav>
            <v-toolbar color="cyan" light>
                <v-toolbar-title @click="gotoMain" style="color: white; margin-left: 20px; cursor: pointer;">DK-Zone</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items style="width: 350px;">
                    <v-form style="width: 350px; margin-top: 15px;">
                        <v-text-field v-model="Keyword" light color="white" style="width: 300px; float: left;" placeholder="검색"></v-text-field>
                        <v-btn icon @click="SearchFeed" style="width: 50px; float:left;"><v-icon>search</v-icon></v-btn>
                    </v-form>
                </v-toolbar-items>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                    <v-btn icon @click="Logout"><v-icon>exit_to_app</v-icon></v-btn>
                </v-toolbar-items>
            </v-toolbar>
        </nav>
        <!-- 검색결과 -->
        <v-container id="feeds">
            <v-layout wrap justify-center>
                <v-flex xs12 style="text-align: center;">
                    <h3> "{{Keyword}}" 로 검색한 검색 결과입니다. </h3>
                </v-flex>
            </v-layout>
            <v-layout wrap justify-center>
                <v-flex xs12 sm9 md6>
                    <!-- 피드 양식 (데이터 반복자 사용) - 실제로는 백엔드에서 DB내용을 싹 읽어서 data() 양식안에 배열로 넣어주고 반복문 돌려서 프론트에 추가해주는 것으로 만들 예정-->
                    <v-data-iterator :items="Feeds" :rows-per-page-items="RowsPerPage" :pagination.sync="Pagination" no-data-text="검색창에 키워드를 입력하고 검색 버튼을 눌러 검색하세요" row wrap>
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
            Keyword: '',
            rowsPerPageItems: [1],
            pagination: {
                rowsPerPage: 1
            },
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
        SearchFeed: function(){
            let self = this;
            this.$http.post('/feed/searchfeed', {
                keyword: self.Keyword
            })
            .then((res) => {
                if(res.data == null){
                    if(self.Keyword == ''){
                        alert('검색어를 입력해주세요!');
                    }
                    else{
                        alert('DB 오류');
                    }
                    this.$router.go('/search');
                }
                else{
                    self.Feeds = res.data;
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
        }
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