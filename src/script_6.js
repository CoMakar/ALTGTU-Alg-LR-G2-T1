"use strict";

import { Task, ElementType } from "./common.js";

class Task_1 extends Task {
    constructor() {
        super("t1");

        this.r1_input = this.find_element("r1", ElementType.Input);
        this.r2_input = this.find_element("r2", ElementType.Input);
        this.answer = this.find_element("answer", ElementType.Display);

        this.r1_input.onchange = this.r2_input.onchange = () =>
            this.handle_change();
        this.handle_change();
    }

    handle_change() {
        if (!this.validate_inputs()) {
            return;
        }

        let ring_area = this.calculate_ring_area(
            Number(this.r1_input.value),
            Number(this.r2_input.value)
        );

        this.answer.textContent = `${ring_area.toFixed(2)}`;
    }

    // FIXME: separate validation from error showing
    validate_inputs() {
        this.hide_error();
        let r1_value = Number(this.r1_input.value);
        let r2_value = Number(this.r2_input.value);

        if (isNaN(r1_value) || isNaN(r2_value)) {
            this.show_error("Некорректное значение Радиуса 1 или Радиуса 2");
            return false;
        }

        if (r1_value <= 0 || r2_value <= 0) {
            this.show_error("Радиус должен быть больше 0");
            return false;
        }

        return true;
    }

    calculate_ring_area(radius_1, radius_2) {
        if (radius_1 == radius_2) {
            return 0;
        }

        let outer_radius = Math.max(radius_1, radius_2);
        let inner_radius = Math.min(radius_1, radius_2);

        let ringArea = Math.PI * (outer_radius ** 2 - inner_radius ** 2);

        return ringArea;
    }
}

class Task_2 extends Task {
    constructor() {
        super("t2");

        this.matrix = this.find_element("matrix", ElementType.Input);
        this.rows_counter = this.find_element(
            "rows-counter",
            ElementType.Display
        );
        this.columns_counter = this.find_element(
            "columns-counter",
            ElementType.Display
        );
        this.answer = this.find_element("answer", ElementType.Display);

        this.matrix.onchange = () => this.handle_change();
        this.matrix.value = ["1 2 3", "4 5 6", "7 8 9"].join("\n")
        this.handle_change();
    }

    handle_change() {
        if (!this.validate_inputs()) {
            return;
        }

        let matrix = this.parse_matrix();

        this.rows_counter.textContent = matrix.length;
        this.columns_counter.textContent = matrix[0].length;

        let max_element_column = this.find_max_element_column(matrix);
        this.remove_column(matrix, max_element_column);

        this.display_matrix(matrix);
    }

    // FIXME: separate validation from error showing
    validate_inputs() {
        this.hide_error();
        let matrix_raw_data = this.matrix.value.trim();

        if (!matrix_raw_data) {
            this.show_error("Отсутствуют данные");
            return false;
        }

        let rows = matrix_raw_data.split("\n");
        let row_length = null;

        for (let row of rows) {
            let row_data = row.trim().split(/\s+/);

            if (row_data.some(isNaN)) {
                this.show_error("Некорректный тип данных в матрице");
                return false;
            }

            console.log(row_data);

            if (row_length === null) {
                row_length = row_data.length;
            }

            if (row_length != row_data.length) {
                this.show_error("Некорректная форма матрицы");
                return false;
            }
        }

        return true;
    }

    parse_matrix() {
        let matrix_raw_data = this.matrix.value.trim();
        let rows = matrix_raw_data.split("\n");
        let matrix = [];

        for (let row of rows) {
            let row_data = row.trim().split(/\s+/);

            matrix.push(row_data.map(Number));
        }

        return matrix;
    }

    find_max_element_column(matrix) {
        let max_element = matrix[0][0];
        let max_element_column = 0;

        for (let [i, row] of matrix.entries()) {
            for (let [j, element] of row.entries()) {
                if (element > max_element) {
                    max_element = element;
                    max_element_column = j;
                }
            }
        }

        return max_element_column;
    }

    remove_column(matrix, column_index) {
        for (let row of matrix) {
            row.splice(column_index, 1);
        }

        return matrix;
    }

    display_matrix(matrix) {
        this.answer.textContent = matrix.map((row) => row.join(" ")).join("\n");
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

    /* --------------------------------- TASK-1 --------------------------------- */

    new Task_2();
};
