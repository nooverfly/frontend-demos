<template>
  <a-layout class="wh100">
    <a-layout-sider>
      <a-menu theme="dark" mode="inline" @click="jumpTo">
        <template v-for="menuKey of Object.keys(menus)">
          <a-menu-item v-if="!menus[menuKey].children" :key="`${menuKey}`">
            <span>{{ menuKey }}</span>
          </a-menu-item>
          <a-sub-menu :key="menuKey" v-else>
            <template #title>
              <span>
                <span>{{ menuKey }}</span>
              </span>
            </template>
            <a-menu-item
              v-for="menuName in menus[menuKey].children"
              :key="menuName.name"
              >{{ menuName.name }}</a-menu-item
            >
          </a-sub-menu>
        </template>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <router-view></router-view>
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { menus, base } from "./data/viewsData";

export default defineComponent({
  name: "App",
  data() {
    return {
      menus: menus,
    };
  },
  methods: {
    jumpTo({ item, key, keyPath }: any) {
      if (key === "home") {
        this.$router.push(`${base}/`);
      } else {
        const path = keyPath.join("/");
        this.$router.push(`${base}/${path}`);
      }
    },
  },
});
</script>

<style lang="less"></style>
