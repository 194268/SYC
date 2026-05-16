
![](https://cdn-images-1.medium.com/max/1000/1*w2cIwvQVsjzfkNQqnEYxPA.png)

#### Challenge Scenario

---

To be accepted into the upper class of the Berford Empire, you had to attend the annual Cha-Cha Ball at the High Court. Little did you know that among the many aristocrats invited, you would find a burned enemy spy. Your goal quickly became to capture him, which you succeeded in doing after putting something in his drink. Many hours passed in your agency’s interrogation room, and you eventually learned important information about the enemy agency’s secret communications. Can you use what you learned to decrypt the rest of the messages?

download the zip file

![](https://cdn-images-1.medium.com/max/1000/1*QBLuY6RMhqc7WiduJmY9SA.png)

![](https://cdn-images-1.medium.com/max/1000/1*43tiWBmDw5hsuJ_d_rEVeA.png)

![](https://cdn-images-1.medium.com/max/1000/1*AWebP_pGn6NQ_mQmYysK4Q.png)

check source.py and out.txt

## Main Functionality

**Encrypts two messages**: Uses the same key and nonce to encrypt both a plaintext message and the FLAG.

### Encryption Process:  
1. Generates a random 32-byte key and 12-byte nonce (IV)  
2. Encrypts a predefined warning message using the ChaCha20 stream cipher  
3. Encrypts the FLAG using the **same key and nonce**  
4. Saves the IV, encrypted warning message, and encrypted FLAG to `out.txt`

## Critical Security Vulnerability

**The major flaw is the reuse of the key and IV pair**:

- ChaCha20 is a stream cipher that generates a keystream during encryption  
- If the same key and IV are used twice, an identical keystream is produced  
- This means: `encrypted_message = message ⊕ keystream` and `encrypted_flag = FLAG ⊕ keystream`  
- Since we know the plaintext message, we can recover the keystream: `keystream = encrypted_message ⊕ message`  
- Then decrypt the FLAG using the recovered keystream: `FLAG = encrypted_flag ⊕ keystream`

This is a classic “two-time pad” attack that exploits the fatal weakness of reusing keys in stream ciphers.

so,this way sir

> **_def decrypt():  
>  # 读取out.txt文件  
>  with open(“out.txt”, “r”) as f:  
>  lines = f.read().strip().split(‘\n’)  
>    
>  iv_hex = lines[0]  
>  encrypted_message_hex = lines[1]  
>  encrypted_flag_hex = lines[2]  
>  iv = bytes.fromhex(iv_hex)  
>  encrypted_message = bytes.fromhex(encrypted_message_hex)  
>  encrypted_flag = bytes.fromhex(encrypted_flag_hex)  
>  known_message = b”Our counter agencies have intercepted your messages and a lot “  
>  known_message += b”of your agent’s identities have been exposed. In a matter of “  
>  known_message += b”days all of them will be captured”  
>  keystream = bytes([encrypted_message[i] ^ known_message[i] for i in range(len(known_message))])  
>  flag = bytes([encrypted_flag[i] ^ keystream[i] for i in range(min(len(encrypted_flag), len(keystream)))])  
>    
>  print(“恢复的FLAG:”, flag.decode(‘utf-8’, errors=’ignore’))_**

> **_if __name__ == “__main__”:  
>  decrypt()_**

![](https://cdn-images-1.medium.com/max/1000/1*B1SCmd1RoHFQxMhF3cSMqg.png)

**_HTB{und3r57AnD1n9_57R3aM_C1PH3R5_15_51mPl3_a5_7Ha7}_**