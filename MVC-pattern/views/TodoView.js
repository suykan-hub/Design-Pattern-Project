class TodoView {
    constructor() {
        // 根元素
        this.app = document.getElementById('root');

        // 表单元素
        this.form = this.createElement('form');
        this.input = this.createElement('input');
        this.input.type = 'text';
        this.input.placeholder = '添加待办事项...';
        this.input.name = 'todo';

        // 提交按钮
        this.submitButton = this.createElement('button');
        this.submitButton.textContent = '添加';

        // 待办事项列表
        this.todoList = this.createElement('ul', 'todo-list');

        // 将输入框和按钮添加到表单
        this.form.append(this.input, this.submitButton);

        // 将表单和待办事项列表添加到根元素
        this.app.append(this.form, this.todoList);

        // 编辑模式的临时状态
        this._temporaryTodoText = '';
        this._initLocalListeners();
    }

    // 获取输入框的值
    get _todoText() {
        return this.input.value;
    }

    // 清空输入框
    _resetInput() {
        this.input.value = '';
    }

    // 创建元素的辅助方法
    createElement(tag, className) {
        const element = document.createElement(tag);
        if (className) element.classList.add(className);
        return element;
    }

    // 显示待办事项
    displayTodos(todos) {
        // 删除所有节点
        while (this.todoList.firstChild) {
            this.todoList.removeChild(this.todoList.firstChild);
        }

        // 显示默认信息
        if (todos.length === 0) {
            const p = this.createElement('p');
            p.textContent = '没有待办事项！添加一个？';
            this.todoList.append(p);
        } else {
            // 创建待办事项节点
            todos.forEach(todo => {
                const li = this.createElement('li');
                li.id = todo.id;

                // 复选框
                const checkbox = this.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.checked = todo.complete;

                // 待办事项文本
                const span = this.createElement('span');
                span.contentEditable = true;
                span.classList.add('editable');
                span.textContent = todo.text;

                // 删除按钮
                const deleteButton = this.createElement('button', 'delete');
                deleteButton.textContent = '删除';

                // 如果待办事项已完成，添加相应的样式
                if (todo.complete) {
                    const strike = this.createElement('s');
                    strike.textContent = todo.text;
                    span.textContent = '';
                    span.append(strike);
                }

                li.append(checkbox, span, deleteButton);
                this.todoList.append(li);
            });
        }
    }

    // 初始化本地监听器
    _initLocalListeners() {
        this.todoList.addEventListener('input', event => {
            if (event.target.className === 'editable') {
                this._temporaryTodoText = event.target.textContent;
            }
        });
    }

    // 绑定事件处理函数
    bindAddTodo(handler) {
        this.form.addEventListener('submit', event => {
            event.preventDefault();
            if (this._todoText) {
                handler(this._todoText);
                this._resetInput();
            }
        });
    }

    bindDeleteTodo(handler) {
        this.todoList.addEventListener('click', event => {
            if (event.target.className === 'delete') {
                const id = parseInt(event.target.parentElement.id);
                handler(id);
            }
        });
    }

    bindEditTodo(handler) {
        this.todoList.addEventListener('focusout', event => {
            if (this._temporaryTodoText) {
                const id = parseInt(event.target.parentElement.id);
                handler(id, this._temporaryTodoText);
                this._temporaryTodoText = '';
            }
        });
    }

    bindToggleTodo(handler) {
        this.todoList.addEventListener('change', event => {
            if (event.target.type === 'checkbox') {
                const id = parseInt(event.target.parentElement.id);
                handler(id);
            }
        });
    }
}

export default TodoView; 