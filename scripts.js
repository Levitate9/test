//onBlur effect for all of fields
const showOverlay = function () {
  let overlay = document.querySelector('.overlay')
  overlay.style.visibility = 'visible'
}

const hideOverlay = function () {
  let overlay = document.querySelector('.overlay')
  overlay.style.visibility = 'hidden'
}

const closeAllFields = function () {
  let dayPicker = document.querySelector('#day-picker')
  let monthPicker = document.querySelector('#month-picker')
  let yearPicker = document.querySelector('#year-picker')

  dayPicker.style.visibility = 'hidden'
  monthPicker.style.visibility = 'hidden'
  yearPicker.style.visibility = 'hidden'

  hideOverlay()
}

//-----------------------------------------------------------------//

//birth date handlers
const setDay = function (e) {
  let currentDay = document.querySelector('.current-day')
  let dayPicker = document.querySelector('#day-picker')
  currentDay.innerHTML = e.currentTarget.value
  dayPicker.style.visibility = 'hidden'
}

const setMonth = function (e) {
  let currentMonth = document.querySelector('.current-month')
  let monthPicker = document.querySelector('#month-picker')
  currentMonth.innerHTML = e.target.attributes.value.textContent
  monthPicker.style.visibility = 'hidden'
}

const setYear = function (e) {
  let currentYear = document.querySelector('.current-year')
  let yearPicker = document.querySelector('#year-picker')
  currentYear.innerHTML = e.currentTarget.value
  yearPicker.style.visibility = 'hidden'
}

const toggleDay = function () {
  let dayPicker = document.querySelector('#day-picker')
  let monthPicker = document.querySelector('#month-picker')
  let yearPicker = document.querySelector('#year-picker')

  dayPicker.childNodes ? dayPicker.replaceChildren() : null
  monthPicker.replaceChildren()
  yearPicker.replaceChildren()

  for (let i = 1; i <= 31; i++) {
    let li = document.createElement('li')
    li.setAttribute('value', i)
    li.setAttribute('class', 'day-item')
    li.onclick = setDay
    li.innerHTML = i
    dayPicker.appendChild(li)
  }

  dayPicker.style.visibility === 'hidden'
    ? dayPicker.style.visibility = 'visible'
    : dayPicker.style.visibility = 'hidden'

  showOverlay()
}

const toggleMonth = function () {
  let dayPicker = document.querySelector('#day-picker')
  let monthPicker = document.querySelector('#month-picker')
  let yearPicker = document.querySelector('#year-picker')

  dayPicker.replaceChildren()
  monthPicker.childNodes ? monthPicker.replaceChildren() : null
  yearPicker.replaceChildren()

  let months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  for (let i = 0; i < 12; i++) {
    let li = document.createElement('li')
    li.setAttribute('value', months[i])
    li.setAttribute('class', 'month-item')
    li.onclick = setMonth
    li.innerHTML = months[i]
    monthPicker.appendChild(li)
  }

  monthPicker.style.visibility === 'hidden'
    ? monthPicker.style.visibility = 'visible'
    : monthPicker.style.visibility = 'hidden'

  showOverlay()
}

const toggleYear = function () {
  let dayPicker = document.querySelector('#day-picker')
  let monthPicker = document.querySelector('#month-picker')
  let yearPicker = document.querySelector('#year-picker')

  dayPicker.replaceChildren()
  monthPicker.replaceChildren()
  yearPicker.childNodes ? yearPicker.replaceChildren() : null

  let date = new Date()
  let year = date.getFullYear()

  for (let i = year - 14; i >= 1900; i--) {
    let li = document.createElement('li')
    li.setAttribute('value', i)
    li.setAttribute('class', 'year-item')
    li.onclick = setYear
    li.innerHTML = i
    yearPicker.appendChild(li)
  }

  yearPicker.style.visibility === 'hidden'
    ? yearPicker.style.visibility = 'visible'
    : yearPicker.style.visibility = 'hidden'

  showOverlay()
}

//-----------------------------------------------------------------//

//fields validation
const validate = function (fieldId) {
  let value, p

  switch (fieldId) {

    case 'first-name':
      nameCheck(fieldId)
      break

    case 'last-name':
      nameCheck(fieldId)
      break

    case 'email':
      const email = document.querySelector('#email')
      value = email.value
      p = document.querySelector('.error-message-email')

      if (value.length > 0) {
        emailCheck(email, value, p)
      } else {
        setError(email, p, 'field is required')
      }

      break

    case 'password':
    case 'confirm':
  }
}

//-----------------------------------------------------------------//

//utils: add new error
const setError = (field, p, text) => {
  field.classList.add('error')
  p.classList.add('error')
  p.innerHTML = text
}

//utils: remove error 
const removeError = (field, p) => {
  if (field.classList) {
    field.classList.contains('error') && field.classList.remove('error')
    p.classList.contains('error') && p.classList.remove('error')
    p.innerHTML = ''
  }
}

//utils: uppercase
const firstLetterUppercase = (str) => str.charAt(0).toUpperCase() + str.slice(1)

//utils: check for numbers
const checkForNumbers = (field, value, p) => {
  const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']

  for (let i = 0; i < numbers.length; i++) {
    if (value.includes(numbers[i])) {
      setError(field, p, 'only letters accepted')
      break
    } else {
      removeError(field, p)
    }
  }
}

//utils: name check
const nameCheck = (field) => {
  const name = document.querySelector(`#${field}`)
  value = name.value
  p = document.querySelector(`.error-message-${field}`)

  if (value.length > 0) {
    name.value = firstLetterUppercase(value)
    checkForNumbers(name, value, p)
  } else {
    setError(name, p, 'field is required')
  }
}

//utils: email check
const emailCheck = (field, value, p) => {
  //simple check just to introduce functionality
  const reg = /@/

  if (!reg.test(value)) {
    setError(field, p, 'invalid email')
  } else {
    removeError(field, p)
  }
}

//utils: password check
const passwordCheck = (value) => {

}
//utils: confirm check

//-----------------------------------------------------------------//