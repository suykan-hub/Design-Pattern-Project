// 定义图片接口，作为所有图片相关类的基类
class ImageInterface {
    // 定义display方法，子类必须实现此方法
    display() {
        throw new Error('Method display() must be implemented');
    }
}

// 真实图片类，实现实际的图片加载逻辑
class RealImage extends ImageInterface {
    // 构造函数，初始化图片对象
    constructor(url) {
        super(); // 调用父类构造函数
        this.url = url; // 存储图片URL
        this.image = new Image(); // 创建新的Image对象
        this.loaded = false; // 初始化加载状态为false
        this.failed = false; // 初始化失败状态为false
    }

    // 实现display方法，返回图片元素
    display() {
        // 如果图片未加载且未失败，则加载图片
        if (!this.loaded && !this.failed) {
            this.loadImage();
        }
        return this.image; // 返回图片元素
    }

    // 加载图片的方法
    loadImage() {
        // 返回Promise以处理异步加载
        return new Promise((resolve, reject) => {
            // 图片加载成功的处理
            this.image.onload = () => {
                this.loaded = true; // 设置加载状态为true
                this.image.classList.add('loaded'); // 添加loaded类用于样式控制
                updateStats('loaded'); // 更新加载统计
                resolve(); // 解析Promise
            };

            // 图片加载失败的处理
            this.image.onerror = () => {
                this.failed = true; // 设置失败状态为true
                updateStats('failed'); // 更新失败统计
                reject(new Error(`Failed to load image: ${this.url}`)); // 拒绝Promise并返回错误
            };

            this.image.src = this.url; // 设置图片源，触发加载
        });
    }
}

// 代理图片类，控制对真实图片的访问
class ProxyImage extends ImageInterface {
    // 构造函数，初始化代理对象
    constructor(url) {
        super(); // 调用父类构造函数
        this.url = url; // 存储图片URL
        this.realImage = null; // 初始化真实图片对象为null
        this.observer = null; // 初始化观察者对象为null
    }

    // 实现display方法
    display() {
        // 如果真实图片对象不存在，则创建并设置观察者
        if (!this.realImage) {
            this.realImage = new RealImage(this.url); // 创建真实图片对象
            this.setupIntersectionObserver(); // 设置交叉观察者
        }
        return this.realImage.display(); // 返回真实图片的display结果
    }

    // 设置交叉观察者，用于监测图片可见性
    setupIntersectionObserver() {
        // 创建新的交叉观察者
        this.observer = new IntersectionObserver((entries) => {
            // 遍历所有观察的条目
            entries.forEach(entry => {
                // 如果图片进入视口
                if (entry.isIntersecting) {
                    this.realImage.display(); // 显示图片
                    this.observer.disconnect(); // 断开观察者连接
                }
            });
        }, {
            root: null, // 使用视口作为根元素
            rootMargin: '50px', // 设置50px的边距
            threshold: 0.1 // 设置10%的可见度阈值
        });

        // 查找对应的容器元素
        const container = document.querySelector(`[data-url="${this.url}"]`);
        // 如果找到容器，则开始观察
        if (container) {
            this.observer.observe(container);
        }
    }
}

// 统计对象，用于跟踪图片加载状态
const stats = {
    loaded: 0, // 已加载图片计数
    failed: 0, // 加载失败图片计数
    cached: 0  // 已缓存图片计数
};

// 更新统计信息的函数
function updateStats(type) {
    stats[type]++; // 增加对应类型的计数
    document.getElementById(`${type}-count`).textContent = stats[type]; // 更新DOM显示
}

// 初始化演示的函数
function initializeDemo() {
    const imageGrid = document.getElementById('image-grid'); // 获取图片网格容器
    // 定义示例图片URL数组
    const imageUrls = [
        'https://picsum.photos/800/600?random=1',
        'https://picsum.photos/800/600?random=2',
        'https://picsum.photos/800/600?random=3',
        'https://picsum.photos/800/600?random=4',
        'https://picsum.photos/800/600?random=5',
        'https://picsum.photos/800/600?random=6',
        'https://picsum.photos/800/600?random=7',
        'https://picsum.photos/800/600?random=8',
        'https://picsum.photos/800/600?random=9',
        'https://picsum.photos/800/600?random=10',
        'https://picsum.photos/800/600?random=11',
        'https://picsum.photos/800/600?random=12'
    ];

    // 遍历所有图片URL
    imageUrls.forEach(url => {
        // 创建图片容器
        const container = document.createElement('div');
        container.className = 'image-container';
        container.setAttribute('data-url', url);

        // 创建占位符元素
        const placeholder = document.createElement('div');
        placeholder.className = 'placeholder';
        placeholder.textContent = 'Loading...';
        container.appendChild(placeholder);

        // 创建代理图片对象并显示
        const proxyImage = new ProxyImage(url);
        const img = proxyImage.display();
        container.appendChild(img);

        // 将容器添加到网格中
        imageGrid.appendChild(container);
    });
}

// 当页面加载完成时初始化演示
document.addEventListener('DOMContentLoaded', initializeDemo); 