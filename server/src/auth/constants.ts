/*
我们将使用它在 JWT 签名和验证步骤之间共享密钥。

不要公开此密钥。我们在这里这样做是为了清楚地说明代码在做什么，
但是在生产系统中，您必须使用适当的措施来保护这个密钥，
比如机密库、环境变量或配置服务。
*/
export const jwtConstants = {
  secret: 'secretKey',
};