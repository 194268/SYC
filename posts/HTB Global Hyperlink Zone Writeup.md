![](https://miro.medium.com/v2/resize:fit:875/1*OwrZlAhvkY1MNx69nd7_9Q.png)

### Challenge Scenario

Beneath Qubitrix’s corporate towers lies the Global Hyperlink Zone — their prototype quantum internet. Its five access nodes authenticate through specific quantum gate patterns. Retrieve the sequence, stabilize the hyperlink, and force entry into their hidden backbone. One wrong move, and the link collapses.

check the website

Press enter or click to view image in full size

![](https://miro.medium.com/v2/resize:fit:875/1*KmyOCnkey-8ATx_Fm2zJ8g.png)

it seems like we should type

H:0 or CX:0,1 like this format

Press enter or click to view image in full size

![](https://miro.medium.com/v2/resize:fit:875/1*6eMcSG75pCEFIpni0YTkIA.png)

check the source code

netcat the target

Press enter or click to view image in full size

![](https://miro.medium.com/v2/resize:fit:875/1*Jt4DzcjoC0zKIg6IaS3Smg.png)

so ,we need to make this worked

if (  
shares[0] == shares[1] and  
shares[1] == shares[3] and  
shares[2] == shares[4] and  
shares[4] != shares[0]  
):

so we need make

q0=q1=q3!=q2=q4

and we should know

these doors,i suggest you ask ai about the detail

for me, i just make a example

H:0(make q0 be 0/1)

CX:0,1(make q0=q1)

like this

when q0=0 than cx dont work q1=0=q0

when q0=1 than cx work q1:0=>1=q0

so,it will make q0=q1

than make a little extend

use this

H:0;CX:0,1;CX:0,3;X:2;CX:0,2;CX:2,4

H:0;CX:0,1;CX:0,3 will make q0=q1=q3

x:2 make q2!=q0

CX:0,2;CX:2,4 make q2!=q0 and q2=q4

so,yes we made it

Press enter or click to view image in full size

![](https://miro.medium.com/v2/resize:fit:875/1*FKBxYrT8WnaVJlA3Nr66hA.png)

**_HTB{4_57r4ng3_gr33nb3rg3r_h0rn3_z31L1ng3r_57473_1n1714L1z35_7h3_hyp3rL1nk!}_**