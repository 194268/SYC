

![](https://cdn-images-1.medium.com/max/1000/1*sNzR6Exj6xmr3XhtN3JiUQ.png)

#### Challenge Scenario

---

Intelligence units have intercepted a list of numbers. They seem to be used in a peculiar way: the adversary seems to be sending a list of numbers, most of which are garbage, but two of which are prime. These 2 prime numbers appear to form a key, which is obtained by multiplying the two. Your answer is the product of the two prime numbers. Find the key and help us solve the case.

check the website

![](https://cdn-images-1.medium.com/max/1000/1*iDOpwo1qUNDmuEoL8BMF0A.png)

humm…ai plz

  

>   
> **_n = input()  
> nums = list(map(int, n.split()))  
> def is_prime(x):  
>  if x <= 1:  
>  return False  
>  if x == 2:  
>  return True  
>  if x % 2 == 0:  
>  return False  
>  for i in range(3, int(x ** 0.5) + 1, 2):  
>  if x % i == 0:  
>  return False  
>  return True  
> primes = [x for x in nums if is_prime(x)]  
> if len(primes) >= 2:  
>  result = primes[0] * primes[1]  
> else:  
>  result = None  
> print(result)_**

so ,check mate

![](https://cdn-images-1.medium.com/max/1000/1*Gh-zt3bxD26HiOeSx6g53w.png)

**_HTB{pr1m3_Pr0}_**