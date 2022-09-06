Vue.component('basket', {
    props: ['img', 'products'],
    template: `
    <div class="basket_menu" v-if='$root.show'>
        <div class ='mega_item'>
        <h4 class="title_menu">В КОРЗИНЕ</h4>
        <p class="summ" > товаров на сумму: {{$root.getSumm}} руб.</p>
        <basketproduct v-for="item of products" :img="img" :item="item" >
        </basketproduct>
        <a href='Cart.html' class='parth-basket'><p class='add_text_rose-basket'>Заказать</p></a> 
        </div>
    </div>
    `
}
);
Vue.component('basketproduct', {
    props: ['img', 'item'],
    template: `
  
        <div class="mega_item_section">
        <img   :src='img' alt="good image" class="pictures">
        <h3>{{item.product_name}}</h3>
        <p>{{item.price}} руб.</p>
        <p class="quantity">{{item.quantity}}шт.</p>
        <p class="summ"> Итого:{{item.quantity*item.price}}  руб.</p>
        <button class="del" @click="$parent.$emit('delete',item)">X</button>
        </div>
        `
}
);
