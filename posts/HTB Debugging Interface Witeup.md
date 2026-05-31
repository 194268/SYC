
![](https://cdn-images-1.medium.com/max/1000/1*EoJ0DEpX9a-EMNjqLIzdGA.png)

#### Challenge Scenario

---

We accessed the embedded device’s asynchronous serial debugging interface while it was operational and captured some messages that were being transmitted over it. Can you decode them?

check the zip file

![](https://cdn-images-1.medium.com/max/1000/1*Z2XBxnzzaiUjJAnKTkc0dA.png)

it is a sal

use binwalk

![](https://cdn-images-1.medium.com/max/1000/1*D6RNJFQXxsk_GNIGo3Scvw.png)

so extract again

![](https://cdn-images-1.medium.com/max/1000/1*PgNJODyz_CaleiXu9xdYLQ.png)

we got

![](https://cdn-images-1.medium.com/max/1000/1*yvshLVBsReRpGDNhTysOLg.png)

![](https://cdn-images-1.medium.com/max/1000/1*ErmCAovOhM52GmJLfG-69A.png)

from this json

we know

“enabledChannels”:[{“type”:”Digital”,”index”:0}]”

“sampleRate”:{“digital”:50000000}”

so,download a logic 2 

![](https://cdn-images-1.medium.com/max/1000/1*Ml3eJerkFc4IgvgsJcMzHg.png)

use default settings

![](https://cdn-images-1.medium.com/max/1000/1*61BPSl6mgRsjq1Pk10O6Sg.png)

and we got this

![](https://cdn-images-1.medium.com/max/1000/1*elZxB4gpPQA0E6wQkaQ_zA.png)

and we found 32.04

![](https://cdn-images-1.medium.com/max/1000/1*ZIVJvH_TQADcHPCPdq85iw.png)

so the bit rate sould be 1/32.04

![](https://cdn-images-1.medium.com/max/1000/1*OJc_w-q51xZawiQswCIkOw.png)

so set 31210

![](https://cdn-images-1.medium.com/max/1000/1*p1wE7jbaxJPDYqPdeA8GDA.png)

and we got it

![](https://cdn-images-1.medium.com/max/1000/1*iKwVw2O2IEcquFJjf0TXng.png)

**_HTB{d38u991n9_1n732f4c35_c4n_83_f0und_1n_41m057_3v32y_3m83dd3d_d3v1c3!!52}_**