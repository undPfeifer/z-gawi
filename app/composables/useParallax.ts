import { onMounted, onUnmounted } from "vue"
import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export const useParallax = () => {
  onMounted(() => {
    const defaultMap: Record<string, number> = {
      H1: 0.15,
      H2: 0.22,
      H3: 0.28,
      P: 0.1,
      IMG: 0.5,
      SECTION: 0.35
    }

    const elements = document.querySelectorAll<HTMLElement>(
      "h1,h2,h3,p,img,section,[data-parallax]"
    )

    elements.forEach(el => {
      const attrSpeed = el.dataset.parallax
      const speed =
        attrSpeed !== undefined
          ? parseFloat(attrSpeed)
          : defaultMap[el.tagName] ?? 0.2

      gsap.to(el, {
        yPercent: speed * 100,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      })
    })
  })

  onUnmounted(() => {
    ScrollTrigger.getAll().forEach(t => t.kill())
  })
}
