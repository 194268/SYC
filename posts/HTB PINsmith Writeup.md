![](https://cdn-images-1.medium.com/max/1000/1*o_79reI4vAXgUkcKElbhOw.png)

#### Challenge Scenario

---

After gaining access to CygnusCorp’s internal network, you’ve uncovered a critical system locked behind a numeric PIN. The catch? Only partial digits are visible, leaving you to piece together the rest. With your mission progressing, every second counts. You can’t afford to waste time blindly guessing. Can you use the partial information at hand to orchestrate an educated brute force attack and break into the system before you’re caught?

check the website

![](https://cdn-images-1.medium.com/max/1000/1*qfyyaIcu0-kiFmoUarO-Rg.png)

> **_from itertools import product_**

> **_def generate_pins(template: str):  
>  n = len(template)  
>  positions = [i for i, ch in enumerate(template) if ch == ‘*’]  
>  fixed = [(i, int(template[i])) for i in range(n) if template[i] != ‘*’]  
>    
>  results = []  
>   
>  for combo in product(‘0123456789’, repeat=len(positions)):  
>  pin = list(template)  
>  for pos, digit in zip(positions, combo):  
>  pin[pos] = digit  
>  valid = True  
>  for i in range(n — 1):  
>  if pin[i] == pin[i + 1]:  
>  valid = False  
>  break  
>  for idx, val in fixed:  
>  if int(pin[idx]) != val:  
>  valid = False  
>  break  
>  if valid:  
>  results.append(‘’.join(pin))  
>    
>  results.sort()  
>  return results_**

> **_if __name__ == “__main__”:  
>  import sys  
>  template = sys.stdin.readline().strip()  
>  pins = generate_pins(template)  
>  for pin in pins:  
>  print(pin)_**

![](https://cdn-images-1.medium.com/max/1000/1*VDbYdK8Nf0YPmeEohdl5Pw.png)

  

congratulations! 🎉

HTB{3ff1c13nt_P1n_Cr4cK1nG}