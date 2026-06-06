![](https://cdn-images-1.medium.com/max/1000/1*Oo8LZtoGHLDPHI1JAhtgSw.png)

#### Challenge Scenario

---

After bypassing CygnusCorp’s perimeter defenses and cracking the PIN to gain internal access, you’ve uncovered a crucial piece of the network: the Core Administration Server. Your goal is to pivot laterally through the internal network to reach the server, but the path is not clear. The network is heavily monitored, and each host you move through carries a detection risk. Can you navigate the network stealthily, identify the safest paths, and reach the Core Administration Server without being detected? The network map is in your hands — now you must choose the best route to complete your mission before you’re caught.

check the website

![](https://cdn-images-1.medium.com/max/1000/1*mO7jTksTz1sLBsnW7E2J-Q.png)

> **_Pivot Chain_**

> **_After successfully leveraging a weak PIN system to access a critical internal server, you’ve infiltrated CygnusCorp’s network.   
> Your next objective is clear: pivot laterally toward the Core Administration Server, CygnusCorp’s most sensitive asset._**

> **_The network is heavily monitored by advanced detection systems.  
> Each pivot path between hosts carries a certain detection risk, based on factors such as traffic visibility, authentication requirements, and known blue team monitoring points._**

> **_Your task is to carefully plan your lateral movement to avoid detection.  
> Use the network map to identify the safest path — the sequence of pivots with the lowest cumulative detection risk — to reach the Core Administration Server from your current compromised host._**

> **_Input Format:  
> • two integers N (number of hosts) and M (number of paths)  
> • The starting compromised host and the target Core Administration Server.  
> • A list of M pivot paths between hosts (unidirectional), each with an associated detection risk._**

> **_Output Format:  
> • Print a single integer representing the lowest cumulative detection risk to travel from the starting host to the Core Administration Server._**

> **_5 <= N <= 150000  
> 6 <= M <= 10⁶_**

1. Input Parsing: We read all input at once and parse N, M, start host, target host, and all edges with their risks.
2. Host Name Mapping: Since host names are strings, we map them to integer indices (0 to N-1) for efficient array access.
3. Graph Construction: We build an adjacency list where each entry contains (neighbor, risk) pairs.
4. Dijkstra’s Algorithm:

- Use a min-heap priority queue to always process the node with the lowest cumulative risk.
- Maintain a `dist` array with the minimum risk to reach each host.
- Early exit when we pop the target node from the priority queue (since Dijkstra’s guarantees we’ve found the shortest path).
- Output: Print the minimum cumulative risk. If the target is unreachable, print -1.

so use

> **_import sys  
> import heapq_**

> **_def solve():  
>  input = sys.stdin.read  
>  data = input().split()  
>    
>  if not data:  
>  return  
>    
>  idx = 0  
>  N = int(data[idx]); idx += 1  
>  M = int(data[idx]); idx += 1  
>    
>  start = data[idx]; idx += 1  
>  target = data[idx]; idx += 1  
>    
>  # Map host names to indices  
>  host_to_id = {}  
>  host_id_counter = 0  
>    
>  def get_id(host):  
>  nonlocal host_id_counter  
>  if host not in host_to_id:  
>  host_to_id[host] = host_id_counter  
>  host_id_counter += 1  
>  return host_to_id[host]  
>    
>  # Build adjacency list  
>  graph = [[] for _ in range(N)]  
>    
>  for _ in range(M):  
>  u_name = data[idx]; idx += 1  
>  v_name = data[idx]; idx += 1  
>  risk = int(data[idx]); idx += 1  
>    
>  u = get_id(u_name)  
>  v = get_id(v_name)  
>  graph[u].append((v, risk))  
>    
>  start_id = get_id(start)  
>  target_id = get_id(target)  
>    
>  # Dijkstra’s algorithm  
>  INF = float(‘inf’)  
>  dist = [INF] * N  
>  dist[start_id] = 0  
>    
>  pq = [(0, start_id)]  
>    
>  while pq:  
>  current_risk, u = heapq.heappop(pq)  
>    
>  if current_risk > dist[u]:  
>  continue  
>    
>  if u == target_id:  
>  print(current_risk)  
>  return  
>    
>  for v, risk in graph[u]:  
>  new_risk = current_risk + risk  
>  if new_risk < dist[v]:  
>  dist[v] = new_risk  
>  heapq.heappush(pq, (new_risk, v))  
>    
>  # If target is unreachable  
>  print(-1)_**

> **_if __name__ == “__main__”:  
>  solve()_**

![](https://cdn-images-1.medium.com/max/1000/1*SbTrbSr-9apV0idPafGcNg.png)

**_HTB{st34lthy_p1v0t1ng_compl3t3}_**