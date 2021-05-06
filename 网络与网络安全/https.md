# HTTPS

### **1. HTTP 协议未解决的事**

- 通信内容未加密

- 无法校验通信双方身份

- 无法知道通信内容是否被篡改

http 协议最初设计的目的是用于解决文本传输问题，为通信双方提供一个标准，但并未考虑安全问题。[TCP/IP 协议因为工作方式问题是会被窃听的](./TCP-IP协议.md)，因此如何保证通信内容的安全是商业应用的重点工作。

### **2. HTTPS 是什么**

HTTPS 并不是一种新的协议。它是 HTTP 协议与 SSL 协议（SecureSocket Layer， 新版叫 TLS - Transport Layer Security）的结合。

通常，HTTP 直接和 TCP 通信。当使用 SSL 时，则演变成先和 SSL 通信，再由 SSL 和 TCP 通信了。简言之，所谓 HTTPS，其实就是身披 SSL 协议这层外壳的 HTTP。

在采用 SSL 后，HTTP 就拥有了 HTTPS 的加密、证书和完整性保护这些功能。

SSL 是独立于 HTTP 的协议，所以不光是 HTTP 协议，其他运行在应用层的 SMTP 和 Telnet 等协议均可配合 SSL 协议使用。可以说 SSL 是当今世界上应用最为广泛的网络安全技术。

> #### **TSL 与 SSL**
>
> HTTPS 使用 SSL（Secure Socket Layer）和 TLS（Transport Layer Security）这两个协议。
>
> SSL 技术最初是由浏览器开发商网景通信公司率先倡导的，开发过 SSL3.0 之前的版本。目前主导权已转移到 IETF（Internet Engineering Task Force,Internet 工程任务组）的手中。
>
> IETF 以 SSL3.0 为基准，后又制定了 TLS1.0、TLS1.1 和 TLS1.2。TSL 是以 SSL 为原型开发的协议，有时会统一称该协议为 SSL。当前主流的版本是 SSL3.0 和 TLS1.0。
>
> 由于 SSL1.0 协议在设计之初被发现出了问题，就没有实际投入使用。SSL2.0 也被发现存在问题，所以很多浏览器直接废除了该协议版本。

### **3. 原理**

1. **对称加密、非对称加密以及数字证书**

   具体见：[对称加密、非对称加密以及数字证书](./对称加密与非对称加密以及数字证书.md)

2. **HTTPS 如何保证报文安全**

   - 加密

     HTTPS 请求首先利用非对称加密来交换对称加密的密钥。当客户端发起请求后，服务器会把自己的用于非对称加密的公钥发送给客户端，随后双方使用非对称加密来交换对称加密的密钥。后续的数据则通过对称加密密钥加密传输。_这样既解决了非对称加密速度慢的问题，又解决了对称加密密钥分发不安全的问题，通过对称密钥对 http 报文进行加密则解决了 http 无法加密的问题。_

   - 校验身份

     上述过程看似完美，但是非对称加密公钥的安全性却无法保证，毕竟传输公钥时使用的是普通的 http 协议，这个公钥可能会在传输的过程中被修改或替换掉。所以就要一种方法来证明这个公钥的身份———**数字证书**。数字证书是一种类似于介绍信的存在（非常敷衍的类比），公钥在传输的同时需要携带这个证明自己身份的证书，客户端接受到后只要校验证书即可判断公钥身份。

   - 保证报文完整

     当通信正式开始后，应用层发送数据时会附加一种叫做 MAC（MessageAuthentication Code）的报文摘要。MAC 能够查知报文是否遭到篡改，从而保护报文的完整性。

### **4. SSL 工作过程**

1.  **client_hello** （明文传输）

    _客户端说：我要开始加密通信，我支持的功能有这些，你选一下你也支持的，然后告诉我吧！_

    客户端发送请求，包含随机数（Random_C）、加密套件候选列表、压缩方式候选列表、SSL 版本候选列表等:

    - > 支持的最高 TSL 协议版本 version，从低到高依次 SSLv2 SSLv3 TLSv1 TLSv1.1 TLSv1.2，当前基本不再使用低于 TLSv1 的版本；

    - > 加密套件为四个功能的组合：认证算法 Au (身份验证)、密钥交换算法 KeyExchange(密钥协商)、对称加密算法 Enc (信息加密)和信息摘要 Mac(完整性校验)；

    - 随机数后面用于生成密钥；

    - 压缩方式后面用于通信时对信息进行压缩。

2.  **sever_hello + server_certificate + sever_hello_done**

    _服务端说：我选这个，这个，还有那个，另外这是我的身份证和我的公钥以及一些其他信息。_

    1.  server_hello, 服务端返回协商的信息结果，包括选择使用的协议版本、选择的加密套件、选择的压缩算法、随机数（Random_S） 等，其中随机数后续用于的生成协商密钥；

        > 如果服务器不支持某些功能，则服务器终止加密连接，降级至普通连接

    2.  server_certificates, 服务器端配置对应的证书链，用于身份验证与密钥交换；

    3.  server_hello_done，通知客户端 server_hello 信息发送结束。

3.  **证书校验 + client_key_exchange + change_cipher_spec + encrypted_handshake_message**

    _客户端说：好的，不过我要先验证一下你的身份…………emmm，没问题，确实是你。那我们后面就用这个加密方式来通信吧！_

    1. 证书校验 + client_key_exchange，客户端首先校验证书确定服务端身份，随后会生成一个随机数（Pre-master），并使用服务端的公钥对数据进行加密，发送给服务端；

    2. 此时，客户端已经拥有全部用于计算协商密钥的信息：随机数（Random_C）、随机数（Random_S）、随机数（Pre-master），然后计算出协商密钥；

       > 单个程序生成的随机数其实是伪随机数，由于是按照公式计算的，当数量到一定程度后就会呈现规律性，达不到真正的随机效果，但是三个程序的随机数基本可以做到真正的随机效果。真正的随机效果能够保证基于这个随机数生成的密钥足够安全。

    3. change_cipher_spec， 客户端通知服务器后续的通信都采用协商的通信密钥和加密算法进行加密通信;

    4. encrypted_handshake_message， 结合之前所有通信参数的 hash 值与其它相关信息生成一段数据，采用协商密钥与算法进行加密，然后发送给服务器用于数据与握手验证;

4.  **change_cipher_spec + encrypted_handshake_message**

    服务端接收到客户端的握手结束的消息后，也需要返回消息告诉客户端我已接收到你的确认消息，我们就按照之前协商的方式进行通信吧。

    1. 服务器用私钥解密加密的 Pre-master 数据，基于之前交换的两个明文随机数 random_C 和 random_S，计算得到协商密钥:enc_key=Fuc(random_C, random_S, Pre-Master);

    2. 计算之前所有接收信息的 hash 值，然后解密客户端发送的 encrypted_handshake_message，验证数据和密钥正确性;

    3. change_cipher_spec, 验证通过之后，服务器同样发送 change_cipher_spec 以告知客户端后续的通信都采用协商的密钥与算法进行加密通信;

    4. encrypted_handshake_message, 服务器也结合所有当前的通信参数信息生成一段数据并采用协商密钥 session secret 与算法加密并发送到客户端;

5.  **shake hand end**

    客户端计算所有接收信息的 hash 值，并采用协商密钥解密 encrypted_handshake_message，验证服务器发送的数据和密钥，验证通过则握手完成;

参考：

- [HTTPS 加密协议详解](https://www.wosign.com/FAQ/faq2016-0309-01.htm)

- [HTTPS 加密协议详解(四)：TLS/SSL 握手过程](https://www.wosign.com/FAQ/faq2016-0309-04.htm)
