

![](https://cdn-images-1.medium.com/max/1000/1*lX5-GgvSuMTomVe1p4artg.png)

#### Challenge Scenario

---

It’s late at night and your room’s a mess, you stumble upon an dusty old looking box and you decide to go through it, you start unveiling hidden childhood memories and you find a mesmerising gamebody advanced flash card labeled “Nostalgia”, you pop the card in and a logo welcomes you, this strange game expects you to input a cheatcode. Can you figure it out?

check the zip file

![](https://cdn-images-1.medium.com/max/1000/1*UGvYAC0LtNDUhvP5Hr-QEA.png)

  

![](https://cdn-images-1.medium.com/max/1000/1*wNVfhZl2scUw3Mj3yX4y9g.png)

strings the gba

![](https://cdn-images-1.medium.com/max/1000/1*Exx4sQ_epy_hPTwP6tyKDg.png)

cant found something useful

so use mgba

![](https://cdn-images-1.medium.com/max/1000/1*G5SQznDYZGybFf_JSlHh_A.png)

start

![](https://cdn-images-1.medium.com/max/1000/1*N7oygYFfC7ReodVcZWy9zw.png)

![](https://cdn-images-1.medium.com/max/1000/1*ZUBGs2PEgLpIMvrMr3wfaw.png)

load the rom

![](https://cdn-images-1.medium.com/max/1000/1*-j2ak36cHOo0UpWW42xOjA.png)

![](https://cdn-images-1.medium.com/max/1000/1*S87jMWJsMc5QARuwn_EkcQ.png)

we can input as the following rules

A=>L

S=>R

Z=>B

X=>A

UP,DOWN,LEFT,RIGHT

BACK to delete all

so,use ghidra and download a differnet extension

![](https://cdn-images-1.medium.com/max/1000/1*BNzFmHbsQxun6Z-EK5wP1A.png)

after some checking

we found bne at 08001638

![](https://cdn-images-1.medium.com/max/1000/1*vksKvb_nSS8tAJeOjhDLCA.png)

change d1=>d0

![](https://cdn-images-1.medium.com/max/1000/1*HL78m0UTJ0kQAkhUIUOk-g.png)

it will change all logic

so,if we input the wrong answer,it will return the flag

lets have a try

![](https://cdn-images-1.medium.com/max/1000/1*ofyogmpA5nmWTnePXrNYDg.png)

remember change the format as RAWBYTES

delete the .bin

and have a try

![](https://cdn-images-1.medium.com/max/1000/1*cXLayTWBQy2eMJrHNRgcPw.png)

![](https://cdn-images-1.medium.com/max/1000/1*i7bqMsyrt-72A85u0Tf_fg.png)

it works as we except

**_HTB{GBA_RuLeZ_DudE}_**