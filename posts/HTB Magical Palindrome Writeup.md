

![](https://cdn-images-1.medium.com/max/1000/1*iiKd_2TBXH-x-jH2GTQuvg.png)

#### Challenge Scenario

---

In Dumbledore’s absence, Harry’s memory fades, leaving crucial words lost. Delve into the arcane world, harness the power of JSON, and unveil the hidden spell to restore his recollection. Can you help harry yo find path to salvation?

  

check the website at first

![](https://cdn-images-1.medium.com/max/1000/1*XGPrAwD9X5fN79NYaWPDLg.png)

it returns too short

so check the zip file

![](https://cdn-images-1.medium.com/max/1000/1*R2r0VbBUA3ftEHkKnpBohA.png)

we found the reason why it returns like that

so, use

![](https://cdn-images-1.medium.com/max/1000/1*YpxyD5AxL664WN4nrv_rhA.png)

the nginx.conf

![](https://cdn-images-1.medium.com/max/1000/1*RqLZEooS9OzlPeiJdGIqlA.png)

  

set max body size 75

so,how to bypass it

…

![](https://cdn-images-1.medium.com/max/1000/1*cBUoR7UqJe38X3WK2VUOVA.png)

hey,maybe

![](https://cdn-images-1.medium.com/max/1000/1*yQ1SjLn_42oXhlbf-3Gh_g.png)

it works

so,the next step

how to meet the 

![](https://cdn-images-1.medium.com/max/1000/1*rvJi0YAzeD4TY_bihcOEVQ.png)

  

like this?

length: 1000,  
    0: "a",  
    1: "a",  
    2: "a",  
    ...  
    999: "a"

no,there must be some way out 

then we found if we use 

![](https://cdn-images-1.medium.com/max/1000/1*8fI3gdhC9yyM2FgAuB0jEw.png)

yes, when using strings,it will change

“1000” < 1000

to

1000 < 1000

because of ECMAScript

so lets going on

why should we use strings,

because when we use 

Array(“1000”) 

it makes

[“1000”]

so ,it helps us turned

for (const i of Array(string.length).keys())

from 0,1,2,…999

to 0

yes,just a zero

so it just do this whole circle only once

![](https://cdn-images-1.medium.com/max/1000/1*8eKd1OKHJybuA7ycv24pJA.png)

so,just make one example like 

![](https://cdn-images-1.medium.com/max/1000/1*F3IFb_fl-zSdLktjvU-jKg.png)

  
  
{  
  
  "palindrome":{  
  
      "length":"1000",  
  
"0":"a",  
  
"999":"a"  
  
  }  
  
}

we got it

**_HTB{Lum0s_M@x!ma}_**