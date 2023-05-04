<template>
  <div class="content">
    <h1>404</h1>
    <h1>404</h1>
  </div>
</template>

<script>
export default {
  name: "404R"
}
</script>

<style scoped>
div {
  height: 100vh;
  width: 100vw;
  position: relative;
}
  h1 {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 1500%;
    font-family: SFPro, sans-serif;
  }

body {
  display: flex;
  background: #000;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
}

.content h1 {
  color: #fff;
  position: absolute;
  transform: translate(-50%, -50%);
}

.content h1:nth-child(1) {
  color: transparent;
  -webkit-text-stroke: 2px #03a9f4;
}

.content h1:nth-child(2) {
  color: #03a9f4;
  animation: animate 4s ease-in-out infinite;
}

@keyframes animate {
  0%,
  100% {
    clip-path: polygon(
        0% 45%,
        16% 44%,
        33% 50%,
        54% 60%,
        70% 61%,
        84% 59%,
        100% 52%,
        100% 100%,
        0% 100%
    );
  }

  50% {
    clip-path: polygon(
        0% 60%,
        15% 65%,
        34% 66%,
        51% 62%,
        67% 50%,
        84% 45%,
        100% 46%,
        100% 100%,
        0% 100%
    );
  }
}
</style>