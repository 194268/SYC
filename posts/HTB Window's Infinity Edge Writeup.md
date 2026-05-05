

![](https://cdn-images-1.medium.com/max/1000/1*EVVoPX87-RlA92_uxHtPsA.png)

#### Challenge Scenario

---

A motivated APT group has breached our company and utilized custom tooling. We’ve identified the implants on compromised systems and remediated the infection using advanced AntiVirus X. However, one server seems clean but has been exhibiting suspicious traffic. Can you spot something we could have missed while cleaning this system?

check the zip file

![](https://cdn-images-1.medium.com/max/1000/1*iOLrn3vgL17hvYFr7Up28Q.png)

![](https://cdn-images-1.medium.com/max/1000/1*nZcs6ryobZX0env_s36hig.png)

we found a uplooad string

![](https://cdn-images-1.medium.com/max/1000/1*cOCz33Mx7hyc0GUKeQdFAQ.png)

its a typical Memory Shell

![](https://cdn-images-1.medium.com/max/1000/1*f4zJ-ciMYysmlWiofAvaHA.png)

we can found a SharPy with Run

and the logic inside

POST data  
 ↓  
Base64   
 ↓  
AES   
 ↓  
C#   
 ↓  
CSharpCodeProvider   
 ↓  
 SharPyShell   
 ↓  
调用 ExecRuntime()  
 ↓  
 AES + Base64 

![](https://cdn-images-1.medium.com/max/1000/1*yS1hdpEgx4Raw4wFnFPr8Q.png)

try to decode some post data

by cyberchef

![](https://cdn-images-1.medium.com/max/1000/1*t4TQKiMU5oW7k0Bict4pTA.png)

we dose found something 

![](https://cdn-images-1.medium.com/max/1000/1*9nWY7f8B7AOHURqWjgn2LA.png)

check inside

![](https://cdn-images-1.medium.com/max/1000/1*GyOZ5OAkpip7IHDdKUaBCQ.png)

![](https://cdn-images-1.medium.com/max/1000/1*IVkcTCQ0C5jxOhvp-fqMZQ.png)

than we found a big post

i guess it may be a potato like god potato or some else

![](https://cdn-images-1.medium.com/max/1000/1*LEVWyie7f6Se2ND80tPTvA.png)

![](https://cdn-images-1.medium.com/max/1000/1*Wnr7dGBsAT3_TX1HzXFVPw.png)

![](https://cdn-images-1.medium.com/max/1000/1*DRKg8UGTJ3kyvcKdPYPKew.png)

yes it works

![](https://cdn-images-1.medium.com/max/1000/1*kI7SB4wnVIweSC64hEqQhA.png)

hh,we got a fake flag

![](https://cdn-images-1.medium.com/max/1000/1*GYvwW9eq-yOGqsAClf_ZUA.png)

![](https://cdn-images-1.medium.com/max/1000/1*HcXCeJ9FGGzEYPThkHcZAw.png)

and we found how it work

but where is the true flag

i have to check the hole process

and i found this one 

![](https://cdn-images-1.medium.com/max/1000/1*FBGcZoTNSIELC_EAqIfsLA.png)

![](https://cdn-images-1.medium.com/max/1000/1*paVpSLZnvEABv4HkWA7UnQ.png)

and we got shellcodebase64 

![](https://cdn-images-1.medium.com/max/1000/1*0waKK-oRkEkxVQv_M6UzLQ.png)

and it is a gzip

![](https://cdn-images-1.medium.com/max/1000/1*061yT-UqD_eAfstQTpKNBA.png)

we can use Disassemble to found out

it makes a C:\xor.k and write xGk89_Ew in

![](https://cdn-images-1.medium.com/max/1000/1*D-XZXU3VDFeG6F9i2d6qBg.png)

with blobrunner

we can catch the flag

HTB{F1n4lly_y0u_cr0ss3d_th3_edg3!}