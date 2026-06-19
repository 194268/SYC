
![](https://cdn-images-1.medium.com/max/1000/1*YGRlXb3V0Wrt66pBuQb79g.png)

#### Challenge Scenario

---

Following the discovery of coordinated social media activity and suspicious domain registrations, investigators have uncovered evidence of cryptocurrency payments being used to fund the fake review campaign. Reddit posts from “TechReviewer2024” mention “Payment sent to usual wallet” and “Next batch payment due Friday”, suggesting a systematic payment structure. Your task is to investigate the CryptoTrace blockchain to trace the money flow and identify the main funding wallet behind this operation.

check the website

![](https://cdn-images-1.medium.com/max/1000/1*rQIx4jVyBhqlv1r_byv3SQ.png)

![](https://cdn-images-1.medium.com/max/1000/1*GxNGShiyWELLcjDVZy-qPQ.png)

and we got a lot information here

![](https://cdn-images-1.medium.com/max/1000/1*ZBtT5iw705q9QCf1ubzajg.png)

we can use tool here

![](https://cdn-images-1.medium.com/max/1000/1*tjcOWDCTaiP17FYoFYkp3Q.png)

and here is the question we need to answer

![](https://cdn-images-1.medium.com/max/1000/1*acZorMlK9TjmYtdgFKP-zQ.png)

FLAG1:Primary Funding Source Exchange

use Arkham Intelligence

![](https://cdn-images-1.medium.com/max/1000/1*SWlh0ZyCrUuDUh1vDZvKMw.png)

![](https://cdn-images-1.medium.com/max/1000/1*ou8AGt62xBV2Re5Qlb319g.png)

A1:Binance

FLAG2:Total Victim Payment Amount

use BlockScout Enterprise

![](https://cdn-images-1.medium.com/max/1000/1*VcswqsxBhY0pzR649II6cA.png)

get the summary as it requried t1-t7

![](https://cdn-images-1.medium.com/max/1000/1*CuxpHpm0T9m92dWSYVxxeQ.png)

![](https://cdn-images-1.medium.com/max/1000/1*wqpkKay7TQdlqcUYjWuLZQ.png)

  

A2:0.01891004

FLAG3:Obfuscation Method Detection

use OXT Advanced

![](https://cdn-images-1.medium.com/max/1000/1*AiUNt_x8Qm5dvQ4BU5gRFA.png)

![](https://cdn-images-1.medium.com/max/1000/1*FFhve895wvJyezr25B4j0w.png)

A3:Wasabi

FLAG4:Digital Identity Attribution

use 

![](https://cdn-images-1.medium.com/max/1000/1*lWayiEU_eOi9Ce8e6c64aQ.png)

  

![](https://cdn-images-1.medium.com/max/1000/1*fwZJKFz3Kbfuj_s76aHBqQ.png)

A4:[james.crypto.2024@proton.me](mailto:james.crypto.2024@proton.me)

FLAG5:Real-World Identity Attribution

from the infromation before

we can found

![](https://cdn-images-1.medium.com/max/1000/1*U1rlhFEJ042G_lUDKngUJw.png)

  

![](https://cdn-images-1.medium.com/max/1000/1*yV36XxKqlcaLJsSyIuDdmw.png)

A5:James Mitchell Chen

FLAG6:Geographic Attribution

use Arkham Intelligence

![](https://cdn-images-1.medium.com/max/1000/1*Mi1VNQ2q39M3vTcW8oj_0w.png)

![](https://cdn-images-1.medium.com/max/1000/1*MJX_Zt_flZ4js4dxjjTs5g.png)

A6:37.774929, -122.419416

and,we got the final flag

![](https://cdn-images-1.medium.com/max/1000/1*6qc9bjQYB5_JTCl8eIY1-g.png)

**_HTB{binance_wasabi_jamesmitchellchen}_**