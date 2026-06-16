![](https://cdn-images-1.medium.com/max/1000/1*wG4Dz3uEE0GrzyLG4MSEPQ.png)

#### Challenge Scenario

---

The data leaked quietly — unnoticed, unguarded, and brimming with opportunity. You’re in deep now. A tangle of credentials spilled from a forgotten system connected to CygnusCorp’s sprawling digital perimeter. Half garbage, half gold. Somewhere in this chaos are access keys — real names, real logins, real passwords. You just have to find the ones that match.

check the website

![](https://cdn-images-1.medium.com/max/1000/1*L2gdantMLDv_fvPIVtTNjw.png)

> **_def is_email(s):  
>  return ‘@’ in s and ‘.’ in s.split(‘@’)[1]_**

> **_def extract_first_name(email):  
>  local_part = email.split(‘@’)[0]  
>  return local_part[:-1]_**

> **_def main():  
>  n = int(input())  
>  strings = [input().strip() for _ in range(n)]  
>    
>  emails = []  
>  passwords = []  
>    
>  for s in strings:  
>  if is_email(s):  
>  emails.append(s)  
>  else:  
>  passwords.append(s)  
>    
>  pairs = []  
>    
>  for email in emails:  
>  first_name = extract_first_name(email)  
>  for password in passwords:  
>  if first_name in password:  
>  pairs.append((email, password))  
>    
>  pairs.sort(key=lambda x: (x[0], x[1]))  
>    
>  for email, password in pairs:  
>  print(f”{email} {password}”)_**

> **_if __name__ == “__main__”:  
>  main()_**

easy right?

![](https://cdn-images-1.medium.com/max/1000/1*wIGG_r9sLI0tu8G5JCo4VQ.png)

**_HTB{th4t_1s_4n_0bvi0us_p41r1ng}_**