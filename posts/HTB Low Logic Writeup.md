
![](https://cdn-images-1.medium.com/max/1000/1*8iYcotK1hjgwm4S9CwwZeg.png)

#### Challenge Scenario

---

I have this simple chip, I want you to understand how it’s works and then give me the output.

ok, download the zip file

![](https://cdn-images-1.medium.com/max/1000/1*A4ZcluIsV62Y6sXCc6TySA.png)

we can find a easy schematic diagram

and a 

![](https://cdn-images-1.medium.com/max/1000/1*3WMN46lZQ1iHDKH9BFbvKw.png)

input csv,

so i have a idea

maybe we need to make the input as the input.csv

than we got a 1 or 0 as result

than we make the result like a binary

so, 

now what we need is to dinf out what is the result with different input.

luckily,in China you have to learn something about diagram like this at high school

![](https://cdn-images-1.medium.com/max/1000/1*7kEuYQbERI7i6cLJaXciQg.png)

this，it means and

![](https://cdn-images-1.medium.com/max/1000/1*J4sOwQ7DJTdjRu3-4nLTMQ.png)

this is or

so 

OUT=(IN0 and IN1) or (IN2 and IN3)

so with a py like this

> **_import csv_**

> **_def process_logic_operations(input_file):   
>  results = []   
>    
>  # 打开 input.csv 文件  
>  with open(input_file, mode=’r’) as infile:   
>  csvreader = csv.reader(infile)   
>  next(csvreader)_**

> **_# 从 input.csv 文件中读取数据  
>  for row in csvreader:   
>  input1 = int(row[0])   
>  input2 = int(row[1])   
>  input3 = int(row[2])   
>  input4 = int(row[3])_**

> **_and_output1 = input1 & input2 # 第一个 AND 运算  
>  and_output2 = input3 & input4 # 第二个 AND 运算_**

> **_final_output = and_output1 | and_output2 # 最后一个 OR 运算_**

> **_results.append(str(final_output))   
>    
>  return ‘’.join(results)_**

> **_input_file = ‘input.csv’  
> output = process_logic_operations(input_file)_**

> **_print(output)_**

![](https://cdn-images-1.medium.com/max/1000/1*GIrc55loNWxH_A9CfEokkQ.png)

![](https://cdn-images-1.medium.com/max/1000/1*0TRZ4MN3pevZ-InUYhnlgQ.png)

**_HTB{4_G00d_Cm05_3x4mpl3}_**