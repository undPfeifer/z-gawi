<template>
  <section>
    <div class="section__one" :class="{ 'is-reversed': reverse }">

      <div class="section__one-media">
        <img :src="img" :alt="heading" />
      </div>

      <div class="section__one-content">
        <div class="title">
          <h3 v-if="eyebrow">{{ eyebrow }}</h3>
          <h1 v-if="heading">{{ heading }}</h1>
        </div>

        <div class="text">
          <p>{{ paragraph }}</p>
        </div>
      </div>

    </div>
  </section>
</template>



<style scoped>


    html {
    font-size: 14px;
}


/* clamp mit vw -> zoom geht nicht */

h1 {
  /* font-size: clamp(1rem, 9vw, 5rem); */
  font-size: clamp( 1.75rem, calc(7vw + 1rem), 6rem);
  line-height: 0.9;
}

h3 {
    font-size: clamp(1.75rem, 4vw, 3.75rem);

  line-height: 0.9;
}

p {
    max-width: 46ch;
}


.section__one {
    grid-template-rows: 1fr;
  display: grid;
  grid-template-columns: 1fr 2fr;
  padding-bottom: 200px;
}












    .section__one-media{
        grid-column: 1;
        width: 100%;
        align-self: center;
        justify-self: center;
        grid-row: 1;
    }


    .section__one-content{
        grid-column: 2;

        display: grid;

        grid-template-columns: repeat(6, 1fr);

    }


/* ---x---x--- ELEMENT ORDER DEPENDANT STYLING ---x---x--- */

.section__one-content > .title {
align-self: end;
  grid-column: 1 / 6;
  grid-row: 1;
}

.section__one-content > .text {
  grid-column: 2 / 7;
  grid-row: 2;
}

/* select h3 if its immediatly before h1 */

    .title h3:has(+ h1) {
        color: var(--pink);
    }




/* reversed */
.section__one.is-reversed .section__one-media {
  grid-column: 2;
}

.section__one.is-reversed .section__one-content {
  grid-column: 1;
}
.section__one.is-reversed {
      grid-template-columns: 2fr 1fr;
}


@media (max-width: 800px) {
    .section__one {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
    }
}

</style>

<script setup>
defineProps({
  img: {
    type: String,
    required: true
  },
  eyebrow: {
    type: String,
    default: ''
  },
  heading: {
    type: String,
    required: true
  },
  paragraph: {
    type: String,
    required: true
  },
  reverse: {
    type: Boolean,
    default: false
  }
})
</script>

