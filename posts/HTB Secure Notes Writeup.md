
![](https://cdn-images-1.medium.com/max/1000/1*OsfspZ0adhmfW93e82QAZg.png)

#### Challenge Scenario

---

We built this note-taking app to be so simple, there can’t possibly be any bugs. We even added a door to claim the flag. However, only those who knock from inside may enter!

check the website

![](https://cdn-images-1.medium.com/max/1000/1*9xV6q1P25bFYCnE3MLGpXA.png)

a simple note page

![](https://cdn-images-1.medium.com/max/1000/1*NQ5zNflVznxnSdeqiN_jMg.png)

ok, no xss.

check the zip file

![](https://cdn-images-1.medium.com/max/1000/1*-w1XlAkQ_ShbrcRXRJdVlw.png)

![](https://cdn-images-1.medium.com/max/1000/1*ePvoGp7vPwMkO4t5nBFFYQ.png)

  

![](https://cdn-images-1.medium.com/max/1000/1*-pIZ38M4do2dy2yxYs-ZBg.png)

after a lot of hard try,with help of ai

we know that Mongoose set `strict: true` 

what we need is to set 

Object.prototype._peername.address = “127.0.0.1”

but $rename was available

so ,we can set title to what we need

than use

- `title` → `__proto__._peername.address`
- `content` → `__proto__._peername.family\`

so ,it will 

doc.__proto__._peername.address = ‘127.0.0.1’  
doc.__proto__._peername.family = ‘IPv4’

so,we got the flag

![](https://cdn-images-1.medium.com/max/1000/1*P3sgYCsNpjCldVjrejOpIg.png)

**_HTB{m0ng00s3_pr0t0typ3_p0llus10n_c0mb1n3d_w1th_1nt3rn4l_n0d3_g4dg3ts!}_**