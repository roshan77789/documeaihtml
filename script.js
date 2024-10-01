document.addEventListener('DOMContentLoaded', () => {
  // -----------------------------------  for custom cursor

  const cursorDot = document.querySelector('[data-cursor-dot]')
  const cursorOutline = document.querySelector('[data-cursor-outline]')

  window.addEventListener('mousemove', (e) => {
    const posX = e.clientX
    const posY = e.clientY

    cursorDot.style.left = `${posX}px`
    cursorDot.style.top = `${posY}px`

    cursorOutline.animate(
      {
        left: `${posX}px`,
        top: `${posY}px`,
      },
      { duration: 500, fill: 'forwards' }
    )
  })

  const hoverElements = document.querySelectorAll('a, button')
  const videoHover = document.querySelector('.video-wrap video')

  videoHover.addEventListener('click', () => {
    if (videoHover.paused) {
      videoHover.setAttribute('autoplay', 'true')
      videoHover.setAttribute('controls', 'true')
      videoHover.muted = false
      videoHover.play()
    } else {
      videoHover.pause()
    }
  })

  videoHover.addEventListener('mouseover', () => {
    cursorDot.style.opacity = '0'
    cursorOutline.textContent = 'Play'
    cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)'
    cursorOutline.style.background = '#0082cb'
    cursorOutline.style.color = 'white'
    cursorOutline.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.3)'
    cursorOutline.style.padding = '20px'
    cursorOutline.style.borderRadius = '50%'
    cursorOutline.style.fontSize = '14px'
    cursorOutline.style.width = '70px'
    cursorOutline.style.height = '70px'
    cursorOutline.style.textAlign = 'center'
  })

  videoHover.addEventListener('mouseleave', () => {
    cursorDot.style.opacity = '1'
    cursorOutline.textContent = ''
    cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)'
    cursorOutline.style.background = 'transparent'
    cursorOutline.style.color = 'black'
    cursorOutline.style.boxShadow = 'none'
    cursorOutline.style.padding = '0'
    cursorOutline.style.borderRadius = '50%'
    cursorOutline.style.fontSize = '0'
    cursorOutline.style.width = '50px'
    cursorOutline.style.height = '50px'
  })

  hoverElements.forEach((element) => {
    element.addEventListener('mouseover', () => {
      cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)'
      cursorDot.style.transform = 'translate(-50%, -50%) scale(0)'
    })

    element.addEventListener('mouseleave', () => {
      cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)'
      cursorDot.style.transform = 'translate(-50%, -50%) scale(1)'
    })
  })

  // -----------------------------------  for custom cursor end

  // ----------------------------------- for Scroll Top Js

  window.addEventListener('scroll', function () {
    var scrolled = window.scrollY || document.documentElement.scrollTop

    if (scrolled > 600) {
      document.querySelector('.go-top').classList.add('active')
    } else {
      document.querySelector('.go-top').classList.remove('active')
    }
  })

  document.querySelector('.go-top').addEventListener('click', function () {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  })

  // ----------------------------------- for Scroll Top Js end

  // ----------------------------------- for header sticky

  let lastScrollTop = 0
  let lastHidePosition = 0
  const header = document.querySelector('.header')

  window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop

    if (scrollTop > 300) {
      if (scrollTop > lastScrollTop) {
        header.style.top = '-200px'
        lastHidePosition = scrollTop
      } else {
        if (lastHidePosition - scrollTop >= 100) {
          header.style.top = '0'
        }
      }
    }

    lastScrollTop = scrollTop
  })

  // ----------------------------------- for header sticky end

  //  --------------------------------------- for mobile nav toggle

  const listIcon = document.querySelector('.bi-list')
  const xIcon = document.querySelector('.mobile-navbar .bi-x')
  const mobileNav = document.querySelector('.mobile-navbar')

  mobileNav.style.right = '-300px'

  listIcon.addEventListener('click', () => {
    mobileNav.style.right = '0'
  })

  xIcon.addEventListener('click', () => {
    mobileNav.style.right = '-300px'
  })

  //  --------------------------------------- for mobile nav toggle end

  //   ------------------------------------  for dynamic text

  const dynamicTextElement = document.getElementById('dynamic-text')
  const baseText = 'Hi, '
  const text1 = "I'm DocuMee"
  const text2 = 'I can create documentation for you'
  let currentText = text1
  let delay = 100
  let deleteSpeed = 50
  let pauseBetweenCycles = 3000

  function writeText(text, callback) {
    let index = 0
    const writeInterval = setInterval(() => {
      dynamicTextElement.textContent = baseText + text.slice(0, index)
      index++
      if (index > text.length) {
        clearInterval(writeInterval)
        setTimeout(callback, pauseBetweenCycles)
      }
    }, delay)
  }

  function deleteText(callback) {
    let index = currentText.length
    const deleteInterval = setInterval(() => {
      dynamicTextElement.textContent = baseText + currentText.slice(0, index)
      index--
      if (index < 0) {
        clearInterval(deleteInterval)
        setTimeout(callback, delay)
      }
    }, deleteSpeed)
  }

  function loopText() {
    writeText(currentText, () => {
      deleteText(() => {
        currentText = currentText === text1 ? text2 : text1
        loopText()
      })
    })
  }

  loopText()

  //   ------------------------------------  for dynamic text end

  // --------------------------------------- for feature row reverse

  const allFeatures = document.querySelectorAll('.feature')

  allFeatures.forEach((div, index) => {
    if (index % 2 === 0) {
      div.classList.add('flex-row-reverse')
    }

    div
      .querySelectorAll('.feature p, .feature h3, .feature h5')
      .forEach((text) => {
        text.classList.add('goes-down')
      })

    if (div.classList.contains('flex-row-reverse')) {
      const featureImage = div
        .querySelectorAll('.feature img')
        .forEach((img) => img.classList.add('goes-to-right'))
    } else {
      const featureImage = div
        .querySelectorAll('.feature img')
        .forEach((img) => img.classList.add('goes-to-left'))
    }
  })

  // --------------------------------------- for feature row reverse end

  const whyP = document.querySelectorAll('.why-wrapper p')

  whyP.forEach((p) => {
    p.classList.add('has-opacity')
  })

  // ----------------------- for goes to left

  const goestToLeftIntersectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle(
          'from-left-to-original',
          entry.isIntersecting
        )
      })
    },
    {
      // threshold: 0.2,
    }
  )

  const goesToLeft = document.querySelectorAll('.goes-to-left')
  goesToLeft.forEach((e) => {
    goestToLeftIntersectionObserver.observe(e)
  })

  // ----------------------- for goes to left end

  // ----------------------- for goes to right

  const goestToRightIntersectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle(
          'from-right-to-original',
          entry.isIntersecting
        )
      })
    },
    {
      // threshold: 0.2,
    }
  )

  const goesToRight = document.querySelectorAll('.goes-to-right')
  goesToRight.forEach((e) => {
    goestToRightIntersectionObserver.observe(e)
  })

  // ----------------------- for goes to right end

  // ----------------------- for has opacity

  const hasOpacityIntersectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle('no-opacity', entry.isIntersecting)
      })
    },
    {
      // threshold: 0.2,
    }
  )

  const hasOpacity = document.querySelectorAll('.has-opacity')
  hasOpacity.forEach((e) => {
    hasOpacityIntersectionObserver.observe(e)
  })

  // -------------------------------- for no opacity end

  // -------------------------------- for goes down

  const goesDownIntersectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle('down-to-original', entry.isIntersecting)
      })
    },
    {
      // threshold: 0.2,
    }
  )

  const goedDown = document.querySelectorAll('.goes-down')
  goedDown.forEach((e) => {
    goesDownIntersectionObserver.observe(e)
  })

  // -------------------------------- for goes down end

  // -------------------------------- for button hover animation

  document.querySelectorAll('.button_su_inner').forEach((button) => {
    const updateCirclePosition = (e, circle) => {
      const parentOffset = button.getBoundingClientRect()
      const relX = e.clientX - parentOffset.left
      const relY = e.clientY - parentOffset.top

      circle.style.left = `${relX}px`
      circle.style.top = `${relY}px`
    }

    const toggleClasses = (circle, isMouseEnter) => {
      const parentDiv = button.closest('.button_su')
      const isPrimary = parentDiv.classList.contains('btn-bg-primary')

      if (isMouseEnter) {
        circle.classList.remove(
          isPrimary ? 'dexplodePrimary-circle' : 'dexplodeSecondary-circle'
        )
        circle.classList.add(
          isPrimary ? 'explodePrimary-circle' : 'explodeSecondary-circle'
        )
      } else {
        circle.classList.remove(
          isPrimary ? 'explodePrimary-circle' : 'explodeSecondary-circle'
        )
        circle.classList.add(
          isPrimary ? 'dexplodePrimary-circle' : 'dexplodeSecondary-circle'
        )
      }
    }

    button.addEventListener('mouseenter', function (e) {
      const circle = this.previousElementSibling
      updateCirclePosition(e, circle)
      toggleClasses(circle, true)
    })

    button.addEventListener('mouseleave', function (e) {
      const circle = this.previousElementSibling
      updateCirclePosition(e, circle)
      toggleClasses(circle, false)
    })
  })

  // -------------------------------- for button hover animation end

  // --------------------------------- for price swiper js

  var swiper = new Swiper('.priceSwiper', {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 2, // Default setting for larger screens
    coverflowEffect: {
      rotate: 10,
      stretch: 0,
      depth: 200,
      modifier: 4,
      slideShadows: true,
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
        coverflowEffect: {
          rotate: 100,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        },
      },
      600: {
        slidesPerView: 2, 
        coverflowEffect: {
          rotate: 10, 
          stretch: 0,
          depth: 200,
          modifier: 4,
          slideShadows: true,
        },
      },
    },
  })

  // --------------------------------- for price swiper js end
})
