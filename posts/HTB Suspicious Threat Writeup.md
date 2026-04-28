
![](https://cdn-images-1.medium.com/max/1000/1*mysGljRZfVEkAw72p4VySg.png)

#### Challenge Scenario

---

Our SSH server is showing strange library linking errors, and critical folders seem to be missing despite their confirmed existence. Investigate the anomalies in the library loading process and filesystem. Look for hidden manipulations that could indicate a userland rootkit.

Creds: `root:hackthebox`

check the website

![](https://cdn-images-1.medium.com/max/1000/1*8zXGQ21f76LUxFygjgefBg.png)

nothing useful

use ssh as `root:hackthebox`

![](https://cdn-images-1.medium.com/max/1000/1*0oP5yW4O_XtxZTLyu6NQHg.png)

so,ssh the target

![](https://cdn-images-1.medium.com/max/1000/1*bvd-2S1LfNBrEK4Wl2Wijg.png)

After logging into the target host, I checked /etc/ld.so.preload because the challenge description mentioned strange library linking behavior and hidden filesystem entries. The file contained /lib/x86_64-linux-gnu/libc.hook.so.6, indicating that a shared object was being preloaded into dynamically linked binaries.

![](https://cdn-images-1.medium.com/max/1000/1*aAPuzmv3GkaP-ct5N3AZTw.png)

By inspecting the suspicious shared object with strings, I found references to readdir, readdir64, fopen, strstr, strcmp, and the keyword pr3l04d. This suggested that the library was hooking directory-reading functions and filtering entries containing the string pr3l04d

![](https://cdn-images-1.medium.com/max/1000/1*P0zMH00oHqi_5w1qNWM3dw.png)


I cleared /etc/ld.so.preload to disable the malicious preload behavior and started a new shell. After that, searching the filesystem revealed the previously hidden directory /var/pr3l04d_, which contained the flag.

![](https://cdn-images-1.medium.com/max/1000/1*21BTcbmhPJcEWvO4F3QM4Q.png)

**_HTB{Us3rL4nd_R00tK1t_R3m0v3dd!}_**
