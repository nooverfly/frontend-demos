var count = 0;

class Id {
  id: string;
  href: string;
  constructor(id: string) {
    this.id = id;
    this.href = new URL(`#${id}`, window.location.href) + "";
  }
  toString() {
    return "url(" + this.href + ")";
  }
}

export default function (name: any) {
  return new Id("O-" + (name == null ? "" : name + "-") + ++count);
}
