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
            <v-layout style="margin: 20px" justify-center>
                <v-flex xs12 sm9>
                    <v-card>
                        <v-img src="http://placehold.it/2000x500"></v-img>
                    </v-card>
                </v-flex>
            </v-layout>
            <v-layout wrap justify-center>
                <v-flex xs12 sm3>
                    <v-card style="margin: 15px">
                        <v-img src="http://placehold.it/600x250"></v-img>
                        <v-card-title primary-title>{{hot_topic[0]}}</v-card-title>
                        <v-card-text>{{hot_topic_text[0]}}</v-card-text>
                    </v-card>
                </v-flex>
                <v-flex xs12 sm3>
                    <v-card style="margin: 15px">
                        <v-img src="http://placehold.it/600x250"></v-img>
                        <v-card-title primary-title>{{hot_topic[1]}}</v-card-title>
                        <v-card-text>{{hot_topic_text[1]}}</v-card-text>
                    </v-card>
                </v-flex>
                <v-flex xs12 sm3>
                    <v-card style="margin: 15px">
                        <v-img src="http://placehold.it/600x250"></v-img>
                        <v-card-title primary-title>{{hot_topic[2]}}</v-card-title>
                        <v-card-text>{{hot_topic_text[2]}}</v-card-text>
                    </v-card>
                </v-flex>
            </v-layout>
            <v-layout wrap justify-center>
                <v-flex xs12 sm3>
                    <v-card style="margin: 15px">
                        <v-img src="http://placehold.it/600x250"></v-img>
                        <v-card-title primary-title>Service Promotion 1</v-card-title>
                        <v-card-text>사용자들과 덕후존을 공유해 보세요!</v-card-text>
                    </v-card>
                </v-flex>
                <v-flex xs12 sm3>
                    <v-card style="margin: 15px">
                        <v-img src="http://placehold.it/600x250"></v-img>
                        <v-card-title primary-title>Service Promotion 2</v-card-title>
                        <v-card-text>사용자들과 덕후존을 공유해 보세요!</v-card-text>
                    </v-card>
                </v-flex>
                <v-flex xs12 sm3>
                    <v-card style="margin: 15px">
                        <v-img src="http://placehold.it/600x250"></v-img>
                        <v-card-title primary-title>Service Promotion 3</v-card-title>
                        <v-card-text>사용자들과 덕후존을 공유해 보세요!</v-card-text>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
        <v-footer>
            <v-container>
                <v-layout>
                    <v-flex xs12 justify-center>
                        덕후존 ver 0.0.1.2 | All-rights-reserved - HyperSoft.co.ltd - Dev. HyperTech99
                    </v-flex>
                </v-layout>
            </v-container>
        </v-footer>
    </v-app>
</template>

<script>
export default {
    data(){
        return{
            hot_topic:["Hot Topic 1","Hot Topic 2","Hot Topic 3"],
            hot_topic_text:["이것이 나의 덕후존이다!","마블 히어로즈 총집합!","BTS 컬렉션!"]
        }
    }
}
</script>

<style scoped>
</style>