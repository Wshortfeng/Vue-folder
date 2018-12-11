<template>
  <div class="userManagementindex">
    <keep-alive>
    		<router-view v-if="$route.meta.keepAlive"></router-view>
    	</keep-alive>
    	<router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: "userManagementindex",
  data() {
    return {};
  },
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
</style>
