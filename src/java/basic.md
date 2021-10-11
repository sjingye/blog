# 基本语法

1.Java 自加运算符，j++ 和 ++j 的区别

问题：为什么是 `++j`

```java
class Solution {
    public int[] twoSum(int[] nums, int target) {
        int n = nums.length;
        for (int i = 0; i < n; ++i) {
            for (int j = i + 1; j < n; ++j) {
                if (nums[i] + nums[j] == target) {
                    return new int[]{i, j};
                }
            }
        }
        return new int[0];
    }
}

```

[参考资料](https://www.zhihu.com/question/19669308)
