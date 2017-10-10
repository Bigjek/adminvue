<template lang="pug">
  .about
    h2.title Страница «Обо мне»
    .skills-list
      skillsList(
        v-for="(skillType, index) in skillsTypes"
        :skillGroup="skillType"
        :key="index"
        :skills="skills"
        @addSkill="addSkill"
        @removeSkill="removeSkill"
      )
</template>

<script>

import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  data: () => ({
    skillsTypes: ['Frontend', 'Workflow', 'Backend']
  }),
  methods: {
    ...mapActions('skills', ['fetchSkills']),
    ...mapMutations('skills', ['addNewSkill', 'removeSavedSkill']),
    addSkill(skill) {
      this.addNewSkill(skill)
    },
    removeSkill(skillId) {
      this.removeSavedSkill(skillId)
    }
  },
  computed: {
    ...mapGetters('skills', ['skills'])
  },
  mounted() {
    this.fetchSkills()
  },
  components: {
    skillsList: require('./skills-list')
  }
}
</script>

<style src="./style.scss" lang="scss" scoped></style>