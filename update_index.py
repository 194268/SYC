import os
import json
from datetime import datetime
import urllib.parse

def generate_site_assets():
    POSTS_DIR = "posts"
    BASE_URL = "https://syc-sigma.vercel.app"
    LIST_FILE = "list.json"
    SITEMAP_FILE = "sitemap.xml"
    ROBOTS_FILE = "robots.txt"
    ROUTE_PREFIX = "p"
    TIME_CACHE_FILE = ".post_timestamps.json"

    if not os.path.exists(POSTS_DIR):
        os.makedirs(POSTS_DIR)
        print(f"[*] 已创建目录: {POSTS_DIR}")

    # 读取缓存
    time_cache = {}
    if os.path.exists(TIME_CACHE_FILE):
        try:
            with open(TIME_CACHE_FILE, "r", encoding="utf-8") as f:
                time_cache = json.load(f)
            print("[*] 已加载时间戳缓存")
        except Exception as e:
            print(f"[!] 时间戳缓存读取失败: {e}")
            time_cache = {}

    files_with_time = []
    current_files = set()

    for f in os.listdir(POSTS_DIR):
        if not f.endswith(".md"):
            continue

        current_files.add(f)

        if f in time_cache:
            timestamp = time_cache[f]
            print(f"[*] 使用缓存时间: {f}")
        else:
            # 新 md 文件：使用当前运行时间，而不是文件 mtime
            timestamp = int(datetime.now().timestamp())
            time_cache[f] = timestamp
            print(f"[+] 新增文件并记录独立时间: {f}")

        files_with_time.append((f, timestamp))

    # 删除已经不存在的 md 的缓存，避免缓存越来越脏
    time_cache = {
        name: ts
        for name, ts in time_cache.items()
        if name in current_files
    }

    files_with_time.sort(key=lambda x: x[1], reverse=True)

    posts_data = []

    now_str = datetime.now().strftime("%Y-%m-%d")
    sitemap_content = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
        '  <url>',
        f'    <loc>{BASE_URL}/</loc>',
        f'    <lastmod>{now_str}</lastmod>',
        '    <priority>1.0</priority>',
        '  </url>'
    ]

    for file_name, timestamp in files_with_time:
        dt = datetime.fromtimestamp(timestamp)
        date_str = dt.strftime("%Y-%m-%d")
        time_str = dt.strftime("%H:%M:%S")

        clean_name = file_name.replace(".md", "")
        display_title = clean_name.replace("-", " ").replace("_", " ").upper()

        encoded_name = urllib.parse.quote(clean_name)
        static_url = f"{BASE_URL}/{ROUTE_PREFIX}/{encoded_name}"

        posts_data.append({
            "fileName": file_name,
            "title": display_title,
            "url": f"/{ROUTE_PREFIX}/{encoded_name}",
            "date": date_str,
            "time": time_str,
            "timestamp": timestamp
        })

        sitemap_content.append("  <url>")
        sitemap_content.append(f"    <loc>{static_url}</loc>")
        sitemap_content.append(f"    <lastmod>{date_str}</lastmod>")
        sitemap_content.append("    <priority>0.8</priority>")
        sitemap_content.append("  </url>")

    with open(LIST_FILE, "w", encoding="utf-8") as f:
        json.dump(posts_data, f, indent=4, ensure_ascii=False)

    print(f"[+] 成功更新前端索引: {len(posts_data)} 篇文章")

    sitemap_content.append("</urlset>")
    with open(SITEMAP_FILE, "w", encoding="utf-8") as f:
        f.write("\n".join(sitemap_content))

    print(f"[+] 成功更新站点地图: {SITEMAP_FILE}")

    with open(ROBOTS_FILE, "w", encoding="utf-8") as f:
        f.write("User-agent: *\n")
        f.write("Allow: /\n")
        f.write(f"Sitemap: {BASE_URL}/{SITEMAP_FILE}\n")

    print("[+] 成功生成 robots.txt")

    with open(TIME_CACHE_FILE, "w", encoding="utf-8") as f:
        json.dump(time_cache, f, indent=4, ensure_ascii=False)

    print(f"[+] 已保存时间戳缓存到 {TIME_CACHE_FILE}")
    print("[+] 文章已按首次上传时间降序排列")

if __name__ == "__main__":
    generate_site_assets()
