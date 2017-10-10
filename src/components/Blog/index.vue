<template lang="pug">
  .blog
    h2.title Страница «Блог»
    .container
      .form.col
        h3.form-title Добавить запись
        .row
          app-input(
            type="text",
            placeholder="Название"
            v-model="fields.title"
          )
        .row
          app-input(
            type="date",
            v-model="fields.date"
          )
        .row
          textarea.input.blog-textarea(
            type="text" 
            placeholder="Содержание"
            v-model="fields.body"
          )
        .row
          app-button(
            title="Добавить"
            @click="addPost"
          )
      .table.col
        table.posts
          tr.tr(v-for="(post, index) in posts.articles"
            :key="index"
            )
            td
              tr
                td {{post.title}}
                td {{post.date | formatDate}}  
                
              tr 
                td {{post.body}}
                td 
                  app-button(
                    title="Удалить"
                    @click="removePost(post._id)"
                  )
</template>
<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
export default {
  data: () => ({
    fields: {
      title: '',
      date: '',
      body: ''
    }
  }),
  methods: {
    ...mapActions('posts', ['fetchBlogs']),
    ...mapActions('posts', ['fetchInBlogs']),
    ...mapMutations('posts', ['addBlogPost']),
    addPost() {
      const dataparams = {
        'title': this.fields.title,
        'date': this.fields.date,
        'text': this.fields.body
      }
      this.fetchInBlogs(dataparams)
      this.fetchBlogs()
    },
    removePost(id) {
      console.log('id ', id)
      this.$http.delete('blog/' + id).then((response) => {
        console.log('есть ', response.message)
      }, response => { console.error('нет ', response) })
      this.fetchBlogs()
    }
  },
  computed: {
    ...mapGetters('posts', ['posts'])
  },
  mounted() {
    this.fetchBlogs()
  },
  props: {
    posts: Object
  },
  components: {
    AppButton: require('_common/Button'),
    AppInput: require('_common/Input')
  }
}
</script>
<style src="./style.scss" lang="scss" scoped></style>