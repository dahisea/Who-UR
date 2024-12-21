addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  // 获取请求参数
  const urlSearchParams = new URL(request.url).searchParams;
  const queryParams = {};
  urlSearchParams.forEach((value, key) => {
    queryParams[key] = value;
  });

  // 获取所有头部
  const headers = {};
  request.headers.forEach((value, key) => {
    headers[key] = value;
  });

  // 获取IP地址
  const ip = request.headers.get('CF-Connecting-IP');

  // 获取UTC时间
  const now = new Date();
  const utcTime = now.toUTCString();

  // 解析用户代理（user-agent）头部
  const userAgent = headers['user-agent'];
  const userAgentInfo = parseUserAgent(userAgent);

  // 解析accept-language头部
  const acceptLanguage = headers['accept-language'];

  // 解析国家/地区
  const country = headers['cf-ipcountry'];

  // 解析操作系统平台
  const platform = headers['sec-ch-ua-platform'];

  // 解析用户来源
  let referer = headers['referer'];
  if (!referer) {
    referer = 'Direct'; // 如果没有Referer头部，则将用户来源标记为直接访问
  }

  // 构建响应
  const responseBody = {
    queryParams: queryParams,
    headers: headers,
    ip: ip,
    utcTime: utcTime,
    userAgentInfo: userAgentInfo,
    acceptLanguage: acceptLanguage,
    country: country,
    platform: platform,
    referer: referer
  };

  // 返回响应
  return new Response(JSON.stringify(responseBody, null, 2), {
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

// 解析用户代理（user-agent）头部
function parseUserAgent(userAgent) {
  // 实现自定义解析逻辑以获取用户代理信息
  // 在这里，您可以使用自己的逻辑来解析用户代理字符串，并返回所需的信息
  return {
    userAgent: userAgent // 这里简单地返回了用户代理字符串
  };
}

