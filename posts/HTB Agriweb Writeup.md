![](https://cdn-images-1.medium.com/max/1250/1*AchIDa1kiJh58K1bgHFI8g.png)

#### Challenge Scenario

---

Digital farmlands lie ruined as drones spin out of control and greenhouses overheat; the white-hats must infiltrate the corrupted AgriWeb interface and bring the fields back to life.

check the website

![](https://cdn-images-1.medium.com/max/1250/1*8iBDBWzqH0gQ6hlJVHWfEw.png)

view the login page

![](https://cdn-images-1.medium.com/max/1250/1*H1rI7g04tfxbZu9hN3T9dw.png)

![](https://cdn-images-1.medium.com/max/1250/1*zBEZwwRCwO6_v5v33kbhIQ.png)

so,check the exploit

![](https://cdn-images-1.medium.com/max/1250/1*MP_wnRt0vTwSqsTuOISmYw.png)

it gives two payload

![](https://cdn-images-1.medium.com/max/1250/1*yx4A-I9-RmsCNI54GOLtBw.png)

we can found it use the prototype pollution vulnerability

check the vulnerable code

![](https://cdn-images-1.medium.com/max/1250/1*rxLHTYcG0AyujZcfw2Ceng.png)

> for (let key in source) {  
>  // key = “__proto__”  
>  // source[“__proto__”] = { “isAdmin”: true } ✅   
>  // target[“__proto__”] =Object.prototype ✅   
>  deepMerge(target[“__proto__”], source[“__proto__”])  
>  // deepMerge(Object.prototype, { “isAdmin”: true })  
> }

so,it use deepMerge again.

> deepMerge(Object.prototype, { “isAdmin”: true })  
> for (let key in source) {  
>  // key = “isAdmin”  
>  target[key] = source[key];  
>  Object.prototype.isAdmin = true;   
> }

it will make every object add .isAdmin

> const obj = { name: “Alice” };  
> console.log(obj.name); // “Alice”   
> console.log(obj.toString); // function   
> console.log(obj.isAdmin); // undefined 

==>

> console.log({ name: “Alice” }.isAdmin); // true  
> console.log([1, 2, 3].isAdmin); // true  
> console.log(new Date().isAdmin); // true

so,

user.isAdmin → undefined

=>

user.isAdmin → true

so how to **resolve** it

easy,add a sentence before

**_if (key === ‘__proto__’ || key === ‘constructor’ || key === ‘prototype’) {  
 continue;  
 }_**

![](https://cdn-images-1.medium.com/max/1250/1*rwcQGr6hcwj2LeN-Rh5iOA.png)

it will keep the proto away

![](https://cdn-images-1.medium.com/max/1250/1*xNxDAWPPx8C-nRCXG_guEg.png)

**_HTB{pr0totyp3_p0llut10n_t0_4uth_byp4s5}_**