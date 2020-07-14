export function test() {
  const sleep = (ms = 10000) => new Promise(resolve => setTimeout(resolve, ms));

  const request = (params) => {
    return new Promise((resolve) => {
      sleep().then(() => {
        resolve(params);
      });
    })
  }
  const map = new Map();

  Promise.all([request(1), request(2), request(3)]).then(res => {
    console.debug(res, map)
  })
}