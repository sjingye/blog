# 基础语法

**1.for of 用法**
```javascript
const a = [1, 2, 3];
for (let i in a) {
  console.log(a[i]);
}

for (let i of a) {
  console.log(i);
}
```
for in ：遍历key
for of ：遍历value