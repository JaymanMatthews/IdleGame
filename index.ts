///<reference path="game.ts"/>

const get_element_id = id => document.getElementById(id);
const get_element_class = clazz => document.getElementsByClassName(clazz);

const upgrade_button_class: HTMLCollectionOf<Element> = get_element_class("upgrades");
// @ts-ignore
const upgrade_buttons = Array.from(upgrade_button_class as HTMLCollectionOf<HTMLElement>);
const upgrade_cost_class: HTMLCollectionOf<Element> = get_element_class("upgrade-costs");
// @ts-ignore
const upgrade_cost_text = Array.from(upgrade_cost_class as HTMLCollectionOf<HTMLElement>);
const upgrade_inc_class: HTMLCollectionOf<Element> = get_element_class("upgrade-incs");
// @ts-ignore
const upgrade_inc_text = Array.from(upgrade_inc_class as HTMLCollectionOf<HTMLElement>);
const coin_text: HTMLElement = get_element_id("coins");
const cps_text: HTMLElement = get_element_id("coins-per-sec");
