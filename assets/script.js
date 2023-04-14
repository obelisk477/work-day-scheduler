
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  $('.saveBtn').on('click', function() {
    var currentHourPlan = $(this).siblings('textarea').val()
    console.log(currentHourPlan)
  })

  var hourBlocks = $('.time-block')
  $.each(hourBlocks, function(i ,hourBlock) {
    let hour = Number($(this).attr("id").match(/\d+/)[0])
    // Fakes the hour as 12 o clock noon -- remove prior to production
    let nowHour = Number(dayjs().hour(11).format('H'))
    if (hour < nowHour) {
      $(this).addClass("past")
    } else if (hour === nowHour) {
      $(this).addClass("present")
    } else {
      $(this).addClass("future")

    }
  })
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?


  // TODO: Add code to display the current date in the header of the page.
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

