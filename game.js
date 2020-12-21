///<reference path="upgrades.ts"/>
const def_data = {
    "coins": {
        "current": 10,
        "per": {
            "sec": 0
        }
    },
    "upgrades": {
        0: new Upgrade({
            "cost": 10,
            "amount_bought": 0,
            "cost_multi": 1.07,
            "increase_val": 1,
            "available_color": "green",
            "unavailable_color": "red",
            "button_element": upgrade_buttons[0]
        }),
        1: new Upgrade({
            "cost": 100,
            "amount_bought": 0,
            "cost_multi": 1.4,
            "increase_val": 10,
            "available_color": "#66CD00",
            "unavailable_color": "#DC143C",
            "button_element": upgrade_buttons[1]
        })
    }
};
class Game {
    constructor(given_state) {
        this.state = given_state;
        this.update_interval = 50;
        this.current_time = Date.now();
        this.update_loop = setInterval(() => this.update_state(), this.update_interval);
        this.on_load = window.onload = () => this.init();
    }
    set cc(new_coins) {
        this.state["coins"].current = new_coins;
        coin_text.textContent = `${this.cc.toFixed(2)} coins`;
        for (let i in this.upgrade) {
            this.upgrade[i].background_color = this.upgrade[i].color;
            this.upgrade[i].cursor_type = this.upgrade[i].cursor;
        }
    }
    get cc() {
        return this.state["coins"].current;
    }
    set cps(new_cps) {
        this.state["coins"].per.sec = new_cps;
        cps_text.textContent = `${this.cps.toFixed(2)} coins per second`;
    }
    get cps() {
        return this.state["coins"].per.sec;
    }
    get upgrade() {
        return this.state["upgrades"];
    }
    save() {
        // @ts-ignore
        localStorage.setItem('saved_state', JSON.stringify(this.state, tagging));
    }
    load() {
        const saved_json = localStorage.getItem('saved_state');
        // @ts-ignore
        const saved_state = JSON.parse(saved_json, untagging);
        // @ts-ignore
        Object.assign(this.state, saved_state);
        this.init_display();
    }
    reset() {
    }
    init() {
        console.log(this);
        this.load();
    }
    init_display() {
        coin_text.textContent = `${this.cc.toFixed(2)} coins`;
        cps_text.textContent = `${this.cps.toFixed(2)} coins per second`;
        for (let i in upgrade_buttons) {
            upgrade_buttons[i].textContent = `Cost: ${this.upgrade[i].c.toFixed(2)} coins`;
            upgrade_buttons[i].onclick = () => this.upgrade[i].buy();
        }
        for (let i in this.upgrade) {
            this.upgrade[i] = new Upgrade(this.upgrade[i]);
        }
    }
    update_state() {
        const delta_time = Date.now();
        this.add_coins((delta_time - this.current_time) / 1000);
        this.current_time = delta_time;
    }
    add_coins(ticks) {
        this.cc += this.cps * (ticks);
    }
}
// Singleton
const game = new Game(def_data);
