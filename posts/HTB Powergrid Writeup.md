
![](https://cdn-images-1.medium.com/max/1000/1*e-0YpCgTiXOuIixeyAxMeQ.png)

#### Challenge Scenario

---

Blackouts spread under the NecroNet’s command, and in the flicker of dying transformers, the white-hats race to reboot the power grid before darkness becomes permanent.

It`s my first time to facing an Secure Coding challenge

so,check the website

![](https://cdn-images-1.medium.com/max/1000/1*MyOVd3RWUpHdr4jQpSmMPQ.png)

 here

we can found a simple website`s source code 

and a payload

![](https://cdn-images-1.medium.com/max/1000/1*4PjNhosnhlPUoN3aRDqxBA.png)

yep

so,what we need to do is fix the problem and vertify

![](https://cdn-images-1.medium.com/max/1000/1*fEfiVPMNZrpS1YY4BcwD6Q.png)

right?

check the payload,we can found the key point here

![](https://cdn-images-1.medium.com/max/1000/1*wqMcxVHH0-5XICFpoL0VMw.png)

It didn’t do anything to prevent simple injections here.

normal situation:

username: user01

password: password

==>

users.txt:

> user01|pssword_hash|role

but if we use the payload

username: “{}|4befd7f713861d52cb520dcf4b5b262b11a306fbd19a76563fa36b07e99a7aef|admin\n{}”.format(username, username)

password:CoolPassword17!

==>

users.txt:

> {}|4befd7f713861d52cb520dcf4b5b262b11a306fbd19a76563fa36b07e99a7aef|admin

> random_string(8)|CoolPassword17!_hash|role

see?

it make an new user with role of admin

so.what should we do?

at least,we just need one if()

**_if (username.includes(‘|’) || username.includes(‘\n’) || username.includes(‘\r’)) {  
 return false;  
 }_**

add it before other sentence

![](https://cdn-images-1.medium.com/max/1000/1*VOBoakP9hnd7fK8yt_pLBQ.png)

than restart it an verify it

![](https://cdn-images-1.medium.com/max/1000/1*kkSChR-0E4kLAHc4CBQBYA.png)

![](https://cdn-images-1.medium.com/max/1000/1*J9af_bLt1KpOxI_gD5e9_g.png)

congratulations,the change work.

**_HTB{l3g4cy_db_w1th_crlf_2_pr1v_3sc4l4t10n}_**