<template>
  <div ref="p5Container"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const p5Container = ref(null)
let p5Instance = null

const starPath = '/img/stars/'
const stars = [
  'star0.png',
  'star1-1.png',
  'star1-2.png',
  'star1-3.png',
  'star1-4.png',
  'star2-1.png',
  'star2-2.png',
  'star2-3.png',
  'star2-4.png',
  'star3.png',
  'star4.png',
  'star5.png'
]

onMounted(async () => {
  // Dynamically import p5 to avoid SSR issues
  const p5 = (await import('p5')).default
  
  const sketch = (p) => {
    let starImages = []
    let starPositions = []
    const numStars = 100
    
    p.preload = () => {
      starImages = stars.map(star => p.loadImage(starPath + star))
    }
    
    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight)
      
      for (let i = 0; i < numStars; i++) {
        starPositions.push({
          x: p.random(p.width),
          y: p.random(p.height),
          img: p.random(starImages),
          size: p.random(0.5, 1.5)
        })
      }
    }
    
    p.draw = () => {
      p.background(0, 0, 20)
      
      starPositions.forEach(star => {
        p.push()
        p.translate(star.x, star.y)
        p.scale(star.size)
        p.imageMode(p.CENTER)
        p.image(star.img, 0, 0)
        p.pop()
      })
      
      p.noLoop()
    }
    
    p.windowResized = () => {
      p.resizeCanvas(p.windowWidth, p.windowHeight)
      
      starPositions = []
      for (let i = 0; i < numStars; i++) {
        starPositions.push({
          x: p.random(p.width),
          y: p.random(p.height),
          img: p.random(starImages),
          size: p.random(0.5, 1.5)
        })
      }
      
      p.redraw()
    }
  }
  
  p5Instance = new p5(sketch, p5Container.value)
})

onUnmounted(() => {
  if (p5Instance) {
    p5Instance.remove()
  }
})
</script>