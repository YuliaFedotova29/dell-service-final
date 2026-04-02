import Swiper from 'swiper'
import { Pagination } from 'swiper/modules'
import 'swiper/swiper-bundle.css'
import '../scss/_main.scss'

// Переключение активного таба
const tabs = document.querySelectorAll('.navigation__tab')
tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    tabs.forEach((t) => t.classList.remove('navigation__tab--active'))
    tab.classList.add('navigation__tab--active')
  })
})

// Читать далее
document
  .querySelectorAll('.content-mobile, .content-tablet, .content-desktop')
  .forEach((block) => {
    block.querySelectorAll('.content-section__description').forEach((p, i) => {
      if (i > 0) p.classList.add('extra-text')
    })

    const btn = block.querySelector('.content-section__read-more')
    if (!btn) return

    btn.addEventListener('click', () => {
      const expanded = block.classList.toggle('is-expanded')
      const label = btn.querySelector('.content-section__read-more-text')
      const icon = btn.querySelector('.content-section__expand-icon')
      if (label) label.textContent = expanded ? 'Скрыть' : 'Читать далее'
      if (icon) icon.classList.toggle('rotated', expanded)
    })
  })

// Свайпер
let brandsSwiper = null
let devicesSwiper = null
let servicesSwiper = null

const servicesData = [
  { name: 'Диагностика', price: 'Бесплатно', duration: '30 мин' },
  { name: 'Замена дисплея', price: '1 000 ₽', duration: '30–120 мин' },
  {
    name: 'Замена полифонического динамика',
    price: '1 000 ₽',
    duration: '30–120 мин'
  },
  {
    name: 'Тестирование с выдачей заключения',
    price: '1 000 ₽',
    duration: '30–120 мин'
  },
  {
    name: 'Замена программного обеспечения',
    price: '1 000 ₽',
    duration: '30–120 мин'
  }
]

function initBrandsSwiper() {
  const isMobile = window.matchMedia('(max-width: 767px)').matches
  const container = document.querySelector('#brandsSwiper')
  const wrapper = container?.querySelector('.swiper-wrapper')
  const pagination = container?.querySelector('.swiper-pagination')
  if (!container || !wrapper) return

  if (isMobile && !brandsSwiper) {
    wrapper.innerHTML = ''
    document
      .querySelectorAll('#brandsGrid .brand-card:not(.brand-card--hidden-row)')
      .forEach((card) => {
        const clone = card.cloneNode(true)
        clone.classList.remove(
          'brand-card--hidden-row',
          'shown',
          'brand-card--hidden-tablet'
        )
        const slide = document.createElement('div')
        slide.className = 'swiper-slide'
        slide.appendChild(clone)
        wrapper.appendChild(slide)
      })
    brandsSwiper = new Swiper(container, {
      modules: [Pagination],
      slidesPerView: 'auto',
      spaceBetween: 16,
      pagination: {
        el: pagination,
        clickable: true
      }
    })
  } else if (!isMobile && brandsSwiper) {
    brandsSwiper.destroy(true, true)
    brandsSwiper = null
    wrapper.innerHTML = ''
  }
}

function initDevicesSwiper() {
  const isMobile = window.matchMedia('(max-width: 767px)').matches
  const container = document.querySelector('#devicesSwiper')
  const wrapper = container?.querySelector('.swiper-wrapper')
  const pagination = container?.querySelector('.swiper-pagination')
  if (!container || !wrapper) return

  if (isMobile && !devicesSwiper) {
    wrapper.innerHTML = ''
    document.querySelectorAll('#devicesGrid .devices-card').forEach((card) => {
      const clone = card.cloneNode(true)
      const slide = document.createElement('div')
      slide.className = 'swiper-slide'
      slide.appendChild(clone)
      wrapper.appendChild(slide)
    })
    devicesSwiper = new Swiper(container, {
      modules: [Pagination],
      slidesPerView: 'auto',
      spaceBetween: 16,
      pagination: {
        el: pagination,
        clickable: true
      }
    })
  } else if (!isMobile && devicesSwiper) {
    devicesSwiper.destroy(true, true)
    devicesSwiper = null
    wrapper.innerHTML = ''
  }
}

function initServicesSwiper() {
  const isMobile = window.matchMedia('(max-width: 767px)').matches
  const container = document.querySelector('#servicesSwiper')
  const wrapper = container?.querySelector('.swiper-wrapper')
  const pagination = container?.querySelector('.swiper-pagination')
  if (!container || !wrapper) return

  if (isMobile && !servicesSwiper) {
    wrapper.innerHTML = ''
    servicesData.forEach(({ name, price, duration }) => {
      const slide = document.createElement('div')
      slide.className = 'swiper-slide'

      const card = document.createElement('div')
      card.className = 'service-card'

      const label1 = document.createElement('div')
      label1.className = 'service-card__label'
      label1.textContent = 'Ремонтные услуги'
      card.appendChild(label1)

      const nameEl = document.createElement('div')
      nameEl.className = 'service-card__name'
      nameEl.textContent = name
      card.appendChild(nameEl)

      const label2 = document.createElement('div')
      label2.className = 'service-card__label'
      label2.textContent = 'Цена'
      card.appendChild(label2)

      const priceEl = document.createElement('div')
      priceEl.className = 'service-card__value'
      priceEl.textContent = price
      card.appendChild(priceEl)

      const footer = document.createElement('div')
      footer.className = 'service-card__footer'

      const leftDiv = document.createElement('div')
      const label3 = document.createElement('p')
      label3.className = 'service-card__label'
      label3.textContent = 'Срок'
      leftDiv.appendChild(label3)

      const durationEl = document.createElement('div')
      durationEl.className = 'service-card__value'
      durationEl.textContent = duration
      leftDiv.appendChild(durationEl)
      footer.appendChild(leftDiv)

      const orderBtn = document.createElement('button')
      orderBtn.className = 'order-btn'
      orderBtn.type = 'button'
      orderBtn.textContent = 'Заказать'
      footer.appendChild(orderBtn)

      card.appendChild(footer)
      slide.appendChild(card)
      wrapper.appendChild(slide)
    })

    servicesSwiper = new Swiper(container, {
      modules: [Pagination],
      slidesPerView: 'auto',
      spaceBetween: 16,
      pagination: {
        el: pagination,
        clickable: true
      }
    })
  } else if (!isMobile && servicesSwiper) {
    servicesSwiper.destroy(true, true)
    servicesSwiper = null
    wrapper.innerHTML = ''
  }
}

// Запуск при загрузке и слежение за изменением ширины
const mobileMediaQuery = window.matchMedia('(max-width: 767px)')

function handleMediaChange() {
  initBrandsSwiper()
  initDevicesSwiper()
  initServicesSwiper()
}

// Первоначальная инициализация
handleMediaChange()

// Слушаем изменения ширины окна
mobileMediaQuery.addEventListener('change', handleMediaChange)

// Показать все/Скрыть: Бренды
const brandsToggle = document.querySelector('.toggle-btn--brands')
const brandsGrid = document.getElementById('brandsGrid')

brandsToggle?.addEventListener('click', () => {
  const isOpen = brandsToggle.classList.toggle('open')
  brandsGrid?.classList.toggle('show-all', isOpen)
})

// Показать все/Скрыть: Девайсы
const devicesToggle = document.querySelector('.toggle-btn--devices')
const devicesGrid = document.getElementById('devicesGrid')

devicesToggle?.addEventListener('click', () => {
  const isOpen = devicesToggle.classList.toggle('open')
  devicesGrid?.classList.toggle('show-all', isOpen)
})

// Сайдбар
const burger = document.querySelector('.header .header__menu')
const sidebar = document.querySelector('.sidebar')
const sidebarOverlay = document.querySelector('.sidebar__overlay')
const sidebarClose = document.querySelector('.sidebar .header__menu')

const openSidebar = () => {
  sidebar.classList.add('is-open')
  sidebarOverlay.classList.add('is-visible')
}
const closeSidebar = () => {
  sidebar.classList.remove('is-open')
  sidebarOverlay.classList.remove('is-visible')
}

burger?.addEventListener('click', openSidebar)
sidebarClose?.addEventListener('click', closeSidebar)
sidebarOverlay?.addEventListener('click', closeSidebar)

// Модалки
const openModal = (id) => document.getElementById(id)?.classList.add('is-open')
const closeModal = (el) => el?.classList.remove('is-open')

document
  .querySelectorAll('.header__call, .contacts__btn--call')
  .forEach((btn) =>
    btn.addEventListener('click', () => openModal('modal-call'))
  )

document
  .querySelectorAll('.header__chat, .contacts__btn--chat')
  .forEach((btn) =>
    btn.addEventListener('click', () => openModal('modal-feedback'))
  )

document
  .querySelectorAll('.modal__close')
  .forEach((btn) =>
    btn.addEventListener('click', () => closeModal(btn.closest('.modal')))
  )

document
  .querySelectorAll('.modal__overlay')
  .forEach((el) =>
    el.addEventListener('click', () => closeModal(el.closest('.modal')))
  )

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape')
    document.querySelectorAll('.modal.is-open').forEach(closeModal)
})
