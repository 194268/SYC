![](https://cdn-images-1.medium.com/max/1000/1*U4atb483KFZvq8dmPoO9dw.png)

#### Challenge Scenario

---

As a part of our SDLC process, we’ve got our firmware ready for security testing. Can you help us by performing a security assessment?

check the zip file

  

![](https://cdn-images-1.medium.com/max/1000/1*J4mKFZ2Gps1SVdHuitZq6A.png)

so check target ip

![](https://cdn-images-1.medium.com/max/1000/1*xSbzSMBGIQ6eRc5zYDuY3A.png)

so use binwalk

![](https://cdn-images-1.medium.com/max/1000/1*KSYnSuLAMqkmG4XIPbJHHQ.png)

we got this

![](https://cdn-images-1.medium.com/max/1000/1*cpnl8DCVN2rQULeRhC7hfw.png)

![](https://cdn-images-1.medium.com/max/1000/1*F_4IdCm51fK_qi-neDX-9A.png)

wow. so many files

we should start with the nc before

![](https://cdn-images-1.medium.com/max/1000/1*07eNKs0a_EdvNj9JsoVYVw.png)

we got this it is a typical telnet

so,search telnet

![](https://cdn-images-1.medium.com/max/1000/1*k201OW8qHGwicbpC1NHvlg.png)

![](https://cdn-images-1.medium.com/max/1000/1*0CFaVGkc6zuYNcmZ3HHiWQ.png)

and we got the username Device_Admin

and search sign

![](https://cdn-images-1.medium.com/max/1000/1*PRUrq4AqwajGXRLqtO-GGQ.png)

we got the path

cat /etc/config/sign

![](https://cdn-images-1.medium.com/max/1000/1*KuoBndYFD85vi5wimXm65w.png)

use telnet

![](https://cdn-images-1.medium.com/max/1000/1*DAbhqD0L91WIh8E--oEP7g.png)

yes login with Device_Admin:qS6-X/n]u>fVfAt!

![](https://cdn-images-1.medium.com/max/1000/1*3RUXjWHnhwhf4h72pWlmGg.png)

and we got it

**_HTB{4_hug3_blund3r_d289a1_!!}_**