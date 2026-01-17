<template>
    <div class="loader__section">
        <img src="/img/schwan/swan-loading.gif" alt="">
    </div>
</template>

<style> 
    .loader__section{
        display: flex;
        align-items: center;
        justify-content: center;
        position: fixed;
        width: 100%;
        height: 100%;
        background-color: var(--pink);
        z-index: 10000;
        left: 0;
        top: 0;
    }

</style>

<script setup>
    
onMounted(() => {
        const loader = document.querySelector('.loader__section');

  setTimeout(() => {
    loader.style.display = 'none'
  }, 1000) // 1 second
})</script>