let gulp = require("gulp");

//引入服务器插件
let connect = require("gulp-connect");
//引入服务器代理插件
let proxy = require('http-proxy-middleware');

//引入合并、压缩、改名插件
let concat = require("gulp-concat");
let uglify = require("gulp-uglify");
let rename = require("gulp-rename");

//引入ES6转ES5的插件
let babel = require("gulp-babel");

//引入sass转css的插件
let sass = require("gulp-sass");

//开发版:正在开发的版本
//	在开发环境中写代码,自动转存到上线环境
//上线版:可以上传到服务器的版本
//	将上线环境开启服务器环境测试,在浏览器打开,自动刷新

//1.定义gulp指令:gulp.task(指令名,指令的功能)
gulp.task("qwe",()=>{
	console.log("hello gulp");
})

//2.gulp.src()找到指定文件
//	gulp.pipe()用于连缀执行下一个方法,管道方法
//	gulp.dest()转存到指定位置
// ]
gulp.task("zhuancun",()=>{
	gulp.src(["./project/**/*","!./project/sass/**"]).pipe(gulp.dest("server")).pipe(connect.reload())
})

//3.gulp.watch()监听方法，当某个文件发生改变时，执行指定的命令
gulp.task("jianting",()=>{
	gulp.watch(["./project/**/*"],["zhuancun"])
})

//开启服务器
gulp.task("fuwuqi",()=>{
	connect.server({
		root:"server",   //以哪个文件夹为服务器
        port:82,       //端口号
        livereload:true,  //是否可以自动刷新
        middleware: function(connect, opt) {
            return [
                proxy('/api',  {
                    // target: 'https://api.douban.com/v2',    //代理的目标地址
                    target: 'http://127.0.0.2:83',    //代理的目标地址
                    changeOrigin:true,
                    pathRewrite:{    //路径重写规则
                    '^/api':''
                    }
                })
            ]
        }
	})
})

// //定义批量执行命令
// gulp.task("piliangzhixing",["jianting","fuwuqi"],()=>{
// 	console.log("都执行完成");
// })


//gulp对js文件的合并/压缩/改名/ES6转ES5
gulp.task("hygstf",()=>{
	gulp.src("./project/js/*.js")
	.pipe(babel())
	.pipe(concat("index.js"))
	.pipe(gulp.dest("server/js"))
	.pipe(uglify())
	.pipe(rename("index.min.js"))
	.pipe(gulp.dest("server/js"));
})

//gulp对js文件的ES6转ES5
gulp.task("stf",()=>{
	gulp.src("./project/js/a.js")
	.pipe(babel())
	.pipe(gulp.dest("server/js"));
})

//gulp对scss文件的编译
gulp.task("scss",()=>{
	gulp.src("./project/sass/*")
	.pipe(sass().on("error",sass.logError))
	.pipe(gulp.dest("server/css")).pipe(connect.reload());
})

//对sass文件的监听
gulp.task("jiantingsass",()=>{
	gulp.watch("./project/sass/*",["scss"]);
})

gulp.task("plzx",["scss","zhuancun","jianting","fuwuqi","jiantingsass"])