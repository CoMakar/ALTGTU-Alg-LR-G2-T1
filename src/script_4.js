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

        this.process_button.onclick = () => this.button_handler();
    }

    button_handler() {
        this.process_button.disabled = true;
        this.k_input.disabled = true;
        this.data_input.disabled = true;
        this.process_data().finally(() => {
            this.process_button.disabled = false;
            this.k_input.disabled = false;
            this.data_input.disabled = false;
        });
    }

    async process_data() {
        this.hide_error();
        let k_value = Number(this.k_input.value);
        let data_string = this.data_input.value;

        if (isNaN(k_value)) {
            this.show_error("Некорректное значение K");
            return;
        }

        if (!DATA_STRING_PATTERN.test(data_string)) {
            this.show_error("Некорректный формат данных");
            return;
        }

        let values = data_string
            .trim()
            .split(DATA_SEPARATOR_PATTERN)
            .map((v) => Number(v));

        console.log(values);

        if (values.at(-1) != 0) {
            this.show_error("Последовательность должна оканчиваться на 0");
            return;
        }

        if (values.slice(0, -2).some((v) => v == 0)) {
            this.show_error(
                "Последовательность не должна содержать нулевые значения"
            );
            return;
        }

        this.numbers_display.textContent = values.join("; ");

        let counter = 0;
        let found = false;

        for (let value of values) {
            counter++;

            this.current_display.textContent = value;
            this.counter_display.textContent = counter;

            if (value > k_value || value == 0) {
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

window.onload = () => {
    console.info("Window loaded");

    let blink = document.getElementById("blinker");

    setInterval(() => {
        blink.classList.toggle("invisible");
    }, 1000);

    /* --------------------------------- TASK-1 --------------------------------- */

    new Task_1();
};