
$(function () {
  $('.saveBtn').on('click', function() {
    var currentHourPlan = $(this).siblings('textarea').val()
    var currentHour = $(this).parent().attr('id').match(/\d+/)[0]
    let schedule = localStorage.getItem('schedule')
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


  var hourBlocks = $('.time-block')
  
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

  var scheduleObj = JSON.parse(localStorage.getItem('schedule')) ? JSON.parse(localStorage.getItem('schedule')) : {}
  var scheduleObjKeys = Object.keys(scheduleObj)
  let allTextAreas = $('textarea')
  $.each(allTextAreas, function (j, textArea) {
    let thisHour = String($(this).parent().attr('id').match(/\d+/)[0])
    if (scheduleObjKeys.includes(thisHour)) {
      $(this).text(scheduleObj[thisHour])
    }
  })

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

  let ordinalEnding = getOrdinalEnding()
  let today = dayjs().format('dddd, MMMM D')
  $('#currentDay').text(today+ordinalEnding)
});

