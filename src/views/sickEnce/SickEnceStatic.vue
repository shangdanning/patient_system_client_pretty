<template>
  <div id="app">
    {{ time }}

    <div>
      {{ obj.now.time }}
    </div>

    <button @click="update">当前时间</button>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      time: Date.now()
    };
  },
  computed: {
    obj() {
      /** 这里返回一个对象 */
      return {
        now: {
          time: `${this.time}`
        }
      };
    }
  },
  watch: {
    time() {
      // console.log(1);
    }
  },
  methods: {
    /** 修改名称 */
    update() {
      this.time = Date.now();
    }
  }
};
</script>
