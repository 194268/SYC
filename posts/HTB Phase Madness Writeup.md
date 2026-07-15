

![](https://cdn-images-1.medium.com/max/1000/1*KkMY0vXI5_DXFby_TOaG9Q.png)

#### Challenge Scenario

---

Qubitrix doesn’t store data the way others do. Deep within its core, every secret stays in a silent quantum spiral, beyond classical reach. Engineers swore it was flawless — yet something in its design hums and breathes. To them, madness. To us, clarity.

netcat the taraget

![](https://cdn-images-1.medium.com/max/1000/1*d5o7eDP9SEk-4gDusLb7Ow.png)

it is a quantum challenge

for the basic role of quantum

I have some explain at 

[**GLOBALHYPERLINK**  
syc-sigma.vercel.app](https://syc-sigma.vercel.app/p/HTB%20Global%20Hyperlink%20Zone%20Writeup "https://syc-sigma.vercel.app/p/HTB%20Global%20Hyperlink%20Zone%20Writeup")[](https://syc-sigma.vercel.app/p/HTB%20Global%20Hyperlink%20Zone%20Writeup)

check the zip file

![](https://cdn-images-1.medium.com/max/1000/1*G-AyFme02gI1bOnJMVYwpA.png)

The server treats each character of the Flag (as an ASCII code, for example, ‘H’ is 72) as an angle (72°) and rotates the compass needle to the 72° direction. Measurement Phase: You want to know what this angle is. But there’s a frustrating rule in the quantum world — you can’t directly look at where the needle points; you can only test it by “shooting.” If you shoot at it 100,000 times, the more the needle leans toward 00, the more times it falls on 00. By counting the proportion of times it falls on 00 (i.e., the probability P(0)_P_(0)), we can use inverse trigonometric functions to deduce the angle it was rotated to, thereby recovering the ASCII character!

besides

Group 0 and 1 (positions with remainder 0 and 1): The pointer rotates in the “plane.” We can directly measure it by shooting (sending an empty command) and calculate the angle.

Group 2 (positions with remainder 2, such as indices 2, 5, 8…): The server not only rotates the pointer but also applies a “Hadamard gate (H),” which rotates the pointer into a three-dimensional side orientation. If measured directly, the probability of it falling on 00 is always 50%50%, so you get no information at all.

Solution: Before measuring, we must send the command `RY:-90,<index>`. This is equivalent to pushing the pointer back by 90 degrees, making it lie flat on the measurement plane again. Then, just as before, we can calculate the angle from the probability P(0)_P_(0).

Here i asked ai for all the help

> import math  
> import json  
> import re  
> from pwn import * # 确保你已安装 pwntools: pip install pwntools

> # ==================== 远程靶机配置 ====================  
> REMOTE_IP = “154.57.164.70”   
> REMOTE_PORT = 31113  
> # ======================================================

> def solve_char(p0):  
>  “””根据观测到 0 的概率 p0，计算对应的 ASCII 字符”””  
>  cos_theta = 2 * p0–1  
>  # 限制范围防止统计涨落（Shots = 100,000 偶有微小偏差）导致 math.acos 报错  
>  cos_theta = max(-1.0, min(1.0, cos_theta))  
>  theta_rad = math.acos(cos_theta)  
>  char_code = round(theta_rad * 180 / math.pi)  
>  return chr(char_code)

> def get_qubit_count(io):  
>  “””通过故意输入一个越界的索引，让程序报错并返回总 qubit 数量（即 flag 长度）”””  
>  io.recvuntil(b’Specify the qubit index you want to measure : ‘)  
>  io.sendline(b’9999')  
>  io.recvuntil(b’Specify the instructions : ‘)  
>  io.sendline(b’’)  
>    
>  # 获取报错信息：Index 9999 out of range for size <size>  
>  err_msg = io.recvline().decode().strip()  
>  match = re.search(r’size (\d+)’, err_msg)  
>  if match:  
>  return int(match.group(1))  
>  else:  
>  raise ValueError(“无法获取量子比特总数，请检查远程交互输出。”)

> def smain():  
>  print(f”[*] 正在连接到远程服务器 {REMOTE_IP}:{REMOTE_PORT} …”)  
>  try:  
>  io = remote(REMOTE_IP, REMOTE_PORT)  
>  except Exception as e:  
>  print(f”[-] 连接失败: {e}”)  
>  return

> try:  
>  # 1. 自动获取 Flag 长度（Qubit 总数）  
>  flag_len = get_qubit_count(io)  
>  print(f”[*] 检测到 Flag 长度为: {flag_len} 字节”)  
>    
>  flag = []

> # 2. 逐个 Qubit 交互并计算  
>  for i in range(flag_len):  
>  io.recvuntil(b’Specify the qubit index you want to measure : ‘)  
>  io.sendline(str(i).encode())  
>    
>  io.recvuntil(b’Specify the instructions : ‘)  
>  # 判断当前 qubit 属于哪一种编码情况  
>  if i % 3 == 2:  
>  # 情况 3：H + RZ 编码，需要施加 RY:-90 旋转到测量基底  
>  instruction = f”RY:-90,{i}”  
>  io.sendline(instruction.encode())  
>  else:  
>  # 情况 1 和 2：RX 或 RY 编码，不需要指令，直接回车测量  
>  io.sendline(b’’)

> # 接收返回的测量频数 JSON  
>  result_line = io.recvline().decode().strip()  
>  counts = json.loads(result_line)  
>    
>  # 计算 P(0)  
>  total_shots = sum(counts.values())  
>  count_zero = counts.get(‘0’, 0)  
>  p0 = count_zero / total_shots  
>    
>  # 还原字符  
>  char = solve_char(p0)  
>  flag.append(char)  
>    
>  # 实时打印进度  
>  print(f”[+] Qubit {i:02d} ({i%3}): P(0) = {p0:.4f} -> 字符: ‘{char}’”)

> # 3. 输出最终结果  
>  final_flag = “”.join(flag)  
>  print(“\n” + “=”*50)  
>  print(f” 成功恢复 Flag: {final_flag}”)  
>  print(“=”*50)

> except Exception as e:  
>  print(f”[-] 运行过程中出错: {e}”)  
>  finally:  
>  io.close()  
>  print(“[*] 连接已关闭。”)

> if __name__ == ‘__main__’:  
>  main()

but it always went wrong at 37

![](https://cdn-images-1.medium.com/max/1000/1*ivTtIAwbGN4c-M7drhnUig.png)

so,use a development version

> **import math  
> import json  
> import re  
> from pwn import ***

> **# ==================== 远程靶机配置 ====================  
> REMOTE_IP = “154.57.164.70”   
> REMOTE_PORT = 31113  
> # ======================================================**

> **# 用于断点续传的本地缓存文件  
> CACHE_FILE = “flag_cache.json”**

> **def solve_char(p0):  
>  “””根据观测到 0 的概率 p0，计算对应的 ASCII 字符”””  
>  cos_theta = 2 * p0–1  
>  cos_theta = max(-1.0, min(1.0, cos_theta))  
>  theta_rad = math.acos(cos_theta)  
>  char_code = round(theta_rad * 180 / math.pi)  
>  return chr(char_code)**

> **def load_cache():  
>  if os.path.exists(CACHE_FILE):  
>  try:  
>  with open(CACHE_FILE, ‘r’) as f:  
>  return json.load(f)  
>  except:  
>  pass  
>  return {}**

> **def save_cache(cache_data):  
>  with open(CACHE_FILE, ‘w’) as f:  
>  json.dump(cache_data, f)**

> **def get_qubit_count(io):  
>  “””获取总 qubit 数量（即 flag 长度）”””  
>  io.recvuntil(b’Specify the qubit index you want to measure : ‘)  
>  io.sendline(b’9999')  
>  io.recvuntil(b’Specify the instructions : ‘)  
>  io.sendline(b’’)  
>  err_msg = io.recvline().decode().strip()  
>  match = re.search(r’size (\d+)’, err_msg)  
>  if match:  
>  return int(match.group(1))  
>  else:  
>  raise ValueError(“无法获取量子比特总数”)**

> **def main():  
>  # 读取之前成功获取到的字符进度  
>  cache = load_cache()  
>    
>  # 将目前已跑出的前37个字符先写入缓存，以防万一直接读取  
>  if not cache:  
>  known_chars = “HTB{70_ph453_bru73f0rc1ng_0r_n07_70_p”  
>  for idx, char in enumerate(known_chars):  
>  cache[str(idx)] = char  
>  save_cache(cache)**

> **print(f”[*] 正在建立连接到 {REMOTE_IP}:{REMOTE_PORT} …”)  
>  try:  
>  io = remote(REMOTE_IP, REMOTE_PORT)  
>  except Exception as e:  
>  print(f”[-] 连接失败: {e}”)  
>  return**

> **try:  
>  flag_len = get_qubit_count(io)  
>  print(f”[*] 检测到 Flag 总长度为: {flag_len} 字节”)  
>    
>  flag = [“”] * flag_len  
>  # 载入已有的进度  
>  for k, v in cache.items():  
>  idx = int(k)  
>  if idx < flag_len:  
>  flag[idx] = v**

> **for i in range(flag_len):  
>  # 如果当前索引在缓存里已有记录，直接跳过交互（节省时间防超时）  
>  if flag[i] != “”:  
>  print(f”[*] Qubit {i:02d} ({i%3}) [缓存加载]: 字符: ‘{flag[i]}’”)  
>  continue**

> **# 重新定位到当前 Qubit  
>  io.recvuntil(b’Specify the qubit index you want to measure : ‘)  
>  io.sendline(str(i).encode())  
>    
>  io.recvuntil(b’Specify the instructions : ‘)  
>  if i % 3 == 2:  
>  instruction = f”RY:-90,{i}”  
>  io.sendline(instruction.encode())  
>  else:  
>  io.sendline(b’’)**

> **result_line = io.recvline().decode().strip()  
>  counts = json.loads(result_line)  
>    
>  total_shots = sum(counts.values())  
>  count_zero = counts.get(‘0’, 0)  
>  p0 = count_zero / total_shots  
>    
>  char = solve_char(p0)  
>  flag[i] = char  
>    
>  # 存入缓存  
>  cache[str(i)] = char  
>  save_cache(cache)  
>    
>  print(f”[+] Qubit {i:02d} ({i%3}): P(0) = {p0:.4f} -> 字符: ‘{char}’”)**

> **final_flag = “”.join(flag)  
>  print(“\n” + “=”*50)  
>  print(f” 成功恢复完整 Flag: {final_flag}”)  
>  print(“=”*50)  
>    
>  # 成功后删除缓存文件  
>  if os.path.exists(CACHE_FILE):  
>  os.remove(CACHE_FILE)**

> **except Exception as e:  
>  print(f”\n[-] 运行过程中断开: {e}”)  
>  print(“[*] 进度已保存。请直接再次运行此脚本进行重连与续传！”)  
>  finally:  
>  io.close()**

> **if __name__ == ‘__main__’:  
>  main()**

![](https://cdn-images-1.medium.com/max/1000/1*jSjSk1XdjYTueRF48OTy9w.png)

here is the final flag

it might went wrong sometimes

but all fine

**_HTB{70_ph453_bru73f0rc1ng_0r_n07_70_ph453_bru73f0rc1ng…7h475_7h3_qu35710n…}_**