<template lang="pug">
  .tabs
    ul.tabs-list
      router-link(
        v-for="(tab, index) in tabs"
        :key="index"
        tag="li"
        active-class="active"
        :to="tab.route"
        exact
      ).tabs-item
        span.tabs-link {{tab.name}}
</template>

<script>
export default {
  data: () => ({
    tabs: [
      { name: 'Обо мне', route: '/adminvue' },
      { name: 'Блог', route: '/adminvue/blog' },
      { name: 'Мои работы', route: '/adminvue/works' }
    ]
  })
}
</script>

<style src="./style.scss" lang="scss" scoped></style>
