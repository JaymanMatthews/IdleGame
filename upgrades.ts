///<reference path="index.ts"/>

interface Upgrade_Data {
    "cost": number,
    "amount_bought": number,
    "cost_multi": number,
    "increase_val": number,
    "available_color": string,
    "unavailable_color": string,
    "button_element": HTMLElement
}

class Upgrade {
    constructor(given_state: Upgrade_Data) {
        // @ts-ignore
        Object.assign(this, given_state);
    }

    set c(new_cost) {
        this["cost"] = new_cost;
        this["button_element"].textContent = `Cost: ${this.c.toFixed(2)} coins`;
    }

    get c() {
        return this["cost"];
    }

    set background_color(new_color) {
        this["button_element"].style.backgroundColor = new_color;
    }

    set cursor_type(new_type) {
        this["button_element"].style.cursor = new_type;
    }

    get color() {
        return (this.can_buy) ? this["available_color"] : this["unavailable_color"];
    }

    get cursor() {
        return (this.can_buy) ? "pointer" : "initial";
    }

    get can_buy() {
        return game.cc >= this.c;
    }

    scale_cost() {
        this.c *= this["cost_multi"];
    }

    buy() {
        if (this.can_buy) {
            game.cps += this["increase_val"];
            game.cc -= this.c;
            this.scale_cost();
            this["amount_bought"]++;
        }
    }
}

// @ts-ignore
register_tag(Upgrade);