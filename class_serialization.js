// @ts-ignore
let tagged_classes = new Map();
let register_tag = clazz => tagged_classes.set(clazz.name, clazz);
let tagging = (k, v) => {
    var _a, _b;
    let c_name = (_b = (_a = this[k]) === null || _a === void 0 ? void 0 : _a.constructor) === null || _b === void 0 ? void 0 : _b.name;
    return !(k == 'v' && this.hasOwnProperty('#tag')) && tagged_classes.has(c_name) ?
        { '#tag': c_name, v } : v;
};
let untagging = (_, v) => {
    return (v === null || v === void 0 ? void 0 : v.hasOwnProperty('#tag')) ?
        new (tagged_classes.get(v['#tag']))(v.v) : v;
};
