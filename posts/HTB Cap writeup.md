![](https://miro.medium.com/v2/resize:fit:875/1*HBjyF--mUZcXIMrVHnE97g.png)

start machine

![](https://miro.medium.com/v2/resize:fit:468/1*qmQFLEGoIquw4xUpcHVOCA.png)

guide mode,it really does help

**_Task1:How many TCP ports are open?_**

nmap at first

Press enter or click to view image in full size

![](https://miro.medium.com/v2/resize:fit:875/1*N1iT7MAtU91ocAYrT1VbXQ.png)

**_A1:3_**

**_Task2:After running a “Security Snapshot”, the browser is redirected to a path of the format_** `**_/[something]/[id]_**`**_, where_** `**_[id]_**` **_represents the id number of the scan. What is the_** `**_[something]_**`**_?_**

lets check the web

Press enter or click to view image in full size

![](https://miro.medium.com/v2/resize:fit:875/1*rqqJ0IodVn4bRKIWwQ4aaw.png)

Press enter or click to view image in full size

![](https://miro.medium.com/v2/resize:fit:875/1*yTLjF64UNKg84GVirByYsw.png)

at the url “data”

**_A2:data_**

**_Task3:Are you able to get to other users’ scans?_**

yes,for sure

just change the id

Press enter or click to view image in full size

![](https://miro.medium.com/v2/resize:fit:875/1*27y5ps4SeCQ_xSMYd0vdWg.png)

**_A3:yes_**

**_Task4:What is the ID of the PCAP file that contains sensative data?_**

as the following question

**_A4:0_**

**_Task5:Which application layer protocol in the pcap file can the sensetive data be found in?_**

download the pcap file,check it

Press enter or click to view image in full size

![](https://miro.medium.com/v2/resize:fit:875/1*wEs-tHyJRlOHT1zFxWg4tQ.png)

a very short cut

[](https://medium.com/plans?source=promotion_paragraph---post_body_banner_unlock_stories_blocks--d380ae8f1284---------------------------------------)

so we can easily found a user and his password here at ftp protocol

**_A5:ftp_**

**_Task6:We’ve managed to collect nathan’s FTP password. On what other service does this password work?_**

from what we found from namp,there is no reason the password couldn`t be used at ssh

**_A6:ssh_**

**_Task7(user_flag)_**

lets connnect ssh with the password:Buck3tH4TF0RM3!

Press enter or click to view image in full size

![](https://miro.medium.com/v2/resize:fit:875/1*m8vT74rd1ermhfIIiLn77w.png)

![](https://miro.medium.com/v2/resize:fit:559/1*0SAIiuU3EmiejvTkBz_rtw.png)

**_A7:c25296c5ea4a76eff471086ff4b2e302_**

**_Task8:What is the full path to the binary on this machine has special capabilities that can be abused to obtain root privileges?_**

use the basic word to found it

find / -perm -4000 -type f 2>/dev/null

but nothing important

so use

getcap -r / 2>/dev/null

Press enter or click to view image in full size

![](https://miro.medium.com/v2/resize:fit:875/1*KNjjnJf2B5-aE8ektCIzDg.png)

so,we found it,python right?

**_A8:/usr/bin/python3.8_**

**_Task9(root_flag)_**

use

python3.8 -c ‘import os; os.setuid(0); os.system(“/bin/bash”)’

set user as root

Press enter or click to view image in full size

![](https://miro.medium.com/v2/resize:fit:875/1*-V_aeCAcfZ8RN8jp1kE9bQ.png)

![](https://miro.medium.com/v2/resize:fit:400/1*yzGnisKtxMwgGJCzHYq9kA.png)

clap，you did it

**_A9:8b9be4dac56d4d77904df6aeed4776b6_**