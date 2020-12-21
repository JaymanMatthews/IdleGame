///<reference path="index.ts"/>
class Upgrade {
    constructor(given_state) {
        // @ts-ignore
        Object.assign(this, given_state);
    }
    get elements() {
        return [
            upgrade_buttons[this["no"] - 1],
            upgrade_cost_text[this["no"] - 1],
            upgrade_inc_text[this["no"] - 1]
        ];
    }
    get cost() {
        return Math.pow(2, this["amount_bought"] + 1) * this["no"];
    }
    get inc() {
        return 1 + ((this["amount_bought"] / 5) * this["no"]);
    }
    init_display() {
        this.elements[0].onclick = () => this.buy();
        this.elements[1].textContent = this.cost_display;
        this.elements[2].textContent = this.inc_display;
    }
    update_display() {
        this.elements[1].textContent = this.cost_display;
        this.elements[2].textContent = this.inc_display;
    }
    get inc_display() {
        return `CpS Boost: ${this.inc.toFixed(2)}`;
    }
    get cost_display() {
        return `Cost: ${this.cost.toFixed(2)} coins`;
    }
    set background_color(new_color) {
        this.elements[0].style.backgroundColor = new_color;
    }
    set cursor_type(new_type) {
        this.elements[0].style.cursor = new_type;
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
            this.update_display();
        }
    }
}
// @ts-ignore
register_tag(Upgrade);
