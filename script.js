document.addEventListener('DOMContentLoaded', () => {
    // 1. 网页标题动画
    const fullTitle = "<<未来至上>>";
    let titleIdx = 0, isDel = false;
    function animateTitle() {
        document.title = isDel ? fullTitle.substring(0, titleIdx) : fullTitle.substring(0, titleIdx + 1);
        let speed = isDel ? 60 : 130;
        if (!isDel && titleIdx === fullTitle.length) { speed = 2000; isDel = true; }
        else if (isDel && titleIdx === 0) { isDel = false; }
        titleIdx = isDel ? titleIdx - 1 : titleIdx + 1;
        setTimeout(animateTitle, speed);
    }
    animateTitle();

    // 2. 导航栏交互
    window.addEventListener('scroll', () => {
        const nav = document.getElementById('main-nav');
        nav.classList.toggle('scrolled', window.scrollY > 50);
    });

    // 3. GitHub 文章抓取
    async function fetchPosts() {
        const GITHUB_USER = '194268', REPO_NAME = 'SYC';
        const container = document.getElementById('article-list');
        try {
            const res = await fetch(`https://api.github.com/repos/${GITHUB_USER}/${REPO_NAME}/contents/posts`);
            const files = await res.json();
            container.innerHTML = '';
            files.filter(f => f.name.endsWith('.md')).forEach((file, i) => {
                const title = file.name.replace('.md', '').replace(/-/g, ' ').toUpperCase();
                const card = document.createElement('a');
                card.className = 'post-card';
                card.href = `article.html?post=${file.name}`;
                card.style.animationDelay = `${i * 0.1}s`;
                card.innerHTML = `
                    <div class="card-tag">// NODE_0${i+1}</div>
                    <h2>${title}</h2>
                    <div class="line-divider"></div>
                    <div class="enter-link-btn">DECODE_DOCUMENT -></div>
                `;
                container.appendChild(card);
            });
        } catch (e) {
            container.innerHTML = '<div class="loading">ERROR: ACCESS_DENIED</div>';
        }
    }
    fetchPosts();

    // 4. Canvas 流体背景与鼠标流星
    const canvas = document.getElementById('hero-canvas');
    const ctx = canvas.getContext('2d');
    let trail = [], fluidNodes = [];
    const mouse = { x: -500, y: -500 };

    window.onresize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        fluidNodes = Array.from({length: 3}, () => new FluidNode());
    };

    window.onmousemove = (e) => {
        mouse.x = e.clientX; mouse.y = e.clientY;
        for(let i=0; i<2; i++) trail.push(new Particle(mouse.x, mouse.y));
    };

    class FluidNode {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.4;
            this.vy = (Math.random() - 0.5) * 0.4;
            this.size = Math.random() * (canvas.width * 0.4) + canvas.width * 0.3;
        }
        update() {
            this.x += this.vx; this.y += this.vy;
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }
    }

    class Particle {
        constructor(x, y) {
            this.x = x; this.y = y;
            this.vx = (Math.random() - 0.5) * 1.5;
            this.vy = (Math.random() - 0.5) * 1.5;
            this.life = 1.0;
            this.decay = 0.012 + Math.random() * 0.02;
            this.size = Math.random() * 2 + 0.5;
        }
        update() { this.x += this.vx; this.y += this.vy; this.life -= this.decay; }
        draw() {
            ctx.fillStyle = `rgba(255, 255, 255, ${this.life * 0.3})`;
            ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI*2); ctx.fill();
        }
    }

    window.onresize();

    function animate() {
        // 清除时保留微量残影，制造动态模糊感
        ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // 绘制背景流体光幕
        ctx.globalCompositeOperation = "lighter";
        fluidNodes.forEach(node => {
            node.update();
            const g = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.size);
            g.addColorStop(0, "rgba(25, 25, 25, 0.3)");
            g.addColorStop(1, "transparent");
            ctx.fillStyle = g;
            ctx.beginPath(); ctx.arc(node.x, node.y, node.size, 0, Math.PI*2); ctx.fill();
        });

        // 绘制鼠标流星
        ctx.globalCompositeOperation = "source-over";
        const mG = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 150);
        mG.addColorStop(0, "rgba(255,255,255,0.05)");
        mG.addColorStop(1, "transparent");
        ctx.fillStyle = mG;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        trail.forEach((p, i) => {
            p.update(); p.draw();
            if(p.life <= 0) trail.splice(i, 1);
        });

        requestAnimationFrame(animate);
    }
    animate();
});
