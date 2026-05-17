
![](https://cdn-images-1.medium.com/max/1000/1*xzaY9NmpET2R9Zynq_ZVkw.png)

#### Challenge Scenario

---

On our regular checkups of our secret flag storage server we found out that we were hit by ransomware! The original flag data is nowhere to be found, but luckily we not only have the encrypted file but also the encryption program itself.

download the zip file

![](https://cdn-images-1.medium.com/max/1000/1*m1uhmCvyn7O4P6_zFXlKrw.png)

an binary file and flag.enc

use ghidra to check the encrypt

![](https://cdn-images-1.medium.com/max/1000/1*BF7fkkPpFet_66qXnGBXhA.png)

so the encrypt step is XOR at first,than shift to left with the number which was init by rand

so need to reverse the whole process

use the py below to find out the flag

> **_import ctypes  
> import struct_**

> **_libc = ctypes.CDLL("libc.so.6")_**

> **_with open('flag.enc', 'rb') as f:  
>   seed = struct.unpack('<I', f.read(4))[0]  
>   encrypted_data = f.read()  
> libc.srand(seed)  
> decrypted = bytearray()  
> for byte in encrypted_data:  
>     
>   r1 = libc.rand() & 0xFF    
>   r2 = libc.rand() & 7    
>   decrypted_byte = (byte >> r2) | ((byte << (8 - r2)) & 0xFF)  
>   decrypted_byte ^= r1  
>   decrypted.append(decrypted_byte)  
> try:  
>   print(decrypted.decode('utf-8'))  
> except:  
>   print(decrypted)  
>   print(''.join(chr(b) if 32 <= b < 127 else '.' for b in decrypte_d))**

![](https://cdn-images-1.medium.com/max/1000/1*7jwEOD-J70WW-5wB-LzhFg.png)

**_HTB{vRy_s1MplE_F1LE3nCryp0r}_**