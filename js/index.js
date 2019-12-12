class list{
    constructor(){
        this.fr=document.querySelector(".fr");
        // console.log(this.cont);   
        this.url="http://localhost:81/data/nav.json";           
        this.load();
    }
    load(){
        var that=this;
        ajaxGet(this.url,function(res){
            console.log(JSON.parse(res));
            that.res=JSON.parse(res);
            // that.display();
        })
    }
    // display(){
    //     //查看数据
    //     // console.log(this.res);
    //     var str="";
    //     for(var i=0;i<this.res.length;i++){
    //         // goodsId点击按钮定位商品
    //     str+=`<div class="box" index="${this.res[i].id}">
    //             <img src="${this.res[i].img}" alt="">
    //             <p>${this.res[i].name}</p>
    //             <span>${this.res[i].price}</span>
    //             <em class="addCar">加入购物车</em>
    //         </div>`;           
    //     }
    //     // 将数据插入页面中cont,innerHTML可以渲染页面
    //     this.fr.innerHTML=str;
    // }
}
new list;
