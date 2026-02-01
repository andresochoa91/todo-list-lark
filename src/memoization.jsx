function multiplyBy2Memo() {
  const cache = {};

  return (num) => {
    if (cache[num]) {
      console.log(cache[num]);
      console.log('Cached result');
      console.log(cache[num]);
    } else {
      console.log('Expensive operation');
      setTimeout(() => {
        const result = num * 2;
        cache[num] = result;
        console.log(result);
      }, 3000);
    }
    console.log(cache);
  };
}

const multiplyBy2 = multiplyBy2Memo();

multiplyBy2(2);
multiplyBy2(2);
multiplyBy2(2);
multiplyBy2(2);
multiplyBy2(2);
multiplyBy2(2);
