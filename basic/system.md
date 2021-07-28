# 操作系统 

## Linux常用命令

### ls
命令名称：ls
命令英文原意：list
命令所在路径：/bin/ls
执行权限：所有用户

`功能描述：显示目录文件`

ls (显示当前目录下文件)

ls 目录名 (显示指定目录下文件)
### cd
命令名称：cd
命令英文原意：change directory
命令所在路径：shell内置命令
执行权限：所有用户

`功能描述：切换所在目录`

cd ~ 进入当前用户的家目录

cd - 进入上次目录

cd .. 进入上一级目录

cd . 进入当前目录

相对路径：cd ../Users/local 参照当前所在目录，进行查找。一定要先确定当前所在目录。
绝对路径：cd /Users/local 从根目录开始指定，一级一级递归查找。在任何目录下，都能进入指定位置。

### pwd
命令名称：pwd
命令英文原意：print working directory
命令所在路径：/bin/pwd
执行权限：所有用户

`功能描述：显示当前所在目录(当前工作目录)`

### mkdir
命令名称：mkdir
命令英文原意：make directories
命令所在路径：/bin/mkdir
执行权限：所有用户

`功能描述：建立目录`

mkdir test 创建名为test的目录

mkdir -p test1/test2/test3   递归创建

### rmdir
命令名称：rmdir
命令英文原意：remove empty directories
命令所在路径：/bin/rmdir
执行权限：所有用户

`功能描述：删除目录  (只能删除空目录)`

### touch

命令名称：touch
命令所在路径：/bin/touch
执行权限：所有用户

`功能描述：创建空文件 或 修改文件时间`

touch test.py 创建空文件，如果文件存在，则修改文件创建时间

### rm
命令名称：rm
命令英文原意：remove
命令所在路径：/bin/rm
执行权限：所有用户

`功能描述：删除`

rm 文件名 删除文件

rm -r 目录名 递归删除文件和目录

rm -f 文件名 强制删除

rm -rf 目录名 强制删除目录和文件

### cat

命令名称：cat
命令所在路径：/bin/cat
执行权限：所有用户

`功能描述：查看文件内容，从头到尾的内容。`

cat 文件名 查看文件内容

cat -n 文件名   查看文件内容，并列出行号

## 网络命令
### ping

命令名称：ping
命令所在路径：/bin/ping
执行权限：所有用户

`功能描述：测试网络畅通性`

ping -c 次数 ip 探测网络通畅

### ifconfig
命令名称：ifconfig
命令英文原意：interface configure
命令所在路径：/sbin/ifconfig
执行权限：root

`功能描述：查询本机网络信息`

### 其他命令
ctrl + c 强制终止查看模式

ctrl + l 清屏