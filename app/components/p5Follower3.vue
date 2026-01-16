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
    let birdImg = null
    let birdElement = null // HTMLImageElement for controlling GIF
    let pos, vel, acc, target
    let facing = 1
    let idleTime = 0

    p.setup = async () => {
      const canvas = p.createCanvas(p.windowWidth, 400)
      canvas.parent(wrapper.value)
      p.imageMode(p.CENTER)
      p.clear()

      pos = p.createVector(p.width / 2, p.height / 2)
      vel = p.createVector(0, 0)
      acc = p.createVector(0, 0)
      target = pos.copy()

      // load GIF as HTMLImageElement to control speed
      birdElement = document.createElement('img')
      birdElement.src = '/cursor.gif'
      birdElement.style.position = 'absolute'
      birdElement.style.display = 'none' // hide HTML img
      document.body.appendChild(birdElement)
      birdImg = p.loadImage('/cursor.gif')
    }

    p.windowResized = () => {
      p.resizeCanvas(p.windowWidth, 400)
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
      if (!birdImg) return

      // vector to target
      const toTarget = p5.Vector.sub(target, pos)
      const distance = toTarget.mag()

      // idle detection
      if (distance < 4) idleTime += 0.01
      else idleTime = 0

      // Idle orbit with noticeable 200px radius
      if (idleTime > 0.2) {
        const idleRadiusX = 200
        const idleRadiusY = 150
        const idleSpeed = 0.004
        const t = p.frameCount * idleSpeed
        const idleX = target.x + p.cos(t) * idleRadiusX
        const idleY = target.y + p.sin(t * 1.2) * idleRadiusY
        toTarget.set(idleX - pos.x, idleY - pos.y)
      }

      // Acceleration toward target
      toTarget.normalize()
      const accelStrength = p.constrain(distance * 0.002, 0.02, 0.25)
      acc = toTarget.mult(accelStrength)

      // Velocity + drag
      vel.add(acc)
      vel.mult(0.92)
      vel.limit(10)
      pos.add(vel)

      // Facing & banking
      if (Math.abs(vel.x) > 0.1) facing = vel.x > 0 ? 1 : -1
      const angle = p.constrain(vel.x * 0.08, -0.5, 0.5)

      // Wing flap speed based on velocity magnitude
      const speed = vel.mag()
      const minSpeed = 0.5
      const maxSpeed = 10
      const rate = p.map(speed, minSpeed, maxSpeed, 0.5, 2)
      if (birdElement) birdElement.style.animationDuration = `${1 / rate}s`

      // Draw bird
      p.push()
      p.translate(pos.x, pos.y)
      p.scale(facing, 1)
      p.rotate(angle)
      p.image(birdImg, 0, 0)
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
  height: 400px;
  overflow: hidden;
}
</style>
