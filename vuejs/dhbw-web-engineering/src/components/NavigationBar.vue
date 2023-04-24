<template>
    <nav>
        <div id="logo"></div>
        <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">About Us</a></li>
        </ul>
    </nav>
</template>

<script>
export default {
    name: "NavigationBar"
}
</script>

<style scoped>

#logo {
    height: 30px;
    width: 30px;
    background-color: #fff;
    -webkit-mask: url(../assets/logo.svg) no-repeat center;
    mask: url(../assets/logo.svg) no-repeat center;
}

nav {
    position: fixed;
    z-index: 100;
    background-color: var(--color-background-mute);
    padding: 10px 40px;
    width: 100%;

    display:flex;
    justify-content: space-between;
    align-items: center;
}

nav ul {
    list-style-type: none;
}

nav ul li {
    display: inline-block;
    padding: 0 20px;
}

nav ul li a {
    text-decoration: none;
    color: #989898;
    font-size: 15px;
    font-weight: bold;
    transition-duration: 400ms;
    background: linear-gradient(90deg, #ffffff 0%, #ffffff 45%, #00ACF4 55%, #FF0B7D 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-position-x: 0;
    transition: background-position 400ms;
    background-size: 300% 100%;
}

nav ul li a:hover {
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-position-x: 100%;
}

nav ul li a:hover {
    color: #ffffff;
}
</style>