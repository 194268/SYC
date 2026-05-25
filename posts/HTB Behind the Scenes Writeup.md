
![](https://cdn-images-1.medium.com/max/1000/1*gM08Pt10dCXXydFnjsoB-w.png)

#### Challenge Scenario

---

After struggling to secure our secret strings for a long time, we finally figured out the solution to our problem: Make decompilation harder. It should now be impossible to figure out how our programs work!

check the zip file

![](https://cdn-images-1.medium.com/max/1000/1*C6zR8vy2iM75eDiB28ITZw.png)

use strings to check

![](https://cdn-images-1.medium.com/max/1000/1*Evt-GOMzREhbriwECoAiIQ.png)

then run

![](https://cdn-images-1.medium.com/max/1000/1*58jjbgG4mUykaffrSU-vfw.png)

so,ghidra,found the main 

![](https://cdn-images-1.medium.com/max/1000/1*F7n-lmrLw4U1E7OZGDzL3A.png)

found the start

![](https://cdn-images-1.medium.com/max/1000/1*P6hugdXrF_lTB9RpnspPHA.png)

![](https://cdn-images-1.medium.com/max/1000/1*4FV_nqdUqcqk8hNR1N11-Q.png)

![](https://cdn-images-1.medium.com/max/1000/1*pTdTJi0nGI7trSsePEG9Yw.png)

then Disassemble

![](https://cdn-images-1.medium.com/max/1000/1*QyxwSs5IlVxNA23mM4nD3Q.png)

![](https://cdn-images-1.medium.com/max/1000/1*Jo42M8b-N774OAAA3p94_Q.png)

![](https://cdn-images-1.medium.com/max/1000/1*A14ORSiLWOMTTwN3ZAbCkg.png)

![](https://cdn-images-1.medium.com/max/1000/1*OlrnT6q2LvPhAXS2K-B7sw.png)

![](https://cdn-images-1.medium.com/max/1000/1*Gz_hMN-xLS_sNPqx1V-THQ.png)

we found this

![](https://cdn-images-1.medium.com/max/1000/1*DYHJl-NguN6Uqy_gC8S6oQ.png)

then wefound 0010202b

![](https://cdn-images-1.medium.com/max/1000/1*-v88yVV18K1EKMgw_zQGZg.png)

yes ,here is the final flag

49 74 7a => Itz

00(pass) 5f 30 6e => _0n

00(pass) 4c 79 5f => Ly_

00 55 44 32 =>UD2

it will fills in to HTB{}

HTB{Itz_0nLy_UD2}