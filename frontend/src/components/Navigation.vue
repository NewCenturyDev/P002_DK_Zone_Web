<template>
    <div>
        <nav>
            <div id="logo"><img src="http://placehold.it/200x80/"></div>
            <div id="search">
                <input type="text" placeholder="검색">
            </div>
            <div id="logout">로그아웃</div>
            <div id="profile">프로필</div>
        </nav>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
nav{
    width: 100%;
    height: 80px;
    background-color: lightgray;
}
nav > div{
    height: 80px;
    float: left;
}
nav > #logo{
    width: 10%;
    height: 80px;
    margin-right: 25%;
}
nav > #search{
    width: 30%;
    margin-right: 25%;
}
nav > #search > input{
    width: 90%;
    height: 40px;
    margin: 20px 5%;
    border-bottom: 2px solid white;
}
/* 로그아웃과 프로필은 나중에 아이콘으로 대체 */
nav > #logout{
    width: 5%;
    text-align: center;
    line-height: 80px;
}
nav > #profile{
    width: 5%;
    text-align: center;
    line-height: 80px;
}
</style>