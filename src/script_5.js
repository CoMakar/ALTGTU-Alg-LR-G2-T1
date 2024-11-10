"use strict";

import { Task, ElementType } from "./common.js";

const IMAGE_PATH = "../assets/images"

class Game extends Task {
    stage_images = new Map([
        [1, Game.get_image_path("stage_1")],
        [2, Game.get_image_path("stage_2")],
        [3, Game.get_image_path("stage_3")],
        [4, Game.get_image_path("stage_4")],
        [5, Game.get_image_path("stage_5")],
        [6, Game.get_image_path("stage_6")],
        [7, Game.get_image_path("stage_7")],
        [8, Game.get_image_path("stage_8")],
        [9, Game.get_image_path("stage_9")],
        [10, Game.get_image_path("stage_10")],
    ]);

    final_images = new Map([
        ["good", Game.get_image_path("final_good")],
        ["bad", Game.get_image_path("final_bad")],
        ["neutral", Game.get_image_path("final_neutral")],
    ]);

    stages = new Map([
        [1, {
            id: 1,
            description: "Дворфы отправляются исследовать новые земли, чтобы основать крепость. Они находят подходящее место: это просторная долина у подножия горы с речушкой, текущей неподалеку.",
            choices: [
                {
                    text: "Основать крепость у подножия горы, начать рыть туннели.",
                    effects: { bad: +1, good: +2 }
                },
                {
                    text: "Построить укрепленный лагерь на поверхности, на случай, если придется защищаться.",
                    effects: { neutral: +1 }
                },
                {
                    text: "Искать более безопасное место, двигаясь дальше по долине.",
                    effects: { good: +1 }
                }
            ]
        }],
        [2, {
            id: 2,
            description: "В крепости открывают несколько небольших шахт для добычи камня и руды. Им также требуется еда и древесина.",
            choices: [
                {
                    text: "Открыть шахту поближе к реке, чтобы добывать руду.",
                    effects: { bad: +1, good: +2 }
                },
                {
                    text: "Охотиться на местную дичь, добывая еду для зимы.",
                    effects: { neutral: +1, good: +1 }
                },
                {
                    text: "Начать собирать толстошлемник для приготовления вина.",
                    effects: { neutral: +1 }
                }
            ]
        }],
        [3, {
            id: 3,
            description: "Проходит время, и на крепость начинают нападать дикие звери — волки и гигантские крысы.",
            choices: [
                {
                    text: "Построить защитные ловушки вокруг входа.",
                    effects: { bad: +1, neutral: +1 }
                },
                {
                    text: "Назначить отряд охранников из дворфов.",
                    effects: { neutral: +1, good: +1, bad: -1 }

                },
                {
                    text: "Игнорировать угрозу, надеясь, что звери не будут беспокоить слишком часто.",
                    effects: { bad: +1 }
                }
            ]
        }],
        [4, {
            id: 4,
            description: "В крепости организовывают кузницу и мастерскую. Дворфы начинают изготавливать оружие, инструменты и предметы для торговли.",
            choices: [
                {
                    text: "Сосредоточиться на кузнечном деле и изготовлении оружия.",
                    effects: { bad: -1, neutral: -1, good: +1 },
                },
                {
                    text: "Развивать резьбу по камню и создавать украшения.",
                    effects: { neutral: +1 },
                },
                {
                    text: "Увеличить запасы алкоголя, наладив производство вина из толстошлемника.",
                    effects: { neutral: +1, bad: +1 }
                },
            ]
        }],
        [5, {
            id: 5,
            description: "На горизонте появляются караваны из соседних поселений. Дворфы могут наладить торговые связи и обмениваться товарами.",
            choices: [
                {
                    text: "Продавать только излишки, сохраняя запасы на случай нужды.",
                    effects: { good: +1, neutral: +1, bad: -1 }
                },
                {
                    text: "Наладить постоянный обмен ресурсами с соседними племенами.",
                    effects: { neutral: +1, bad: +1 }
                },
                {
                    text: "Избегать торговли и сохранять свои ресурсы при себе.",
                    effects: { good: -1, neutral: +1, bad: -1 }
                }
            ]
        }],
        [6, {
            id: 6,
            description: "Во время раскопок дворфы находят древний, забытый туннель, ведущий вглубь горы.",
            choices: [
                {
                    text: "Исследовать туннель с отрядом охранников.",
                    effects: { good: +1, neutral: -1, bad: +1 }
                },
                {
                    text: "Запечатать туннель и забыть о нем.",
                    effects: { neutral: +1, bad: -2, good: -2 },
                },
                {
                    text: "Исследовать туннель только с опытными дворфами, чтобы не подвергать лишних опасности.",
                    effects: { good: +1, bad: +1 }
                }
            ]
        }],
        [7, {
            id: 7,
            description: "При исследовании пещер дворфы находят огромные залежи блестящей породы. Это колчедан, содержащий медь и железо.",
            choices: [
                {
                    text: "Начать добычу колчедана и организовать его переработку.",
                    effects: { good: +1, neutral: -1, bad: +1 }
                },
                {
                    text: "Вернуться с новостью, чтобы старейшины лучше обдумали решение.",
                    effects: { good: +2, neutral: -1, bad: +1 }
                },
                {
                    text: "Добывать руду, но скрывать это от остальных до подтверждения богатства залежей.",
                    effects: { good: +1, neutral: -1, bad: +3 }
                },
                {
                    text: "Проигнорировать найденную жилу и продолжить мирскую деятельность",
                    effects: { good: -1, neutral: +1, bad: +1 }
                }
            ]
        }],
        [8, {
            id: 8,
            description: "По крепости начинают ходить слухи о странных звуках и тенях в туннелях.",
            choices: [
                {
                    text: "Усилить патрулирование и подготовить оружие.",
                    effects: { good: +1, neutral: -1, bad: -1 },
                },
                {
                    text: "Игнорировать слухи, успокоив дворфов.",
                    effects: { good: -1, bad: +1 },
                },
                {
                    text: "Исследовать, пытаясь найти источник звуков.",
                    effects: { good: +1, neutral: -1, bad: +2 }
                }
            ]
        }],
        [9, {
            id: 9,
            description: "Дворфы сталкиваются с таинственным существом в глубинах крепости. Это может быть забытое чудовище.",
            choices: [
                {
                    text: "Атаковать чудовище с мощным вооружением.",
                    effects: { good: -1, neutral: +1, bad: -2 },
                },
                {
                    text: "Закрыть старый путь и прокопать новый, сохранив риск встречи с этим.",
                    effects: { good: +1, bad: -1 }
                },
                {
                    text: "Оставить его в покое, надеясь, что оно уйдет.",
                    effects: { good: +1, bad: +1, neutral: -1 }
                }
            ]
        }],
        [10, {
            id: 10,
            description: "Лидеры экспедиции решают провести совещание, чтобы решить, что делать дальше с накопившимися проблемами.",
            choices: [
                {
                    text: "Продолжать добычу колчедана, рискуя столкновением с чудовищем.",
                    effects: { good: +2, neutral: -2, bad: +3 },
                    is_final: true
                },
                {
                    text: "Закрыть туннели и заняться обычной жизнью, избегая рискованных предприятий.",
                    effects: { good: -5, neutral: +3, bad: -5 },
                    is_final: true
                },
                {
                    text: "Прекратить добычу и перейти к укреплению обороны, полагаясь на торги.",
                    effects: { good: -5, neutral: -1, bad: -3 },
                    is_final: true
                }
            ]
        }]
    ]);

    endings = new Map([
        ["good", {
            description: "Хороший финал: Добыча колчедана процветает! Крепость становится богатой и известной. Оружие и боевая сила также перестают быть проблемой. Вскоре чудовищное порождение былых времен было уничтожено. В финальной битве особо отразился дворф Усхир Дуким, который стал новым лидером крепости."
        }],
        ["bad", {
            description: "Плохой финал: Забытое чудовище не удается сдержать, оно выбирается в основную крепость, уничтожая все. Крепость представляет собой нагромождения камней. Из разрушенных бочек течет остаток вина из толстошлемника. Вечером, мидии на ужин так никто и не подал. Теперь это место лишь памятник былым достижениям..."
        }],
        ["neutral", {
            description: "Нейтральный финал: Крепость ведет простую, размеренную жизнь, где каждый наслаждается вином из толстошлемника. Забытое чудовище, кажется, стало забытым настолько, что больше не тревожило никого. Колчедан и богатства не сыскали популярности среди дворфов. Однако в крепости становится все больше и больше кошек. Это ведь не приведет ни к чему плохому, верно?"
        }]
    ]);

    constructor() {
        super("game");

        this.stage_id = 1;
        this.endings_weights = {
            good: 0,
            bad: 0,
            neutral: 0,
        };

        this.current_stage_img = this.find_element("current-stage", ElementType.Image);
        this.log_display = this.find_element("log", ElementType.Display);
        this.command_input = this.find_element("command", ElementType.Input);

        this.set_stage(this.stage_id);

        this.command_input.onkeydown = (event) => this.handle_command_input(event);
    }

    handle_command_input(event) {
        if (event.key != "Enter") {
            return;
        }

        let command = this.command_input.value;

        if (command == "") {
            this.print_error("Вы не выбрали вариант ответа.");
            return;
        }

        let choice_id = Number(command) - 1;

        if (isNaN(choice_id)) {
            this.print_error("Введите вариант ответа.");
            this.print_choices(this.stage_id);
            return;
        }

        this.handle_choice(choice_id);

        this.command_input.value = "";
    }

    handle_choice(choice_id) {
        let stage = this.stages.get(this.stage_id);
        let choice = stage.choices[choice_id];

        if (choice === undefined) {
            this.print_error("Такого варианта ответа нет.");
            this.print_choices(this.stage_id);
            return;
        }

        for (let effect in choice.effects) {
            this.endings_weights[effect] += choice.effects[effect];
        }

        if (choice.is_final === true) {
            this.set_ending(this.decide_ending());
        } else {
            this.stage_id += 1;
            this.set_stage(this.stage_id);
        }
    }

    set_ending(final_id) {
        this.clear_log();
        this.print_log(`~ ${this.endings.get(final_id).description}`);
        this.set_image(this.final_images.get(final_id));
    }

    decide_ending() {
        let sorted_weights = Object.entries(this.endings_weights).sort((a, b) => b[1] - a[1]);
        return sorted_weights[0][0];
    }

    print_legend(stage_id) {
        let legend = this.stages.get(stage_id).description;
        this.print_log(`* ${legend} \n`);
    }

    print_choices(stage_id) {
        let choices = this.stages.get(stage_id).choices;
        for (let i = 0; i < choices.length; i++) {
            this.print_log(`${i + 1}. ${choices[i].text}`);
        }
        this.print_log("");
    }

    set_stage(stage_id) {
        this.clear_log();
        this.print_legend(stage_id);
        this.print_choices(stage_id);
        this.set_image(this.stage_images.get(stage_id));
    }

    print_error(message) {
        this.print_log(`[!] Ошибка: ${message} \n`);
    }

    print_log(message) {
        this.log_display.textContent += message + "\n";
        this.scroll_log_to_bottom();
    }

    clear_log() {
        this.log_display.textContent = "";
    }

    scroll_log_to_bottom() {
        this.log_display.scrollTop = this.log_display.scrollHeight;
    }

    set_image(path) {
        this.current_stage_img.src = path;
    }

    static get_image_path(image) {
        return `${IMAGE_PATH}/${image}.png`;
    }

}

window.onload = () => {
    console.info("Window loaded");

    let blinker = document.getElementById("blinker");

    setInterval(() => {
        blinker.classList.toggle("invisible");
    }, 1000);

    /* --------------------------------- TASK-GAME --------------------------------- */

    new Game();

};
