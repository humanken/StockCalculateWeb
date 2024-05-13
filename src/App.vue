<template>
  <div>
     <router-view v-slot="{ Component }">
       <transition :name="state.transition.name" v-on:before-leave="scrollToTop">
         <keep-alive>
           <component v-if="$route.meta.keepAlive" :is="Component"></component>
         </keep-alive>
       </transition>
       <transition :name="state.transition.name">
         <component v-if="!$route.meta.keepAlive" :is="Component" :key="$route.path"></component>
       </transition>
     </router-view>
  </div>
</template>

<script setup>
  import { RouterView, useRouter } from "vue-router";
  import {onActivated, onMounted, reactive, ref} from "vue";

  const router = useRouter();

  const state = reactive({
    transition: { name: '', toLeft: 'slide-left', toRight: 'slide-right', none: '' }
  })

  router.beforeEach((to, from) => {

    setTransitionName(to, from)

    // console.log('to: ', to)
    // console.log('from: ', from)
  })

  function setTransitionName(to, from) {
    /**
     * 設定 過渡動畫 的 滑動方向
     * index越小 -> 頁面層級越高
     * 從 index=0 到 index=1 -> 向左滑
     * 從 index=1 到 index=0 -> 向右滑
     * index 相同 -> 不加動畫
     */
    if (from.meta.index < to.meta.index) {
      state.transition.name = state.transition.toLeft
    }
    else if (from.meta.index > to.meta.index) {
      state.transition.name = state.transition.toRight
    }
    else {
      state.transition.name = state.transition.none
    }
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "instant" })
  }


</script>

<style>
.animation-bg {
  background-image: linear-gradient(-225deg, #2CD8D5 0%, #C5C1FF 55%, #FFBAC3 100%);
  background-size: 200% 200%;
  background-position: center;
  animation: bg-animate 8s ease-in-out infinite;
}
@keyframes bg-animate {
    0% {background-position: 0 0;}
    50% {background-position: 100% 100%;}
    100% {background-position: 0 0;}
}

/* 滑動的過渡效果 */
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.8s cubic-bezier(.55, 0, .1, 1);
}

/* 向左滑進入 */
.slide-left-enter-from { transform: translateX(100%); }
.slide-left-enter-to { transform: translateX(0%); }

/* 向左滑離開 */
.slide-left-leave-from { transform: translateX(0%); }
.slide-left-leave-to { transform: translateX(-100%); }

/* 向右滑進入 */
.slide-right-enter-from { transform: translateX(-100%); }
.slide-right-enter-to { transform: translateX(0%); }

/* 向右滑離開 */
.slide-right-leave-from { transform: translateX(0%); }
.slide-right-leave-to { transform: translateX(100%); }
</style>
