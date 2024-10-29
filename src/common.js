"use strict";

export const ElementType = {
    Input: "Input",
    Display: "Display",
    Button: "Button",
    Status: "Status",
};

export class Task {
    error_prefix = "[!]";
    input_postfix = "input";
    display_postfix = "display";
    button_postfix = "btn";
    status_postfix = "status";

    type_mapping = new Map([
        [ElementType.Input, this.input_postfix],
        [ElementType.Display, this.display_postfix],
        [ElementType.Button, this.button_postfix],
        [ElementType.Status, this.status_postfix],
    ]);

    constructor(id) {
        if (this.constructor.instance) {
            return this.constructor.instance;
        }

        this.constructor.instance = this;
        console.log(`Task Controller initialized for id: ${id}`);

        this.id = id;

        this.error_display = this.find_element("error", ElementType.Display);
    }

    find_element(name, element_type) {
        let element_id = `${this.id}-${name}-${this.type_mapping.get(element_type)}`;

        let element = document.getElementById(element_id);

        if (!element) {
            throw new Error(`Element not found: ${element_id}`);
        }

        return element;
    }

    show_error(text) {
        this.error_display.textContent = `${this.error_prefix} ${text}`;
        this.error_display.classList.remove("hidden");
    }

    hide_error() {
        this.error_display.textContent = "";
        this.error_display.classList.add("hidden");
    }
}
