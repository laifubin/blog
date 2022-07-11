import { ref, computed, defineComponent, h, onMounted } from 'vue'
import type { ComputedRef, DefineComponent } from 'vue'
import { UserStore } from '@/store/user'
/**
 * 生成水印背景图片
 * @param text 水印文字
 */
function createWatermark (text: string) {
  const FONTFAMILY = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif"
  const WIDTH = 500
  const HEIGHT = 200
  const SIZE = 16

  const canvas = window.document.createElement('canvas')
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
  canvas.width = WIDTH
  canvas.height = HEIGHT
  ctx.fillStyle = 'rgba(180,180,180,0.15)'

  // 旋转
  const circleX = WIDTH / 2
  const circleY = HEIGHT / 2
  ctx.translate(circleX, circleY)
  ctx.rotate((-25 * Math.PI) / 180)
  ctx.font = `${SIZE}px ${FONTFAMILY}`
  ctx.textAlign = 'center'
  ctx.fillText(text, -50, -50)
  ctx.fillText(text, -150, -150)
  ctx.fillText(text, 56, 62)
  ctx.fillText(text, 140, 150)
  ctx.translate(-circleX, -circleY)

  return canvas.toDataURL('image/png')
}

// 防止删除元素
function observeParent (target: HTMLElement) {
  const observer = new MutationObserver((mutationList) => {
    mutationList.some((mutation) => {
      if (mutation.type === 'childList') {
        const isRemovedWatermark = Array.from(mutation.removedNodes).some(node => node === target)
        if (isRemovedWatermark) {
          mutation.target?.appendChild(target)
          return true
        }
      }
      return false
    })
  })
  observer.observe(target.parentElement!, { attributes: true, attributeFilter: ['style'], childList: true })
  return observer
}

// 防止修改样式或添加class
function observeSelf (target: HTMLElement, style: ComputedRef<string>) {
  const observer = new MutationObserver((mutationList) => {
    mutationList.some((mutation) => {
      if (mutation.type === 'attributes') {
        if (mutation.attributeName === 'style') {
          if (target.getAttribute('style') !== style.value) {
            target.setAttribute('style', style.value)
          }
        } else if (mutation.attributeName === 'class') {
          target.removeAttribute('class')
        }
        return true
      }
      return false
    })
  })
  observer.observe(target, { attributes: true, attributeFilter: ['style', 'class'] })
}

let comp: DefineComponent

export function useWatermark () {
  const store = UserStore()
  const watermark = computed(()=> createWatermark(store.userName || '游客'))
  // const watermark = ref(createWatermark(store.userName))

  if (!comp) {
    comp = defineComponent({
      name: 'ZhWatermark',
      setup () {
        const watermarkRef = ref<HTMLDivElement>()

        const style = computed(() => [
          'transform: none',
          'opacity: 1',
          'display: block',
          'z-index: 9999',
          'position: fixed',
          'inset: 50px 0 0',
          'pointer-events: none',
          `background: url(${watermark.value})`
        ].map(el => el + '!important').join(';'))

        onMounted(() => {
          observeParent(watermarkRef.value!)
          observeSelf(watermarkRef.value!, style)
        })

        return () => h('div', {
          style: style.value,
          ref: (ref) => (watermarkRef.value = ref as HTMLDivElement)
        })
      }
    })
  }

  return { ZhWatermark: comp, watermark }
}
