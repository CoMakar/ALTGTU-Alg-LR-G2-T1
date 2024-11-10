"use strict";

import { Task, ElementType } from "./common.js";
import { sleep } from "./utils.js";

const DATA_STRING_PATTERN = /^(?:-?\d+;?\s?)+$/;
const DATA_SEPARATOR_PATTERN = /[\s;]+/;

class Task_1 extends Task {
    constructor() {
        super("t1");

        this.k_input = this.find_element(
            "k",
            ElementType.Input
        );
        this.data_input = this.find_element(
            "data",
            ElementType.Input
        );
        this.process_button = this.find_element(
            "process",
            ElementType.Button
        );

        this.numbers_display = this.find_element(
            "numbers",
            ElementType.Display
        );
        this.counter_display = this.find_element(
            "counter",
            ElementType.Display
        );
        this.current_display = this.find_element(
            "current",
            ElementType.Display
        );
        this.answer = this.find_element(
            "answer",
            ElementType.Display
        );

        this.process_button.onclick = () => this.handle_button();
    }

    handle_button() {
        if (!this.validate_inputs()) {
            return;
        }

        this.process_button.disabled = true;
        this.k_input.disabled = true;
        this.data_input.disabled = true;
        
        this.process_data().finally(() => {
            this.process_button.disabled = false;
            this.k_input.disabled = false;
            this.data_input.disabled = false;
        });
    }

    // FIXME: separate validation from error showing
    validate_inputs() {
        this.hide_error();
        let k_value = Number(this.k_input.value);
        let data_string = this.data_input.value;

        if (isNaN(k_value)) {
            this.show_error("Некорректное значение K");
            return false;
        }

        if (!DATA_STRING_PATTERN.test(data_string)) {
            this.show_error("Некорректный формат данных");
            return false;
        }

        let values = data_string
            .trim()
            .split(DATA_SEPARATOR_PATTERN)
            .map((v) => Number(v));

        if (values.at(-1) != 0) {
            this.show_error("Последовательность должна оканчиваться на 0");
            return false;
        }

        if (values.slice(0, -1).some((v) => v == 0)) {
            this.show_error(
                "Последовательность не должна содержать нулевые значения"
            );
            return false;
        }

        return true;
    }

    async process_data() {
        let k_value = Number(this.k_input.value);
        let data_string = this.data_input.value;

        let values = data_string
            .trim()
            .split(DATA_SEPARATOR_PATTERN)
            .map((v) => Number(v));

        let counter = 0;
        let found = false;

        this.numbers_display.textContent = values.join("; ");

        for (let value of values) {
            counter++;

            this.current_display.textContent = value;
            this.counter_display.textContent = counter;

            if (value == 0) {
                break;
            }
            
            if (value > k_value) {
                found = true;
                break;
            }

            await sleep(500);
        }

        if (found) {
            this.answer.textContent = counter;
        } else {
            this.answer.textContent = 0;
        }
    }
}

class Task_2 extends Task {
    constructor() {
        super("t2");

        this.n_input = this.find_element(
            "n",
            ElementType.Input
        );
        this.process_button = this.find_element(
            "process",
            ElementType.Button
        );

        this.current_display = this.find_element(
            "current",
            ElementType.Display
        );
        this.answer = this.find_element(
            "answer",
            ElementType.Display
        );

        this.process_button.onclick = () => this.handle_button();
    }

    handle_button() {
        if (!this.validate_inputs()) {
            return;
        }

        this.process_button.disabled = true;
        this.n_input.disabled = true;

        this.process_data().finally(() => {
            this.process_button.disabled = false;
            this.n_input.disabled = false;
        });
    }

    // FIXME: separate validation from error showing
    validate_inputs() {
        this.hide_error();
        let n_value = Number(this.n_input.value);

        if (isNaN(n_value)) {
            this.show_error("Некорректное значение K");
            return false;
        }

        if (n_value <= 0) {
            this.show_error("N должно быть больше 0");
            return false;
        }

        return true;
    }

    async process_data() {
        let n_value = Number(this.n_input.value);
        let square_value = 0;
        const calc_ni = (n) => 2 * n - 1;

        for (let c = 1; c <= n_value; c++) {
            let increment = calc_ni(c);
            square_value += increment;

            this.current_display.textContent = square_value;

            await sleep(500);
        }

        this.answer.textContent = square_value;
    }
}

window.onload = () => {
    console.info("Window loaded");

    let blinker = document.getElementById("blinker");

    setInterval(() => {
        blinker.classList.toggle("invisible");
    }, 1000);

    /* --------------------------------- TASK-1 --------------------------------- */

    new Task_1();

    /* --------------------------------- TASK-2 --------------------------------- */

    new Task_2();
};
