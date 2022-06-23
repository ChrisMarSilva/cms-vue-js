<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    
    <br/>
    <button v-on:click="increment">Add 1</button>
    <br/>
    <button v-on:click="decrement">Del 1</button>
    <br/>
    <p>{{ count }}</p>

    <table border="0" cellspacing="0" width="100%" style="font-size: 18px; margin: 0px">
      <thead>
        <tr>
          <th>id</th>
          <th>title</th>
          <th>body</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in lista" v-bind:key="item.id" style="font-size: 16px">
          <td>#{{ item.id }}</td>
          <td>{{ item.title }}</td>
          <td>{{ item.body }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

  import axios from "axios";

  export default {

    name: "HelloWorld",

    props: {
      msg: String,
    },

    data() {
      return {
        lista: [],
      };
    },

    methods: {

      increment () {
        this.$store.commit('increment');
      },

      decrement () {
        this.$store.commit('decrement');
      },

      async BuscarLista() {
        try {
          console.warn("BuscarLista.INI");
          const url = "https://jsonplaceholder.typicode.com/posts";
          const response = await axios.get(url);
          this.lista = response.data;
        } catch (err) {
          // console.log("BuscarLista.ERRO:", err);
        } finally {
          //console.log("BuscarLista.FIM");
        }
      },

    },
    
    computed: {
      count () {
        return this.$store.getters.count; // this.$store.getters.count2(); // this.$store.state.count;
      },
    },

    created() {
      // this.BuscarLista();
    },

    mounted() {
      this.BuscarLista();
    },

  };

</script>

<style scoped>
  h3 {margin: 40px 0 0}
  ul {list-style-type: none; padding: 0}
  li {display: inline-block; margin: 0 10px}
  a {color: #42b983}
</style>
