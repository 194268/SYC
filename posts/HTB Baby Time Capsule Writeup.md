

![](https://cdn-images-1.medium.com/max/1000/1*k_Evo4_EcaQsqFbYUVrG4g.png)

#### Challenge Scenario

---

Very Easy Crypto Challenge

check the zip file

![](https://cdn-images-1.medium.com/max/1000/1*Re4nrjnnU--mwqvK7f4R_g.png)

The core of the code is an RSA encryption service. The vulnerability lies in the fact that you can repeatedly enter ‘Y’ to have the server encrypt the same plaintext FLAG using different moduli n_n_ but the same public exponent e=5_e_=5. Because e=5_e_=5 is very small, once you collect 5 different ciphertext–public key pairs, you can use the Chinese Remainder Theorem (CRT) combined with a low public exponent broadcast attack (Hastad’s Broadcast Attack) to recover the plaintext directly, without needing to factor any n_n_.

💡 Vulnerability principle: Broadcast attack  
According to the code, each time you enter ‘Y’, the server generates a new ni_ni_​ and computes:

ci≡m5(modni)_ci_​≡_m_5(mod_ni_​)

Since each ni_ni_​ is coprime, if you collect 5 different pairs (ci,ni)(_ci_​,_ni_​):

c1≡m5(modn1)_c_1​≡_m_5(mod_n_1​)c2≡m5(modn2)_c_2​≡_m_5(mod_n_2​)c3≡m5(modn3)_c_3​≡_m_5(mod_n_3​)c4≡m5(modn4)_c_4​≡_m_5(mod_n_4​)c5≡m5(modn5)_c_5​≡_m_5(mod_n_5​)

Using the Chinese Remainder Theorem (CRT), you can compute a unique C_C_ without factoring any n_n_, such that:

C≡m5(modn1⋅n2⋅n3⋅n4⋅n5)_C_≡_m_5(mod_n_1​⋅_n_2​⋅_n_3​⋅_n_4​⋅_n_5​)

Because m<ni_m_<_ni_​, we have m5<n1⋅n2⋅n3⋅n4⋅n5_m_5<_n_1​⋅_n_2​⋅_n_3​⋅_n_4​⋅_n_5​. This means that C_C_ does not exceed the product of the moduli. Hence, over the integers:

C=m5_C_=_m_5

At this point, taking the 5th root of C_C_ directly yields the plaintext m_m_.

so use

  

> **_from pwn import *  
> import json  
> from Crypto.Util.number import long_to_bytes  
> from sympy.ntheory.modular import crt  
> import gmpy2_**

> **_# 1. 连接服务器 (请替换为你题目实际的 IP 和端口)  
> ip = “127.0.0.1”   
> port = 1337  
> io = remote(ip, port)_**

> **_c_list = []  
> n_list = []  
> e = 5_**

> **_log.info(“正在收集 5 组不同的密文和公钥…”)_**

> **_# 2. 收集 5 组数据  
> for i in range(e):  
>  io.sendlineafter(b’(Y/n) ‘, b’Y’)  
>  response = io.recvline().decode().strip()  
>    
>  # 解析服务器返回的 JSON  
>  data = json.loads(response)  
>  c = int(data[“time_capsule”], 16)  
>  n = int(data[“pubkey”][0], 16)  
>    
>  c_list.append(c)  
>  n_list.append(n)  
>  log.success(f”已获取第 {i+1} 组数据”)_**

> **_io.close()_**

> **_# 3. 使用中国剩余定理 (CRT) 求解 m⁵  
> log.info(“正在运行中国剩余定理 (CRT) …”)  
> # sympy 的 crt 接收两个列表：模数列表和余数列表  
> M_pow_5, _ = crt(n_list, c_list)_**

> **_# 4. 在整数域上直接开 5 次方根  
> log.info(“正在开 5 次方根…”)  
> m, exact = gmpy2.iroot(gmpy2.mpz(M_pow_5), e)_**

> **_if exact:  
>  flag = long_to_bytes(int(m))  
>  print(f”\n[+] 成功解密明文: {flag.decode()}”)  
> else:  
>  print(“\n[-] 开方不精确，请检查收集的数据是否有误。”)_**

![](https://cdn-images-1.medium.com/max/1000/1*6DmuH8hPELtcFbUjgEbXTg.png)

**_HTB{913b396751e7b1b5760acc27db89ab7b}_**