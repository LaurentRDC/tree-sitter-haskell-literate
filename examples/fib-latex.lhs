Fibonacci numbers
-----------------

The Fibonacci sequence is defined recursively, where each number
is the sum of the two preceding ones.

\begin{code}
fib :: Int -> Integer
fib 0 = 0
fib 1 = 1
fib n = fib (n - 1) + fib (n - 2)
\end{code}

We can also generate an infinite list of Fibonacci numbers using
a more efficient approach with `zipWith`:

\begin{code}
fibs :: [Integer]
fibs = 0 : 1 : zipWith (+) fibs (drop 1 fibs)
\end{code}

The following block is ignored by the compiler:

\begin{code}% don't typecheck this!
fibsEvil :: [Integer]
fibsEvil = scanl (+) 0 fibs
\end{code}