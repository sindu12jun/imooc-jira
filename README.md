# 用 Custom Hook 提取并重用代码

React 团队从一开始就很注重 React 代码的复用性，他们对 React 代码复用性的解决方案历经了
这几个阶段：

```
Mixin -> HOC -> Render Prop -> Custom Hook
```

**Custom Hook 是其中最新也是最优秀的方案 ✅**

我们已经认识过了 `useState` 和 `useEffect` 两个最基本的 React 自带 Hook，
本节我们将会 写出 `useMount` 和 `useDebounce` 两个 Custom Hook，体会它是怎么像函数一样提取组件逻辑的

最后会给大家设置一个思考题 🤔
