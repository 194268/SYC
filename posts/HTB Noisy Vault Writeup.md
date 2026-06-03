### HTB **Noisy Vault Writeup**

![](https://cdn-images-1.medium.com/max/1000/1*Wz5aRfcgPY18ZXYtuGwnYQ.png)

#### Challenge Scenario

---

The city’s central vault is shielded by a 13-qubit quantum processor. The 9-bit access code is rapidly decaying due to constant decoherence. Use the available ancilla qubits to mitigate the noise and stabilize the signal. You have one shot at the key before the security lockdown engages. Can you filter the truth from the noise?

check the zip file and nc the target

![](https://cdn-images-1.medium.com/max/1000/1*UOTINStCOuHGtymiwMdgMQ.png)

it seems like we have only one chance to try

enter 1

![](https://cdn-images-1.medium.com/max/1000/1*i6tnOwtriKugdf7rOrEZZw.png)

so,we need to check the server.py to find out the answer

![](https://cdn-images-1.medium.com/max/1000/1*0wju3X52XyXa7wRPFi5EMA.png)

for the basic role of quantum

I have a little explain at [https://syc-sigma.vercel.app/p/HTB%20Global%20Hyperlink%20Zone%20Writeup](https://syc-sigma.vercel.app/p/HTB%20Global%20Hyperlink%20Zone%20Writeup)

so,use the poc below

> **_#!/usr/bin/env python3  
> import json  
> import re  
> from pwn import *_**

> **_# 配置远程目标  
> HOST = “154.57.164.63”  
> PORT = 31045_**

> **_# 调整 pwntools 的日志级别，方便观察交互  
> context.log_level = ‘info’_**

> **_def solve():  
>  # 建立 TCP 连接  
>  log.info(f”正在连接到目标 Vault -> {HOST}:{PORT}”)  
>  io = remote(HOST, PORT)_**

> **_# ==================== STEP 1: 访问 Oracle ====================  
>  log.info(“阶段 1: 正在选择访问 Quantum Oracle 菜单…”)  
>  io.sendlineafter(b”Choice > “, b”1")_**

> **_# ==================== STEP 2: 发送无损探测 Payload ====================  
>  # 构造能够刷满连接计数（data_ancilla_links >= 16）  
>  # 且激活足够辅助位（active_ancillas >= 4）的无损受控门组合  
>  payload = (  
>  “CX:0,64; CX:1,64; CX:2,64; CX:3,64; “  
>  “CX:4,65; CX:5,65; CX:6,65; CX:7,65; “  
>  “CX:8,66; CX:9,66; CX:10,66; CX:11,66; “  
>  “CX:12,67; CX:13,67; CX:14,67; CX:15,67”  
>  )  
>  log.info(“正在发送绕过编译优化的经典无损 Payload…”)  
>  io.sendlineafter(b”> “, payload.encode())_**

> **_# ==================== STEP 3: 解析返回的 Counts ====================  
>  log.info(“正在等待 Oracle 测量结果…”)  
>  io.recvuntil(b”[Oracle] Results: “)  
>    
>  # 抓取整行 JSON 数据  
>  result_json_str = io.recvline().strip().decode()  
>  counts = json.loads(result_json_str)_**

> **_# 提取 Shot 次数最高（即置信度最高）的二进制字符串 (Rank 1)  
>  rank1_key = max(counts, key=counts.get)  
>  log.success(f”成功捕获高频测量状态 (Qiskit 字节序): {rank1_key}”)_**

> **_# ==================== STEP 4: 逆转端序 (Endianness) ====================  
>  # Qiskit 打印时低位 q[0] 在最右侧，而源码校验时 secret_key[0] 在最左侧  
>  # 执行整串 64-bit 彻底反转  
>  secret_key = rank1_key[::-1]  
>  log.success(f”经过小端序转换后的真实 Access Code: {secret_key}”)_**

> **_# ==================== STEP 5: 提交 Access Code 拿 Flag ====================  
>  log.info(“阶段 2: 正在切入一击必杀（One-Shot）开锁菜单…”)  
>  io.sendlineafter(b”Choice > “, b”2")  
>    
>  log.info(“正在向 Vault 输入最终凭据…”)  
>  io.sendlineafter(b”> “, secret_key.encode())_**

> **_# 切换到交互模式，直接读取 flag.txt 的输出  
>  io.interactive()_**

> **_if __name__ == “__main__”:  
>  solve()_**

here is the whole progress

at first

it set two rules 

data_ancilla_links >= 16 and active_ancillas >= 4

so,we use 

 “CX:0,64; CX:1,64; CX:2,64; CX:3,64; “  
 “CX:4,65; CX:5,65; CX:6,65; CX:7,65; “  
 “CX:8,66; CX:9,66; CX:10,66; CX:11,66; “  
 “CX:12,67; CX:13,67; CX:14,67; CX:15,67

cx make the Data Qubit doesn`t change

than,we got the output,but there still have one detail we need to keep an eye on

Qiskit,it reads data like this

![](https://cdn-images-1.medium.com/max/1000/1*8uF4kU1yz71wIky8a3MxAg.png)

so, we

secret_key = rank1_key[::-1]

to find the real flag

![](https://cdn-images-1.medium.com/max/1000/1*ImuLTGbMW0kPA_aXscQfDA.png)

we got the flag

**_HTB{Qu4nTUm_n01s3_c4nt_st0p_th3_v4ult_h4ck!}_**