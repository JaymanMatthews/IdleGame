///<reference path="upgrades.ts"/>

interface Game_Data {
    "coins": {
        "current": number,
        "per": {
            "sec": number
        }
    },
    "upgrades": {
        0: Upgrade,
        1: Upgrade
    }
}

const def_data: Game_Data = {
    "coins": {
        "current": 10,
        "per": {
            "sec": 0
        }
    },
    "upgrades": {
        0: new Upgrade({
            "amount_bought": 0,
            "no": 1
        }),
        1: new Upgrade({
            "amount_bought": 0,
            "no": 2
        })
    }
}

class Game {
    state: object;
    update_loop: any;
    on_load: any;
    update_interval: number;
    current_time: number;

    constructor(given_state: Game_Data) {
        this.state = given_state;
        this.update_interval = 50;
        this.current_time = Date.now();
        this.update_loop = setInterval(() => this.update_state(), this.update_interval);
        this.on_load = window.onload = () => this.init();
    }

    set cc(new_coins: number) {
        this.state["coins"].current = new_coins;
        coin_text.textContent = `${this.cc.toFixed(2)} coins`;
        for (let i in this.upgrade) {
            this.upgrade[i].background_color = this.upgrade[i].color;
            this.upgrade[i].cursor_type = this.upgrade[i].cursor;
        }
    }

    get cc(): number {
        return this.state["coins"].current;
    }

    set cps(new_cps: number) {
        this.state["coins"].per.sec = new_cps;
        cps_text.textContent = `${this.cps.toFixed(2)} coins per second`;
    }

    get cps(): number {
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
        for (let i in this.upgrade) {
            this.upgrade[i].cost_element.textContent = `Cost: ${this.upgrade[i].cost.toFixed(2)} coins`;
            this.upgrade[i].inc_element.textContent = `CpS Boost: ${this.upgrade[i].inc.toFixed(2)}`;
            this.upgrade[i].button_element.onclick = () => this.upgrade[i].buy();
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