

![](https://cdn-images-1.medium.com/max/1000/1*x0WAfx0oSAUdjfyVpFigrQ.png)

#### Challenge Scenario

---

In the dark, dusty underground labyrinth, the survivors feel lost and their resolve weakens. Just as despair sets in, they notice a faint light: a dilapidated, rusty robot emitting feeble sparks. Hoping for answers, they decide to engage with it.

lets go

![](https://cdn-images-1.medium.com/max/1000/1*R3wm62zNm9OkWWWyNoeXtA.png)

check the source code

no js,no useful button

![](https://cdn-images-1.medium.com/max/1000/1*mXZc3ydySN7z2-oP45TR3Q.png)

check the zip file

we found this

![](https://cdn-images-1.medium.com/max/1000/1*nNSU1wmAXRFIWhx1z0eF7Q.png)

check /alley

![](https://cdn-images-1.medium.com/max/1000/1*6LVXg0kE3608RXSidwxLTA.png)

/think

![](https://cdn-images-1.medium.com/max/1000/1*mukgH-V0ME9I10mDebtfeQ.png)

/guardian

![](https://cdn-images-1.medium.com/max/1000/1*Q6sxLzwt5bqffbtnAM8uig.png)

so,check the config

![](https://cdn-images-1.medium.com/max/1000/1*_a8TSM0M_eljPzx_F_VLhQ.png)

![](https://cdn-images-1.medium.com/max/1000/1*JnYGisv9r6LmAatwmOsZog.png)

  

we can found two server here, that is why 404

so,we need the SECRET_ALLEY

with a little check we can found a SSRF here

it will take the flag with it at the response

![](https://cdn-images-1.medium.com/max/1000/1*EyGKWkC_uN6od_8sG2AmMQ.png)

so ,all we need is the SECRET_ALLEY as the right host

back to think

it will show the basic information

 so how do we found it

here is a solution 

http/1.1 must have the host,

![](https://cdn-images-1.medium.com/max/1000/1*GvsuNODAMqSCSTuGUaWUtg.png)

  

![](https://cdn-images-1.medium.com/max/1000/1*JWOuhaAqIw5VXp4t3CwNfA.png)

but http/1.0 did not 

![](https://cdn-images-1.medium.com/max/1000/1*v-D7Dhd62PHxuXjCtOGq7w.png)

but it returns ip

why?

because the curl will take your ip as the hosts automaticelly

so we need 

curl -v -H “Host:” — http1.0 [http://154.57.164.68:32196/think](http://154.57.164.68:32196/think)

![](https://cdn-images-1.medium.com/max/1000/1*O9m8tBLO7PzpZGQRSoPCxA.png)

it shows the SECRET_ALLEY:alley.firstalleyontheleft.com

so with the SECRET_ALLEY and ssrf

we make 

curl -H “Host: guardian.firstalleyontheleft.com” “[http://154.57.164.68:32196/guardian?quote=http://localhost:1337/think](http://154.57.164.68:32196/guardian?quote=http://localhost:1337/think)"

it really does help

![](https://cdn-images-1.medium.com/max/1000/1*dtBV32kecROT864vwejRbQ.png)

**_HTB{DUsT_1n_my_3y3s_l33t}_**