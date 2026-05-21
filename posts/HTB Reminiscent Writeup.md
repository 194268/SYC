
![](https://cdn-images-1.medium.com/max/1000/1*2LIZwy_ifsszM5RXYak_Pw.png)

#### Challenge Scenario

---

Suspicious traffic was detected from a recruiter’s virtual PC. A memory dump of the offending VM was captured before it was removed from the network for imaging and analysis. Our recruiter mentioned he received an email from someone regarding their resume. A copy of the email was recovered and is provided for reference. Find and decode the source of the malware to find the flag.

check the zip file

![](https://cdn-images-1.medium.com/max/1000/1*huVP1KAxGGIC3ZsbVggJqQ.png)

![](https://cdn-images-1.medium.com/max/1000/1*CtWRHi812bjAX7Ud9a4pKg.png)

![](https://cdn-images-1.medium.com/max/1000/1*QeA_xNmLpiHrSs9Tv5PeXQ.png)

we found the VM version:

Win7SP1x64 at VirtualBoxCoreDumpElf64

and we found fishing mail at flounder@madlab.lcl

it require the victim to request the [http://10.10.99.55:8080/resume.zip]

use string to found soomething

strings flounder-pc-memdump.elf | grep -i -B 5 -A 5 “10.10.99.55”

![](https://cdn-images-1.medium.com/max/1000/1*xnaidTQsb63430n19QDcpQ.png)

we found the connection between victim and attacker

![](https://cdn-images-1.medium.com/max/1000/1*I-WqydSOJwYavTPcACYnAA.png)

also we founod

![](https://cdn-images-1.medium.com/max/1000/1*oGUHxpF-CFzlpjGm1VQtDA.png)

so,use 

strings -e l flounder-pc-memdump.elf | grep -i -B 20 -A 20 “Invoke-ShellCommand”

![](https://cdn-images-1.medium.com/max/1000/1*4xxJIFDAvzkchVCQyBzLyg.png)

but can`t found anything useful

so use 

vol -f flounder-pc-memdump.elf windows.pslist | grep 2752

to get more details

![](https://cdn-images-1.medium.com/max/1000/1*okHVW64UAp-nnGQUiwf_BA.png)

than, use 

vol -f flounder-pc-memdump.elf windows.cmdline — pid 2752

![](https://cdn-images-1.medium.com/max/1000/1*HlPN6iY7VgXJS6Y4___-Vg.png)

use UTF-16LE

![](https://cdn-images-1.medium.com/max/1000/1*n9MustJ5_6dOURCI2OkDtg.png)

so,we got the flag

HTB{$_j0G_y0uR_M3m0rY_$}