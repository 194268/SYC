
![](https://cdn-images-1.medium.com/max/1000/1*8LNdwt4pH9PUAindGunS9A.png)

#### Challenge Scenario

---

Qubitrix transmits their most sensitive data to its partners using a strange quantum system through a terminal called QTT. The terminal access does not require any authentication, so your first mission is to reverse-engineer the connection, and capture what was never meant to be seen.

as usual

check the website

![](https://cdn-images-1.medium.com/max/1000/1*tV-ZPqkc3oySInkqi5inFg.png)

ok,nc 

![](https://cdn-images-1.medium.com/max/1000/1*QBylYbmAKc5Jeg5DAmzGuQ.png)

so like the rules i mentioned at 

[https://syc-sigma.vercel.app/p/HTB%20Global%20Hyperlink%20Zone%20Writeup](https://syc-sigma.vercel.app/p/HTB%20Global%20Hyperlink%20Zone%20Writeup)

![](https://cdn-images-1.medium.com/max/1000/1*naBUUYJnq3PezTFMZprWUg.png)

here is the example 

![](https://cdn-images-1.medium.com/max/1000/1*bWOfevM4M1Zms7SmE01omQ.png)

so,in order to avoid doing so many rounds of hard labor

we use a simple py

> **#!/usr/bin/env python3**

> **import socket  
> import re  
> import time**

> **def get_correction(basis: str, q0: int, q1: int):  
>  “””  
>  根据量子隐形传态协议返回 (instructions, measurement_basis)  
>  “””  
>  bits = (q0, q1)  
>    
>  if bits == (0, 0):  
>  # 无操作 -> 用 X:2;X:2 或 Z:2;Z:2 抵消  
>  instructions = “X:2;X:2” # 两次 X 门 = 恒等操作  
>  elif bits == (0, 1):  
>  instructions = “X:2”  
>  elif bits == (1, 0):  
>  instructions = “Z:2”  
>  elif bits == (1, 1):  
>  instructions = “X:2;Z:2”  
>  else:  
>  instructions = “X:2;X:2”  
>    
>  measure_basis = basis.strip()  
>  return instructions, measure_basis**

> **def main():  
>  host = “154.57.164.83”  
>  port = 30527  
>    
>  sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)  
>  sock.connect((host, port))  
>    
>  # 接收初始欢迎信息  
>  data = sock.recv(4096).decode()  
>  print(data)  
>    
>  # 循环处理 204 轮  
>  for round_num in range(1, 205):  
>  print(f”\n — — Round {round_num} — -”)  
>    
>  # 接收直到出现 “Specify the instructions :”  
>  buffer = “”  
>  while “Specify the instructions :” not in buffer:  
>  chunk = sock.recv(1024).decode()  
>  if not chunk:  
>  print(“连接关闭”)  
>  return  
>  buffer += chunk  
>  print(chunk, end=””)  
>    
>  # 解析 Basis 和测量结果  
>  basis_match = re.search(r”Basis\s*:\s*([ZX])”, buffer)  
>  q0_match = re.search(r”Measurement of qubit 0\s*:\s*([01])”, buffer)  
>  q1_match = re.search(r”Measurement of qubit 1\s*:\s*([01])”, buffer)  
>    
>  if not (basis_match and q0_match and q1_match):  
>  print(“解析失败，原始数据：”)  
>  print(buffer)  
>  return  
>    
>  basis = basis_match.group(1)  
>  q0 = int(q0_match.group(1))  
>  q1 = int(q1_match.group(1))  
>    
>  print(f”解析结果: Basis={basis}, q0={q0}, q1={q1}”)  
>    
>  # 计算指令和测量基组  
>  instructions, measure_basis = get_correction(basis, q0, q1)  
>  print(f”发送指令: {instructions if instructions else ‘(空)’}”)  
>    
>  # 发送指令  
>  sock.send((instructions + “\n”).encode())  
>    
>  # 接收 “Specify the measurement basis :”  
>  buffer = “”  
>  while “Specify the measurement basis :” not in buffer:  
>  chunk = sock.recv(1024).decode()  
>  if not chunk:  
>  print(“连接关闭”)  
>  return  
>  buffer += chunk  
>  print(chunk, end=””)  
>    
>  # 发送测量基组  
>  print(f”发送测量基组: {measure_basis}”)  
>  sock.send((measure_basis + “\n”).encode())  
>    
>  # 接收本轮剩余输出  
>  time.sleep(0.1)  
>  # 非阻塞读取剩余数据  
>  sock.setblocking(False)  
>  try:  
>  while True:  
>  remaining = sock.recv(1024).decode()  
>  if remaining:  
>  print(remaining, end=””)  
>  else:  
>  break  
>  except BlockingIOError:  
>  pass  
>  sock.setblocking(True)  
>    
>  # 接收最终输出  
>  time.sleep(0.5)  
>  final = sock.recv(4096).decode()  
>  print(final)  
>  sock.close()**

> **if __name__ == “__main__”:  
>  main()**

but no flag turns out 

check the source code 

![](https://cdn-images-1.medium.com/max/1000/1*tH_bGaBHaaCUH9IZcgS2AQ.png)

we should read the flag form it

so,use 

> import re

> def bits_to_string(bit_list):  
>  res = “”  
>  # 每 8 bits 提取一次  
>  for i in range(0, len(bit_list), 8):  
>  byte_bits = bit_list[i:i+8]  
>  if len(byte_bits) < 8: break  
>    
>  # 将 bit 列表转为 01 字符串并转为整数  
>  byte_str = “”.join(map(str, byte_bits))  
>  res += chr(int(byte_str, 2))  
>  return res

> def parse_and_fix(file_path):  
>  with open(file_path, ‘r’, encoding=’utf-8') as f:  
>  content = f.read()

> # 1. 提取所有 Basis 和 Qubit 2 结果  
>  # 我们先拿到所有的匹配对，确保存储顺序与日志一致  
>  matches = re.findall(r”Basis\s*:\s*([ZX]).*?Measurement of qubit 2\s*:\s*([01])”, content, re.DOTALL)  
>    
>  # 尝试方案：标准顺序 (Basis_bit, Q2_bit)  
>  bits = []  
>  for basis, q2 in matches:  
>  b_bit = 0 if basis == ‘Z’ else 1  
>  q2_bit = int(q2)  
>  bits.extend([b_bit, q2_bit])  
>    
>  return bits

> if __name__ == “__main__”:  
>  file_name = “output.txt”  
>  try:  
>  raw_bits = parse_and_fix(file_name)  
>    
>  print(“-” * 30)  
>  print(f”[*] 提取到 {len(raw_bits)} bits (共 {len(raw_bits)//8} 字节)”)  
>    
>  # 尝试标准还原  
>  print(“[*] 还原结果 (标准):”)  
>  print(bits_to_string(raw_bits))  
>    
>  # 如果还是乱码，尝试位序翻转还原 (Q2_bit, Basis_bit)  
>  print(“\n[*] 还原结果 (如果上方不对，请看这个 — 位序翻转):”)  
>  flipped_bits = []  
>  for i in range(0, len(raw_bits), 2):  
>  flipped_bits.extend([raw_bits[i+1], raw_bits[i]])  
>  print(bits_to_string(flipped_bits))  
>    
>  except FileNotFoundError:  
>  print(“请确保 output.txt 存在”)

to find the answer

rememer save the all rounds result into output.txt

![](https://cdn-images-1.medium.com/max/1000/1*7l6X4bKuZPwnWAreEqCF0w.png)

![](https://cdn-images-1.medium.com/max/1000/1*ZXYNdeFlYSK02hNX8eCIHg.png)

it will show the answer

**_HTB{c0mpL371ng_7h3_qu4n7um_73L3p0r74710n_pr070c0L!}_**