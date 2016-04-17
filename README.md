# Tencentyun Store for Ghost

[ghost](https://github.com/dufemeng/Ghost)是一个很有名的前端cms管理系统，ghost-tencentyun主要功能是把ghost服务器的存储图片转移到腾讯云上存储，以缓解服务器的压力。

## 安装

- git

	为了替换存储模块，需要做以下几件事情：

	- 在/content下面新建一个文件夹/storage；

	- 把这个仓库里的文件克隆到/storage下面


	``` 
	cd [path/to/ghost]/content/storage

	git clone https://github.com/dufemeng/ghost-tencentyun
	```

	- 安装依赖包


	```
	cd ghost-tencentyun

	npm install
	```
	
- npm

	- 打开新建的那个/storage文件夹，然后：
	
	```
	npm install ghost-tencentyun --save
	```


## 配置


打开根目录下的config.js文件，选择你想要更改的环境，在里面添加一个新的参数`storage`。
    

```
storage : {
	active : 'ghost-tencentyun',
	'ghost-tencentyun' : {
		appId : 'your appId name',
		secretId : 'your secretId',
		sercetKey : 'your sercetKey',
		bucket : 'your bucket name'
	}    
```

## License

[LICENSE](LICENSE)

