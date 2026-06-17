
![](https://cdn-images-1.medium.com/max/1000/1*D-qV283o8yn8-c2eaHUMGg.png)

#### Challenge Scenario

---

You, the Manager, control a network of computers, filled with information about your enemies. However, transferring data from one computer to your computer is taking too long. Figure out the least amount of time required to transfer information from a computer to your computer for all computers.

![](https://cdn-images-1.medium.com/max/1000/1*NoKxMbJfqNoOl80_LDe3aA.png)

this is pertty hard

so i asked ai for help

and here is the py

> **_import sys  
> sys.setrecursionlimit(1000000)_**

> **_def solve():  
>  input_data = sys.stdin.read().split()  
>  if not input_data:  
>  return  
>    
>  N = int(input_data[0])  
>    
>  parent = [0] * (N + 1)  
>  dist = [0] * (N + 1)  
>  transfer = [0] * (N + 1)  
>  prep = [0] * (N + 1)  
>  receive = [0] * (N + 1)  
>    
>  children = [[] for _ in range(N + 1)]  
>    
>  idx = 1  
>  for i in range(1, N + 1):  
>  parent[i] = int(input_data[idx])  
>  dist[i] = int(input_data[idx+1])  
>  transfer[i] = int(input_data[idx+2])  
>  prep[i] = int(input_data[idx+3])  
>  receive[i] = int(input_data[idx+4])  
>  idx += 5  
>  if i > 1:  
>  children[parent[i]].append(i)  
>    
>  dis_from_root = [0] * (N + 1)  
>  dp = [0] * (N + 1)  
>   
>  hull_m = [0] * (N + 1)  
>  hull_c = [0] * (N + 1)  
>  hull_size = 0  
>  def is_bad(m1, c1, m2, c2, m3, c3):  
>  return (c2 — c1) * (m2 — m3) >= (c3 — c2) * (m1 — m2)_**

>  **_def query(x):  
>  low = 0  
>  high = hull_size — 1  
>  while low < high:  
>  mid = (low + high) // 2  
>  val_mid = hull_m[mid] * x + hull_c[mid]  
>  val_next = hull_m[mid + 1] * x + hull_c[mid + 1]  
>  if val_mid >= val_next:  
>  low = mid + 1  
>  else:  
>  high = mid  
>  return hull_m[low] * x + hull_c[low]_**

> **_def dfs(u):  
>  nonlocal hull_size  
>    
>  if u != 1:  
>  best_val = query(transfer[u])  
>  dp[u] = best_val + dis_from_root[u] * transfer[u] + prep[u]  
>  else:  
>  dp[u] = 0  
>    
>  nm = -dis_from_root[u]  
>  nc = dp[u] + receive[u]  
>    
>  orig_size = hull_size  
>    
>  low = 1  
>  high = orig_size — 1  
>  insert_pos = orig_size  
>    
>  while low <= high:  
>  mid = (low + high) // 2  
>  if is_bad(hull_m[mid — 1], hull_c[mid — 1], hull_m[mid], hull_c[mid], nm, nc):  
>  insert_pos = mid  
>  high = mid — 1  
>  else:  
>  low = mid + 1  
>   
>  if insert_pos > 0 and hull_m[insert_pos — 1] == nm:  
>  if nc >= hull_c[insert_pos — 1]:  
>  for v in children[u]:  
>  dis_from_root[v] = dis_from_root[u] + dist[v]  
>  dfs(v)  
>  return  
>  else:  
>  insert_pos -= 1  
>  saved_m = hull_m[insert_pos:orig_size]  
>  saved_c = hull_c[insert_pos:orig_size]  
>    
>  hull_size = insert_pos + 1  
>  hull_m[insert_pos] = nm  
>  hull_c[insert_pos] = nc  
>    
>  for v in children[u]:  
>  dis_from_root[v] = dis_from_root[u] + dist[v]  
>  dfs(v)  
>   
>  hull_size = orig_size  
>  hull_m[insert_pos:orig_size] = saved_m  
>  hull_c[insert_pos:orig_size] = saved_c_**

> **_dfs(1)  
>  print(*(dp[2:]))_**

> **_if __name__ == ‘__main__’:  
>  solve()_**

### 1. The Core Equation: What are we calculating?

Each computer node $u$ needs to find the best ancestor node $v$ to jump to. Data will be sent from $u$ to $v$, and then from $v$ to the root computer.

If we expand, rearrange, and group the time formula, an interesting pattern emerges:

$$\text{Total Time} = \underbrace{(-\text{dist}_v)}_{m} \cdot \underbrace{(\text{transfer}_u)}_{x} + \underbrace{(DP_v + \text{receive}_v)}_{c} + \text{fixed constants of node } u$$

This is exactly the standard linear equation from algebra: $y = m \cdot x + c$.

- Every ancestor $v$ whose answer is already calculated represents **a straight line** (with a fixed slope $m$ and y-intercept $c$).
- The current node $u$ provides a **horizontal coordinate $x$** (its transfer speed).
- **Our Goal**: Find which line gives the minimum $y$ value (the shortest time) at this specific coordinate $x$.

### 2. Convex Hull Trick: How do we avoid checking every ancestor?

If there are 500,000 nodes, checking every single ancestor for each node would take $O(N²)$ time and cause a timeout.

Geometrically, as the tree grows deeper, the path distances increase, meaning the slopes ($m = -\text{dist}_v$) of the ancestor lines are monotonically decreasing. When these lines intersect, they form a bowl-like boundary at the very bottom called the **Lower Convex Hull**.

Lines that end up completely above this boundary can never yield the minimum time and are discarded. We use a **monotonic stack** to store only the lines that form this bottom envelope.

When a new node $u$ wants to find its optimal path, it doesn’t need to loop through all ancestors. Because the lines on the lower hull are sorted by slope, we can use **binary search** to find the absolute lowest line in just $O(\log N)$ time.

### 3. Tree DFS and “Trace-Free” Backtracking

Because this is a branching **tree** rather than a straight line, we explore paths using **DFS (Depth-First Search)**:

1. **Query**: Use the current node’s transfer speed ($x$) to binary search the lower hull stack for the best $dp[u]$ value.
2. **Insert**: Turn the current node into a new line ($y = mx + c$) and insert it at the end of the hull stack (knocking out any older lines that become redundant).
3. **Recurse**: Travel down into the node’s children carrying this updated hull.
4. **Backtrack (The Crucial Step)**: When we finish exploring a subtree and want to backtrack to check a sibling branch, **the stack must be restored exactly to the state it was in before entering this node**.

The critical fix in the code is taking a **full slice backup** of all old lines that were overwritten or knocked out by the new line. When backtracking, we paste this slice back into place. This guarantees that data from one branch never corrupts another.

![](https://cdn-images-1.medium.com/max/1000/1*c6Gf2pZIWA72K54ipMYJKA.png)

**_HTB{5UCC355FU11Y_RU1N3D_3N3M135_C0MP4N135_R0xIRg}_**