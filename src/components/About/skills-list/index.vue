<template lang="pug">
  .skills-item
    .skills-title {{skillGroup}}
    Skill(
      v-for="skill in skills"
      v-if="checkSkillType(skillGroup) === skill.type"
      :id="skill.id"
      :key="skill.id"
      :title="skill.name",
      :percents="skill.percents"
      @removeSkill="removeSkill(skill.id)"
    )
    .add-skill
      .add-skill-row
        app-input(
          type="text"
          placeholder="Название"
          v-model="skillName"
          :error="validation.hasError('skillName')"
        )
      .skill-error {{validation.firstError('skillName')}}
      app-button(
        title="Добавить"
        @click="addSkill(skillGroup)"
        :disabled="validation.hasError('skillName')"
      )
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import { Validator } from 'simple-vue-validator'

export default {
  mixins: [require('simple-vue-validator').mixin],
  validators: {
    skillName: (value) => {
      return Validator.value(value).required('Название не может быть пустым')
    }
  },
  data: () => ({
    skillName: '',
    toto: ''
  }),
  props: {
    skillGroup: String,
    skills: Array
  },
  methods: {
    ...mapActions('skills', ['fetchAdd']),
    addSkill(skillGroup) {
      this.$validate().then(success => {
        if (!success) return
        this.$emit('addSkill', {
          id: Math.round(Math.random() * 1000000),
          name: this.skillName,
          percents: 0,
          type: this.checkSkillType(skillGroup)
        })
      })
      const dataparams = {
        'title': this.skillName,
        'perc': 0,
        'type': this.checkSkillType(skillGroup)
      }
      this.fetchAdd(dataparams)
    },
    removeSkill(skillId) {
      this.$emit('removeSkill', skillId)
    },
    checkSkillType(skillGroup) {
      switch (skillGroup) {
        case 'Frontend':
          return 1
        case 'Workflow':
          return 2
        case 'Backend':
          return 3
      }
    }
  },
  components: {
    Skill: require('../skill'),
    AppInput: require('_common/Input'),
    AppButton: require('_common/Button')
  },
  computed: {
    ...mapGetters('skills', ['skills'])
  }
  // mounted() {
  //   this.fetchSkills()
  // }
}
</script>
<style src="./style.scss" lang="scss" scoped></style>