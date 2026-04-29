
![](https://cdn-images-1.medium.com/max/1000/1*uCa7SL8VJcaSHjlEcwybkQ.png)

#### Challenge Scenario

---

Can you beat the odds, can you become the very best?

so, check the zip file

![](https://cdn-images-1.medium.com/max/1000/1*w3tC4DmWqjXlIqkkI_n64w.png)

a word advanture of poketmon

we need to chatch the shiny one

so,check the logic 

we can make a py

to catch the shiny 

> **_#!/usr/bin/env python3  
> from pwn import *  
> import random  
> import re  
> import time_**

> **_HOST = “154.57.164.76”  
> PORT = 30320_**

> **_MAX_WAIT = 45  
> SEARCH_AHEAD = 120_**

> **_context.log_level = “info”_**

> **_def lcg(seed, a=1664525, c=1013904223, m=2**32):  
>  return (a * seed + c) % m_**

> **_def generate_ids(seed):  
>  random.seed(seed)  
>  return random.randint(0, 65535), random.randint(0, 65535)_**

> **_def is_shiny(seed, tid, sid):  
>  random.seed(seed)_**

> **_for _ in range(6):  
>  random.randint(20, 31)_**

> **_natures = [  
>  “Adamant”, “Bashful”, “Bold”, “Brave”, “Calm”, “Careful”,  
>  “Docile”, “Gentle”, “Hardy”, “Hasty”, “Impish”, “Jolly”,  
>  “Lax”, “Lonely”, “Mild”, “Modest”, “Naive”, “Naughty”,  
>  “Quiet”, “Quirky”, “Rash”, “Relaxed”, “Sassy”, “Serious”, “Timid”  
>  ]_**

> **_random.choice(natures)_**

> **_pid = random.randint(0, 2**32–1)  
>  shiny_value = ((tid ^ sid) ^ (pid & 0xffff) ^ (pid >> 16))_**

> **_return shiny_value < 8_**

> **_def find_shiny(mac_int, start, end):  
>  names = [“Bulbasaurus”, “Charedmander”, “Squirturtle”]_**

> **_for t in range(start, end):  
>  seed = lcg(mac_int + t)  
>  tid, sid = generate_ids(seed)_**

> **_for i, name in enumerate(names):  
>  if is_shiny(seed + i, tid, sid):  
>  return t, i + 1, name_**

> **_return None_**

> **_while True:  
>  try:  
>  p = remote(HOST, PORT)  
>  conn_time = time.time()_**

> **_data = p.recvuntil(b”Enter your name:”, timeout=90).decode(errors=”ignore”)_**

> **_m = re.search(r”Mac Address:\s*([0–9a-fA-F:]{17})”, data)  
>  if not m:  
>  print(“[-] 没找到 MAC，重连”)  
>  p.close()  
>  continue_**

> **_mac = m.group(1)  
>  mac_int = int(mac.replace(“:”, “”), 16)_**

> **_local_elapsed = int(time.time() — conn_time)_**

> **_# 关键：boot_time 在 logo sleep 2 秒之后才开始  
>  server_now = local_elapsed — 2_**

> **_print(“\n==============================”)  
>  print(f”[+] MAC = {mac}”)  
>  print(f”[+] local_elapsed = {local_elapsed}”)  
>  print(f”[+] estimated server_now = {server_now}”)_**

> **_candidates = []_**

> **_# 考虑 1~2 秒网络/调度误差  
>  for guess_now in range(server_now — 2, server_now + 3):  
>  if guess_now < 0:  
>  continue_**

> **_result = find_shiny(  
>  mac_int,  
>  guess_now,  
>  guess_now + SEARCH_AHEAD  
>  )_**

> **_if not result:  
>  continue_**

> **_target_time, choice, name = result  
>  wait_time = target_time — guess_now_**

> **_if 0 <= wait_time <= MAX_WAIT:  
>  candidates.append((abs(guess_now — server_now), wait_time, guess_now, target_time, choice, name))_**

> **_if not candidates:  
>  print(“[-] 这个 MAC 附近没有合适 shiny，重连”)  
>  p.close()  
>  continue_**

> **_candidates.sort()  
>  _, wait_time, guess_now, target_time, choice, name = candidates[0]_**

> **_print(f”[+] 使用 guess_now = {guess_now}”)  
>  print(f”[+] Shiny 时间点 = 第 {target_time} 秒”)  
>  print(f”[+] 等待 = {wait_time} 秒”)  
>  print(f”[+] 选择 = {choice}”)  
>  print(f”[+] 精灵 = {name}”)_**

> **_if wait_time > 0:  
>  time.sleep(wait_time)_**

> **_p.sendline(b”aaa”)_**

> **_p.recvuntil(b”Choose your starter Poketmon”, timeout=300)  
>  p.sendline(str(choice).encode())_**

> **_p.interactive()  
>  break_**

> **_except EOFError:  
>  print(“[-] 连接断开，重连”)  
>  try:  
>  p.close()  
>  except:  
>  pass_**

> **_except KeyboardInterrupt:  
>  print(“\n[!] 退出”)  
>  break_**

with this 

![](https://cdn-images-1.medium.com/max/1000/1*pu0ncSnVUxdyb5pFoVYU-w.png)

we found the flag

**_HTB{th3_sh1n1ng_3x4mp13_0f_l0w_r4nd0mn3s5}_**