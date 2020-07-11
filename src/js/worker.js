let current, next;
let isInitialize = true;
let data = [];

onmessage = function (e) {
  console.log(e.data);
  measure(10);
}

const callback = () => {
  if (isInitialize) {
    isInitialize = false;
    current = performance.now();
  } else {
    next = performance.now();
    data.push(next - current);
    current = next;
    postMessage(data);
  }
}

let timerId = null;
const measure = (interval) => {
  if (timerId != null) {
    clearTimeout(timerId);
    timerId = null
  } else {
    setTimeout(function tick() {
      callback();
      timerId = setTimeout(tick, interval);
    }, interval);
  }
}
