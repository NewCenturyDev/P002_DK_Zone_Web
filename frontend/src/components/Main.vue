<template>
    <v-app>
        <nav>
            <v-toolbar color="cyan" light>
                <v-toolbar-title style="color: white; margin-left: 20px;">DK-Zone</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                    <v-btn icon><v-icon>search</v-icon></v-btn>
                    <v-btn icon><v-icon>person</v-icon></v-btn>
                    <v-btn icon><v-icon>exit_to_app</v-icon></v-btn>
                </v-toolbar-items>
            </v-toolbar>
        </nav>
        <v-container id="navigation">
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
                },
            ],
        }
    }
}
</script>

<style scoped>
</style>