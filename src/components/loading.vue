<template>
  <div class="box_bgc">
    <div class="container">
      <span>加载中...</span>
      <div class="circle">
        <div class="ring"></div>
      </div>
    </div>
  </div>
</template>

<script >
export default {
  name: "loading",
};
</script>

<style lang='scss'>
.box_bgc {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1111111111;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000;
}
.container {
  position: relative;
  height: 300px;
  width: 500px;
  -webkit-box-reflect: below 1px linear-gradient(transparent, rgb(7, 15, 26));
}

.container > span {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  color: rgb(20, 129, 202);
  text-shadow: 0 0 10px rgb(20, 129, 202), 0 0 30px rgb(20, 129, 202),
    0 0 60px rgb(20, 129, 202), 0 0 100px rgb(20, 129, 202);
  font-size: 18px;
  z-index: 1;
}

.circle {
  position: relative;
  margin: 0 auto;
  height: 300px;
  width: 300px;
  background-color: rgb(13, 10, 37);
  border-radius: 50%;
  animation: zhuan 2s linear infinite;
}

@keyframes zhuan {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.circle::after {
  content: "";
  position: absolute;
  top: 10px;
  left: 10px;
  right: 10px;
  bottom: 10px;
  background-color: rgb(7, 15, 26);
  border-radius: 50%;
}

.ring {
  position: absolute;
  top: 0;
  left: 0;
  width: 150px;
  height: 150px;
  background-image: linear-gradient(180deg, rgb(22, 121, 252), transparent 80%);
  border-radius: 150px 0 0;
}

.ring::after {
  content: "";
  position: absolute;
  right: -5px;
  top: -2.5px;
  width: 15px;
  height: 15px;
  background-color: rgb(40, 124, 202);
  box-shadow: 0 0 5px rgb(40, 151, 202), 0 0 10px rgb(40, 124, 202),
    0 0 20px rgb(40, 124, 202), 0 0 30px rgb(40, 124, 202),
    0 0 40px rgb(40, 124, 202), 0 0 50px rgb(40, 124, 202),
    0 0 60px rgb(40, 124, 202), 0 0 60px rgb(40, 124, 202);
  border-radius: 50%;
  z-index: 1;
}
</style>
