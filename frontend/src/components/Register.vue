<template>
    <v-app>
        <nav>
            <v-toolbar color="cyan" light>
                <v-toolbar-title style="color: white; margin-left: 20px;">DK-Zone</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon><v-icon>person_add</v-icon></v-btn>
                <v-btn icon><v-icon>exit_to_app</v-icon></v-btn>
            </v-toolbar>
        </nav>
        <v-container>
            <v-layout style="margin: 50px 5px" justify-center>
                <v-flex xs12 sm6 md4>
                    <v-card>
                        <v-card-title>
                            <div>
                                <h3 style="width:100%;">DK-Zone Register</h3>
                            </div>
                        </v-card-title>
                        <v-form style="margin: 0 20%;">
                            <v-text-field label="아이디"></v-text-field>
                            <v-text-field label="비밀번호" style="margin-top:-15px;"></v-text-field>
                            <v-text-field label="비밀번호 확인" style="margin-top:-15px;"></v-text-field>
                            <v-text-field label="성명" style="margin-top:-15px;"></v-text-field>
                            <v-text-field label="닉네임" style="margin-top:-15px;"></v-text-field>
                            <v-text-field label="이메일" style="margin-top:-15px;"></v-text-field>
                            <v-text-field label="전화번호" style="margin-top:-15px;"></v-text-field>
                            <v-btn large outlined style="width:60%; margin: 0 20%;">회원가입</v-btn>
                        </v-form>
                        <br/>
                        <br/>
                        <v-card-text>
                            <v-btn text small style="margin-right: 10px;">로그인</v-btn>
                            <v-btn text small style="margin-right: 10px;">ID/PW 찾기</v-btn>
                        </v-card-text>
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
        }
    }
}
</script>

<style scoped>
</style>