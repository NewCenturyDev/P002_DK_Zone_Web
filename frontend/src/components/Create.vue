<template>
    <v-app>
        <nav>
            <v-toolbar color="cyan" light>
                <v-toolbar-title @click="gotoMain" style="color: white; margin-left: 20px; cursor: pointer;">DK-Zone</v-toolbar-title>
                <v-spacer></v-spacer>
            </v-toolbar>
        </nav>
        <v-container>
            <v-layout style="margin: 50px 5px" justify-center>
                <v-flex xs12 sm10 md8>
                    <v-card>
                        <v-card-title>
                            <div>
                                <h3 style="width:100%;">새 게시물 작성...</h3>
                            </div>
                        </v-card-title>
                        <v-tabs v-model="active" color="cyan" light>
                            <v-tab>
                                PhotoLog (사진)
                            </v-tab>
                            <v-tab-item>
                                <v-form style="margin: 0 20%;">
                                    <v-file-input label="사진 파일"></v-file-input>
                                    <v-text-field label="제목" v-model="feed.title" style="margin-top:-15px;"></v-text-field>
                                    <v-textarea filled label="내용" auto-grow=true; v-model="feed.text" style="margin-top:-15px;"></v-textarea>
                                    <v-text-field label="태그 (쉼표로 구분)" v-model="feed.tags" style="margin-top:-15px;"></v-text-field>
                                    <v-layout justify-center>
                                        <v-btn small outlined @click="gotoMain" style="width:10%; margin: 10px;">취소</v-btn>
                                        <v-btn small outlined @click="Create_photo" style="width:10%; margin: 10px;">작성</v-btn>
                                    </v-layout>
                                </v-form>
                            </v-tab-item>
                            <v-tab>
                                VideoLog (동영상)
                            </v-tab>
                            <v-tab-item>
                                <v-form style="margin: 0 20%;">
                                    <v-file-input label="동영상 파일"></v-file-input>
                                    <v-text-field label="제목" v-model="feed.title" style="margin-top:-15px;"></v-text-field>
                                    <v-textarea filled label="내용" auto-grow=true; v-model="feed.text" style="margin-top:-15px;"></v-textarea>
                                    <v-text-field label="태그 (쉼표로 구분)" v-model="feed.tags" style="margin-top:-15px;"></v-text-field>
                                    <v-layout justify-center>
                                        <v-btn small outlined @click="gotoMain" style="width:10%; margin: 10px;">취소</v-btn>
                                        <v-btn small outlined @click="Create_video" style="width:10%; margin: 10px;">작성</v-btn>
                                    </v-layout>
                                </v-form>
                            </v-tab-item>
                            <v-tab>
                                YoutubeLog (외부 동영상)
                            </v-tab>
                            <v-tab-item>
                                <v-form style="margin: 0 20%;">
                                    <v-text-field label="동영상 링크" v-model="feed.url"></v-text-field>
                                    <v-text-field label="제목" v-model="feed.title" style="margin-top:-15px;"></v-text-field>
                                    <v-textarea filled label="내용" auto-grow=true; v-model="feed.text" style="margin-top:-15px;"></v-textarea>
                                    <v-text-field label="태그 (쉼표로 구분)" v-model="feed.tags" style="margin-top:-15px;"></v-text-field>
                                    <v-layout justify-center>
                                        <v-btn small outlined @click="gotoMain" style="width:10%; margin: 10px;">취소</v-btn>
                                        <v-btn small outlined @click="Create_extvideo" style="width:10%; margin: 10px;">작성</v-btn>
                                    </v-layout>
                                </v-form>
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
            feed: {
                file: "",
                url: "",
                title: "",
                text: "",
                tags: "",
            }
        }
    },
    methods: {
        Create_photo: function () {

        },
        Create_video: function () {

        },
        Create_extvideo: function () {

        },
        gotoMain: function(){
            if(confirm("이 페이지를 떠나면 작성중인 게시물이 삭제됩니다. 정말 게시물 작성을 취소하시겠습니까?") == 1){
                this.$router.push('/lists');
            }
        },
        clear: function(){
            this.data.file = "";
            this.data.url = "";
            this.data.text = "";
            this.data.tags = "";
        }
    }
}
</script>

<style scoped>
</style>