import {getEndDate, getISODateSTR} from "../util/date-functions.js";
import {range} from "../util/number-functions.js";

//constants
const CITY_ID = 'city-id';
const DATE_ID = 'date-id';
const DAYS_ID = 'days-id';
const HOUR_FROM_ID = 'hour-from-id';
const HOUR_TO_ID = 'hour-to-id';
const FORM_ID = 'form-id';

export default class WeatherForm {
    #formElement;
    #cityElement;
    #dateElement;
    #daysElement;
    #hourFromElement;
    #hourToElement;
    #formData;
    #maxDays;
    #cities;
    #parentId;
    constructor(parentId, cities, maxDays) {
        this.#parentId = parentId;
        this.#maxDays = maxDays;
        this.#cities = cities;
        this.#formData = {};
        this.#buildForm();
        this.#setElements();
        this.#setHandlers();
        this.#setSelectOptions();
    }
    #cityHandler() {
        //FIXME
        this.#formData.city = this.#cityElement.value;
    }
    #daysHandler() {
        //FIXME
        this.#formData.days = +this.#daysElement.value;
    }
    #dateHandler() {
        //FIXME
        this.#formData.startDate = this.#dateElement.value;
    }
    #hourFromHandler() {
        //FIXME
        this.#formData.hourFrom = +this.#hourFromElement.value;
    }
    #hourToHandler() {
        //FIXME
        this.#formData.hourTo = +this.#hourToElement.value;
    }
    //FIXME
    #setHandlers() {
        //onchange the same like eventlistenner
        this.#cityElement.onchange = this.#cityHandler.bind(this);
        //this.#cityElement.onchange = () => this.#cityHandler(); not professional way
        this.#dateElement.onchange = this.#dateHandler.bind(this);
        this.#daysElement.onchange = this.#daysHandler.bind(this);
        this.#hourFromElement.onchange = this.#hourFromHandler.bind(this);
        this.#hourToElement.onchange = this.#hourToHandler.bind(this);
        this.#formElement.onsubmit = (event) => {
            event.preventDefault();
            console.log(this.#formData);
        }
    }
    #setElements() {
        this.#formElement = document.getElementById(`${this.#parentId}-${FORM_ID}`);
        this.#cityElement = document.getElementById(`${this.#parentId}-${CITY_ID}`);
        this.#daysElement = document.getElementById(`${this.#parentId}-${DAYS_ID}`);
        this.#hourFromElement = document.getElementById(`${this.#parentId}-${HOUR_FROM_ID}`);
        this.#hourToElement = document.getElementById(`${this.#parentId}-${HOUR_TO_ID}`);
        this.#dateElement = document.getElementById(`${this.#parentId}-${DATE_ID}`);
    }
    #setSelectOptions() {
        const minDate = getISODateSTR(new Date());
        this.#dateElement.min = getISODateSTR(new Date());
        this.#dateElement.max = getEndDate(minDate, this.#maxDays);
        setOptionItems(this.#cityElement, this.#cities, 'select city');
        setOptionItems(this.#daysElement, range(0, this.#maxDays + 1), 'forecast days');
        setOptionItems(this.#hourFromElement, range(0, 24), 'hour from');
        setOptionItems(this.#hourToElement, range(0, 24), 'hour to');
    }
    #buildForm() {
        const parentElement = document.getElementById(this.#parentId);
        parentElement.innerHTML = `
        <form id="${this.#parentId}-${FORM_ID}" class="form-control">
            <div class="row-input">
                <select id="${this.#parentId}-${CITY_ID}" class="select-control" required></select>
                <select id="${this.#parentId}-${DAYS_ID}"class="select-control" required></select>
            </div>
            <div class="row-input">
                <select id="${this.#parentId}-${HOUR_FROM_ID}" class="select-control" required></select>
                <select id="${this.#parentId}-${HOUR_TO_ID}"class="select-control" required></select>
            </div>
            </div>
            <div class="date-group-control">
                <label class="lable-input">Enter start date</label>
                <input class="date-input" type="date" id="${this.#parentId}-${DATE_ID}" required>
            </div>
                <div class="buttons-group">
                <button type="submit">Submit</button>
            </div>
        </form>
        `
    }

    onSubmit(callback) {
        this.#formElement.onsubmit = (event) => {
          event.preventDefault();
          callback(this.#formData); // Вызовите callback с данными формы
        };
      }

}
function setOptionItems(element, options, placeholder) {
    element.innerHTML = `<option value hidden selected>--${placeholder}--</option>`;
    element.innerHTML += options.map(option => `<option value="${option}">${option}</option>`);
}