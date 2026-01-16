<script setup lang="ts">
import FiveWorlds from '~/components/FiveWorlds.vue';
import SectionOneFlexGrow from '~/components/SectionOneFlexGrow.vue';

</script>

<template>

  <ClientOnly>
  <P5Follower />
</ClientOnly>


  <Navbar />


    <section class="page__container">
        <div class="page__wrapper"> 
          


          <Landing/>



            <FiveWorlds/>

            <SectionOne
              img="/img/uebermutter-1-corporate-small.gif"
              eyebrow="zense worlds, corporate"
              heading="Organizations, reframed"
              paragraph="In large organizations, complexity can be overwhelming - and costly - if not handled with care. Whether it’s a new strategy, a transformation, or a shift in identity, we help turn it into something clear, engaging, and unifying. Something that gets everyone on the same page. We help leaders clarify the vision, communicate change, and mobilize stakeholders. Through storytelling, visualizations, campaigns and gamification, we turn complex topics into compelling narratives and lasting engagement. And once the work is done, we don’t fade away. We help you track progress, update materials, and adapt as your strategies evolve and your culture grows."
              />
            <SectionOneFlexGrow
              img="/img/uebermutter-1-corporate-small.gif"
              eyebrow="zense worlds, corporate"
              heading="Organizations, reframed"
              paragraph="In large organizations, complexity can be overwhelming - and costly - if not handled with care. Whether it’s a new strategy, a transformation, or a shift in identity, we help turn it into something clear, engaging, and unifying. Something that gets everyone on the same page. We help leaders clarify the vision, communicate change, and mobilize stakeholders. Through storytelling, visualizations, campaigns and gamification, we turn complex topics into compelling narratives and lasting engagement. And once the work is done, we don’t fade away. We help you track progress, update materials, and adapt as your strategies evolve and your culture grows."
              />

            <SectionOne
              img="/img/uebermutter-1-corporate-small.gif"
              eyebrow="razor-sharp reasoning meets boundless creativity"
              paragraph="At Zense, we work with companies, public organisations, startups, and academic & cultural institutions to turn complex topics - from strategy and scientific research to investor pitch decks -  into clear, compelling formats that engage and mobilize stakeholders.  
                        We combine logic, storytelling, visualization 
                        and gamification techniques."
            />
            <SectionOneFlexGrow
              img="/img/uebermutter-1-corporate-small.gif"
              eyebrow="razor-sharp reasoning meets boundless creativity"
              paragraph="At Zense, we work with companies, public organisations, startups, and academic & cultural institutions to turn complex topics - from strategy and scientific research to investor pitch decks -  into clear, compelling formats that engage and mobilize stakeholders.  
                        We combine logic, storytelling, visualization 
                        and gamification techniques."
            />

        </div>

    </section>



    




</template>

<style>
    .page__container{
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: min(2rem, 2%);
    }

    .page__wrapper{
        max-width: 1800px;
        display: flex;
        flex-direction: column;
        gap: 150px;
    }
</style>