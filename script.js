function calculateRemainingTime(event) {
  event.preventDefault();

  let completedHours = parseInt(document.getElementById("hours-id").value);
  const completedMinutes = parseInt(
    document.getElementById("minutes-id").value
  );
  const bookedLeave = parseInt(document.getElementById("leave-id").value);

  completedHours = completedHours + bookedLeave;

  if (completedHours === 8) {
    showModal(`Don't try to fool me Niggesh 😡.`, "niggesh");
    return;
  }
  if (
    isNaN(completedHours) ||
    isNaN(completedMinutes) ||
    completedHours < 0 ||
    completedMinutes < 0 ||
    completedHours > 8 ||
    completedMinutes >= 60
  ) {
    document.querySelectorAll(".input").forEach((input) => {
      if (!input.value) {
        input.classList.add("error");
      } else {
        input.classList.remove("error");
      }
    });
    return;
  }
  // Get the current time
  const currentTime = new Date();
  // Calculate remaining hours
  const remainingHours = 8 - completedHours;
  // Calculate remaining time in milliseconds
  const remainingTimeMillis =
    remainingHours * 60 * 60 * 1000 - completedMinutes * 60 * 1000;
  // Calculate completion time
  const completionTimeMillis = currentTime.getTime() + remainingTimeMillis;
  const completionTime = new Date(completionTimeMillis);
  // Format the completion time as a string in 12-hour format
  const hours = completionTime.getHours() % 12 || 12; // Convert to 12-hour format
  const minutes = completionTime.getMinutes();
  const ampm = completionTime.getHours() >= 12 ? "PM" : "AM";
  const completionTimeString = `${hours}:${
    minutes < 10 ? "0" : ""
  }${minutes} ${ampm}`;

  // Get the day of the week (0 for Sunday, 1 for Monday, ..., 6 for Saturday)
  const dayOfWeek = currentTime.getDay();

  if (dayOfWeek === 0 || dayOfWeek === 6) {
    showModal(`It's weekend bro get some chill!! 🥳`, "weekend");
    return;
  }

  if (dayOfWeek === 5) {
    showModal(
      `Your 8-hour shift will be completed at ${completionTimeString} and Happy Weekend 🤩🥳`,
      "friday"
    );
    return;
  }

  if (dayOfWeek === 1) {
    showModal(
      `It's monday and you has to work till ${completionTimeString} 🥲😅`,
      "monday"
    );
    return;
  }
  showModal(
    `Your 8-hour shift will be completed at ${completionTimeString}.`,
    "other"
  );
}

function showModal(message, img) {
  const modal = document.getElementById("modal");
  const modalText = document.getElementById("modal-text");
  const image = document.getElementById(`${img}-img`);

  image.style.display = "block";
  modalText.textContent = message;
  modal.style.display = "block";
}

function closeModal() {
  const imgTags = document.querySelectorAll("img");
  const modal = document.getElementById("modal");
  modal.style.display = "none";
  imgTags.forEach((img) => {
    img.style.display = "none";
  });
}

window.onclick = function (event) {
  const imgTags = document.querySelectorAll("img");
  const modal = document.getElementById("modal");
  if (event.target == modal) {
    modal.style.display = "none";
  }
  imgTags.forEach((img) => {
    img.style.display = "none";
  });
};

document.getElementById("close-modal").addEventListener("click", closeModal);
document
  .getElementById("time-form")
  .addEventListener("submit", calculateRemainingTime);
