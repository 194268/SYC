
![](https://cdn-images-1.medium.com/max/1000/1*USK-DjqGvHRvLR4uQiESMw.png)

#### Challenge Scenario

---

A cube is the shadow of a tesseract casted on 3 dimensions. I wonder what other secrets may the shadows hold.

check the zip file

![](https://cdn-images-1.medium.com/max/1000/1*ape_UeZKWVMf-sXktJ2g8w.png)

recently i construct a pentest assistant

so,it is perfect challenge for my little helper

![](https://cdn-images-1.medium.com/max/1000/1*mkXRVuKkdR4UXuMVkcLVAA.png)

![](https://cdn-images-1.medium.com/max/1000/1*f6ylzYPJiHkVYt1vzVFhkw.png)

![](https://cdn-images-1.medium.com/max/1000/1*5hxaA40z1BUNCKUiqL1YMg.png)

![](https://cdn-images-1.medium.com/max/1000/1*Vb7BXFWIgOtG0QobxvbBAA.png)

Yep,we got it

### `HTB{L0ST_1N_TH3_SP1R4L}`

  

here is the return of tool the shore keeper use

> **{  
>  “type”: “vcp_log”,  
>  “data”: {  
>  “tool_name”: “MABridge”,  
>  “status”: “success”,  
>  “content”: “{\n \”status\”: \”success\”,\n \”stdout\”: \”PCA explained variance: [0.44603499 0.38149189]\\n=== PCA dim1 sort ===\\nHTB_{_L_0_HYT{SR{3BDWFT28PIN1AZM_#XRVBPL45EPEAO6G1KV4ZLWFCEIHSUDXQEN5DR89T}_FU4I!4OF{S-!5T}C7HM7NB}E3V_}SLP4R1\\n\\nH indices: [26, 80, 89, 108]\\n=== Searching all starting points for HTB prefix ===\\nStart 85: _HTB{L0ST_1N_TH3_SP1R4L}7}SFDCE123___BRTYH{{DFPVAZX845CMNBVE}74!}95HLPRI8WEPOKGE\\n\”,\n \”stderr\”: \”\”,\n \”exit_code\”: 0,\n \”result\”: \”PCA explained variance: [0.44603499 0.38149189]\\n=== PCA dim1 sort ===\\nHTB_{_L_0_HYT{SR{3BDWFT28PIN1AZM_#XRVBPL45EPEAO6G1KV4ZLWFCEIHSUDXQEN5DR89T}_FU4I!4OF{S-!5T}C7HM7NB}E3V_}SLP4R1\\n\\nH indices: [26, 80, 89, 108]\\n=== Searching all starting points for HTB prefix ===\\nStart 85: _HTB{L0ST_1N_TH3_SP1R4L}7}SFDCE123___BRTYH{{DFPVAZX845CMNBVE}74!}95HLPRI8WEPOKGE\\n\”,\n \”messageForAI\”: \”命令执行完成 (exit_code=0)。请分析输出并决定下一步操作。如果命令失败，检查错误原因并尝试修正。\”,\n \”MaidName\”: \”守岸人\”,\n \”timestamp\”: \”2026–06–25T09:14:19.629+08:00\”\n}”  
>  }  
> }**

here is the train of thought

![](https://cdn-images-1.medium.com/max/1000/1*yiXtz467speTAbT2KO0eiw.png)

![](https://cdn-images-1.medium.com/max/1000/1*JkIKcFLQH9lViPtOHTqq4Q.png)

Step 1 — PCA Dimensionality Reduction

The scrambled data was projected into a 2D space using PCA. The two principal components explained 44.6% and 38.1% of the variance respectively:

PCA explained variance: [0.44603499 0.38149189]

Characters were then sorted along the first principal component (dim1), yielding a partially structured sequence where the flag’s structure began to emerge but remained interspersed with noise.

Step 2 — Locating “H” Positions

All occurrences of the letter `H` were identified within the sorted sequence:

H indices: [26, 80, 89, 108]

Since CTF flags from this platform begin with `HTB{`, these positions served as candidate starting points.

Step 3 —  Greedy Nearest-Neighbor Path

The tool iterated over each candidate starting index, attempting to reconstruct the sequence so that it began with the `HTB{` prefix. At index 85, the full flag emerged:

Start 85: _HTB{L0ST_1N_TH3_SP1R4L}7}SFDCE123___BRTYH{{DFPVAZX845CMNBVE}74!}95HLPRI8WEPOKGE

The valid flag portion is clearly identifiable:

> `_HTB{L0ST_1N_TH3_SP1R4L}_` _— "Lost in the Spiral"_