
![](https://cdn-images-1.medium.com/max/1000/1*-UYKa9jpS_1-P8iTRz-n5g.png)

check the website

coding,right?

![](https://cdn-images-1.medium.com/max/1000/1*qUtc_KMhZ0scLl6oLxp3Yw.png)

coefficients = list(map(int, input().split()))   
x = int(input())   
result = 0  
power = 1   
for coeff in coefficients:  
 result += coeff * power  
 power *= x   
print(result)

![](https://cdn-images-1.medium.com/max/1000/1*k6BeI0Nk39i3CLP8TbHlHg.png)

**_flag:HTB{eV4LuaT1nG_p0LyN0M1aL5_f0R_7H3_w1N}_** 