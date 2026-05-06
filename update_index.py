import os
import json
from datetime import datetime
import urllib.parse

def generate_site_assets():
    # --- 配置区 ---
    POSTS_DIR = "posts"
    BASE_URL = "https://syc-sigma.vercel.app"
    LIST_FILE = "list.json"
    SITEMAP_FILE = "sitemap.xml"
    ROBOTS_FILE = "robots.txt"
    ROUTE_PREFIX = "p"
    TIME_CACHE_FILE = ".post_timestamps.json"  # 缓存文件时间戳

    # 1. 确保目录存在
    if not os.path.exists(POSTS_DIR):
        os.makedirs(POSTS_DIR)
        print(f"[*] 已创建目录: {POSTS_DIR}")

    # 2. 加载之前保存的时间戳缓存
    time_cache = {}
    if os.path.exists(TIME_CACHE_FILE):
        try:
            with open(TIME_CACHE_FILE, 'r', encoding='utf-8') as f:
                time_cache = json.load(f)
            print(f"[*] 已加载时间戳缓存")
        except:
            pass

    # 3. 获取所有 .md 文件及其修改时间
    files_with_time = []
    for f in os.listdir(POSTS_DIR):
        if f.endswith('.md'):
            file_path = os.path.join(POSTS_DIR, f)
            mtime = os.path.getmtime(file_path)
            
            # 如果文件在缓存中存在，使用缓存的时间；否则使用当前修改时间
            if f in time_cache:
                # 使用缓存中的时间戳
                timestamp = time_cache[f]
                print(f"[*] 使用缓存时间: {f}")
            else:
                # 新文件，记录当前时间
                timestamp = int(mtime)
                time_cache[f] = timestamp
                print(f"[+] 新增文件: {f}")
            
            files_with_time.append((f, timestamp))

    # 4. 按时间戳降序排序（最新的在前）
    files_with_time.sort(key=lambda x: x[1], reverse=True)

    # 5. 准备 list.json 的数据结构
    posts_data = []

    # 6. 生成 sitemap.xml 头部
    now_str = datetime.now().strftime('%Y-%m-%d')
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
        # 将时间戳转换为日期和时间字符串
        dt = datetime.fromtimestamp(timestamp)
        date_str = dt.strftime('%Y-%m-%d')
        time_str = dt.strftime('%H:%M:%S')
        
        # 提取标题
        clean_name = file_name.replace('.md', '')
        display_title = clean_name.replace('-', ' ').replace('_', ' ').upper()
        
        # 生成 SEO 友好的静态路径
        encoded_name = urllib.parse.quote(clean_name)
        static_url = f"{BASE_URL}/{ROUTE_PREFIX}/{encoded_name}"
        
        # 构建 list.json 需要的对象
        posts_data.append({
            "fileName": file_name,
            "title": display_title,
            "url": f"/{ROUTE_PREFIX}/{encoded_name}",
            "date": date_str,
            "time": time_str,
            "timestamp": timestamp
        })
        
        # 添加到 Sitemap
        sitemap_content.append('  <url>')
        sitemap_content.append(f'    <loc>{static_url}</loc>')
        sitemap_content.append(f'    <lastmod>{date_str}</lastmod>')
        sitemap_content.append('    <priority>0.8</priority>')
        sitemap_content.append('  </url>')

    # 7. 写入文件
    # 更新 list.json
    with open(LIST_FILE, "w", encoding="utf-8") as f:
        json.dump(posts_data, f, indent=4, ensure_ascii=False)
    print(f"[+] 成功更新前端索引: {len(posts_data)} 篇文章")

    # 更新 sitemap.xml
    sitemap_content.append('</urlset>')
    with open(SITEMAP_FILE, "w", encoding="utf-8") as f:
        f.write('\n'.join(sitemap_content))
    print(f"[+] 成功更新站点地图: {SITEMAP_FILE}")

    # 8. 自动生成 robots.txt
    with open(ROBOTS_FILE, "w", encoding="utf-8") as f:
        f.write("User-agent: *\n")
        f.write("Allow: /\n")
        f.write(f"Sitemap: {BASE_URL}/{SITEMAP_FILE}\n")
    print(f"[+] 成功生成 robots.txt")

    # 9. 保存时间戳缓存
    with open(TIME_CACHE_FILE, "w", encoding="utf-8") as f:
        json.dump(time_cache, f, indent=4, ensure_ascii=False)
    print(f"[+] 已保存时间戳缓存到 {TIME_CACHE_FILE}")
    print(f"[+] 文章已按上传时间降序排列（最新的在前）")

if __name__ == "__main__":
    generate_site_assets()
