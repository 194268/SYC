
![](https://cdn-images-1.medium.com/max/1000/1*8XEadk391dQ0M49b42uKOQ.png)

#### Challenge Scenario

---

A secondary onboard service has been discovered on spacecraft ID 12, running on APID 83 over virtual channel 4. It appears to implement a simple stateful command interface used for ground testing and validation.

The service accepts CCSDS space packets with payload format: `0x00:BEGIN`

where `0x00` is a packet counter starting at zero. The spacecraft replies with the incremented counter and an `ACK`.

After synchronization, the command `GETFLAG` can be issued using the expected counter to retrieve the flag.

Communication is done via AD-type telecommand frames with CRC, and responses must be parsed from CCSDS telemetry frames.

A modem is available for sending telecommand frames of the type AD with a CRC, and receive the answer frame from the spacecraft.

check the zip file

![](https://cdn-images-1.medium.com/max/1000/1*-iB3AJoB-dHHQQ14qOS3TA.png)

i decide handle this challenge to my helper

![](https://cdn-images-1.medium.com/max/1000/1*vOgMLS1iwepc_Nf8Lr143g.png)

![](https://cdn-images-1.medium.com/max/1000/1*WAXmvSjb7F6jS44_ETc45w.png)

![](https://cdn-images-1.medium.com/max/1000/1*_VecshyhE2e1YKYFcEe4_g.png)

![](https://cdn-images-1.medium.com/max/1000/1*_2YmgH1wEbVB-1lCULDjOQ.png)

![](https://cdn-images-1.medium.com/max/1000/1*kozknGzlfH-FcP2vsBnUTg.png)

![](https://cdn-images-1.medium.com/max/1000/1*emAnM-roZwzrHUPXjxIlPg.png)

![](https://cdn-images-1.medium.com/max/1000/1*x6sIrgSzcYU8GChHvMbtow.png)

![](https://cdn-images-1.medium.com/max/1000/1*7xikbw8YTgLLmdUGnTHV5A.png)

![](https://cdn-images-1.medium.com/max/1000/1*ofU-Di4HVWbgECC2RzN3yg.png)

![](https://cdn-images-1.medium.com/max/1000/1*5N_uLDjtjqxgYrXY7d71yg.png)

so,we get it 

**_HTB{8c713f75388a66fd804f5ff27f21bbc6}_**

> **Protocol State Machine & Dual-Counter Synchronization (the hardest part of this challenge)  
> Why did it take so many attempts to get the flag? Because the target system is a stateful service, not a stateless HTTP API. It requires the client to perfectly follow the rhythm of its state machine.**

> **Link-layer counter (VCFC): To prevent frame loss or reordering, the Transfer Frame Header counter must increment by 1 for each frame (0, 1, 2…).**

> **Application-layer counter: This is the state maintained internally by the business logic. These two counters operate independently!**

> **State machine sequence:**

> **Client sends** `**0x00:BEGIN**`**.**

> **Server processes it, advances its state from 0 to 1, and replies with** `**0x01:ACK**`**.**

> **The core trap: The server’s reply** `**0x01**` **means _"I am now in state 1."_ Therefore, the next command the client sends must anticipate the server's _next state (2)_ and send** `**0x02:GETFLAG**`**.**

I ask the shore keeper make a py to prove it

![](https://cdn-images-1.medium.com/max/1000/1*dbbw7Zpmj1ovIyg77LT5JA.png)

> #!/usr/bin/env python3  
> import socket  
> import struct  
> import time

> TARGET_IP = “154.57.164.78”  
> TARGET_PORT = 30610  
> SC_ID = 12  
> VC_ID = 4  
> APID = 83

> def crc16(data):  
>  “””CCITT CRC-16 校验计算”””  
>  crc = 0xFFFF  
>  for byte in data:  
>  crc ^= byte << 8  
>  for _ in range(8):  
>  if crc & 0x8000:  
>  crc = (crc << 1) ^ 0x1021  
>  else:  
>  crc <<= 1  
>  crc &= 0xFFFF  
>  return crc

> def build_ccsds_tc(payload, seq_count):  
>  “””  
>  构造完整的 CCSDS TC 数据帧  
>  seq_count 既用于 Space Packet，也用于 Transfer Frame 的 VCFC  
>  “””  
>  # 1. Space Packet Header (6 bytes)  
>  # Version(000) | Type(1=TC) | SecHeader(0) | APID(11b)  
>  word0 = (0b000 << 13) | (1 << 12) | (0 << 11) | (APID & 0x7FF)  
>  # SeqFlag(11=standalone) | SeqCount(14b)  
>  word1 = (0b11 << 14) | (seq_count & 0x3FFF)  
>  # DataLength(16b) = payload_length — 1  
>  data_length = len(payload) — 1  
>  sp_header = struct.pack(‘>HHH’, word0, word1, data_length)  
>  space_packet = sp_header + payload  
>    
>  # 2. TC Transfer Frame Primary Header (5 bytes)  
>  # TFVN(00) | Bypass(0) | CC(1=Cmd) | Res(00) | SCID(10b)  
>  b01 = (0b00 << 14) | (0 << 13) | (1 << 12) | (0b00 << 10) | (SC_ID & 0x3FF)  
>  # VCID(6b) | FrameLength(10b) = (Header + Packet + CRC) — 1  
>  frame_length = 5 + len(space_packet) + 2–1  
>  b23 = ((VC_ID & 0x3F) << 10) | (frame_length & 0x3FF)  
>  # VCFC (8b)  
>  b4 = seq_count & 0xFF   
>    
>  tc_header = struct.pack(‘>HHB’, b01, b23, b4)  
>    
>  # 3. 组装并计算 CRC  
>  frame_wo_crc = tc_header + space_packet  
>  return frame_wo_crc + struct.pack(‘>H’, crc16(frame_wo_crc))

> def main():  
>  sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)  
>  sock.settimeout(10)  
>    
>  print(f”[*] Connecting to spacecraft modem at {TARGET_IP}:{TARGET_PORT}…”)  
>  sock.connect((TARGET_IP, TARGET_PORT))  
>  print(“[+] Connected.”)  
>    
>  # ==========================  
>  # Step 1: 发送 BEGIN (VCFC=0, Payload Counter=0x00)  
>  # ==========================  
>  print(“\n[*] Step 1: Sending ‘0x00:BEGIN’ (VCFC=0)”)  
>  tc1 = build_ccsds_tc(b”0x00:BEGIN”, 0)  
>  sock.send(tc1)  
>  time.sleep(1)  
>    
>  ack = sock.recv(4096)  
>  ack_text = ack.decode(errors=’replace’)  
>  print(f” <- Response: {ack_text}”)  
>    
>  if “0x01:ACK” not in ack_text:  
>  print(“[-] Synchronization failed!”)  
>  return  
>    
>  print(“[+] Synchronization successful.”)  
>    
>  # ==========================  
>  # Step 2: 发送 GETFLAG (VCFC=1, Payload Counter=0x02)  
>  # ==========================  
>  print(“\n[*] Step 2: Sending ‘0x02:GETFLAG’ (VCFC=1)”)  
>  tc2 = build_ccsds_tc(b”0x02:GETFLAG”, 1)  
>  sock.send(tc2)  
>  time.sleep(1)  
>    
>  full_resp = b””  
>  while True:  
>  try:  
>  chunk = sock.recv(4096)  
>  if not chunk: break  
>  full_resp += chunk  
>  except: break  
>    
>  flag_text = full_resp.decode(errors=’replace’)  
>  print(f” <- Response: {flag_text}”)  
>    
>  if “HTB{“ in flag_text:  
>  print(“\n🎉 [+] FLAG CAPTURED SUCCESSFULLY! 🎉”)  
>  else:  
>  print(“\n[-] Failed to retrieve flag.”)  
>    
>  sock.close()

> if __name__ == “__main__”:  
>  main()

![](https://cdn-images-1.medium.com/max/1000/1*DbzariQ5-Y3ecT8W01s00A.png)