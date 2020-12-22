// @ts-ignore
let tagged_classes = new Map();

const register_tag = clazz => tagged_classes.set(clazz.name, clazz);

const tagging = (k, v) => {
    let c_name = this[k]?.constructor?.name;
    return !(k == 'v' && this.hasOwnProperty('#tag')) && tagged_classes.has(c_name) ?
        {'#tag':c_name, v} : v;
}

const untagging = (_, v) => {
    return (v?.hasOwnProperty('#tag')) ?
        new (tagged_classes.get(v['#tag']))(v.v) : v;
}