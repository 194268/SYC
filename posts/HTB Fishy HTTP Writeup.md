
![](https://cdn-images-1.medium.com/max/1000/1*Q-sE87yXT6CIJvMk39oM8A.png)

#### Challenge Scenario

---

I found a suspicious program on my computer making HTTP requests to a web server. Please review the provided traffic capture and executable file for analysis. (Note: Flag has two parts)

check the website

![](https://cdn-images-1.medium.com/max/1000/1*roQgpIlUVxu7nrFH2j7Piw.png)

exe and pcapng

we analyze the http in pcapng at first

![](https://cdn-images-1.medium.com/max/1000/1*GPfATDHwlwCnpUJtx3X4TA.png)

![](https://cdn-images-1.medium.com/max/1000/1*YNJ1Lo_tT_H7Efg4rR3SoQ.png)

![](https://cdn-images-1.medium.com/max/1000/1*PsDApfUihooyEwbiWRMRxw.png)

it seems to be Unrelated words

so,turns to exe

![](https://cdn-images-1.medium.com/max/1000/1*-1WPGIMYF1DSVtxD-9eW3w.png)

The specified feedback size ‘{0}’ for CipherMode ‘{1}’ is not supported.  
Specified feedback size is not valid for this algorithm.  
feedbackSize  
feedbackSizeBits  
feedbackSizeInBits

get the feedback save as 1.txt

![](https://cdn-images-1.medium.com/max/1000/1*4MCgrBJsm-vsO7r1qnlJ9A.png)

use the py below

> **_def extract_first_letters(file_path):  
>  result = “”  
>  try:  
>  # Open the file for reading  
>  with open(file_path, ‘r’) as file:  
>  content = file.read() # Read the entire content  
>  # Split the content by spaces to get each word  
>  words = content.split()  
>  for word in words:  
>  # If the word starts with an alphabetic letter, take its first character  
>  if word[0].isalpha():  
>  result += word[0]  
>  else:  
>  # Otherwise, keep the symbol or number as-is  
>  result += word[0]  
>  print(“Extracted String:”, result)  
>  except FileNotFoundError:  
>  print(f”Error: File ‘{file_path}’ not found.”)  
>  except Exception as e:  
>  print(f”An error occurred: {e}”)_**

> **_# Example usage  
> file_path = “1.txt” # Change to the path of your text file  
> extract_first_letters(file_path)_**

![](https://cdn-images-1.medium.com/max/1000/1*gY9n9M2Gd9jdC50HUTIPvA.png)

than base64

![](https://cdn-images-1.medium.com/max/1000/1*Xf6eAXkRP1YBpdd42LIgPg.png)

![](https://cdn-images-1.medium.com/max/1000/1*tWblEilSuctpk0rWhbCJAw.png)

form this 

![](https://cdn-images-1.medium.com/max/1000/1*u9FicAVY3msmvj4TmK8xlw.png)

![](https://cdn-images-1.medium.com/max/1000/1*29PeDLlpgaEway58B16nWA.png)

we can found last part 

h77P_s73417hy_revSHELL}

check other http

we found a wired part

![](https://cdn-images-1.medium.com/max/1000/1*rSfsXJNwEzSS8dSxQ4Fi5A.png)

check the exe

we will found 

> **_{  
>  “cite”: “0”,  
>  “h1”: “1”,  
>  “p”: “2”,  
>  “a”: “3”,  
>  “img”: “4”,  
>  “ul”: “5”,  
>  “ol”: “6”,  
>  “button”: “7”,  
>  “div”: “8”,  
>  “span”: “9”,  
>  “label”: “a”,  
>  “textarea”: “b”,  
>  “nav”: “c”,  
>  “b”: “d”,  
>  “i”: “e”,  
>  “blockquote”: “f”  
> }_**

use it to decrypt the wired http

after some check we found the target 

![](https://cdn-images-1.medium.com/max/1000/1*tpVSGYIAwqQ2b8OpZGIg2w.png)

use

> **_import re_**

> **_tag_hex = {  
>  “cite”: “0”, “h1”: “1”, “p”: “2”, “a”: “3”, “img”: “4”,  
>  “ul”: “5”, “ol”: “6”, “button”: “7”, “div”: “8”, “span”: “9”,  
>  “label”: “a”, “textarea”: “b”, “nav”: “c”,  
>  “b”: “d”, “i”: “e”, “blockquote”: “f”  
> }_**

> **_with open(“1.txt”, “r”) as f:  
>  html = f.read()_**

> **_tags = re.findall(r’<(\w+)’, html)_**

> **_hex_str = “”  
> for t in tags:  
>  if t in tag_hex:  
>  hex_str += tag_hex[t]_**

> **_print(“hex:”, hex_str)_**

> **_print(“decoded:”, bytes.fromhex(hex_str).decode())_**

to decode it

![](https://cdn-images-1.medium.com/max/1000/1*W2ysFzrMCjd7zk8nns2w_w.png)

we got the finally part

**HTB{Th4ts_d07n37_**

so the answer

**_HTB{Th4ts_d07n37_h77P_s73417hy_revSHELL}_**