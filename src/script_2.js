'use strict';

const PI = 3.14;

window.onload = () => {
    console.info("Window loaded");

    let blinker = document.getElementById("blinker");

    setInterval(() => { 
        blinker.classList.toggle("invisible");
    }, 1000)

    // query the DOM elements
    let length_input = document.getElementById("length-input");
    let length_display = document.getElementById("length-display");
    let radius_display = document.getElementById("radius-display");
    let square_display = document.getElementById("square-display");
    let invalid_length_status = document.getElementById("invalid-length-status");

    // add event listener
    length_input.onchange = () => {
        console.info(`Length input: ${length_input.value}`);
        invalid_length_status.classList.add("hidden");

        // reset values if input is empty
        if (length_input.value === "") {
            radius_display.textContent = "0";
            square_display.textContent = "0";
            length_display.textContent = "0";
            return;
        }

        let parsed_length = parseFloat(length_input.value);

        // show invalid status message if input is not a number
        if (isNaN(parsed_length)) {
            console.error("Length must be a number");
            invalid_length_status.classList.remove("hidden");
            return;
        }

        console.info(`Parsed length: ${parsed_length}`);

        // length cannot be negative
        if (parsed_length <= 0) {
            console.error("Negative length");
            invalid_length_status.classList.remove("hidden");
            return;
        }
        
        // calculate required parameters
        let radius = parsed_length / (2 * PI);
        let square = PI * radius * radius;

        console.info(`Computed radius: ${radius.toFixed(2)}`);
        console.info(`Computed square: ${square.toFixed(2)}`);

        // update DOM elements
        radius_display.textContent = `${radius.toFixed(2)}`;
        square_display.textContent = `${square.toFixed(2)}`;
        length_display.textContent = `${parsed_length}`;
    }

    // query the DOM elements
    let some_num_input = document.getElementById("some-num-input");
    let source_number_display = document.getElementById("source-number-display");
    let computed_number_display = document.getElementById("computed-number-display");
    let invalid_number_status = document.getElementById("invalid-number-status");

    // add event listener
    some_num_input.onchange = () => {
        console.info(`Number input: ${some_num_input.value}`);
        invalid_number_status.classList.add("hidden");

        // reset values if input is empty
        if (some_num_input.value === "") {
            source_number_display.textContent = "";
            computed_number_display.textContent = "";
            return;
        }

        let parsed_number = parseInt(some_num_input.value);
        
        // show invalid status message if input is not a number
        if (isNaN(parsed_number)) {
            console.error("Number is not a number");
            invalid_number_status.classList.remove("hidden");
            return;
        }

        console.info(`Parsed number: ${parsed_number}`);

        // input number must be three-digit number
        if (parsed_number.toString().length != 3) {
            console.error("Non three-digit number");
            invalid_number_status.classList.remove("hidden");
            return;
        }

        // insert the last digit of the number at the beginning
        let computed_number = parsed_number.toString().split("");
        computed_number.unshift(computed_number.pop());
        computed_number = computed_number.join("");
    
        // pure mathematical approach
        // let computed_number = parsed_number % 10 * 100 +
        //     (Math.floor(parsed_number / 100)) +
        //     Math.floor(parsed_number % 100 / 10) * 10
        // computed_number = computed_number.toString()
        // but this will not work for zero padded numbers such as 100 and etc.

        console.info(`Computed number: ${computed_number}`);

        // update DOM elements
        computed_number_display.textContent = computed_number;
        source_number_display.textContent = parsed_number;
    }
}