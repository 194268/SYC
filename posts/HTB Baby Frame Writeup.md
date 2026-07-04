![](https://cdn-images-1.medium.com/max/1000/1*AEQAygcpNfO6gVG_vju48A.png)

#### Challenge Scenario

---

A recently recovered experimental spacecraft broadcasting under spacecraft **ID 12** has entered visibility range. Ground telemetry suggests that one onboard diagnostic application remains active on **APID 42** over virtual **channel 3**. Mission operators believe the service is waiting for a single correctly formatted CCSDS space packet containing the user payload `HEALTHCHECK`.

Your task is to establish communication with the spacecraft and trigger the diagnostic response.

Relevant protocol specifications:

- [CCSDS Space Packet Protocol](https://ccsds.org/Pubs/133x0b2e2.pdf)
- [CCSDS TC Space Data Link Protocol](https://ccsds.org/Pubs/232x0b4e1c1.pdf)

check the zip file

![](https://cdn-images-1.medium.com/max/1000/1*OQzQwQJ942BhpqiHH_Znwg.png)

![](https://cdn-images-1.medium.com/max/1000/1*Xln1aWqcI3-NgzjJBBCzSw.png)

This looks like a challenge to test fringe knowledge, so I decided to hand this challenge over to my little assistant

![](https://cdn-images-1.medium.com/max/1000/1*5GWTOljDYqyIifRkwPC2PQ.png)

![](https://cdn-images-1.medium.com/max/1000/1*ON62iUtvb65kex7s9BMIpw.png)

![](https://cdn-images-1.medium.com/max/1000/1*obr6e5mqykN3f8YEwZ82mA.png)

![](https://cdn-images-1.medium.com/max/1000/1*UqlKrk8cTHXmqBdXVwFUtw.png)

![](https://cdn-images-1.medium.com/max/1000/1*HEX9GlH3A5yKlBxwtkkgfg.png)

yep.we did it

![](https://cdn-images-1.medium.com/max/1000/1*paV1Ki1DbxjS0Mln5HFO4g.png)

### Challenge Difficulty Analysis

### Dimensional Breakdown

> Domain Obscurity⭐⭐⭐⭐⭐CCSDS is a niche space communication protocol; 99% of security practitioners have never encountered it

> Technical Complexity⭐⭐☆☆☆Just bit manipulation + struct.pack; under 30 lines of code

> Debugging Difficulty⭐⭐⭐⭐Server silently drops malformed packets with no error feedback; impossible to pinpoint which field is wrong

> Documentation Load⭐⭐⭐⭐Two CCSDS specification documents totaling hundreds of pages

### Core Challenge: Not Technology, but Cognitive Barriers

The real difficulty isn’t _writing the code_ — it’s _knowing what code to write_. There are four specific cognitive hurdles:

1. A Completely Alien Protocol Stack  
Most CTF players are comfortable with HTTP, TCP, DNS, or SMB. CCSDS is an entirely independent space communication protocol stack with minimal Chinese-language resources even on Google.

2. Counterintuitive Length Convention  
This is the most deceptive pitfall. The CCSDS specification mandates:

> _All length field values = actual byte count — 1_

I failed here on my first attempt. There is no technical reason for this `-1`—it's purely a design convention from 40 years ago.

3. Multi-Layer Nested Encapsulation  
Data must be wrapped in two layers, each with a completely different header format, and the length fields are interdependent across layers:

TC Transfer Frame Header (5 bytes)  
  └─ Frame Length = total frame size - 1  
     └─ Space Packet Header (6 bytes)  
        └─ Data Length = payload size - 1  
           └─ HEALTHCHECK (11 bytes)

4. Bit-Level Precision + Silent Failure  
Header fields are not byte-aligned. For example, `Version(3b) + Type(1b) + SecHeader(1b) + APID(11b)` spans across 2 bytes. A single bit error causes the entire packet to be discarded, with zero error feedback from the server.

### Comparison with Other HTB Challenge Categories

Challenge TypeDifficulty SourceCCSDS ContrastWeb (SQLi, XSS)Finding vulnerability pointsCCSDS has no vulnerability to find; must construct packets _exactly_Pwn (Buffer Overflow)Reverse engineering + shellcodingNo reversing needed, but must read specsCrypto (RSA, AES)Mathematical foundationsNo math required, but demands bit-precisionMisc (Stego, Encoding)Tool combinationNo existing tools; must code from scratch

### Final Summary

Challenge Equation:

> _Difficulty = Knowledge Barrier × Precision Requirements × Debugging Blindness_

This challenge doesn’t demand advanced technical skills. It demands:

- Learning a completely unfamiliar protocol system from scratch
- Constructing packets with bit-level precision
- Troubleshooting with absolutely no error feedback

It’s like navigating the deep ocean on a moonless night — no stars, no sound, only coordinates and a compass.

**_HTB{7e167a1a577bf6e08214034f438b929f}_**