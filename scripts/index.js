import { getFromLocalStorage } from "./operations/operations.js";
import { LoginModal } from "./classes/Modal.js";

let filteredArray = [];
export const container = document.querySelector(".container");

if (JSON.parse(localStorage.getItem("token"))) {
  document.querySelector(".calllogin")?.remove();
  getFromLocalStorage();
}

document.querySelector(".calllogin")?.addEventListener("click", () => {
  new LoginModal().render();
});

document.querySelector(".filtersub").addEventListener("click", () => {
  document.querySelector(".nocardsinfo")?.remove();
  // if (document.querySelector(".filtersub").innerText.toLowerCase() === "filter") {
    filteredArray = JSON.parse(localStorage.getItem("array")).filter(
      ({ doctor, fullName, desc, purpose, status, urgency }) =>
        (doctor
          .toLowerCase()
          .includes(document.querySelector("#search").value.toLowerCase()) ||
          fullName
            .toLowerCase()
            .includes(document.querySelector("#search").value.toLowerCase()) ||
          desc
            .toLowerCase()
            .includes(document.querySelector("#search").value.toLowerCase()) ||
          purpose
            .toLowerCase()
            .includes(document.querySelector("#search").value.toLowerCase())) &&
        status.includes(document.querySelector("#filterStatus").value) &&
        urgency.includes(document.querySelector("#filterUrgency").value)
    );
    
    document.querySelectorAll(".card").forEach((el) => el.remove());
    getFromLocalStorage(filteredArray);
  
});

 