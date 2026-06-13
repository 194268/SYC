![](https://cdn-images-1.medium.com/max/1000/1*oMro7lJjRqRl1P1CzTpFzg.png)

#### Challenge Scenario

---

Luigi is not posixtive we can challenge his scripting abilities. He’s convinced we cannot understand the secret hidden inside his l33t coding abilities. We can’t let that slide!

check the zip file

![](https://cdn-images-1.medium.com/max/1000/1*oZPyzemW2dFhCGecihjRvw.png)

and nc the target

![](https://cdn-images-1.medium.com/max/1000/1*GGN7w_0aJm_W5_blxdQKyQ.png)

check the win logic

![](https://cdn-images-1.medium.com/max/1000/1*wxmPBeBW5BGProLKj5ndjQ.png)

> **if debug[0] != debug[1] and str(debug[0]) != str(debug[1]) and hash(debug[0]) == hash(debug[1]) and isinstance(debug[0], type(debug[1])) :  
>  print(“What an awesome player! You have beaten the competitor, you deserve this:”, open(‘flag.txt’).read())  
>  else:  
>  print(f”Partial output is: {letter1} — {letter2}”)**

so we need a **debug[0] != debug[1]** but **hash(debug[0]) == hash(debug[1])**

so，use hash(-1)==hash(-2)

we need to make debug to -1 and -2

so check the excute()

and focus

![](https://cdn-images-1.medium.com/max/1000/1*IsjDslCbFETuUgLbRw89bQ.png)

so choice 1 decide the mode 

choice 2 decide the operation

choice 3 decide the traget

choice 4 set the args like -a -l 

choice 5 means active

the whole sentence

**_choice1 choice 3 choice 2_**

means

**_grep zzzzzzzzzz flag.txt_**

so the final target:

debug[0]=mode*return code=-1*1=-1

debug[1]=mode*return code=-1*2=-2

so hash(-1)==hash(-2)

so how to set mode==-1

so use ~0

than use 

grep zzzzzzzzzzzz flag.txt

set return code 1,means wrong:flag.txt not include zzzzzzzzzz

grep zzzzzzzzzzzzz .

set return code 2,means wrong operation

so ,here is the whole progress

> **_1  
> ~0  
> 2  
> grep  
> 3  
> flag.txt,.  
> 4  
> zzzzzzzzzzzzz,zzzzzzzzzzzzz  
> 5_**

![](https://cdn-images-1.medium.com/max/1000/1*BrD6RemMUdlWrINswfPPNg.png)

**_HTB{ret_n3gativ3s_Ar3_b4d_P0SIX_kn3w!}_**