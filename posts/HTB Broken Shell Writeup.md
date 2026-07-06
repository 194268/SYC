
![](https://cdn-images-1.medium.com/max/1000/1*9bs4unZu-MBo4-DaoQs5yA.png)

#### Challenge Scenario

---

We’ve built a secure sandbox environment that only allows specific symbols and numbers. It’s designed to be inescapable — security at its best!

![](https://cdn-images-1.medium.com/max/1000/1*waXvUZ-00ktAElYh-QEQNg.png)

[*] Allowed characters: ^[0–9$ {}/?”[:space:]:&>_=()]+$

it only allows these characters

so, try ${0} check the shell itself

![](https://cdn-images-1.medium.com/max/1000/1*Q2PZkv8YozGlUBPWrfWO_w.png)

![](https://cdn-images-1.medium.com/max/1000/1*etBfcAYiA7FLhVmIjPHQfQ.png)

try /???/?? check anything we can use

![](https://cdn-images-1.medium.com/max/1000/1*LPohWJMaZgn0aSyg-IxhBg.png)

it finds the /bin/cp

so ,how to get a normal shell => /bin/sh

/???/ => /bin/

how to make /sh

oh,remember what we got before 

**the name of this shell**

![](https://cdn-images-1.medium.com/max/1000/1*Q2PZkv8YozGlUBPWrfWO_w.png)

so use this 

`/???/${0:8:1}${0:1:1}`

it also means /bin/sh

yep,we got it

![](https://cdn-images-1.medium.com/max/1000/1*mdPmrLKu5RpU1h2ZB5UfwQ.png)

![](https://cdn-images-1.medium.com/max/1000/1*64qIPwjY-HnkvJ5uBSzAZQ.png)

**_HTB{?y0u?4r3?4?tru3?b45h?3xp3rt}_**

also ,my little helper conquer it 

![](https://cdn-images-1.medium.com/max/1000/1*sN4Gc7Xqqs60DTOB6M7zJQ.png)

![](https://cdn-images-1.medium.com/max/1000/1*KKUmfFiXw2Gm3vdRRXVghQ.png)

![](https://cdn-images-1.medium.com/max/1000/1*N2YLnZDAGNwu0SMynp9GsA.png)

![](https://cdn-images-1.medium.com/max/1000/1*IV3hBlOWiRJv5Ym7_BVuWg.png)

![](https://cdn-images-1.medium.com/max/1000/1*Kqn08-IgBeZrDC6KBrRCsw.png)

![](https://cdn-images-1.medium.com/max/1000/1*Yew6b3SPr16utblbFdx5iw.png)

the flag means we may not conquer it as the way it refers to,but i believe it is the better way