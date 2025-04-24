// 球类基类
class Ball {
  constructor(name, size, weight, material) {
    this.name = name;
    this.size = size;
    this.weight = weight;
    this.material = material;
  }

  getInfo() {
    return {
      name: this.name,
      size: this.size,
      weight: this.weight,
      material: this.material,
    };
  }
}

// 具体球类
class Football extends Ball {
  constructor() {
    super('足球', '直径22厘米', '450克', '皮革/合成材料');
  }
}

class Basketball extends Ball {
  constructor() {
    super('篮球', '直径24.6厘米', '600克', '橡胶/合成材料');
  }
}

class Badminton extends Ball {
  constructor() {
    super('羽毛球', '直径6.5厘米', '5克', '羽毛/软木');
  }
}

class Rugby extends Ball {
  constructor() {
    super('橄榄球', '长轴30厘米', '450克', '皮革');
  }
}

// 球类工厂
class BallFactory {
  createBall(type) {
    switch (type) {
      case 'football':
        return new Football();
      case 'basketball':
        return new Basketball();
      case 'badminton':
        return new Badminton();
      case 'rugby':
        return new Rugby();
      default:
        throw new Error('未知的球类类型');
    }
  }
}

// 图片资源
const ballImages = {
  football: './imgs/football.png',
  basketball: './imgs/basketball.png',
  badminton: './imgs/badminton.png',
  rugby: './imgs/rugby.png',
};

// 创建工厂实例
const ballFactory = new BallFactory();

// DOM 元素
const ballButtons = document.querySelectorAll('.ball-btn');
const ballDetails = document.getElementById('ballDetails');
const ballImage = document.getElementById('ballImage');

// 为每个按钮添加点击事件
ballButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const ballType = button.dataset.type;
    const ball = ballFactory.createBall(ballType);
    const info = ball.getInfo();

    // 更新球的信息
    ballDetails.innerHTML = `
            <p><strong>名称：</strong>${info.name}</p>
            <p><strong>尺寸：</strong>${info.size}</p>
            <p><strong>重量：</strong>${info.weight}</p>
            <p><strong>材料：</strong>${info.material}</p>
        `;

    // 更新球的图片
    ballImage.innerHTML = `<img src="${ballImages[ballType]}" alt="${info.name}">`;
  });
});
