// 角色原型类
class Character {
    constructor(type, health, attack, defense) {
        this.type = type;
        this.health = health;
        this.attack = attack;
        this.defense = defense;
    }

    // 克隆方法 - 原型模式的核心
    clone() {
        return new Character(this.type, this.health, this.attack, this.defense);
    }

    // 自定义角色属性
    customize(name, level) {
        const clone = this.clone();
        clone.name = name;
        clone.level = level;
        
        // 根据等级调整属性
        const multiplier = 1 + (level - 1) * 0.1;
        clone.health = Math.round(clone.health * multiplier);
        clone.attack = Math.round(clone.attack * multiplier);
        clone.defense = Math.round(clone.defense * multiplier);
        
        return clone;
    }
}

// 角色原型注册表
const characterPrototypes = {
    warrior: new Character('warrior', 150, 30, 40),
    mage: new Character('mage', 100, 50, 20),
    archer: new Character('archer', 120, 40, 25)
};

// DOM 元素
const characterCards = document.querySelectorAll('.character-card');
const createButton = document.getElementById('createCharacter');
const nameInput = document.getElementById('characterName');
const levelInput = document.getElementById('characterLevel');
const characterList = document.getElementById('characterList');

let selectedPrototype = null;

// 事件处理
characterCards.forEach(card => {
    card.addEventListener('click', () => {
        // 移除其他卡片的选中状态
        characterCards.forEach(c => c.classList.remove('selected'));
        // 添加当前卡片的选中状态
        card.classList.add('selected');
        // 获取选中的原型
        selectedPrototype = characterPrototypes[card.dataset.type];
        // 启用创建按钮
        updateCreateButtonState();
    });
});

// 输入验证
nameInput.addEventListener('input', updateCreateButtonState);
levelInput.addEventListener('input', updateCreateButtonState);

function updateCreateButtonState() {
    const nameValid = nameInput.value.trim().length > 0;
    const levelValid = levelInput.value >= 1 && levelInput.value <= 100;
    createButton.disabled = !selectedPrototype || !nameValid || !levelValid;
}

// 创建角色
createButton.addEventListener('click', () => {
    const name = nameInput.value.trim();
    const level = parseInt(levelInput.value);
    
    // 使用原型创建新角色
    const newCharacter = selectedPrototype.customize(name, level);
    
    // 创建角色卡片
    const characterCard = document.createElement('div');
    characterCard.className = 'created-character';
    characterCard.innerHTML = `
        <h3>${newCharacter.name}</h3>
        <div class="info">
            <p>类型: ${getCharacterTypeName(newCharacter.type)}</p>
            <p>等级: ${newCharacter.level}</p>
            <p>生命值: ${newCharacter.health}</p>
            <p>攻击力: ${newCharacter.attack}</p>
            <p>防御力: ${newCharacter.defense}</p>
        </div>
    `;
    
    // 添加到列表
    characterList.insertBefore(characterCard, characterList.firstChild);
    
    // 重置表单
    nameInput.value = '';
    levelInput.value = '1';
    characterCards.forEach(card => card.classList.remove('selected'));
    selectedPrototype = null;
    updateCreateButtonState();
    
    // 添加动画效果
    characterCard.style.animation = 'fadeIn 0.5s ease-out';
});

// 辅助函数：获取角色类型的中文名称
function getCharacterTypeName(type) {
    const typeNames = {
        warrior: '战士',
        mage: '法师',
        archer: '弓箭手'
    };
    return typeNames[type] || type;
}

// 添加动画样式
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style); 