///<reference path="index.ts"/>

interface Upgrade_Data {
    "amount_bought": number,
    "no": number
}

class Upgrade {
    current_cost: number;

    constructor(given_state: Upgrade_Data) {
        // @ts-ignore
        Object.assign(this, given_state);
    }

    get button_element() {
        return upgrade_buttons[this["no"] - 1];
    }

    get cost_element() {
        return upgrade_cost_text[this["no"] - 1];
    }

    get inc_element() {
        return upgrade_inc_text[this["no"] - 1];
    }

    get cost() {
        const x = Math.pow(2, this["amount_bought"] + 1);
        this.cost_element.textContent = `Cost: ${x.toFixed(2)} coins`;
        return x;
    }

    get inc() {
        const x = (1 + this["amount_bought"]) * this["no"];
        this.inc_element.textContent = `CpS Boost: ${x.toFixed(2)}`;
        return x;
    }

    set background_color(new_color) {
        this["button_element"].style.backgroundColor = new_color;
    }

    set cursor_type(new_type) {
        this["button_element"].style.cursor = new_type;
    }

    get color() {
        return (this.can_buy) ? "green" : "red";
    }

    get cursor() {
        return (this.can_buy) ? "pointer" : "initial";
    }

    get can_buy() {
        return game.cc >= this.cost;
    }

    buy() {
        if (this.can_buy) {
            game.cps += this.inc;
            game.cc -= this.cost;
            this["amount_bought"]++;
        }
    }
}

// @ts-ignore
register_tag(Upgrade);