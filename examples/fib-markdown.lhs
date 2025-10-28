Fibonacci numbers
-----------------

The Fibonacci sequence is defined recursively, where each number
is the sum of the two preceding ones.

```haskell
fib :: Int -> Integer
fib 0 = 0
fib 1 = 1
fib n = fib (n - 1) + fib (n - 2)
```

We can also generate an infinite list of Fibonacci numbers using
a more efficient approach with `zipWith`:

```haskell
fibs :: [Integer]
fibs = 0 : 1 : zipWith (+) fibs (drop 1 fibs)
```