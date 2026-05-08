import os
import json
import subprocess
from datetime import datetime
from zoneinfo import ZoneInfo
import urllib.parse


def get_first_git_timestamp(file_path):
    """
    获取某个文件第一次被 Git 提交的时间。

    返回：
        int: Unix timestamp
        None: 获取失败
    """
    try:
        result = subprocess.run(
            [
                "git",
                "log",
                "--follow",
                "--diff-filter=A",
                "--format=%ct",
                "--reverse",
                "--",
                file_path
            ],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True,
            check=False
        )

        output = result.stdout.strip()

        if output:
            first_line = output.splitlines()[0]
            return int(first_line)

    except Exception as e:
        print(f"[!] 获取 Git 首次提交时间失败: {file_path} - {e}")

    return None


def safe_load_time_cache(cache_file):
    """
    安全读取 .post_timestamps.json。
    如果文件不存在或损坏，返回空字典。
    """
    if not os.path.exists(cache_file):
        return {}

    try:
        with open(cache_file, "r", encoding="utf-8") as f:
            data = json.load(f)

        if isinstance(data, dict):
            return data

        print("[!] 时间戳缓存格式不是字典，已忽略")
        return {}

    except Exception as e:
        print(f"[!] 时间戳缓存读取失败: {e}")
        return {}


def generate_site_assets():
    POSTS_DIR = "posts"
    BASE_URL = "https://syc-sigma.vercel.app"
    LIST_FILE = "list.json"
    SITEMAP_FILE = "sitemap.xml"
    ROBOTS_FILE = "robots.txt"
    ROUTE_PREFIX = "p"
    TIME_CACHE_FILE = ".post_timestamps.json"

    # 这里控制 list.json 里显示的日期时间所属时区
    # 如果你主要面向国内用户，用 Asia/Shanghai
    # 如果你想用日本时间，可以改成 Asia/Tokyo
    TZ = ZoneInfo("Asia/Shanghai")

    if not os.path.exists(POSTS_DIR):
        os.makedirs(POSTS_DIR)
        print(f"[*] 已创建目录: {POSTS_DIR}")

    # 读取旧缓存
    time_cache = safe_load_time_cache(TIME_CACHE_FILE)

    if time_cache:
        print("[*] 已加载时间戳缓存")
    else:
        print("[*] 没有可用时间戳缓存，将尝试从 Git 历史生成")

    files_with_time = []
    current_files = set()

    for file_name in os.listdir(POSTS_DIR):
        if not file_name.endswith(".md"):
            continue

        current_files.add(file_name)

        file_path = os.path.join(POSTS_DIR, file_name)

        # 情况 1：缓存里已经有这个文件，直接使用缓存时间
        if file_name in time_cache:
            try:
                timestamp = int(time_cache[file_name])
                print(f"[*] 使用缓存时间: {file_name} -> {timestamp}")
            except Exception:
                print(f"[!] 缓存时间异常，重新获取: {file_name}")
                timestamp = None
        else:
            timestamp = None

        # 情况 2：缓存没有，尝试使用 Git 第一次提交时间
        if timestamp is None:
            git_timestamp = get_first_git_timestamp(file_path)

            if git_timestamp:
                timestamp = git_timestamp
                print(f"[+] 使用 Git 首次提交时间: {file_name} -> {timestamp}")
            else:
                # 情况 3：Git 也取不到，才使用当前时间兜底
                timestamp = int(datetime.now(TZ).timestamp())
                print(f"[+] 使用当前运行时间兜底: {file_name} -> {timestamp}")

            time_cache[file_name] = timestamp

        files_with_time.append((file_name, timestamp))

    # 删除已经不存在的 md 文件缓存，避免缓存越来越脏
    cleaned_time_cache = {
        name: int(ts)
        for name, ts in time_cache.items()
        if name in current_files
    }

    time_cache = cleaned_time_cache

    # 按首次上传时间降序排列
    files_with_time.sort(key=lambda x: x[1], reverse=True)

    posts_data = []

    now_str = datetime.now(TZ).strftime("%Y-%m-%d")

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
        dt = datetime.fromtimestamp(timestamp, TZ)

        date_str = dt.strftime("%Y-%m-%d")
        time_str = dt.strftime("%H:%M:%S")

        clean_name = file_name[:-3]

        display_title = clean_name.replace("-", " ").replace("_", " ").upper()

        encoded_name = urllib.parse.quote(clean_name)
        page_url = f"/{ROUTE_PREFIX}/{encoded_name}"
        static_url = f"{BASE_URL}{page_url}"

        posts_data.append({
            "fileName": file_name,
            "title": display_title,
            "url": page_url,
            "date": date_str,
            "time": time_str,
            "timestamp": timestamp
        })

        sitemap_content.append("  <url>")
        sitemap_content.append(f"    <loc>{static_url}</loc>")
        sitemap_content.append(f"    <lastmod>{date_str}</lastmod>")
        sitemap_content.append("    <priority>0.8</priority>")
        sitemap_content.append("  </url>")

    # 写入 list.json
    with open(LIST_FILE, "w", encoding="utf-8") as f:
        json.dump(posts_data, f, indent=4, ensure_ascii=False)

    print(f"[+] 成功更新前端索引: {len(posts_data)} 篇文章")

    # 写入 sitemap.xml
    sitemap_content.append("</urlset>")

    with open(SITEMAP_FILE, "w", encoding="utf-8") as f:
        f.write("\n".join(sitemap_content))

    print(f"[+] 成功更新站点地图: {SITEMAP_FILE}")

    # 写入 robots.txt
    with open(ROBOTS_FILE, "w", encoding="utf-8") as f:
        f.write("User-agent: *\n")
        f.write("Allow: /\n")
        f.write(f"Sitemap: {BASE_URL}/{SITEMAP_FILE}\n")

    print("[+] 成功生成 robots.txt")

    # 保存时间戳缓存
    with open(TIME_CACHE_FILE, "w", encoding="utf-8") as f:
        json.dump(time_cache, f, indent=4, ensure_ascii=False)

    print(f"[+] 已保存时间戳缓存到 {TIME_CACHE_FILE}")
    print("[+] 文章已按首次上传时间降序排列")


if __name__ == "__main__":
    generate_site_assets()
