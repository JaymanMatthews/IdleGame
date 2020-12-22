///<reference path="index.ts"/>
class Upgrade {
    constructor(given_state) {
        // @ts-ignore
        Object.assign(this, given_state);
        this.init_display();
    }
    get elements() {
        return [
            upgrade_buttons[this["no"] - 1],
            upgrade_cost_text[this["no"] - 1],
            upgrade_inc_text[this["no"] - 1]
        ];
    }
    get cost() {
        return Math.pow(this["base_cost"], this["amount_bought"] + 1);
    }
    get inc() {
        return (1 + this["amount_bought"]) * Math.log(this["base_cost"] * this.cost);
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
    change_display_properties() {
        this.background_color = this.color;
        this.cursor_type = this.cursor;
    }
    show() {
        this.button_display = this.display;
    }
    get inc_display() {
        return `CpS Boost: ${this.inc.toFixed(2)}`;
    }
    get cost_display() {
        return `Cost: ${this.cost.toFixed(2)} coins`;
    }
    set button_display(new_display_val) {
        this.elements[0].style.visibility = new_display_val;
    }
    get display() {
        return (this.can_unlock) ? "visible" : "hidden";
    }
    get unlock_req() {
        return this["unlock_amt"];
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
    get can_unlock() {
        return game.cc >= this.unlock_req;
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
