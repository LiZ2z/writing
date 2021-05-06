# File system

nodejs的`fs`模块以 _**标准POSIX函数**_ 的形式提供了与file system交互的能力。


### **POSIX系统的file system**

> 在POSIX系统上，对于每个进程，内核都会维护一个当前打开的文件和资源的表。 每个打开的文件都分配有一个简单的数字标识符，称为文件描述符。 在系统级别，所有文件系统操作都使用这些文件描述符来标识和跟踪每个特定文件。 Windows系统使用不同但概念上类似的机制来跟踪资源。 为了简化用户操作，Node.js提取了操作系统之间的特定差异，并为所有打开的文件分配了数字文件描述符。
>
> `open（）`方法用于分配新的文件描述符(file descriptor，简称`fd`)。 一旦分配，文件描述符可用于从文件读取(`read()`)数据，向文件写入数据(`write()`)或请求有关文件(`fstat()`)的信息。
>
> 大多数操作系统都会限制可以在任何给定时间打开的文件描述符的数量，因此在操作完成后关闭描述符至关重要。 否则，将导致内存泄漏，最终导致应用程序崩溃。

更多，见： [file descriptor](https://nodejs.org/dist/latest-v14.x/docs/api/fs.html#fs_file_descriptors)

[todo，优化下下面👇的文字]

不管是读（read）文件还是写（write）文件，前提都是打开（open）文件。open会返回一个文件描述符（fd），read或者write都将利用这个fd进行后续操作。fd由系统内核维护在一张表中，大多数操作系统会限制在给定时间内打开的文件描述符的数量，以防止占用过多内存。所以当自己的操作完成，应该调用`close()`关掉这个文件。当给定时间内打开的文件描述符过多，会导致应用程序崩溃、闪退等情况，这个时候继续打开文件一般会得到操作系统的报错信息。

### **线程池**

除`fs.FSWatcher()`和显式同步的文件系统API外，所有文件系统API均使用`libuv`的线程池，这对于某些应用程序可能具有令人惊讶的负面性能影响。 有关更多信息，请参见[UV_THREADPOOL_SIZE](https://nodejs.org/dist/latest-v14.x/docs/api/cli.html#cli_uv_threadpool_size_size)文档。

### 文件系统的权限
。。。

### **检测文件是否存在**

在fs.open, fs.write, fs.read 之前检测文件是否存在是不推荐的，因为在这两个操作过程之间可能有其他的进程会修改当前文件状态。正确的做法是直接操作，如果出现错误再处理错误。

### **fs.open**

open的时候可以通过设置对应的flag，在文件不存在时，自动创建。见：[file system flags](https://nodejs.org/dist/latest-v14.x/docs/api/fs.html#fs_file_system_flags)

### **fs.stat 获取文件信息**

### **fs.read**

### **fs.write**


### **fs.opendir 打开文件夹并获取文件夹信息**



