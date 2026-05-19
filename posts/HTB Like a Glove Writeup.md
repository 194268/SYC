
![](https://cdn-images-1.medium.com/max/1000/1*1o8-j58z7943o7c_xuWE2g.png)

#### Challenge Scenario

---

Words carry semantic information. Similar to how people can infer meaning based on a word’s context, AI can derive representations for words based on their context too! However, the kinds of meaning that a model uses may not match ours. We’ve found a pair of AIs speaking in metaphors that we can’t make any sense of! The embedding model is glove-twitter-25. Note that the flag should be fully ASCII ans starts with ‘htb{‘.

  

we can download a zip file 

its a chal.txt

![](https://cdn-images-1.medium.com/max/1000/1*xDVkWfE30lX7jGkcaOOKcQ.png)

so,ask ai for some help

you can use this for the proceess

[**看看这段聊天在聊什么**  
_ChatGPT is your AI chatbot for everyday use. Chat with the most advanced AI to explore ideas, solve problems, and learn…_chatgpt.com](https://chatgpt.com/share/69edc1f9-9b64-83a2-bd94-4de6ecafc280 "https://chatgpt.com/share/69edc1f9-9b64-83a2-bd94-4de6ecafc280")[](https://chatgpt.com/share/69edc1f9-9b64-83a2-bd94-4de6ecafc280)

你贴出来的内容已经是关键数据了：每一行都是一个 GloVe 类比题，形式是 `a : b = c : ?`，答案应当用词向量公式 `b - a + c` 找最近词。由于 flag 以 `htb{` 开头，这些答案连起来应该就是 flag。

  

这是 HTB 的 **Like a Glove** 题。你的 `cha.txt` 每行都是：

A : B = C : ?

用 `glove-twitter-25` 做词向量类比即可：

? = B - A + C

也就是对每一行算最近词，然后把结果拼起来。这个解法和公开 writeup 一致：类比公式是 `B - A + C`，并且最后要把全角数字用 `unicodedata.normalize("NFKC", text)` 转成 ASCII。

最终 flag 是：

htb{h4rm0n1ou5_hymn_0f_h1ghd1m3ns10n4l_subl1me_5ymph0ny_0f_num3r1cal_nuanc3_1n_tr3mend0u5_t4p3stry_0f_t3xtu4l_7r4n5f0rma7ion}

对应 Python 脚本：

import re  
import unicodedata  
import gensim.downloader as api

model = api.load("glove-twitter-25")

with open("cha.txt", "r", encoding="utf-8") as f:  
    lines = f.readlines()

out = []

for line in lines:  
    m = re.match(r"Like (.+?) is to (.+?), (.+?) is to\?", line.strip())  
    if not m:  
        continue

    a, b, c = m.groups()

    # 词向量类比：a:b = c:?  
    ans = model.most_similar(  
        positive=[b, c],  
        negative=[a],  
        topn=1  
    )[0][0]

    out.append(ans)

raw_flag = "".join(out)  
flag = unicodedata.normalize("NFKC", raw_flag)

print(raw_flag)  
print(flag)

如果你跑出来里面有 `ｈｔｂ`、`４`、`０` 这种全角字符，最后那句 `NFKC` 就是把它们归一化成普通 ASCII。

---

**_htb{h4rm0n1ou5_hymn_0f_h1ghd1m3ns10n4l_subl1me_5ymph0ny_0f_num3r1cal_nuanc3_1n_tr3mend0u5_t4p3stry_0f_t3xtu4l_7r4n5f0rma7ion}_**
