Vue.component('products', {
    props: ['products'],
    template: `<div class="position_box" >
        <product v-for= "item of products" :product = "item" :img = "item.imgPath"  >
        </product>
        </div > `
});
Vue.component('product', {
    props: ['product', 'img'],
    template: `
    <div class="position" >
        <a href="product.html" class="link_position">
            <img  :src='img' alt="picture of thing" class="picture_position">
            <div class="info_position">
                <h6 class="title_position">{{product.product_name}}</h6>
                <p class="overview_position">{{product.product_info}}</p>
                <p class="price_position">{{product.price}}</p>
            </div>
        </a>
        <div class="add_button">
                <button  class="add_button__link" @click="$parent.$emit('add-product',product)">
                    <img class="picture_button_add" src="Pictures/Basket_button_buy.svg"
                    alt="Basket_picture">
                    <p class="add_text">В корзину</p>
                </button>
        </div>
    </div>`
});

