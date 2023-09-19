export const utilService = {
    makeId,
    makeLorem,
    getRandomIntInclusive,
    loadFromStorage,
    saveToStorage,
    animateCSS,
    getTimeFromStamp
}

function makeId(length = 6) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}

function makeLorem(size = 20) {
    var words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn']
    var txt = ''
    while (size > 0) {
        size--
        txt += words[Math.floor(Math.random() * words.length)] + ' '
    }
    return txt
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive 
}

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

function loadFromStorage(key) {
    const data = localStorage.getItem(key)
    return (data) ? JSON.parse(data) : undefined
}

// In our utilService
function animateCSS(el, animation) {
    const prefix = 'animate__'
    return new Promise((resolve, reject) => {
        const animationName = `${prefix}${animation}`

        el.classList.add(`${prefix}animated`, animationName)

        // When the animation ends, we clean the classes and resolve the Promise
        function handleAnimationEnd(event) {
            event.stopPropagation()
            el.classList.remove(`${prefix}animated`, animationName)
            resolve('Animation ended')
        }
        el.addEventListener('animationend', handleAnimationEnd, { once: true })
    })
}


function getTimeFromStamp(timestamp) {
    const days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
    ]
    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ]
    const date = new Date(timestamp)
    const time =
        timeFormat(date.getHours()) + ':' + timeFormat(date.getMinutes())
    const currTimestamp = Date.now()
    const currDate = new Date(currTimestamp)
    const day = 1000 * 60 * 60 * 24
    if (currTimestamp - timestamp < day) return 'Today ' + time
    if (currTimestamp - timestamp < day * 2) return 'Yesterday ' + time
    if (currTimestamp - timestamp < day * 7) return days[date.getDay()]
    if (currDate.getUTCFullYear() !== date.getUTCFullYear())
        return months[date.getMonth()].slice(0, 3) + ' ' + date.getUTCFullYear()
    return date.getDate() + ' ' + months[date.getMonth()].slice(0, 3)
}

function timeFormat(time) {
    return time < 10 ? '0' + time : time
}
function debounce(fn, wait) {
    let timer
    return function (...args) {
        if (timer) {
            clearTimeout(timer) // clear any pre-existing timer
        }
        const context = this // get the current context
        timer = setTimeout(() => {
            fn.apply(context, args) // call the function if time expires
        }, wait)
    }
}