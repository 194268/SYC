
![](https://cdn-images-1.medium.com/max/1000/1*FJbVjVJDg4EWkLEG7unH4Q.png)

#### Challenge Scenario

---

The corporate spy is escaping in the prototype vehicle, but our drone is still in range to exploit the TCU and grant us access to the car’s inner network. CAN you stop the car and lock the doors, to trap him until someone arrives and safeguards our IP? We managed to retrieve a system check log of that car and a network connection wrapper from the internal documentation to help you in your mission.

ok, check the website as usual

![](https://cdn-images-1.medium.com/max/1000/1*xi9pjqFlZc8GHyyuFI6yiA.png)

we can found a dsahboard here

![](https://cdn-images-1.medium.com/max/1000/1*AlIr72qsPnukjX4XatjNkQ.png)

also,it hint us use socket

check the zip file

![](https://cdn-images-1.medium.com/max/1000/1*HkYd5wLyFQbZRsp6V9TVtg.png)

here is the py

> **_#!/usr/bin/python3_**

> **_‘’’  
> Use this script to connect to the car’s network to read and send packets._**

> **_A URL must be added bellow in order to connect._**

> **_You can either use it as a command-line tool and give the packet as an argument or  
> change the script to fit your needs  
> ‘’’_**

> **_import socketio  
> import time  
> import sys  
> from engineio.payload import Payload_**

> **_#In case of issues with the connection increase the max_decode_packets value  
> Payload.max_decode_packets = 100_**

> **_# Add here the provided docker URL  
> URL = ‘http://localhost:5000/'_**

> **_# Init socket  
> sio = socketio.Client()_**

> **_@sio.event  
> def connect():  
>  print(‘[!] connection established’)_**

> **_@sio.event  
> def disconnect():  
>  print(‘[!] disconnected from server’)_**

> **_# Event handler that prints the packets emitted from the server  
> @sio.on(‘endpoint’)  
> def on_endpoint(data):  
>  print(data)_**

> **_print(“[!] Connecting to server..”)_**

> **_# Connect to the network  
> sio.connect(URL)_**

> **_# Give a packet as an argument  
> try:   
>  packet = sys.argv[1]  
> except:  
>  pass_**

> **_print(“[!] Sending packets..”)_**

> **_while True:  
>  # Send data to the server   
>  try:   
>  sio.emit(‘endpoint’, packet)_**

> **_except:  
>  pass_**

> **_# Do NOT remove. Use sleep in between each packet transmission  
>  # In case of issues with the connection try increasing the sleep time value  
>  time.sleep(0.1)_**

> **_# Close connection  
> # sio.disconnect()_**

use this to connect

> **_#!/usr/bin/python3  
> import socketio  
> import time  
> from engineio.payload import Payload_**

> **_Payload.max_decode_packets = 100_**

> **_URL = “http://154.57.164.82:31546/"_**

> **_sio = socketio.Client(logger=True, engineio_logger=True)_**

> **_@sio.event  
> def connect():  
>  print(“[+] connected”)_**

> **_@sio.event  
> def disconnect():  
>  print(“[-] disconnected”)_**

> **_@sio.on(“endpoint”)  
> def on_endpoint(data):  
>  print(“[SERVER endpoint]”, data)_**

> **_print(“[*] connecting…”)  
> sio.connect(URL, transports=[“polling”])_**

> **_while True:  
>  packet = input(“packet> “).strip()  
>  if packet:  
>  sio.emit(“endpoint”, packet)  
>  time.sleep(0.1)_**

![](https://cdn-images-1.medium.com/max/1000/1*8ZtXqjTa6FjctpnoVujsaw.png)

also，use Saleae Logic 2 check the .logicdata

ok, we hve to use logic 1

![](https://cdn-images-1.medium.com/max/1000/1*fcHFrPKVIYJ3qH1GkNQSuA.png)

ok,we can found the CAN Analyzer to found the way to get the 

122#6c6f636b3a300000

which means

lock:0

and unlock the door by send it

we can found it 

**_HTB{h4ck1n9_c425_15_n07_7h47_h42d_4f732411!}_**