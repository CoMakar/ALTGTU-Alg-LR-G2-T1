"use strict";

import { Task, ElementType } from "./common.js";

const IMAGE_PATH = "../assets/images"

class Game extends Task {
    stages = new Map([
        [1, {
            id: 1,
            image: Game.get_image_path("stage_1"),
            description: "Дворфы отправляются исследовать новые земли, чтобы основать крепость. Они находят подходящее место: это просторная долина у подножия горы с речушкой, текущей неподалеку.",
            choices: [
                {
                    text: "Основать крепость у подножия горы, начать рыть туннели.",
                    weights_deviation: { bad: +1, good: +2 },
                    next_stage_id: 2
                },
                {
                    text: "Построить укрепленный лагерь на поверхности, на случай, если придется защищаться.",
                    weights_deviation: { neutral: +1 },
                    next_stage_id: 2
                },
                {
                    text: "Выбрать место безопаснее в глубине долины.",
                    weights_deviation: { good: +1 },
                    next_stage_id: 2
                }
            ]
        }],
        [2, {
            id: 2,
            image: Game.get_image_path("stage_2"),
            description: "В крепости открывают несколько небольших шахт для добычи камня и руды. Также требуется еда и древесина и больше металлов.",
            choices: [
                {
                    text: "Открыть шахту поближе к реке, чтобы добывать руду.",
                    weights_deviation: { bad: +1, good: +2 },
                    next_stage_id: 3
                },
                {
                    text: "Охотиться на местную дичь, добывая еду для зимы.",
                    weights_deviation: { neutral: +3, good: +1 },
                    next_stage_id: 3
                },
                {
                    text: "Начать собирать толстошлемник для приготовления вина.",
                    weights_deviation: { neutral: +5, bad: +2 },
                    next_stage_id: 3
                }
            ]
        }],
        [3, {
            id: 3,
            image: Game.get_image_path("stage_3"),
            description: "Проходит время, и на крепость начинают нападать дикие звери — волки и гигантские крысы.",
            choices: [
                {
                    text: "Построить защитные ловушки вокруг входа.",
                    weights_deviation: { bad: +2, neutral: +1 },
                    next_stage_id: 4
                },
                {
                    text: "Назначить отряд охранников из дворфов.",
                    weights_deviation: { neutral: +1, good: +1, bad: -1 },
                    next_stage_id: 4
                },
                {
                    text: "Игнорировать угрозу, надеясь, что звери не будут беспокоить слишком часто.",
                    weights_deviation: { bad: +5 },
                    next_stage_id: 4
                }
            ]
        }],
        [4, {
            id: 4,
            image: Game.get_image_path("stage_4"),
            description: "В крепости организовывают кузницу и мастерскую. Дворфы начинают изготавливать оружие, инструменты и предметы для торговли.",
            choices: [
                {
                    text: "Сосредоточиться на кузнечном деле и изготовлении оружия.",
                    weights_deviation: { bad: -1, neutral: -1, good: +1 },
                    affects(events) { events.heavy_weapons = true },
                    next_stage_id: 5
                },
                {
                    text: "Развивать резьбу по камню и создавать украшения.",
                    weights_deviation: { neutral: +1 },
                    next_stage_id: 5
                },
                {
                    text: "Увеличить запасы алкоголя, наладив производство вина из толстошлемника.",
                    weights_deviation: { neutral: +2, bad: +4 },
                    next_stage_id: 5
                },
            ]
        }],
        [5, {
            id: 5,
            image: Game.get_image_path("stage_5"),
            description: "На горизонте появляются караваны из соседних поселений. Дворфы могут наладить торговые связи и обмениваться товарами.",
            choices: [
                {
                    text: "Продавать только излишки, сохраняя запасы на случай нужды.",
                    weights_deviation: { good: +1, neutral: +1, bad: -1 },
                    affects(events) { events.trading = true },
                    next_stage_id: 6
                },
                {
                    text: "Наладить постоянный обмен ресурсами с соседними племенами.",
                    weights_deviation: { neutral: +1, bad: +1 },
                    affects(events) { events.trading = true },
                    next_stage_id: 6
                },
                {
                    text: "Избегать торговли и сохранять свои ресурсы при себе.",
                    weights_deviation: { good: -1, neutral: +1, bad: -1 },
                    next_stage_id: 6
                }
            ]
        }],
        [6, {
            id: 6,
            image: Game.get_image_path("stage_6"),
            description: "Во время раскопок дворфы находят древний, забытый туннель, ведущий вглубь горы.",
            choices: [
                {
                    text: "Исследовать туннель с отрядом охранников.",
                    weights_deviation: { good: +1, neutral: -2, bad: +2 },
                    next_stage_id: 7
                },
                {
                    text: "Запечатать туннель и забыть о нем.",
                    weights_deviation: { neutral: +1, bad: -2, good: -2 },
                    next_stage_id: 8
                },
                {
                    text: "Исследовать туннель только с опытными дворфами, чтобы снизить риски.",
                    weights_deviation: { good: +1, bad: +1 },
                    next_stage_id: 7
                }
            ]
        }],
        [7, {
            id: 7,
            image: Game.get_image_path("stage_7"),
            description: "При исследовании туннеля дворфы находят огромные залежи блестящей породы. Это колчедан, содержащий медь и железо.",
            choices: [
                {
                    text: "Начать добычу колчедана и организовать его переработку.",
                    weights_deviation: { good: +1, neutral: -1, bad: +1 },
                    affects(events) { events.pyrite_found = true },
                    next_stage_id: 8
                },
                {
                    text: "Вернуться с новостью, чтобы старейшины лучше обдумали решение.",
                    weights_deviation: { good: +2, neutral: -1, bad: +1 },
                    affects(events) { events.pyrite_found = true },
                    next_stage_id: 8
                },
                {
                    text: "Добывать руду, но скрывать это от остальных до подтверждения богатства залежей.",
                    weights_deviation: { good: +1, neutral: -1, bad: +3 },
                    affects(events) { events.pyrite_found = true },
                    next_stage_id: 8
                },
                {
                    text: "Проигнорировать найденную жилу и продолжить мирскую деятельность",
                    weights_deviation: { good: -1, neutral: +1, bad: +1 },
                    next_stage_id: 8
                }
            ]
        }],
        [8, {
            id: 8,
            image: Game.get_image_path("stage_8"),
            description: "По крепости начинают ходить слухи о странных звуках и тенях в шахтах.",
            choices: [
                {
                    text: "Усилить патрулирование и подготовить оружие.",
                    condition(events) { return events.heavy_weapons },
                    weights_deviation: { good: +1, neutral: -1, bad: -1 },
                    next_stage_id: 9
                },
                {
                    text: "Игнорировать слухи, успокоив дворфов.",
                    weights_deviation: { good: -1, bad: +1 },
                    next_stage_id: 9
                },
                {
                    text: "Исследовать, пытаясь найти источник звуков.",
                    weights_deviation: { good: +1, neutral: -1, bad: +2 },
                    next_stage_id: 9
                }
            ]
        }],
        [9, {
            id: 9,
            image: Game.get_image_path("stage_9"),
            description: "Дворфы сталкиваются с таинственным существом в глубинах крепости. Скорее всего это забытое порождение.",
            choices: [
                {
                    text: "Атаковать порождение мощным вооружением.",
                    condition(events) { return events.heavy_weapons },
                    weights_deviation: { good: +1, neutral: +1, bad: -2 },
                    next_stage_id: 10
                },
                {
                    text: "Заблокировать сектор крепости, в котором, вероятно, оно обитает.",
                    weights_deviation: { good: -1, neutral: -1, bad: +1 },
                    next_stage_id: 10
                },
                {
                    text: "Оставить порождение в покое, надеясь, что оно уйдет.",
                    weights_deviation: { bad: +2, neutral: -1 },
                    next_stage_id: 10
                }
            ]
        }],
        [10, {
            id: 10,
            image: Game.get_image_path("stage_10"),
            description: "Лидеры экспедиции решают провести совещание, чтобы решить, что делать дальше с накопившимися проблемами.",
            choices: [
                {
                    text: "Продолжать добычу колчедана, рискуя столкновением с забытым порождением.",
                    condition(events) { return events.heavy_weapons && events.pyrite_found },
                    weights_deviation: { good: +2, neutral: -2, bad: +3 },
                    is_ending: true
                },
                {
                    text: "Закрыть туннели и заняться обычной жизнью, избегая рискованных предприятий.",
                    condition(events) { return events.pyrite_found },
                    weights_deviation: { good: -5, neutral: +3, bad: -5 },
                    is_ending: true
                },
                {
                    text: "Прекратить добычу и перейти к укреплению обороны, полагаясь на торги.",
                    condition(events) { return events.trading && events.pyrite_found },
                    weights_deviation: { good: +4, neutral: -1, bad: -3 },
                    is_ending: true
                },
                {
                    text: "Покинуть крепость с остатками экспедиции и отправиться на поиски лучшей жизни.",
                    condition(events) { return !events.pyrite_found && !events.trading},
                    weights_deviation: { good: -999, neutral: -999, bad: +999 },
                    affects(events) { events.abandoned = true },
                    is_ending: true
                },
                {
                    text: "Продолжить развитие в попытках добиться лучшей жизни.",
                    weights_deviation: { good: -3, neutral: +1, bad: +1 },
                    is_ending: true
                },
                {
                    text: "Снарядить всех дворфов подручными средствами, заблокировать крепость, лучше крепость падет, но мы не можем позволить неведомой твари вырваться!",
                    weights_deviation: { good: -5, neutral: -8, bad: +5 },
                    is_ending: true
                }
            ]
        }]
    ]);

    endings = new Map([
        ["good_pyrite", {
            image: Game.get_image_path("ending_good_pyrite"),
            description: "Хороший финал: Добыча колчедана процветает! Крепость становится богатой и известной. Оружие и боевая сила также перестают быть проблемой. Вскоре чудовищное порождение былых времен было уничтожено. В финальной битве особо отразился дворф Усхир Дуким, который стал новым лидером крепости."
        }],
        ["good_trading", {
            image: Game.get_image_path("ending_good_trading"),
            description: "Хороший финал: Торговля процветает! Крепость становится центром торговли и привлекает все больше внимания. Вскоре наемники расправляются с забытым порождением темных времен. Экономический успех настолько велик, что крепость становится столицей цивилизации дворфов."
        }],
        ["bad_monster", {
            image: Game.get_image_path("ending_bad_monster"),
            description: "Плохой финал: Забытое чудовище не удается сдержать, оно выбирается в основную крепость, уничтожая все. Крепость представляет собой нагромождения камней. Из разрушенных бочек течет остаток вина из толстошлемника. Вечером, мидии на ужин так никто и не подал. Теперь это место лишь памятник былым достижениям. [Chaos reigns]..."
        }],
        ["bad_abandoned", {
            image: Game.get_image_path("ending_bad_abandoned"),
            description: "Плохой финал: Никто не видит перспектив жизни и процветания в этом проклятом месте. Возможно здесь и есть богатства, но их уже не найти горстке храбрых дворфов. Пусть эта черная земля и дальше хранит свои секреты. Древние Боги видимо прокляли все, что связано с этим местом, всем будет лучше если его покинуть..."
        }],
        ["neutral", {
            image: Game.get_image_path("ending_neutral"),
            description: "Нейтральный финал: Крепость ведет простую, размеренную жизнь, где каждый наслаждается вином из толстошлемника. Забытое чудовище, кажется, стало забытым настолько, что больше не тревожило никого. Ни колчедана, ни богатства лишь вино и танцы.Однако в крепости становится все больше и больше кошек. Это ведь не приведет ни к чему плохому, верно?"
        }]
    ]);

    constructor() {
        super("game");

        this.endings_weights = {
            good: 0,
            bad: 0,
            neutral: 0,
        };

        this.events = {
            pyrite_found: false,
            heavy_weapons: false,
            trading: false,
            abandoned: false,
        };
        
        this.current_stage_img = this.find_element("current-stage", ElementType.Image);
        this.log_display = this.find_element("log", ElementType.Display);
        this.command_input = this.find_element("command", ElementType.Input);
        this.submit_btn = this.find_element("submit", ElementType.Button);

        this.command_input.onkeydown = this.submit_btn.onclick = (event) => this.handle_command_input(event);

        
        this.current_stage = this.get_stage(1);
        this.display_stage(this.current_stage, this.current_choices);
    }

    get current_choices() {
        let choices = this.current_stage.choices.filter(choice => {
            return choice.condition === undefined ? true : choice.condition(this.events)
        });
        return choices;
    }

    get_stage(stage_id) {
        return this.stages.get(stage_id);
    }

    handle_command_input(event) {
        if (event.type == "keydown" && event.key != "Enter") {
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
            this.print_choices(this.current_choices);
            return;
        }

        this.handle_choice(choice_id);

        this.command_input.value = "";
    }

    handle_choice(choice_id) {
        let choice = this.current_stage.choices[choice_id];

        if (choice === undefined) {
            this.print_error("Такого варианта ответа нет.");
            this.print_choices(this.current_stage.choices);
            return;
        }

        for (let ending_type in choice.weights_deviation) {
            this.endings_weights[ending_type] += choice.weights_deviation[ending_type];
        }

        if (choice.affects) { 
            choice.affects(this.events)
        };

        if (choice.is_ending == true) {
            this.display_ending(this.decide_ending());
        } else {
            this.current_stage = this.get_stage(choice.next_stage_id);            
            this.display_stage(this.current_stage, this.current_choices);
        }
    }

    print_legend(legend) {
        this.print_log(`* ${legend} \n`);
    }

    print_choices(choices) {
        for (let i = 0; i < choices.length; i++) {
            this.print_log(`${i + 1}. ${choices[i].text}`);
        }
        this.print_log("");
    }

    display_stage(stage, choices) {
        this.clear_log();
        this.print_legend(stage.description);
        this.print_choices(choices);
        this.set_image(stage.image);
    }

    decide_ending() {
        console.log(this.endings_weights)
        let sorted_weights = Object.entries(this.endings_weights).sort((a, b) => b[1] - a[1]);

        let ending_id = sorted_weights[0][0];

        if (ending_id == "bad") {
            ending_id = this.events.abandoned ? "bad_abandoned" : "bad_monster";
        }

        if (ending_id == "good") {
            ending_id =
                this.events.pyrite_found ? "good_pyrite" :
                    this.events.trading ? "good_trading" :
                        "neutral";
        }
        
        console.log(ending_id)

        return ending_id;
    }

    display_ending(ending_id) {
        this.clear_log();
        this.print_log(`~ ${this.endings.get(ending_id).description}`);
        this.set_image(this.endings.get(ending_id).image);
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

    setTimeout(() => {
        new Game();
    }, 1000)
};
