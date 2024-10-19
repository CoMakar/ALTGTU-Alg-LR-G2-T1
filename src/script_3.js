"use strict";

function max(number_array) {
    if (number_array.length == 0) {
        return null;
    }

    let max_val = number_array[0];
    for (let val of number_array) {
        max_val = val > max_val ? val : max_val;
    }
    return max_val;
}

function min(number_array) {
    if (number_array.length == 0) {
        return null;
    }

    let min_val = number_array[0];
    for (let val of number_array) {
        min_val = val < min_val ? val : min_val;
    }
    return min_val;
}

class Task_1 {
    constructor() {
        if (Task_1.instance) {
            return Task_1.instance;
        }

        Task_1.instance = this;
        console.log("Task-1 Controller initialized");

        this.inputs = [
            document.getElementById("a-input"),
            document.getElementById("b-input"),
            document.getElementById("c-input"),
        ];

        this.invalid_status = document.getElementById("invalid-abc-status");
        this.answer = document.getElementById("abc-answer-display");

        for (let input_field of this.inputs) {
            input_field.onchange = () => this.onchange_handler();
        }

        this.onchange_handler();
    }

    onchange_handler() {
        this.invalid_status.classList.add("hidden");

        let parsed_values = this.inputs.map((i) => Number(i.value));

        if (parsed_values.some((v) => isNaN(v))) {
            this.invalid_status.classList.remove("hidden");
            return;
        }

        let positive_count = parsed_values.filter((v) => v > 0).length;

        if (positive_count == 1) {
            this.answer.textContent = "TRUE";
        } else {
            this.answer.textContent = "FALSE";
        }
    }
}

class Task_2 {
    constructor() {
        if (Task_2.instance) {
            return Task_2.instance;
        }

        Task_2.instance = this;
        console.log("Task-2 Controller initialized");

        this.inputs = [
            document.getElementById("x-input"),
            document.getElementById("y-input"),
            document.getElementById("z-input"),
        ];

        this.invalid_status = document.getElementById("invalid-xyz-status");
        this.answer = document.getElementById("xyz-answer-display");

        for (let input_field of this.inputs) {
            input_field.onchange = () => this.onchange_handler();
        }

        this.onchange_handler();
    }

    onchange_handler() {
        this.invalid_status.classList.add("hidden");

        let parsed_values = this.inputs.map((i) => Number(i.value));

        if (parsed_values.some((v) => isNaN(v))) {
            this.invalid_status.classList.remove("hidden");
            return;
        }

        let min_val, max_val;
        min_val = min(parsed_values);
        max_val = max(parsed_values);

        this.answer.textContent = `(${min_val} : ${max_val})`;
    }
}

class Task_3 {
    constructor() {
        if (Task_3.instance) {
            return Task_3.instance;
        }

        Task_3.instance = this;
        console.log("Task-3 Controller initialized");

        this.a = 0.19;
        this.b = 6.1;

        this.input = document.getElementById("x3-input");
        this.invalid_status = document.getElementById("invalid-x3-status");
        this.formula = document.getElementById("y3-formula-display");
        this.answer = document.getElementById("y3-answer-display");
        this.a_display = document.getElementById("a3-display");
        this.b_display = document.getElementById("b3-display");

        this.a_display.textContent = this.a;
        this.b_display.textContent = this.b;

        this.input.onchange = () => this.onchange_handler();

        this.onchange_handler();
    }

    onchange_handler() {
        this.invalid_status.classList.add("hidden");

        let parsed_value = Number(this.input.value);

        if (isNaN(parsed_value)) {
            this.invalid_status.classList.remove("hidden");
            return;
        }

        let x = parsed_value;
        let y;
        let formula;
        let result;

        switch (true) {
            case x <= -1:
                result = this.f1(x);
                y = result.val;
                formula = result.formula;
                break;
            case x > 5:
                result = this.f2(x);
                y = result.val;
                formula = result.formula;
                break;
            case -1 < x <= 5:
                result = this.f3(x);
                y = result.val;
                formula = result.formula;
                break;
        }

        this.answer.textContent = y.toFixed(2);
        this.formula.textContent = formula;
    }

    f1(x) {
        return { val: Math.pow(Math.E, Math.sin(x)), formula: `e^(sin ${x})` };
    }

    f2(x) {
        return {
            val: Math.pow(Math.log(Math.abs(this.b * x)), 2),
            formula: `ln^2|${this.b} * ${x}|`,
        };
    }

    f3(x) {
        return {
            val: Math.sqrt(1 + Math.pow(this.a * x, 2)),
            formula: `sqrt(1+(${this.a} * ${x})^2)`,
        };
    }
}

class Task_4 {
    constructor() {
        if (Task_4.instance) {
            return Task_4.instance;
        }

        Task_4.instance = this;
        console.log("Task-4 Controller initialized");

        this.a = 0.19;
        this.b = 6.1;

        this.input = document.getElementById("x4-input");
        this.invalid_status = document.getElementById("invalid-x4-status");
        this.formula = document.getElementById("y4-formula-display");
        this.answer = document.getElementById("y4-answer-display");
        this.a_display = document.getElementById("a4-display");
        this.b_display = document.getElementById("b4-display");

        this.a_display.textContent = this.a;
        this.b_display.textContent = this.b;

        this.input.onchange = () => this.onchange_handler();

        this.onchange_handler();
    }

    onchange_handler() {
        this.invalid_status.classList.add("hidden");

        let parsed_value = Number(this.input.value);

        if (isNaN(parsed_value)) {
            this.invalid_status.classList.remove("hidden");
            return;
        }

        let x = parsed_value;
        let y;
        let formula;
        let result;

        switch (x) {
            case -2:
                result = this.f1(x);
                y = result.val;
                formula = result.formula;
                break;
            case 7:
                result = this.f2(x);
                y = result.val;
                formula = result.formula;
                break;
            case 4:
                result = this.f3(x);
                y = result.val;
                formula = result.formula;
                break;
        }

        this.answer.textContent = y?.toFixed(2) ?? "Undefined";
        this.formula.textContent = formula ?? "Undefined";
    }

    f1(x) {
        return { val: Math.pow(Math.E, Math.sin(x)), formula: `e^(sin ${x})` };
    }

    f2(x) {
        return {
            val: Math.pow(Math.log(Math.abs(this.b * x)), 2),
            formula: `ln^2|${this.b} * ${x}|`,
        };
    }

    f3(x) {
        return {
            val: Math.sqrt(1 + Math.pow(this.a * x, 2)),
            formula: `sqrt(1+(${this.a} * ${x})^2)`,
        };
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

    /* --------------------------------- TASK-2 --------------------------------- */

    new Task_2();

    /* --------------------------------- TASK-3 --------------------------------- */

    new Task_3();

    /* --------------------------------- TASK-4 --------------------------------- */

    new Task_4();
};
