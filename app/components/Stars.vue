<template>
  <div ref="canvasContainer" class="canvas-container"></div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const canvasContainer = ref(null)
let p5Instance = null

onMounted(async () => {
  if (!process.client) return

  const p5 = (await import('p5')).default

  p5Instance = new p5((sketch) => {

    const starPath = '/img/stars/'
    const moonPath = '/img/moons/'
    const ufoPath = '/img/ufos/'
    const satellitePath = '/img/satellites/'

    const starFiles = ['star0.png','star1-1.png','star1-2.png','star1-3.png','star1-4.png','star2-1.png','star2-2.png','star2-3.png','star2-4.png','star3.png','star4.png','star5.png']
    const moonFiles = ['moon1.png','moon2.png']
    const ufoFiles = ['ufo1.png','ufo2.png']
    const satelliteFiles = ['sat1.png','sat2.png']

    const STAR_AMOUNT = Math.floor( window.innerWidth / 25)
    const MOON_AMOUNT = Math.floor( window.innerWidth / 350)
    const UFO_AMOUNT = 1
    const SAT_AMOUNT = 1

    let loadedStars = [], loadedMoons = [], loadedUFOs = [], loadedSats = []
    let stars = [], moons = [], ufos = [], sats = []

    // ---------- Helper: async load images ----------
    async function loadImages(path, files) {
      const promises = files.map(f => new Promise(resolve => {
        sketch.loadImage(path + f, img => resolve(img))
      }))
      return await Promise.all(promises)
    }

    // ---------- Apply per-pixel pink filter ----------
    function applyPinkFilter(img, pinkColor) {
      img.loadPixels()
      for (let y = 0; y < img.height; y++) {
        for (let x = 0; x < img.width; x++) {
          const idx = 4 * (y * img.width + x)
          const r = img.pixels[idx]
          const g = img.pixels[idx+1]
          const b = img.pixels[idx+2]

          if (!(r > 250 && g > 250 && b > 250)) { // non-white -> pink
            img.pixels[idx] = sketch.red(pinkColor)
            img.pixels[idx+1] = sketch.green(pinkColor)
            img.pixels[idx+2] = sketch.blue(pinkColor)
          }
        }
      }
      img.updatePixels()
    }

    // ---------- Collision-free placement ----------
    function placeObjects(count, loadedImages, existingObjects=[]) {
      const objects = []
      const maxAttempts = 1000
      for (let i = 0; i < count; i++) {
        const img = sketch.random(loadedImages)
        const size = img.width
        let x, y, safe = false, attempts = 0

        while(!safe && attempts < maxAttempts){
          x = sketch.random(size/2, sketch.width - size/2)
          y = sketch.random(size/2, sketch.height - size/2)
          safe = true
          for (let j = 0; j < existingObjects.length; j++){
            const other = existingObjects[j]
            const minDist = (size + other.img.width)/2
            if (sketch.dist(x,y,other.x,other.y)<minDist){
              safe=false
              break
            }
          }
          attempts++
        }

        // Add small drift speed for depth illusion
        const driftSpeed = sketch.random(0.6, 1)
        const obj = { 
          img, x, y, targetX:x, targetY:y, rotation: sketch.random(360), 
          targetRotation: sketch.random(360), easing: sketch.random(0.02,0.08),
          driftSpeed
        }
        objects.push(obj)
        existingObjects.push(obj)
      }
      return objects
    }

    // ---------- Setup ----------
    sketch.setup = async () => {
      const cnv = sketch.createCanvas(sketch.windowWidth, sketch.windowHeight)
      cnv.parent(canvasContainer.value)
      sketch.angleMode(sketch.DEGREES)

      const pinkColor = sketch.color('#FDAFC4') // declare pink inside setup

      // Load all images
      loadedStars = await loadImages(starPath, starFiles)
      loadedMoons = await loadImages(moonPath, moonFiles)
      loadedUFOs = await loadImages(ufoPath, ufoFiles)
      loadedSats = await loadImages(satellitePath, satelliteFiles)

      // Apply pink filter
      loadedStars.forEach(img => applyPinkFilter(img, pinkColor))
      loadedMoons.forEach(img => applyPinkFilter(img, pinkColor))
      loadedUFOs.forEach(img => applyPinkFilter(img, pinkColor))
      loadedSats.forEach(img => applyPinkFilter(img, pinkColor))

      // Place objects
      stars = placeObjects(STAR_AMOUNT, loadedStars)
      moons = placeObjects(MOON_AMOUNT, loadedMoons, [...stars])
      ufos = placeObjects(UFO_AMOUNT, loadedUFOs)
      sats = placeObjects(SAT_AMOUNT, loadedSats)
    }

    // ---------- Draw ----------
    sketch.draw = () => {
      sketch.background('#FCFCFB')

      function drawInteractive(obj, mouseInteractive=false){
        // Mouse interaction for stars and moons
        if(mouseInteractive){
          const dx = sketch.mouseX - obj.x
          const dy = sketch.mouseY - obj.y
          const distToMouse = sketch.sqrt(dx*dx + dy*dy)
          const radius = 350
          if(distToMouse < radius){
            const angle = sketch.atan2(dy, dx)
            const moveAmount = sketch.map(radius - distToMouse, 0, radius, 0, 20)
            obj.targetX = obj.x - sketch.cos(angle) * moveAmount
            obj.targetY = obj.y - sketch.sin(angle) * moveAmount
            obj.targetRotation = obj.rotation + sketch.map(radius - distToMouse, 0, radius, -10, 10)
          } else {
            obj.targetX = obj.x
            obj.targetY = obj.y
            obj.targetRotation = obj.rotation
          }
        }

        // small drifting motion for depth
        obj.targetX += obj.driftSpeed
        obj.targetY += obj.driftSpeed * 0.5 // slight diagonal drift

        // easing
        obj.x += (obj.targetX - obj.x) * obj.easing
        obj.y += (obj.targetY - obj.y) * obj.easing
        obj.rotation += (obj.targetRotation - obj.rotation) * obj.easing

        // draw
        sketch.push()
        sketch.translate(obj.x, obj.y)
        sketch.rotate(obj.rotation)
        sketch.imageMode(sketch.CENTER)
        sketch.image(obj.img, 0, 0)
        sketch.pop()
      }

      // Stars and moons
      stars.forEach(obj => drawInteractive(obj, true))
      moons.forEach(obj => drawInteractive(obj, true))

      // UFOs hover without rotation
      ufos.forEach(ufo => {
        ufo.x += sketch.sin(sketch.frameCount * 0.5 + ufo.x) * 0.5
        ufo.y += sketch.cos(sketch.frameCount * 0.5 + ufo.y) * 0.3
        sketch.push()
        sketch.translate(ufo.x, ufo.y)
        sketch.imageMode(sketch.CENTER)
        sketch.image(ufo.img, 0, 0)
        sketch.pop()
      })

      // Satellites moving across screen
      sats.forEach(sat => {
        sat.x += 1
        if(sat.x > sketch.width + sat.img.width) sat.x = -sat.img.width
        sketch.push()
        sketch.translate(sat.x, sat.y)
        sketch.imageMode(sketch.CENTER)
        sketch.image(sat.img, 0, 0)
        sketch.pop()
      })
    }

    sketch.windowResized = () => {
      sketch.resizeCanvas(sketch.windowWidth, sketch.windowHeight)
    }

  }, canvasContainer.value)
})

onBeforeUnmount(() => {
  if(p5Instance) p5Instance.remove()
})
</script>

<style scoped>
.canvas-container {
  position: fixed;
  top:0;
  left:0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  pointer-events: none;
  opacity: 1
}
</style>
