class TodoModel {
    constructor() {
        // 从 localStorage 获取待办事项，如果没有则初始化为空数组
        this.todos = JSON.parse(localStorage.getItem('todos')) || [];
        this.onTodoListChanged = null;
    }

    // 绑定 todoListChanged 回调函数
    bindTodoListChanged(callback) {
        this.onTodoListChanged = callback;
    }

    // 提交更改到 localStorage
    _commit(todos) {
        this.todos = todos;
        localStorage.setItem('todos', JSON.stringify(todos));
        if (this.onTodoListChanged) {
            this.onTodoListChanged(todos);
        }
    }

    // 添加待办事项
    addTodo(todoText) {
        const todo = {
            id: Date.now(),
            text: todoText,
            complete: false,
            createdAt: new Date()
        };

        this._commit([...this.todos, todo]);
    }

    // 编辑待办事项
    editTodo(id, updatedText) {
        const todos = this.todos.map(todo =>
            todo.id === id ? { ...todo, text: updatedText } : todo
        );

        this._commit(todos);
    }

    // 删除待办事项
    deleteTodo(id) {
        const todos = this.todos.filter(todo => todo.id !== id);
        this._commit(todos);
    }

    // 切换待办事项完成状态
    toggleTodo(id) {
        const todos = this.todos.map(todo =>
            todo.id === id ? { ...todo, complete: !todo.complete } : todo
        );

        this._commit(todos);
    }
}

export default TodoModel; 