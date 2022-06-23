<template>
  <div class="about">
    <p>{{ counter }}</p>
    <p>{{ counter2 }}</p>
    <button @click="decrement">Decrement</button>
    <button @click="increment">Increment</button>
  </div>
</template>

<script>

  import { mapState, mapGetters, mapActions, } from 'vuex'

  export default {
    name: "AboutComponent",
    computed: {
        ...mapState({
            counter2: state => state.count,
        }),
        ...mapGetters([
            'counter',
        ]),
    },
    methods: {
        ...mapActions([
            'decrement',
            'increment',
        ]),
    },
  };

</script>
