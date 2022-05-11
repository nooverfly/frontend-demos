const fibonacci = (target: number) => {
  const fib = [];

  fib[0] = 0;
  fib[1] = 1;
  for (let i = 2; i <= target; i++) {
    fib[i] = fib[i - 2] + fib[i - 1];
  }
  console.log("运行Fibonacci");
  return fib[target];
};

export default fibonacci;
