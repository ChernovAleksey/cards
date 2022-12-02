import { confirmL, confirmE, confirmF } from "../operations/operations.js";

let option1 = "";
let option2 = "";
let option3 = "";

export class Modal {
    constructor() {
        this._modalElement = document.createElement("div");
        this._backgroundContainer = document.createElement("div");
        this._mainContainer = document.createElement("div");
        this._contentContainer = document.createElement("div");
        this._buttonContainer = document.createElement("div");
        this._closeButton = document.createElement("div");
    }
    closeModal() {
        this._modalElement.remove();
    }
    createElements() {
        this._modalElement.classList.add("modal");
        this._modalElement.append(this._backgroundContainer);
        this._backgroundContainer.classList.add("modal__background");
        this._backgroundContainer.addEventListener(
            "click",
            this.closeModal.bind(this)
        );
        this._modalElement.append(this._mainContainer);
        this._mainContainer.classList.add("modal__main-container");
        this._mainContainer.append(this._contentContainer);
        this._mainContainer.append(this._buttonContainer);
        this._mainContainer.append(this._closeButton);
        this._contentContainer.classList.add("modal__content-wrapper");
        this._buttonContainer.classList.add("modal__button-wrapper");
        this._closeButton.classList.add("modal__close");
        this._closeButton.addEventListener("click", this.closeModal.bind(this));
    }
    render(container = document.body) {
        this.createElements();
        container.append(this._modalElement);
    }
}
export class LoginModal extends Modal {
    constructor(confirmL) {
        super();
        this.form = document.createElement("form");
        this.inputLogin = document.createElement("input");
        this.inputPassWord = document.createElement("input");
        this.confirmBttn = document.createElement("button");
        this.noInfoMessage = document.createElement("p");
        this.confirmL = confirmL;
    }
    createElements() {
        super.createElements();

        this.form.insertAdjacentHTML("beforeend", "<label>LOGIN</label>");
        this.form.append(this.inputLogin);
        this.form.insertAdjacentHTML("beforeend", "<label>PASSWORD</label>");
        this.form.append(this.inputPassWord);
        this._contentContainer.append(this.form);
        this._buttonContainer.append(this.confirmBttn);
        this.confirmBttn.innerText = "Confirm";
        this.confirmBttn.classList.add("modal__confirm-btn");
        this.confirmBttn.addEventListener("click", () => {
            this.noInfoMessage.innerText = "";
            if (this.inputLogin.value === "" || this.inputPassWord.value === "") {
                this.noInfoMessage.innerText = "YOU HAVE TO FILL ALL THE GAP";
            } else {
                confirmL(this.inputLogin.value, this.inputPassWord.value);
                this.closeModal();
            }
        });
    }
}

export class CreateModal extends Modal {
    constructor(confirmF) {
        super();
        this.form = document.createElement("form");
        this.subform = document.createElement("form");
        this.selectDoctor = document.createElement("select");
        this.inputPurpose = document.createElement("input");
        this.inputDescription = document.createElement("input");
        this.selectUrgency = document.createElement("select");
        this.inputFullName = document.createElement("input");
        this.selectStatus = document.createElement("select");
        this.inputAge = document.createElement("input");
        this.inputheartIllness = document.createElement("input");
        this.inputpressure = document.createElement("input");
        this.inputweightIndex = document.createElement("input");
        this.inputlastDateVisit = document.createElement("input");
        this.noInfoMessage = document.createElement("p");
        this.confirmBttn = document.createElement("button");
        this.confirmF = confirmF;
    }

    createElements() {
        super.createElements();
        // Основные вопросы
        this.form.insertAdjacentHTML("beforeend", "<label>DOCTOR</label>");
        this.form.append(this.selectDoctor);
        this.selectDoctor.insertAdjacentHTML(
            "beforeend",
            ` <option value='none' selected>CHOOSE THE DOCTOR</option>
        <option value='Therapist'>Therapist</option>
        <option value='Cardiologist'>Cardiologist</option>
        <option value='Dentist'>Dentist</option>`
        );
        this.form.append(this.subform);
        this.selectDoctor.addEventListener("change", () => {
            this.subform.innerHTML = "";
            this.selectStatus.innerHTML = "";
            this.selectUrgency.innerHTML = "";
            this.subform.insertAdjacentHTML("beforeend", "<label>STATUS</label>");
            this.subform.append(this.selectStatus);
            this.selectStatus.insertAdjacentHTML(
                "beforeend",
                ` <option value='none' selected>SELECT STATUS</option>
          <option value='Open'>Open</option>
          <option value='Done'>Done</option>`
            );
            this.subform.insertAdjacentHTML("beforeend", "<label>URGENCY</label>");
            this.subform.append(this.selectUrgency);
            this.selectUrgency.insertAdjacentHTML(
                "beforeend",
                ` <option value='none' selected>CHOOSE THE URGENCY</option>
          <option value='High'>High</option>
          <option value='Normal'>Normal</option>
          <option value='Low'>Low</option>`
            );
            this.subform.insertAdjacentHTML("beforeend", "<label>Name</label>");
            this.subform.append(this.inputFullName);
            this.subform.insertAdjacentHTML(
                "beforeend",
                "<label>Visit Purpose</label>"
            );
            this.subform.append(this.inputPurpose);
            this.subform.insertAdjacentHTML(
                "beforeend",
                "<label>Visit Description</label>"
            );
            this.subform.append(this.inputDescription);
            if (this.selectDoctor.value === "Dentist") {
                this.subform.insertAdjacentHTML(
                    "beforeend",
                    "<label>LastVisit Date</label>"
                );
                this.subform.append(this.inputlastDateVisit);
            } else if (this.selectDoctor.value === "Therapist") {
                this.subform.insertAdjacentHTML("beforeend", "<label>Age</label>");
                this.subform.append(this.inputAge);
            } else if (this.selectDoctor.value === "Cardiologist") {
                this.subform.insertAdjacentHTML(
                    "beforeend",
                    "<label>Usual pressure</label>"
                );
                this.subform.append(this.inputpressure);
                this.subform.insertAdjacentHTML(
                    "beforeend",
                    "<label>Weight index</label>"
                );
                this.subform.append(this.inputweightIndex);
                this.subform.insertAdjacentHTML(
                    "beforeend",
                    "<label>Previous CVDs</label>"
                );
                this.subform.append(this.inputheartIllness);
                this.subform.insertAdjacentHTML("beforeend", "<label>Age</label>");
                this.subform.append(this.inputAge);
            }
        });

        this._contentContainer.append(this.form);
        this._buttonContainer.append(this.confirmBttn);
        this.confirmBttn.innerText = "Confirm";
        this.confirmBttn.classList.add("modal__confirm-btn");
        this.confirmBttn.addEventListener("click", () => {
            this.noInfoMessage.innerText = "";
            if (
                this.selectDoctor.value === "none" ||
                (this.selectDoctor.value === "Therapist" &&
                    // ---------------------------------------
                    (this.inputPurpose.value === "" ||
                        this.inputDescription.value === "" ||
                        this.selectUrgency.value === "none" ||
                        this.inputFullName.value === "" ||
                        this.selectStatus.value === "none" ||
                        this.inputAge.value === "")) ||
                (this.selectDoctor.value === "Cardiologist" &&
                    (this.inputPurpose.value === "" ||
                        this.inputDescription.value === "" ||
                        this.selectUrgency.value === "none" ||
                        this.inputFullName.value === "" ||
                        this.selectStatus.value === "none" ||
                        this.inputAge.value === "" ||
                        this.inputheartIllness.value === "" ||
                        this.inputpressure.value === "" ||
                        this.inputweightIndex.value === "")) ||
                (this.selectDoctor.value === "Dentist" &&
                    (this.inputPurpose.value === "" ||
                        this.inputDescription.value === "" ||
                        this.selectUrgency.value === "none" ||
                        this.inputFullName.value === "" ||
                        this.selectStatus.value === "none" ||
                        this.inputlastDateVisit.value === ""))
            ) {
                this.subform.append(this.noInfoMessage);
                this.noInfoMessage.innerText = "YOU HAVE TO FILL ALL THE GAP";
            } else {
                confirmF(
                    this.selectDoctor.value,
                    this.inputPurpose.value,
                    this.inputDescription.value,
                    this.selectUrgency.value,
                    this.inputFullName.value,
                    this.selectStatus.value,
                    this.inputAge.value,
                    this.inputheartIllness.value,
                    this.inputpressure.value,
                    this.inputweightIndex.value,
                    this.inputlastDateVisit.value
                );
                this.closeModal();
            }
        });
    }
}
export class EditModal extends Modal {
    constructor(
        inputAgeval,
        inputDescriptionval,
        selectDoctorval,
        inputFullNameval,
        selectUrgencyval,
        inputPurposeval,
        selectStatusval,
        inputheartIllnessval,
        idval,
        inputpressureval,
        inputweightIndexval,
        inputlastDateVisitval,
        confirmE
    ) {
        super();
        this.form = document.createElement("form");
        this.subform = document.createElement("form");
        this.addedsubform = document.createElement("form");
        this.selectDoctor = document.createElement("select");
        this.inputPurpose = document.createElement("input");
        this.inputDescription = document.createElement("input");
        this.selectUrgency = document.createElement("select");
        this.inputFullName = document.createElement("input");
        this.selectStatus = document.createElement("select");
        this.inputAge = document.createElement("input");
        this.inputheartIllness = document.createElement("input");
        this.inputpressure = document.createElement("input");
        this.inputweightIndex = document.createElement("input");
        this.inputlastDateVisit = document.createElement("input");
        this.noInfoMessage = document.createElement("p");
        this.confirmBttn = document.createElement("button");
        this.confirmE = confirmE;
        this.selectDoctorValue = selectDoctorval;
        this.inputPurposeValue = inputPurposeval;
        this.inputDescriptionValue = inputDescriptionval;
        this.selectUrgencyValue = selectUrgencyval;
        this.inputFullNameValue = inputFullNameval;
        this.selectStatusValue = selectStatusval;
        this.inputAgeValue = inputAgeval;
        this.inputheartIllnessValue = inputheartIllnessval;
        this.idValue = idval;
        this.inputpressureValue = inputpressureval;
        this.inputweightIndexValue = inputweightIndexval;
        this.inputlastDateVisitValue = inputlastDateVisitval;
    }
    createElements() {
        super.createElements();
        this.selectDoctor.value = this.selectDoctorValue;
        this.inputPurpose.value = this.inputPurposeValue;
        this.inputDescription.value = this.inputDescriptionValue;
        this.selectUrgency.value = this.selectUrgencyValue;
        this.inputFullName.value = this.inputFullNameValue;
        this.selectStatus.value = this.selectStatusValue;
        this.inputAge.value = this.inputAgeValue;
        this.inputheartIllness.value = this.inputheartIllnessValue;
        this.id = this.idValue;
        this.inputpressure.value = this.inputpressureValue;
        this.inputweightIndex.value = this.inputweightIndexValue;
        this.inputlastDateVisit.value = this.inputlastDateVisitValue;

        this._contentContainer.append(this.form);

        this._buttonContainer.append(this.confirmBttn);
        this.confirmBttn.innerText = "Confirm";
        this.confirmBttn.classList.add("modal__confirm-btn");

        this.form.insertAdjacentHTML("beforeend", "<label>DOCTOR</label>");
        this.form.append(this.selectDoctor);
        this.form.append(this.subform);
        this.form.append(this.addedsubform);

        if (this.selectDoctorValue === "Therapist") {
            option1 = "selected";
            option2 = "";
            option3 = "";
        } else if (this.selectDoctorValue === "Cardiologist") {
            option1 = "";
            option2 = "selected";
            option3 = "";
        } else if (this.selectDoctorValue === "Dentist") {
            option1 = "";
            option2 = "";
            option3 = "selected";
        }
        this.selectDoctor.insertAdjacentHTML(
            "beforeend",
            `<option value='Therapist' ${option1} >Therapist</option>
        <option value='Cardiologist'${option2}>Cardiologist</option>
        <option value='Dentist'${option3}>Dentist</option>`
        );

        this.subform.insertAdjacentHTML("beforeend", "<label>STATUS</label>");
        this.subform.append(this.selectStatus);
        if (this.selectStatusValue === "Open") {
            option1 = "selected";
            option2 = "";
        } else {
            option1 = "";
            option2 = "selected";
        }
        this.selectStatus.insertAdjacentHTML(
            "beforeend",
            `      <option value='Open'${option1}>Open</option>
          <option value='Done'${option2}>Done</option>`
        );
        this.subform.insertAdjacentHTML("beforeend", "<label>URGENCY</label>");
        this.subform.append(this.selectUrgency);
        if (this.selectUrgencyValue === "High") {
            option1 = "selected";
            option2 = "";
            option3 = "";
        } else if (this.selectDoctorValue === "Normal") {
            option1 = "";
            option2 = "selected";
            option3 = "";
        } else if (this.selectDoctorValue === "Low") {
            option1 = "";
            option2 = "";
            option3 = "selected";
        }
        this.selectUrgency.insertAdjacentHTML(
            "beforeend",
            `      <option value='High'${option1}>High</option>
          <option value='Normal'${option2}>Normal</option>
          <option value='Low'${option3}>Low</option>`
        );

        this.subform.insertAdjacentHTML("beforeend", "<label>Name</label>");
        this.subform.append(this.inputFullName);

        this.subform.insertAdjacentHTML(
            "beforeend",
            "<label>Visit Purpose</label>"
        );
        this.subform.append(this.inputPurpose);
        this.subform.insertAdjacentHTML(
            "beforeend",
            "<label>Visit Description</label>"
        );
        this.subform.append(this.inputDescription);

        const addedInfoCorrection = () => {
            if (this.selectDoctor.value === "Dentist") {
                this.addedsubform.insertAdjacentHTML(
                    "beforeend",
                    "<label>LastVisit Date</label>"
                );
                this.addedsubform.append(this.inputlastDateVisit);
            } else if (this.selectDoctor.value === "Therapist") {
                this.addedsubform.insertAdjacentHTML("beforeend", "<label>Age</label>");
                this.addedsubform.append(this.inputAge);
            } else if (this.selectDoctor.value === "Cardiologist") {
                this.addedsubform.insertAdjacentHTML(
                    "beforeend",
                    "<label>Usual pressure</label>"
                );
                this.addedsubform.append(this.inputpressure);
                this.addedsubform.insertAdjacentHTML(
                    "beforeend",
                    "<label>Weight index</label>"
                );
                this.addedsubform.append(this.inputweightIndex);
                this.addedsubform.insertAdjacentHTML(
                    "beforeend",
                    "<label>Previous CVDs</label>"
                );
                this.addedsubform.append(this.inputheartIllness);
                this.addedsubform.insertAdjacentHTML("beforeend", "<label>Age</label>");
                this.addedsubform.append(this.inputAge);
            }
        };
        addedInfoCorrection();

        this.selectDoctor.addEventListener("change", () => {
            this.addedsubform.innerHTML = "";
            addedInfoCorrection();
        });
        this.confirmBttn.addEventListener("click", () => {
            this.noInfoMessage.innerText = "";
            if (
                this.selectDoctor.value === "none" ||
                (this.selectDoctor.value === "Therapist" &&
                    (this.inputPurpose.value === "none" ||
                        this.inputDescription.value === "none" ||
                        this.selectUrgency.value === "none" ||
                        this.inputFullName.value === "none" ||
                        this.selectStatus.value === "none" ||
                        this.inputAge.value === "none")) ||
                (this.selectDoctor.value === "Cardiologist" &&
                    (this.inputPurpose.value === "none" ||
                        this.inputDescription.value === "none" ||
                        this.selectUrgency.value === "none" ||
                        this.inputFullName.value === "none" ||
                        this.selectStatus.value === "none" ||
                        this.inputAge.value === "none" ||
                        this.inputheartIllness.value === "none" ||
                        this.inputpressure.value === "none" ||
                        this.inputweightIndex.value === "none")) ||
                (this.selectDoctor.value === "Dentist" &&
                    (this.inputPurpose.value === "none" ||
                        this.inputDescription.value === "none" ||
                        this.selectUrgency.value === "none" ||
                        this.inputFullName.value === "none" ||
                        this.selectStatus.value === "none" ||
                        this.inputlastDateVisit.value === "none"))
            ) {
                this.addedsubform.append(this.noInfoMessage);
                this.noInfoMessage.innerText = "YOU HAVE TO FILL ALL THE GAP";
            } else {
                confirmE(
                    this.selectDoctor.value,
                    this.inputPurpose.value,
                    this.inputDescription.value,
                    this.selectUrgency.value,
                    this.inputFullName.value,
                    this.selectStatus.value,
                    this.inputAge.value,
                    this.inputheartIllness.value,
                    this.id,
                    this.inputpressure.value,
                    this.inputweightIndex.value,
                    this.inputlastDateVisit.value
                );

                this.closeModal();
            }
        });
    }
}