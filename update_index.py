import os
import json
from datetime import datetime
import re
import urllib.parse  # 导入用于处理 URL 编码的库

def generate_site_assets():
    # --- 配置区 ---
    POSTS_DIR = "posts"
    BASE_URL = "https://syc-sigma.vercel.app"
    LIST_FILE = "list.json"
    SITEMAP_FILE = "sitemap.xml"
    ROBOTS_FILE = "robots.txt"
    ROUTE_PREFIX = "p"  # 与 vercel.json 保持一致

    # 1. 确保目录存在
    if not os.path.exists(POSTS_DIR):
        os.makedirs(POSTS_DIR)
        print(f"[*] 已创建目录: {POSTS_DIR}")

    # 2. 获取所有 .md 文件及其修改时间
    files_with_time = []
    for f in os.listdir(POSTS_DIR):
        if f.endswith('.md'):
            file_path = os.path.join(POSTS_DIR, f)
            mtime = os.path.getmtime(file_path)
            files_with_time.append((f, mtime))
    
    # 3. 按修改时间��序排序（最新的在前）
    files_with_time.sort(key=lambda x: x[1], reverse=True)

    # 4. 准备 list.json 的数据结构
    posts_data = []

    # 5. 生成 sitemap.xml 头部
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

    for file_name, mtime in files_with_time:
        file_path = os.path.join(POSTS_DIR, file_name)
        
        # 获取文件真实的最后修改时间（精确到秒）
        dt = datetime.fromtimestamp(mtime)
        date_str = dt.strftime('%Y-%m-%d')
        time_str = dt.strftime('%H:%M:%S')
        timestamp = int(mtime)  # Unix 时间戳
        
        # 提取标题和内容摘要
        clean_name = file_name.replace('.md', '')
        display_title = clean_name.replace('-', ' ').replace('_', ' ').upper()
        
        # --- 核心修改：生成 SEO 友好的静态路径 ---
        # 使用 quote 处理文件名中的空格和特殊字符
        encoded_name = urllib.parse.quote(clean_name)
        static_url = f"{BASE_URL}/{ROUTE_PREFIX}/{encoded_name}"
        
        # 构建 list.json 需要的对象（包含时间戳）
        posts_data.append({
            "fileName": file_name,
            "title": display_title,
            "url": f"/{ROUTE_PREFIX}/{encoded_name}",  # 前端跳转路径
            "date": date_str,
            "time": time_str,  # 精确到秒
            "timestamp": timestamp  # Unix时间戳，用于排序
        })
        
        # 添加到 Sitemap
        sitemap_content.append('  <url>')
        sitemap_content.append(f'    <loc>{static_url}</loc>')
        sitemap_content.append(f'    <lastmod>{date_str}</lastmod>')
        sitemap_content.append('    <priority>0.8</priority>')
        sitemap_content.append('  </url>')

    # 6. 写入文件
    # 更新 list.json
    with open(LIST_FILE, "w", encoding="utf-8") as f:
        json.dump(posts_data, f, indent=4, ensure_ascii=False)
    print(f"[+] 成功更新前端索引: {len(posts_data)} 篇文章")
    print(f"[+] 文章已按修改时间降���排列")

    # 更新 sitemap.xml
    sitemap_content.append('</urlset>')
    with open(SITEMAP_FILE, "w", encoding="utf-8") as f:
        f.write('\n'.join(sitemap_content))
    print(f"[+] 成功更新站点地图: {SITEMAP_FILE}")

    # 7. 自动生成 robots.txt
    with open(ROBOTS_FILE, "w", encoding="utf-8") as f:
        f.write("User-agent: *\n")
        f.write("Allow: /\n")
        f.write(f"Sitemap: {BASE_URL}/{SITEMAP_FILE}\n")
    print(f"[+] 成功生成 robots.txt")

if __name__ == "__main__":
    generate_site_assets()
