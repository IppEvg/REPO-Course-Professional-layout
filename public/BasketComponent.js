Vue.component('basket', {
    props: ['products'],
    template: `
    <div class="basket_menu" v-if='$root.show'>
        <div class ='mega_item'>
        <h4 class="title_menu">В КОРЗИНЕ</h4>
        <p class="summ" > товаров на сумму: {{$root.getSumm}} руб.</p>
        <basketproduct v-for="item of products" :product="item" :img="item.imgPath" >
        </basketproduct>
        <a href='Cart.html' class='parth-basket'><p class='add_text_rose-basket'>Заказать</p></a> 
        </div>
    </div>
    `
}
);
Vue.component('basketproduct', {
    props: ['img', 'product'],
    template: `
  
        <div class="mega_item_section">
        <img   :src='img' alt="good image" class="pictures">
        <h3>{{product.product_name}}</h3>
        <p>{{product.price}} руб.</p>
        <p class="quantity">{{product.quantity}}шт.</p>
        <p class="summ"> Итого:{{product.quantity*product.price}}  руб.</p>
        <button class="del" @click="$parent.$emit('delete',product)">X</button>
        </div>
        `

}
);
