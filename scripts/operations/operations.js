import {CreateModal, EditModal} from "../classes/Modal.js";
import {VisitCardiologist, VisitDentist, VisitTherapist} from "../classes/Visit.js";
import {container} from "../index.js";

const baseUrl = "https://ajax.test-danit.com/api/v2/cards"
let currentArray = [];
let newCardObj = {};

export const loadAndSetLocalStorage = function () {
    fetch(`${baseUrl}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))} `,
        },
    })
        .then((resp) => resp.json())
        .then((array) => {
            localStorage.setItem("array", JSON.stringify(array));
            currentArray = JSON.parse(localStorage.getItem("array"));
            getFromLocalStorage();
        })
        .catch((error) => {
            console.warn("SERVER ERROR", error);
            alert(
                "There are problems with server. If they persevere, please try again later."
            );
            location.reload();
        });
};

export const getFromLocalStorage = function (
    array = JSON.parse(localStorage.getItem("array"))
) {
    if (!Array.isArray(JSON.parse(localStorage.getItem("array")))) {
        loadAndSetLocalStorage();
    }
    document.querySelector(".callmodal")?.remove();
    document
        .querySelector(".header")
        .insertAdjacentHTML(
            "beforeend",
            `<button class="callmodal">Create Visit</button>`
        );
    document.querySelector(".callmodal")?.addEventListener("click", () => {
        new CreateModal().render();
    });

    if (array.length === 0) {
        if (document.querySelector(".filtersub").innerText === "FILTER") {
            document
                .querySelector(".container")
                .insertAdjacentHTML(
                    "afterbegin",
                    `<p class="nocardsinfo">There is no any cards</p>`
                );
        } else {
            document
                .querySelector(".container")
                .insertAdjacentHTML(
                    "afterbegin",
                    `<p class="nocardsinfo">No items correspond to your request, try again</p>`
                );
        }
    } else {
        document.querySelector(".nocardsinfo")?.remove();

        array.forEach(
            ({
                 age = "no info",
                 desc = "no info",
                 doctor = "no info",
                 fullName = "no info",
                 urgency = "no info",
                 purpose = "no info",
                 status: statusVisit = "no info",
                 heartIllness = "no info",
                 id,
                 pressure = "no info",
                 weightIndex = "no info",
                 lastDateVisit = "no info",
             }) => {
                if (doctor === "Cardiologist") {
                    new VisitCardiologist(
                        age,
                        desc,
                        doctor,
                        fullName,
                        urgency,
                        purpose,
                        statusVisit,
                        heartIllness,
                        id,
                        pressure,
                        weightIndex,
                        lastDateVisit,
                        edit,
                        deleteF
                    ).render(container);
                } else if (doctor === "Dentist") {
                    new VisitDentist(
                        age,
                        desc,
                        doctor,
                        fullName,
                        urgency,
                        purpose,
                        statusVisit,
                        heartIllness,
                        id,
                        pressure,
                        weightIndex,
                        lastDateVisit,
                        edit,
                        deleteF
                    ).render(container);
                } else if (doctor === "Therapist") {
                    new VisitTherapist(
                        age,
                        desc,
                        doctor,
                        fullName,
                        urgency,
                        purpose,
                        statusVisit,
                        heartIllness,
                        id,
                        pressure,
                        weightIndex,
                        lastDateVisit,
                        edit,
                        deleteF
                    ).render(container);
                }
            }
        );
    }
};

export function deleteF() {
    fetch(`${baseUrl}/${this.id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
    })
        .then((response) => {
            currentArray = JSON.parse(localStorage.getItem("array"));
            if (response.ok) {
                currentArray.splice(
                    currentArray.indexOf(currentArray.find((el) => el.id === this.id)),
                    1
                );
                localStorage.setItem("array", JSON.stringify(currentArray));
                document.querySelectorAll(".card").forEach((el) => el.remove());
                getFromLocalStorage();
            } else {
                throw new Error();
            }
        })
        // .catch((error) => {
        //     console.warn("SERVER ERROR", error);
        //     alert(
        //         "There are problems with server. Check you are not log-Out and try again later."
        //     );
        //     location.reload();
        // });
}
export function edit() {
    new EditModal(
        this.age,
        this.desc,
        this.doctor,
        this.fullName,
        this.urgency,
        this.purpose,
        this.status,
        this.heartIllness,
        this.id,
        this.pressure,
        this.weightIndex,
        this.lastDateVisit,
        confirmE
    ).render();
}

export const confirmE = function (
    doctor,
    purpose,
    description,
    urgency,
    fullName,
    status,
    age,
    heartIllness,
    id,
    pressure,
    weightIndex,
    lastDateVisit
) {
    if (doctor === "Therapist") {
        newCardObj = {
            age: age,
            desc: description,
            doctor: doctor,
            fullName: fullName,
            urgency: urgency,
            purpose: purpose,
            status: status,
            heartIllness: "none",
            id: id,
            pressure: "none",
            weightIndex: "none",
            lastDateVisit: "none",
        };
    } else if (doctor === "Cardiologist") {
        newCardObj = {
            age: age,
            desc: description,
            doctor: doctor,
            fullName: fullName,
            urgency: urgency,
            purpose: purpose,
            status: status,
            heartIllness: heartIllness,
            id: id,
            pressure: pressure,
            weightIndex: weightIndex,
            lastDateVisit: "none",
        };
    } else if (doctor === "Dentist") {
        newCardObj = {
            age: "none",
            desc: description,
            doctor: doctor,
            fullName: fullName,
            urgency: urgency,
            purpose: purpose,
            status: status,
            heartIllness: "none",
            id: id,
            pressure: "none",
            weightIndex: "none",
            lastDateVisit: lastDateVisit,
        };
    }
    fetch(`${baseUrl}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
        body: JSON.stringify(newCardObj),
    })
        .then((response) => response.json())
        .then((response) => {
            currentArray = JSON.parse(localStorage.getItem("array"));
            if (newCardObj.id === response.id) {
                currentArray[
                    currentArray.indexOf(currentArray.find((el) => el.id === response.id))
                    ] = newCardObj;
                localStorage.setItem("array", JSON.stringify(currentArray));
                document.querySelectorAll(".card").forEach((el) => el.remove());
                getFromLocalStorage();
            } else {
                throw new Error();
            }
        })
        .catch((err) => {
            console.warn("SERVER ERROR", err);
            alert(
                "There are problems with server. If they persevere, please try again later."
            );
            location.reload();
        });
};

export const confirmF = function (
    selectDoctor,
    inputPurpose,
    inputDescription,
    selectUrgency,
    inputFullName,
    selectStatus,
    inputAge,
    inputheartIllness,
    inputpressure,
    inputweightIndex,
    inputlastDateVisit
) {
    newCardObj = {
        age: inputAge ? inputAge : "none",
        desc: inputDescription ? inputDescription : "none",
        doctor: selectDoctor ? selectDoctor : "none",
        fullName: inputFullName ? inputFullName : "none",
        urgency: selectUrgency ? selectUrgency : "none",
        purpose: inputPurpose ? inputPurpose : "none",
        status: selectStatus ? selectStatus : "none",
        heartIllness: inputheartIllness ? inputheartIllness : "none",
        id: 0,
        pressure: inputpressure ? inputpressure : "none",
        weightIndex: inputweightIndex ? inputweightIndex : "none",
        lastDateVisit: inputlastDateVisit ? inputlastDateVisit : "none",
    };
    fetch(`${baseUrl}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
        body: JSON.stringify({
            age: inputAge ? inputAge : "none",
            desc: inputDescription ? inputDescription : "none",
            doctor: selectDoctor ? selectDoctor : "none",
            fullName: inputFullName ? inputFullName : "none",
            urgency: selectUrgency ? selectUrgency : "none",
            purpose: inputPurpose ? inputPurpose : "none",
            status: selectStatus ? selectStatus : "none",
            heartIllness: inputheartIllness ? inputheartIllness : "none",
            pressure: inputpressure ? inputpressure : "none",
            weightIndex: inputweightIndex ? inputweightIndex : "none",
            lastDateVisit: inputlastDateVisit ? inputlastDateVisit : "none",
        }),
    })
        .then((response) => response.json())
        .then((response) => {
            currentArray = JSON.parse(localStorage.getItem("array"));
            if (response.id) {
                newCardObj.id = response.id;
                currentArray = [...currentArray, ...[newCardObj]];
                localStorage.setItem("array", JSON.stringify(currentArray));
                document.querySelectorAll(".card").forEach((el) => el.remove());
                getFromLocalStorage();
            } else {
                throw new Error();
            }
        })
        .catch((error) => {
            console.warn("SERVER ERROR", error);
            alert(
                "There are problems with server. If they persevere, please try again later."
            );
            location.reload();
        });
};
export const confirmL = function (inputLogin, inputPassWord) {
    fetch(`${baseUrl}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: `${inputLogin}`,
            password: `${inputPassWord}`,
        }),
    })
        .then((response) => response.text())
        .then((token) => {
            if (token === "Incorrect username or password") {
                alert(token);
                throw new Error();
            } else {
                localStorage.setItem("token", JSON.stringify(token));
                document.querySelector(".calllogin")?.remove();
                loadAndSetLocalStorage();
            }
        })
        .catch((error) => {
            console.warn("SERVER ERROR", error);
        });
}