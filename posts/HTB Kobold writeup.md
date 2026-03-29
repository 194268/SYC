

![](https://cdn-images-1.medium.com/max/1000/1*jgqAb8WCIURBSMfNL5Xs5A.png)


nmap at first

![](https://cdn-images-1.medium.com/max/1000/1*FAoLlCX3Y1oRlq5pcKRCSw.png)

![](https://cdn-images-1.medium.com/max/1000/1*gw-c-pdoV2yjYlTwuYyp1Q.png)

check the website

![](https://cdn-images-1.medium.com/max/1000/1*J6Vx9YP8Vo5eXJsoWB8HfA.png)

found admin@kobold.htb

![](https://cdn-images-1.medium.com/max/1000/1*O_eBBtE4rvvxLi1c-ZChVA.png)

found arcane v1.13.0,found some cve about it,but no help

fuzz some domains

![](https://cdn-images-1.medium.com/max/1000/1*s0LTQNYx3p2RFQqOsGjRww.png)

we found nothing with http,but bin and mcp at https

check 

![](https://cdn-images-1.medium.com/max/1000/1*dY8taR4wo7bd6A37Z0-wlQ.png)

![](https://cdn-images-1.medium.com/max/1000/1*Pap6x9RRn65hFbKskSL3PQ.png)

with a simple search.we can found CVE-2026–23744 

it show a way to get shell

[https://mcp.kobold.htb/api/mcp/connect](https://mcp.kobold.htb/api/mcp/connect)

f12,chose network and make a little difference

![](https://cdn-images-1.medium.com/max/1000/1*P5v-XoXhXE_8M3EoO9Et9w.png)

yes,wo got it

![](https://cdn-images-1.medium.com/max/1000/1*6H-kEXaK0V5EXRXurNpQ_g.png)

![](https://cdn-images-1.medium.com/max/1000/1*JJXn1LgbTBZpNz64Yl0r2Q.png)

we found the userflag

**_userflag:d92aefcf198de30de79dc686e98347c0_**

and we found user alice,the next target

![](https://cdn-images-1.medium.com/max/1000/1*bG0QkiGYnq64_ktsXgdV4g.png)

after lots of failure,found the true way was dfocker

so we change our groups to docker,because we used belonds to operator

![](https://cdn-images-1.medium.com/max/1000/1*ihR3welA-cbnyO1nyotqOA.png)

than we use doker images 

![](https://cdn-images-1.medium.com/max/1000/1*xTlWcv4g5hBYJ8hgq51drg.png)

i tried docker run — rm -it — privileged — entrypoint sh -v /:/hostfs privatebin/nginx-fpm-alpine:2.0.2 at first,but the image set User Namespace Remapping

![](https://cdn-images-1.medium.com/max/1000/1*WR8LeUBbO7mXcygJTZzKUg.png)

so we use the sql to mount

docker run — rm -it — privileged -v /:/hostfs mysql:latest sh

![](https://cdn-images-1.medium.com/max/1000/1*gwQg42Ph-uSkfHlxLapg_g.png)

wow,it worked as except

**_rootflag:bfabe28e4e7eb23a8aef7f01b2296cdd_**