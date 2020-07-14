export function test() {
    const sleep = (ms = 1000) => new Promise(resolve => setTimeout(resolve, ms));

    const request = (params) => {
        return new Promise((resolve) => {
            sleep().then(() => {
                resolve(params);
            });
        })
    }
    
    const map = new Map();

    Promise.all([1, 2, 3, 4].map(i => request(i))).then(res => {
        console.debug(res, map)
    })
}