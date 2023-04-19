
$(function () {

  // Logic for button clicks on the save icons
  $('.saveBtn').on('click', function() {
    var currentHourPlan = $(this).siblings('textarea').val()
    var currentHour = $(this).parent().attr('id').match(/\d+/)[0]
    let schedule = localStorage.getItem('schedule')

    // Check for (and handle) empty local storage if applicable; else save current textArea value to corresponding hour in local storage
    if (!schedule) {
      let scheduleObj = {}
      scheduleObj[currentHour] = currentHourPlan
      localStorage.setItem('schedule', JSON.stringify(scheduleObj))
    } else {
      var scheduleObj = JSON.parse(localStorage.getItem('schedule'))
      scheduleObj[currentHour] = currentHourPlan
      localStorage.setItem('schedule', JSON.stringify(scheduleObj))
    }
  })

  // Grab all hour blocks
  var hourBlocks = $('.time-block')

  // Loop through hour blocks and set classes (and therefore styles) for past, present, and future time blocks
  $.each(hourBlocks, function() {
    let hour = Number($(this).attr("id").match(/\d+/)[0])
    let nowHour = Number(dayjs().format('H'))
    if (hour < nowHour) {
      $(this).addClass("past")
    } else if (hour === nowHour) {
      $(this).addClass("present")
    } else {
      $(this).addClass("future")
    }
  })

  // Loop through local storage, grab all textareas (hours), and add saved events to relevant hours
  var scheduleObj = JSON.parse(localStorage.getItem('schedule')) ? JSON.parse(localStorage.getItem('schedule')) : {}
  var scheduleObjKeys = Object.keys(scheduleObj)
  let allTextAreas = $('textarea')
  $.each(allTextAreas, function (j, textArea) {
    let thisHour = String($(this).parent().attr('id').match(/\d+/)[0])
    if (scheduleObjKeys.includes(thisHour)) {
      $(this).text(scheduleObj[thisHour])
    }
  })

  // Helper function for adding ordinal text to end of day
  let getOrdinalEnding = function() {
    let today = Number(dayjs().format('D'))
    if (today == 1 || today == 21 || today == 31) {
      return 'st'
    } else if (today == 2 || today == 22) {
      return 'nd'
    } else if (today == 3 || today == 23) {
      return 'rd'
    } else {
      return 'th'
    }
  }

  // Set date at top of page
  let ordinalEnding = getOrdinalEnding()
  let today = dayjs().format('dddd, MMMM D')
  $('#currentDay').text(today+ordinalEnding)
});

