<template>
  <footer>
    <p>&copy; All Rights Reserved by Marlon Oberberger</p>
  </footer>
</template>

<script>
export default {
  name: "FooterC"
}
</script>

<style scoped>
  footer {
    margin-top: 10px;
    background-color: rgba(30, 31, 36, 0.5);
    backdrop-filter: blur(20px);
    padding: 30px;
    text-align: center;
    bottom: 0;
  }

  p {
    font-family: SFPro, sans-serif;
    font-weight: bold;
  }
</style>