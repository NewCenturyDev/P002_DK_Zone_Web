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
                <v-flex xs12 sm10>
                    <v-card>
                        <v-card-title>
                            <div>
                                <h3 style="width:100%;">새 게시물 작성...</h3>
                            </div>
                        </v-card-title>
                        <v-form style="margin: 0 20%;">
                            <v-text-field label="제목" v-model="feed.title"></v-text-field>
                            <v-textarea label="내용" auto-grow=true; v-model="feed.text" style="margin-top:-15px;"></v-textarea>
                            <v-text-field label="태그 (쉼표로 구분 / 최대 5개)" v-model="feed.tag" style="margin-top:-15px;"></v-text-field>
                            [Beta - Version] 사진 및 동영상, 텍스트 게시물 작성 기능만 지원합니다.
                            <v-layout justify-center wrap>
                                <v-btn small outlined @click="gotoMain" style="width:180px; margin: 10px;">게시물 작성 취소</v-btn>
                                <v-btn small outlined @click="photofilemodal = true" style="width:180px; margin: 10px;">사진 첨부 후 작성</v-btn>
                                <v-btn small outlined @click="videofilemodal = true" style="width:180px; margin: 10px;">동영상 첨부 후 작성</v-btn>
                                <v-btn small outlined disabled style="width:180px; margin: 10px;">외부파일 첨부 후 작성</v-btn>
                                <v-btn small outlined @click="Create" style="width:180px; margin: 10px;">텍스트만 작성</v-btn>
                                <v-dialog v-model="photofilemodal" width="400">
                                        <v-card>
                                        <v-card-title>
                                            <h4> 사진 첨부 </h4>
                                        </v-card-title>
                                        <v-card-text>
                                            파일 첨부는 동영상, 사진 포함 한 개만 가능합니다. (Beta - Version)
                                            <v-file-input label="사진 파일" v-model="files" show-size accept="image/*"></v-file-input>
                                        </v-card-text>
                                        <v-divider></v-divider>
                                        <v-card-actions>
                                            <v-spacer></v-spacer>
                                            <v-btn color="primary" text @click="FileUpload(1)">업로드</v-btn>
                                            <v-btn color="primary" text @click="photofilemodal = false">취소</v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-dialog>
                                <v-dialog v-model="videofilemodal" width="400">
                                        <v-card>
                                        <v-card-title>
                                            <h4> 동영상 첨부 </h4>
                                        </v-card-title>
                                        <v-card-text>
                                            파일 첨부는 동영상, 사진 포함 한 개만 가능합니다. (Beta - Version)
                                            <v-file-input label="동영상 파일" v-model="files" show-size accept="video/*"></v-file-input>
                                        </v-card-text>
                                        <v-divider></v-divider>
                                        <v-card-actions>
                                            <v-spacer></v-spacer>
                                            <v-btn color="primary" text @click="FileUpload(2)">업로드</v-btn>
                                            <v-btn color="primary" text @click="videofilemodal = false">취소</v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-dialog>
                            </v-layout>
                        </v-form>
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
                url: "",
                title: "",
                text: "",
                tag: "",
            },
            files: null,
            photofilemodal: false,
            videofilemodal: false,
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
        gotoMain: function(){
            if(confirm("이 페이지를 떠나면 작성중인 게시물이 삭제됩니다. 정말 게시물 작성을 취소하시겠습니까?") == 1){
                this.$router.push('/lists');
            }
        },
        FileUpload: function(type) {
            let self = this;
            let filetype = type;
            let formData = new FormData();
            formData.append("files", this.files);
            this.$http.post("/feed/uploadfile", formData)
            .then((res) => {
                if(res.data.success == 1){
                    self.$http.post('/feed/write', {
                        url: res.data.route,
                        title: self.feed.title,
                        text: self.feed.text,
                        tag: self.feed.tag,
                        type: filetype
                    })
                    .then((res) => {
                        if(res.data.success == 1){
                            alert(res.data.message);
                            this.$router.push('/lists');
                        }
                        else{
                            alert(res.data.message);
                            self.files = null;
                        }
                    })
                }
                else{
                    alert(res.data.message);
                    self.files = null;
                }
            })
            .catch(function (err) {
                alert(err);
            });
        },
        Create: function () {
            let self = this;
            this.$http.post('/feed/write', {
                title: this.feed.title,
                text: this.feed.text,
                tag: this.feed.tag,
                type: 0
            })
            .then((res) => {
                if(res.data.success == 1){
                    alert(res.data.message);
                    this.$router.push('/lists');
                }
                else{
                    alert(res.data.message);
                    self.files = null;
                }
            })
            .catch(function (err){
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
</style>