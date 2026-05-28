
![](https://cdn-images-1.medium.com/max/1000/1*TcqFnZ_hwy57mxLeeZN6vQ.png)

#### Challenge Scenario

---

You are after an organised crime group which is responsible for the illegal weapon market in your country. As a secret agent, you have infiltrated the group enough to be included in meetings with clients. During the last negotiation, you found one of the confidential messages for the customer. It contains crucial information about the delivery. Do you think you can decrypt it?

check the zip file

![](https://cdn-images-1.medium.com/max/1000/1*_DGoM6PcpWqQ0veV29b8OA.png)

![](https://cdn-images-1.medium.com/max/1000/1*JwWqMy4puZNqnTHqixHRdw.png)

![](https://cdn-images-1.medium.com/max/1000/1*LNaro5FmlwkAePH2t_TEQQ.png)

This is a very standard affine cipher. The key point is that 123 has a modular inverse modulo 256, so each byte can be directly reversed.

Th3 nucl34r w1ll 4rr1v3 0n fr1d4y.  

msg_byte = ((ct_byte - 18) * inverse(123)) % 256

ct = (123 * msg + 18) % 256

179

ct_hex = "6e0a9372ec49a3f6930ed8723f9df6f6720ed8d89dc4937222ec7214d89d1e0e352ce0aa6ec82bf622227bb70e7fb7352249b7d893c493d8539dec8fb7935d490e7f9d22ec89b7a322ec8fd80e7f8921"

ct = bytes.fromhex(ct_hex)

inv = pow(123, -1, 256)

msg = bytes(((b - 18) * inv) % 256 for b in ct)

print(msg.decode())

Flag ：

HTB{l00k_47_y0u_r3v3rs1ng_3qu4710n5_c0ngr475}
