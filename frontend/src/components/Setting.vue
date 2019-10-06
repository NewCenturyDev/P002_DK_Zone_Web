<template>
    <v-app>
        <!-- 상단바 -->
        <nav>
            <v-toolbar color="cyan" light>
                <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
                <v-toolbar-title style="color: white; margin-left: 20px;">DK-Zone</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                    <v-btn icon><v-icon>search</v-icon></v-btn>
                    <v-btn icon><v-icon>exit_to_app</v-icon></v-btn>
                </v-toolbar-items>
            </v-toolbar>
        </nav>
        <!-- 좌측 탭 메뉴 -->
        <v-navigation-drawer v-model="drawer" absolute temporary>
            <v-list-item>
                <v-list-item-avatar>
                    <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                    <v-list-item-title> {{ Current_UserName }} </v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-list dense>
                <v-list-item v-for="item in Menuitems" :key="item.title" link>
                    <v-list-item-title>
                        <v-list-item-title> {{ item.title }} </v-list-item-title>
                    </v-list-item-title>
                </v-list-item>
            </v-list>
            <v-divider></v-divider>
            <v-list dense>
                <v-list-item v-for="item in Menuitems2" :key="item.title" link>
                    <v-list-item-title>
                        <v-list-item-title> {{ item.title }} </v-list-item-title>
                    </v-list-item-title>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <!-- 개인설정 본문 -->
        <v-container id="navigation">
            <v-layout wrap justify-center>
                <v-flex xs12 sm9 md6>
                    <!-- 개인설정 내용 -->
                    <v-card>
                        <v-tabs>
                            <v-tab>
                                정보수정
                            </v-tab>
                            <v-tab-item>
                                <v-form style="width: 50%; margin: 50px 25%">
                                    <v-text-field label="비밀번호" style="margin-top:-15px;"></v-text-field>
                                    <v-text-field label="비밀번호 확인" style="margin-top:-15px;"></v-text-field>
                                    <v-text-field label="성명" style="margin-top:-15px;"></v-text-field>
                                    <v-text-field label="닉네임" style="margin-top:-15px;"></v-text-field>
                                    <v-text-field label="이메일" style="margin-top:-15px;"></v-text-field>
                                    <v-text-field label="전화번호" style="margin-top:-15px;"></v-text-field>
                                    <v-btn large outlined style="width:40%; margin: 0 30%; margin-bottom: 50px;">정보수정</v-btn>
                                </v-form>
                            </v-tab-item>
                            <v-tab>
                                회원탈퇴
                            </v-tab>
                            <v-tab-item>
                                <v-form style="width: 50%; margin: 50px 25%">
                                    <div style="width: 100%; padding: 25px; border: 2px solid black; background-color: yellow;">
                                        <h5 style="text-align: center; color: red;">경고: 회원 탈퇴하면 사용자가 게시한 모든 게시물과 구독, 쪽지, 회원 정보가 DB에서 즉시 파기되며, 절대로 복구할 수 없게 됩니다.</h5>
                                    </div>
                                    <v-text-field label="비밀번호" style="margin-top: 15px;"></v-text-field>
                                    <v-btn large outlined style="width:40%; margin: 0 30%; margin-bottom: 50px;">회원탈퇴</v-btn>
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
            drawer: null,
            Menuitems: [
                {title: '덕후 타임라인'},
                {title: '덕후 핫이슈'},
                {title: '덕후 핫플레이스'},
            ],
            Menuitems2: [
                {title: '내 프로필'},
                {title: '구독 목록'},
                {title: '쪽지함'},
                {title: '설정'}
            ],
        }
    }
}
</script>

<style scoped>
</style>