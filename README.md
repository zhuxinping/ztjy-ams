# 新代理商后台管理

> A minimal vue admin template with Element UI & axios & permission control & eslint & mockjs

## Build Setup

``` bash
# szy-cli install
npm install -g szy-cli

# szy-cli create
szy create project-name

# install dependencies
npm install

# serve with hot reload at localhost:8586
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

####测试环境部署

> 由于后端已做CORS处理，所以这里不做代理的方式

首先安装nginx，nginx做如下配置：
```markdown
server {
    listen 80;
    servername localhost;
    #root为网站所在地址，放外层表示所有的地址都指向这个目录
    root /home/admin/ztjy-ams-web/dist;
    location / {
        try_files $uri $uri/ /index.html;
        index index.html index.htm;
    }
}
```

特别注意：如果是用root身份去创建的，需要把user root;这行原先注释的去掉注释

接下来直接拉取代码仓库，执行：
``` bash
npm run build
```

编译完毕浏览网站，可正常显示表示已建站成功


####正式环境部署：

正式环境部署与测试环境一致即可