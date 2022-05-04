export async function login({ username, password }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === 'hozayves' && password === '123') {
        resolve();
        console.log('yes');
      } else {
        reject();
        console.log('No');
      }
    }, 1000);
  });
}
