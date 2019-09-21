<template>
    <v-app>
        <nav>
            <v-toolbar color="cyan" light>
                <v-toolbar-title style="color: white; margin-left: 20px;">DK-Zone</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                    <v-btn icon><v-icon>search</v-icon></v-btn>
                    <v-btn icon><v-icon>person</v-icon></v-btn>
                    <v-btn icon><v-icon>double_arrow</v-icon></v-btn>
                </v-toolbar-items>
            </v-toolbar>
        </nav>
        <v-container id="navigation">
            <v-layout row>
                <v-flex xs12 sm6 md4 lg4>
                    <!-- 피드 양식 (피드1로 구현) - 실제로는 백엔드에서 DB내용을 싹 읽어서 data() 양식안에 배열로 넣어주고 반복문 돌려서 프론트에 추가해주는 것으로 만들 예정-->
                    <v-card class="feed" style="margin: 15px;">
                        <v-img class="feed_image" :src=feed_image[0]></v-img>
                        <v-card-title primary-title class="feed_title">
                            <div>
                                <h3 class="headline mb-0" style="width:100%;"> {{feed_title[0]}} </h3>
                            </div>
                        </v-card-title>
                        <v-card-text class="feed_text">
                            <div> {{feed_text[0]}} </div>
                        </v-card-text>
                        <v-card-text class="feed_tags">
                            <v-btn small disabled style="margin: 2px;">{{feed_tags[0][0]}}</v-btn>
                            <v-btn small disabled style="margin: 2px;">{{feed_tags[0][1]}}</v-btn>
                            <v-btn small disabled style="margin: 2px;">{{feed_tags[0][2]}}</v-btn>
                            <v-btn small disabled style="margin: 2px;">{{feed_tags[0][3]}}</v-btn>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn icon><v-icon>thumb_up_alt</v-icon> {{feed_likes[0]}} </v-btn>
                            <v-btn icon><v-icon>share</v-icon></v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>
                <v-flex xs12 sm6 md4 lg4>
                    <!-- 피드 양식 (피드2로 구현) - 실제로는 백엔드에서 DB내용을 싹 읽어서 data() 양식안에 배열로 넣어주고 반복문 돌려서 프론트에 추가해주는 것으로 만들 예정-->
                    <v-card class="feed" style="margin: 15px;">
                        <v-img class="feed_image" :src=feed_image[1]></v-img>
                        <v-card-title primary-title class="feed_title">
                            <div>
                                <h3 class="headline mb-0" style="width:100%;"> {{feed_title[1]}} </h3>
                            </div>
                        </v-card-title>
                        <v-card-text class="feed_text">
                            <div> {{feed_text[0]}} </div>
                        </v-card-text>
                        <v-card-text class="feed_tags">
                            <v-btn small disabled style="margin: 2px;">{{feed_tags[1][0]}}</v-btn>
                            <v-btn small disabled style="margin: 2px;">{{feed_tags[1][1]}}</v-btn>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn icon><v-icon>thumb_up_alt</v-icon> {{feed_likes[1]}} </v-btn>
                            <v-btn icon><v-icon>share</v-icon></v-btn>
                        </v-card-actions>
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
            feed_image: ["http://placehold.it/500x300/","http://placehold.it/500x300/"],
            feed_title: ["피드1 제목","피드2 제목"],
            feed_text: ["피드의 내용(텍스트)가 들어갈 자리입니다. Lorem ipsum dolor sit amet","피드의 내용(텍스트)가 들어갈 자리입니다. Lorem ipsum dolor sit amet"],
            feed_likes: [3,8],
            feed_tags: [["#굿즈","#마블","#카카오프렌즈","#악세사리"],["#테스트","#과연이거만들수있을까"]]
        }
    }
}
</script>

<style scoped>
</style>