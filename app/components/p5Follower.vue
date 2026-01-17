<template>
  <section ref="wrapper" class="canvas-wrapper" />
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref, nextTick } from 'vue'

const wrapper = ref(null)
let p5Instance = null



onMounted(async () => {
  await nextTick()
  if (!wrapper.value) return

  const p5 = (await import('p5')).default

  const sketch = (p) => {
    let spriteSheet = null
    const frameCount = 4      // number of frames in sprite sheet
    const frameWidth = 75     // width of each frame
    const frameHeight = 75    // height of each frame
    let currentFrame = 0
    let frameTimer = 0

    let pos, vel, acc, target
    let facing = 1
    let idleTime = 0

    
    let randomTarget = null


    p.setup = async () => {
      const canvas = p.createCanvas(p.windowWidth, p.windowHeight)
      canvas.parent(wrapper.value)
      p.imageMode(p.CENTER)
      p.clear()

      pos = p.createVector(p.width / 2, p.height / 2)
      vel = p.createVector(0, 0)
      acc = p.createVector(0, 0)
      target = pos.copy()

      spriteSheet = await p.loadImage('/img/schwan/schwan-sprite.png') // put sprite sheet in /public
    }

    p.windowResized = () => {
      p.resizeCanvas(p.windowWidth, p.windowHeight)
    }

    p.mouseMoved = () => {
      if (
        p.mouseX >= 0 &&
        p.mouseX <= p.width &&
        p.mouseY >= 0 &&
        p.mouseY <= p.height
      ) {
        target.set(p.mouseX, p.mouseY)
        idleTime = 0
      }
    }

p.draw = () => {
  p.clear()
  if (!spriteSheet) return

  const toTarget = p5.Vector.sub(target, pos)
  const distance = toTarget.mag()

  // Idle detection
  if (distance < 4) idleTime += 0.01
  else idleTime = 0

// Autonomous wandering when idle
if (idleTime > 1) { // 1 second idle
  // If no target or close to current, pick a new far target
  if (!randomTarget || p5.Vector.dist(pos, randomTarget) < 100) {
    const margin = 100
    let newTarget
    let tries = 0
    do {
      newTarget = p.createVector(
        p.random(margin, p.width - margin),
        p.random(margin, p.height - margin)
      )
      tries++
      // Ensure it's far enough horizontally or vertically
    } while (p5.Vector.dist(pos, newTarget) < 400 && tries < 10)
    randomTarget = newTarget
  }
  target = randomTarget
} else {
  randomTarget = null
}


// Idle orbit if idle AND not flying to a random target
if (idleTime > 0.9 && !randomTarget) {
  const idleRadiusX = 200
  const idleRadiusY = 150
  const idleSpeed = 0.0001
  const t = p.frameCount * idleSpeed
  const idleX = target.x + p.cos(t) * idleRadiusX 
  const idleY = target.y + p.sin(t * 1.2) * idleRadiusY
  toTarget.set(idleX - pos.x, idleY - pos.y)
}


  // Acceleration toward target — nonlinear for more speed
  const minAccel = 0.05
  const maxAccel = 1.0
  const accelStrength = p.constrain(Math.pow(distance, 1.2) * 0.0005, minAccel, maxAccel)
  acc = toTarget.copy().normalize().mult(accelStrength)

  // Velocity + drag
  vel.add(acc)
  vel.mult(0.9) // slightly more drag for smoother motion
  vel.limit(25) // higher max speed
  pos.add(vel)

  // Determine facing based on velocity
  facing = vel.x >= 0 ? 1 : -1

  // Rotation: tilt based on velocity, correctly accounts for facing
  let angle = p.constrain(vel.y * 0.05 + vel.x * 0.02, -0.5, 0.5)


  // Sprite frame flapping faster with speed
  const speed = vel.mag()
  const minSpeed = 0.5
  const maxSpeed = 25
  const frameSpeed = p.map(speed, minSpeed, maxSpeed, 0.1, 1.0)
  frameTimer += frameSpeed
  if (frameTimer >= 1) {
    frameTimer = 0
    currentFrame = (currentFrame + 1) % frameCount
  }

  

p.push()
p.translate(pos.x, pos.y)
if (facing === -1) p.scale(-1, 1) // flip if moving left

// Apply base rotation to correct sprite orientation
const baseRotation = p.radians(-25) // 45 degrees as an example
p.rotate(baseRotation + angle)     // angle is your dynamic tilt

p.image(
  spriteSheet,
  0, 0,
  frameWidth, frameHeight,
  currentFrame * frameWidth, 0, frameWidth, frameHeight
)
p.pop()
}

  }

  p5Instance = new p5(sketch)
})

onBeforeUnmount(() => {
  if (p5Instance) {
    p5Instance.remove()
    p5Instance = null
  }
})
</script>

<style scoped>
.canvas-wrapper {
  width: 100%;
  height: 100vh;
  overflow: hidden;

  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 1000;
}

img{
  transform: rotateX(45deg);
}
</style>
