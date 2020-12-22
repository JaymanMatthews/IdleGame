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
            "base_cost": 10,
            "amount_bought": 0,
            "is_unlocked": true,
            "unlock_amt": 0,
            "no": 1
        }),
        1: new Upgrade({
            "base_cost": 100,
            "amount_bought": 0,
            "is_unlocked": false,
            "unlock_amt": 150,
            "no": 2
        })
    }
};
class Game {
    constructor(given_state) {
        this.state = given_state;
        this.misc = {
            update_interval: 50,
            current_time: Date.now(),
            update_loop: setInterval(() => this.update_state(), this["update_interval"]),
            on_load: window.onload = () => this.init()
        };
    }
    set cc(new_coins) {
        this.state["coins"].current = new_coins;
        coin_text.textContent = `${this.cc.toFixed(2)} coins`;
        for (let i in this.upgrade) {
            this.upgrade[i].change_display_properties();
            this.upgrade[i].show();
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
    }
    update_state() {
        const delta_time = Date.now();
        this.add_coins((delta_time - this.misc["current_time"]) / 1000);
        this.misc["current_time"] = delta_time;
    }
    add_coins(ticks) {
        this.cc += this.cps * (ticks);
    }
}
// Singleton
const game = new Game(def_data);
