import os
import json
from datetime import datetime
import re

def generate_site_assets():
    # --- 配置区 ---
    POSTS_DIR = "posts"
    BASE_URL = "https://syc-sigma.vercel.app"
    LIST_FILE = "list.json"
    SITEMAP_FILE = "sitemap.xml"
    ROBOTS_FILE = "robots.txt"

    # 1. 确保目录存在
    if not os.path.exists(POSTS_DIR):
        os.makedirs(POSTS_DIR)
        print(f"[*] 已创建目录: {POSTS_DIR}")

    # 2. 获取并排序所有 .md 文件
    files = [f for f in os.listdir(POSTS_DIR) if f.endswith('.md')]
    files.sort(reverse=True)

    # 3. 生成 list.json (保持原样供前端读取)
    with open(LIST_FILE, "w", encoding="utf-8") as f:
        json.dump(files, f, indent=4, ensure_ascii=False)
    print(f"[+] 成功更新前端索引: {len(files)} 篇文章")

    # 4. 生成 sitemap.xml
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

    for file_name in files:
        file_path = os.path.join(POSTS_DIR, file_name)
        
        # 获取文件真实的最后修改时间 (SEO 重要指标)
        mtime = os.path.getmtime(file_path)
        lastmod = datetime.fromtimestamp(mtime).strftime('%Y-%m-%d')
        
        # 提取摘要 (可选：用于未来扩展 Meta 标签)
        summary = ""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
                # 移除 Markdown 符号，只取前 150 字作为纯文本预览
                plain_text = re.sub(r'[#*`\-]', '', content).replace('\n', ' ').strip()
                summary = plain_text[:150] + "..."
        except:
            pass

        # --- 核心修改：使用静态路径 ---
        clean_name = file_name.replace('.md', '')
        static_url = f"{BASE_URL}/posts/{clean_name}"
        
        sitemap_content.append('  <url>')
        sitemap_content.append(f'    <loc>{static_url}</loc>')
        sitemap_content.append(f'    <lastmod>{lastmod}</lastmod>')
        sitemap_content.append('    <priority>0.8</priority>')
        sitemap_content.append('  </url>')

    sitemap_content.append('</urlset>')

    with open(SITEMAP_FILE, "w", encoding="utf-8") as f:
        f.write('\n'.join(sitemap_content))
    print(f"[+] 成功更新站点地图: {SITEMAP_FILE} (已应用静态路径)")

    # 5. 自动生成 robots.txt
    with open(ROBOTS_FILE, "w", encoding="utf-8") as f:
        f.write("User-agent: *\n")
        f.write("Allow: /\n")
        f.write(f"Sitemap: {BASE_URL}/{SITEMAP_FILE}\n")
    print(f"[+] 成功生成 robots.txt")

if __name__ == "__main__":
    generate_site_assets()
