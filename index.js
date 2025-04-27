/************ DARK MODE ************/

let themeButton = document.getElementById("theme-button");

const toggleDarkMode = () => {
  document.body.classList.toggle("dark-mode");
};

themeButton.addEventListener("click", toggleDarkMode);


/************ ADD PARTICIPANT ************/

let count = 3;

const addParticipant = (person) => {
  const newParticipant = document.createElement("p");
  newParticipant.textContent = `💄 ${person.name} who loves ${person.style} has RSVP'd.`;

  const participantList = document.querySelector(".rsvp-participants");
  participantList.appendChild(newParticipant);

  count += 1;
  const countDisplay = document.getElementById("rsvp-count");
  countDisplay.textContent = `⭐ ${count} glam-lovers have RSVP'd to this beauty-tech experience!`;
};


/************ FORM VALIDATION ************/

const validateForm = (event) => {
  event.preventDefault();

  let containsErrors = false;
  const rsvpInputs = document.getElementById("rsvp-form").elements;

  const person = {
    name: document.getElementById("name").value.trim(),
    email: document.getElementById("email").value.trim(),
    style: document.getElementById("style").value.trim()
  };

  for (let i = 0; i < rsvpInputs.length; i++) {
    const input = rsvpInputs[i];

    if (input.type !== "submit") {
      if (input.value.trim().length < 2) {
        input.classList.add("error");
        containsErrors = true;
      } else {
        input.classList.remove("error");
      }
    }
  }

  const emailInput = document.getElementById("email");
  if (!emailInput.value.includes("@")) {
    emailInput.classList.add("error");
    containsErrors = true;
  } else {
    emailInput.classList.remove("error");
  }

  if (!containsErrors) {
    addParticipant(person);
    toggleModal(person);

    for (let i = 0; i < rsvpInputs.length; i++) {
      if (rsvpInputs[i].type !== "submit") {
        rsvpInputs[i].value = "";
        rsvpInputs[i].classList.remove("error");
      }
    }

    const successMsg = document.getElementById("success-msg");
    if (successMsg) {
      successMsg.style.display = "block";
      setTimeout(() => {
        successMsg.style.display = "none";
      }, 3000);
    }
  }
};

const form = document.getElementById("rsvp-form");
form.addEventListener("submit", validateForm);


/************ MODAL POPUP + IMAGE ANIMATION ************/

let rotateFactor = 0;
const modalImage = document.getElementById("modal-image");

const animateImage = () => {
  rotateFactor = rotateFactor === 0 ? -10 : 0;
  if (modalImage) {
    modalImage.style.transform = `rotate(${rotateFactor}deg)`;
  }
};

const toggleModal = (person) => {
  const modal = document.getElementById("success-modal");
  const modalText = document.getElementById("modal-text");

  if (!modal || !modalText) {
    console.error("Modal element not found");
    return;
  }

  modal.style.display = "flex";
  modalText.textContent = `🎉 Thanks for RSVPing, ${person.name}! We can’t wait to see you!`;

  const intervalId = setInterval(animateImage, 500);

  setTimeout(() => {
    modal.style.display = "none";
    clearInterval(intervalId);
  }, 5000);
};
