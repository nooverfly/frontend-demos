class GrayState {
  observers: any[];
  status: any;

  constructor() {
    this.observers = [];
    this.status = {};
  }

  attach(func: any) {
    if (!this.observers.includes(func)) {
      this.observers.push(func);
    }
  }

  detach(func: any) {
    this.observers = this.observers.filter((obs) => obs !== func);
  }

  updateStatus(val: any) {
    this.status = val;
    this.trigger();
  }

  trigger() {
    this.observers.forEach((obs) => {
      obs(this.status);
    });
  }
}

export default new GrayState();
