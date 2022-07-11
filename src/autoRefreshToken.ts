import { useDebounceFn  } from '@vueuse/core'
import { _refresh } from '@/api/login'
import config from '@/config'

const { MAX_AGE } = config
const debouncedFn = useDebounceFn(() => {
  const { time } = JSON.parse(localStorage.getItem('blog_token') ?? '{}')
  if (Date.now() - time > MAX_AGE - 20000 && Date.now() - time < MAX_AGE) {
    _refresh().then(res => {
      console.log('res', res)
       const token = JSON.stringify({
        ...res.data,
        time: Date.now()
      })
      localStorage.setItem('blog_token', token)
    })
  }
}, 1000)
document.addEventListener('mousemove', debouncedFn)