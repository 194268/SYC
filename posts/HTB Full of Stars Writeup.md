![](https://cdn-images-1.medium.com/max/1000/1*Ym3HmYO1TE_N8rCK1yw49Q.png)

#### Challenge Scenario

---

While density scanning the galaxy we’ve found something extraordinary! It seems that the stars in our local group are communicating a message: The stars, spread over 256 clusters, were seen to blink in a specific order. However, in our charts we have only one star per cluster to uniquely identify the cluster, which leaves us with >99% stars uncategorized. Could you assist our researchers by identifying what stars belong to which cluster and deciphering the message left for us by mysterious extraterrestrial intelligence?

check the zip file

![](https://cdn-images-1.medium.com/max/1000/1*Mah5xlsqVxupin-JxcDwtA.png)

we have got all these files

so, i gave the challenge to my little helper

but even though my helper tried her best,the challenge remains unresolved.

![](https://cdn-images-1.medium.com/max/1000/1*_375jpOYgSKCV_042Lqx9w.png)

![](https://cdn-images-1.medium.com/max/1000/1*wN2PsnrHGu2dYeE8CHaifw.png)

after a long stucking we found a important point

> _💡 “Look at the shape of your data first, then pick the tool. Don’t use a hammer to turn a screw.”_

![](https://cdn-images-1.medium.com/max/1000/1*i9-fS5G2S1R2BHSFwljQCg.png)

![](https://cdn-images-1.medium.com/max/1000/1*wctZrTNGSL-uBqEGSmwf6Q.png)

![](https://cdn-images-1.medium.com/max/1000/1*DHdWOT_cZmPt2n8kk1EfbQ.png)

![](https://cdn-images-1.medium.com/max/1000/1*LvA6XWo8HF56ywtM1z0fbQ.png)

![](https://cdn-images-1.medium.com/max/1000/1*ifYrCSn3i1Uwz1T_nfg7Rg.png)

![](https://cdn-images-1.medium.com/max/1000/1*Iq9pSjm5erSU5q1pg2wbNA.png)

![](https://cdn-images-1.medium.com/max/1000/1*hl5HW942qlM3eIoAL-SZdg.png)

and we finally got the flag

![](https://cdn-images-1.medium.com/max/1000/1*BGi8sLGiyaIf3CusxT-QYA.png)

here is the whole progress

# 📖 HTB Machine Learning Challenge: Full Writeup  
  
## 🎯 Challenge Overview  
  
| Item | Detail |  
|------|--------|  
| **Type** | HTB Machine Learning (Medium) |  
| **Goal** | Classify 131,527 3D points into 256 classes to reconstruct `flag.jpg` (512×512 progressive JPEG) |  
| **Given Data** | `known_samples.npy.gz` (256×3, only 1 anchor per class) + `data.npy.gz` (131527×3) |  
  
---  
  
## 🧠 The True Geometric Structure of the Data  
  
> **This is the core insight of the entire challenge.**  
  
The 256 classes are **NOT** spherical point clusters — they are **curved filaments**!  
  
- Filaments extend along the **Y-axis** (Y range 3500+), but are separated in the **X-Z plane**  
- Multiple filaments stack/overlap along the Y-axis  
- Each anchor (core) is just a **random point** on its filament, not a centroid  
  
---  
  
## ❌ The Graveyard of Failed Approaches (20+)  
  
| # | Method | Why It Failed |  
|---|--------|---------------|  
| 1 | 1-NN (Euclidean distance) | Distal points on a filament are closer to a neighbor's anchor |  
| 2 | KNN (K=5, 15) | Only 1 sample per class; all neighbors belong to wrong classes |  
| 3 | Mahalanobis distance | Fixed Byte 9, destroyed Byte 0 (global covariance is wrong) |  
| 4 | Z-score normalization | Fixed Byte 9, destroyed Byte 0 (excessively weakened Y-axis) |  
| 5 | Weighted grid search | No linear weight combination can fix all bytes simultaneously |  
| 6 | QDA (Quadratic Discriminant Analysis) | Assumes Gaussian ellipsoids ≠ curved manifolds |  
| 7 | Iterative QDA | Oscillates without convergence |  
| 8 | GMM (full/diag covariance) | Gaussian assumption fundamentally wrong; unstable |  
| 9 | Iterative K-Means | Error amplification — gets worse with each iteration |  
| 10 | Seeded K-Means | Known-plaintext seeds contaminate other classes' centroids |  
| 11 | SVM (RBF kernel) | Exactly equivalent to 1-NN |  
| 12 | Standard JPEG header replacement | Original JPEG uses custom Huffman tables; standard tables don't match |  
| 13 | JPEG structural repair | Too many misclassifications in internal DHT/DQT data to fix |  
| 14 | Polynomial regression | No mathematical formula relates coordinates to byte values |  
| 15 | KMeans / DBSCAN / Spectral Clustering | Density/centroid assumptions all wrong |  
  
> **Root cause**: Every method based on "distance" or "density" fails on curved manifolds.  
  
---  
  
## ✅ The Correct Solution: Multi-Source Dijkstra Geodesic Distance Propagation  
  
### Core Idea  
  
> **Don't use straight-line distance. Propagate labels along the connectivity of the data manifold.**  
  
1. Connect all points (256 anchors + 131,527 data points) into a **k-nearest neighbor graph** (k=12~15)  
2. Launch **multi-source Dijkstra** shortest path from all 256 anchors simultaneously  
3. Each point is assigned to the anchor it can reach via the shortest path along the graph  
  
### Two Critical Optimizations  
  
| Optimization | Parameter | Rationale |  
|-------------|-----------|------------|  
| **Anisotropic scaling** | `S = [1.0, 0.35, 1.0]` | Down-weight Y-axis to prevent kNN edges from bridging stacked filaments |  
| **Symmetric kNN graph** | `k = 14` | Bridges gaps within sparse filaments |  
  
---  
  
## 📐 The Mathematical Essence

1-NN criterion: argmin_i ||x - core_i||² ← straight-line distance (ignores manifold shape)  
Dijkstra criterion: argmin_i d_geodesic(x, core_i) ← shortest path along the manifold

> When classes are curved manifolds, **geodesic distance ≠ straight-line distance**.  
>  
> A point at the far end of a filament may be closer to a neighbor's anchor in Euclidean distance, but the path along the manifold can only reach its own anchor.  
  
---  
  
## 💡 Lessons Learned  
  
1. **Understand the geometric structure of your data before choosing an algorithm** — don't blindly throw classifiers at it  
2. **Curved manifolds ≠ density clusters** — when data forms elongated curves, connectivity is the correct inductive bias  
3. **Anisotropic scaling** is the key trick for handling "stacked filaments"  
4. **Progressive JPEG is more fragile than baseline JPEG** — even a small number of misclassifications causes visual corruption  
5. **Known-plaintext attack** (using a standard JPEG header) is an effective way to validate classification quality

and the key point of this room

![](https://cdn-images-1.medium.com/max/1000/1*7yup7yQ1Hfpf50k2Sf6hjQ.png)

![](https://cdn-images-1.medium.com/max/1000/1*5lVhWfBu-mKwm9ZZGEYaUQ.png)

![](https://cdn-images-1.medium.com/max/1000/1*e2ax4OlcNVJphCzpkkMt6g.png)

![](https://cdn-images-1.medium.com/max/1000/1*onWsC_0gXm_ft2zynT834w.png)

![](https://cdn-images-1.medium.com/max/1000/1*yRj9x4VNvUMwddzj2WQ3Pg.png)

**_HTB{4ll_7h3se_w0r1ds_4r3_y0Ur5_exc3p7_3Ur0P4}_**