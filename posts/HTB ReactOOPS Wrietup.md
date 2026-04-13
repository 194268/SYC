
![](https://cdn-images-1.medium.com/max/1000/1*FggwOmWce9J3--J4G-G0fw.png)

#### Challenge Scenario

---

NexusAI’s polished assistant interface promises adaptive learning and seamless interaction. But beneath its reactive front end, subtle glitches hint that user input may be shaping the system in unexpected ways. Explore the platform, trace the echoes in its reactive layer, and uncover the hidden flaw buried behind the UI.

  

check the website

![](https://cdn-images-1.medium.com/max/1000/1*tO22j-w9kirgaz7xEJdr3g.png)

and source code 

![](https://cdn-images-1.medium.com/max/1000/1*VJ6JHikDnMBC24XBscyESw.png)

hum…

wired

with a little search 

we found cve-2025–55182 by using this test payload

![](https://cdn-images-1.medium.com/max/1000/1*ZOFWq262VLbyX4FCZj00AA.png)

so we found a poc

[https://github.com/msanft/CVE-2025-55182/blob/main/poc.py](https://github.com/msanft/CVE-2025-55182/blob/main/poc.py)

![](https://cdn-images-1.medium.com/max/1000/1*4IecdazXETyYkWKmXpQVVA.png)

![](https://cdn-images-1.medium.com/max/1000/1*ecNMBLnNon1FMn92lifmkg.png)

hit it

**_HTB{jus7_1n_c4s3_y0u_m1ss3d_r34ct2sh3ll___cr1t1c4l_un4uth3nt1c4t3d_RCE_1n_R34ct___CVE-2025–55182}_**

here is the total progress

### 1. 🧩 Root Cause: Dangerous Trust

React Server Components designed their own data format called the “Flight” protocol to enable efficient communication between server and client. When your browser (client) needs the server to do something (like submitting a form, known as a “Server Action”), it packages the data according to the Flight protocol format and sends it to the server.

The problem occurs when the server receives and unpacks (deserializes) this package.

In vulnerable versions of React, the parsing code trusted the package’s contents too much. It failed to properly validate certain special properties (like `then`, `constructor`), and proceeded to parse them without adequate checks.

### 2. 🗺️ The “Weapon Borrowing” Path: Prototype Chain Attack

JavaScript has a feature called the prototype chain. Simply put, if a property isn’t found on an object, JavaScript automatically traverses up a predefined “chain” until it finds it — or reaches the end.

Attackers exploited exactly this behavior. They craft a malicious object containing a path pointing to `__proto__` or `constructor`, for example: `$1:__proto__:then`.

When the Flight protocol parses this data, it encounters a path expression and naively follows it. Because the code lacks `hasOwnProperty` checks, it gets tricked into traversing step by step until it reaches JavaScript's most core and dangerous Function constructor.

### 3. 💥 Final Detonation: Code Execution

Once the `constructor` is accessed, the attacker gains the ability to dynamically create functions on the server. From there, they can:

1. Craft malicious code by carefully constructing strings, such as: `process.mainModule.require('child_process').execSync('cat /app/flag.txt')`
2. This string is then treated as the body of a new function.
3. During subsequent parsing of the Flight protocol, this newly created malicious function gets automatically invoked, thereby executing arbitrary system commands on the server.

This completes the full attack chain — from “parsing data” to “executing code.”