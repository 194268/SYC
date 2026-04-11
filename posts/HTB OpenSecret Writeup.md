
![](https://cdn-images-1.medium.com/max/1000/1*swfVuRMgFJPkKRxea9tdfA.png)

#### Challenge Scenario

---

A simple help desk portal where users can submit support tickets. The application uses JWT tokens for session management, but something seems off about how they’re implemented. Can you find the security flaw?

![](https://cdn-images-1.medium.com/max/1000/1*z0tmWqKj-tvg7G4X9B0Ycw.png)

so ,check the website

![](https://cdn-images-1.medium.com/max/1000/1*sz8J4OYjItCo_i4VF4TB8Q.png)

submit but no session token provided

![](https://cdn-images-1.medium.com/max/1000/1*K6S5Fm0R9HDEYFUpjDrXNA.png)

check the source code

???

wait,

**_HTB{0p3n_s3cr3ts_ar3_n0t_s3cr3ts}_**

![](https://cdn-images-1.medium.com/max/1000/1*6pvHDBEJyLa7yCFYmW3sGg.png)

thats all?

check 

we can found when use http

crypto.subtle is undefined

![](https://cdn-images-1.medium.com/max/1000/1*F5fDEVwkbilph_9kZQvveg.png)

![](https://cdn-images-1.medium.com/max/1000/1*znBrEmQw9df0ze3Zv0r5nw.png)

so ,here must be something wrong with this room

not fun