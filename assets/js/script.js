$(document).ready(function() {
  // Display the current day at the top of the calendar
  $("#currentDay").text(moment().format("dddd, MMMM Do"))

  // Check the current time against each time block and color-code accordingly
  $(".time-block").each(function() {
    const currentHour = moment().hours()
    const blockHour = parseInt($(this).attr("id"))

    if (blockHour < currentHour) {
      $(this).children(".row").children(".description").addClass("past")
    } else if (blockHour === currentHour) {
      $(this).children(".row").children(".description").addClass("present")
    } else {
      $(this).children(".row").children(".description").addClass("future")
    }
  })

  // Save events to local storage when the Save button is clicked
	$(".saveBtn").on("click", function() {
		const eventText = $(this).siblings(".description").val().trim()
		const eventHour = $(this).siblings(".hour").text().trim()
		const eventTime = moment().format("YYYY-MM-DD") + "-" + eventHour
	
		localStorage.setItem(eventTime, eventText)
	})
	
  // Load saved events from local storage on page load
  $(".time-block").each(function() {
    const eventTime = $(this).attr("id")
    const eventText = localStorage.getItem(eventTime)

    $(this).children(".row").children(".description").val(eventText)
  })
})

const saveButtons = document.querySelectorAll(".saveBtn");
for (let i = 0; i < saveButtons.length; i++) {
  saveButtons[i].addEventListener("click", function(e) {
    const text = e.target.closest(".row").querySelector(".description").value;
    const hour = e.target.closest(".row").querySelector(".hour").textContent.trim();
    localStorage.setItem(hour, text);
  });
}

function loadSavedData() {
  const descriptionElements = document.querySelectorAll(".description");
  const hourElements = document.querySelectorAll(".hour");
  for (let i = 0; i < descriptionElements.length; i++) {
    const hour = hourElements[i].textContent.trim();
		console.log(hour);
    const eventTime = moment().format("YYYY-MM-DD") + "-" + hour;
		console.log(eventTime);
    const savedText = localStorage.getItem(eventTime);
		console.log(savedText);
    if (savedText !== null) {
      descriptionElements[i].value = savedText;
    }
  }
}

loadSavedData();
