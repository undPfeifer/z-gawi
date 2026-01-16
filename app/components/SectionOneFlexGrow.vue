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
/* =====================
   Typography
===================== */

h1 {
  font-size: clamp(1.75rem, 7vw, 8.75rem);
  line-height: 0.95;
}

h3 {
  font-size: clamp(1.25rem, 4vw, 3.75rem);
  line-height: 1;
}

p {
  max-width: 46ch;
}

/* h3 only when followed by h1 */
.title h3:has(+ h1) {
  color: var(--pink);
}

/* =====================
   Layout
===================== */

.section {
  padding-block: clamp(4rem, 10vw, 12rem);
}

.section__one {
  display: flex;
  
  gap: 10px;
  align-items: center;
}

/* Reverse layout */
.section__one.is-reversed {
  direction: rtl;
}

.section__one.is-reversed > * {
  direction: ltr;
}

/* =====================
   Media
===================== */

.section__one-media {
  width: 100%;
}

.section__one-media img {
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
}

/* =====================
   Content
===================== */

.section__one-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 100ch;
  border: 1px solid blue
}

/* =====================
   Responsive
===================== */

@media (max-width: 800px) {
  .section__one {
    display: block;
  }

  .section__one.is-reversed {
    direction: ltr;
  }

  .section__one-content {
    max-width: 100%;
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

