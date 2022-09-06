const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/';

const app = new Vue({
    el: '#app',
    data: {
        catalogUrl: 'catalogData.json',
        cartUrl: 'getBasket.json',
        goods: [],
        filtered: [],
        imgCatalog: `pictures/Ноутбук.jpg`,
        userSearch: '',
        show: false,
        goodsOfBasket: [],
        error: false
    },
    methods: {
        filter() {
            const regexp = new RegExp(this.userSearch, 'i');
            this.filtered = this.goods.filter(product => regexp.test(product.product_name));
        },
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log('error');
                    this.error = true;
                })
        },
        putJson(url) {
            return fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(result => result.json())
                .catch(error => {
                    console.log('');
                    this.error = true;
                })
        },
        postJson(url, data) {
            return fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(result => result.json())
                .catch(error => {
                    console.log('error');
                    this.error = true;
                })
        },

        addProduct(item) {
            let find = this.goodsOfBasket.find(el => item.id_product === el.id_product);
            if (find) {
                this.putJson('/api/cart/${find.id_product}', { quantity: 1 })
                    .then(data => {
                        if (data.result === 1) {
                            find.quantity++;
                        } else {
                            const prod = Object.assign({ quantity: 1 }, item);
                            this.postJson('/api/cart', prod)
                                .then(data => {
                                    if (data.result === 1) {
                                        this.goodsOfBasket.push(prod);
                                    }
                                })
                        }
                    })
            }
        },
        delProduct(product) {
            this.getJson(`${API}deleteFromBasket.json`)
                .then(data => {
                    if (data.result === 1) {
                        if (product.quantity > 1) {
                            product.quantity--;
                        } else {
                            this.goodsOfBasket.splice(this.goodsOfBasket.indexOf(product), 1);
                        }
                    }
                })
        }


    },

    computed: {
        getSumm(product) {
            let summ = 0;
            for (let product of this.goodsOfBasket) {
                summ += product.price * product.quantity;
            }
            return summ;
        }
    },

    mounted() {
        this.getJson(`/api/products`)
            .then(data => {
                for (let el of data) {
                    el.imgPath = `Pictures/${el.id_product}.jpg`;
                    this.goods.push(el);
                    this.filtered.push(el);
                }
            })
        this.getJson(`/api/cart`)
            .then(data => {
                for (let el of data.contents) {
                    this.goodsOfBasket.push(el);
                }
            })
    }
});













































// const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/';
// class ProductList {
//     constructor(container = '.products') {
//         this.container = container;
//         this.goods = [];
//         this._getProducts()
//             .then(data => {
//                 this.goods = data;
//                 this.render()
//             });
//         this.clickOnBasketButton();
//     }
//     _getProducts() {
//         return fetch(`${ API } catalogData.json`)
//             .then(result => result.json())
//             .catch(error => {
//                 console.log('error');
//             });
//     }
//     render() {
//         const block = document.querySelector(this.container);
//         for (let product of this.goods) {
//             const item = new ProductItem(product);
//             block.insertAdjacentHTML('beforeend', item.render());
//         }
//     }
//     clickOnBasketButton() {
//         let basketButton = document.querySelector('.cart-button');
//         let hiddenContainerOfButton = document.querySelector('.basket-container');
//         hiddenContainerOfButton.style.display = 'none';
//         basketButton.addEventListener('click', event => {
//             if (hiddenContainerOfButton.style.display == 'none') {
//                 hiddenContainerOfButton.style.display = 'block';
//             } else if (hiddenContainerOfButton.style.display = 'block') {
//                 hiddenContainerOfButton.style.display = 'none';
//             }
//         });
//     }
// }
// // создал новый класс для корзины. Не понял, нужно ли было сделать методы в классе для листа товаров, или, может нужно было через наследование(пробовал, но там мы получали массив с сервера, а тут объект).
// class ProductsOfBasket {
//     constructor(container = '.box_basket-container') {
//         this.container = container;
//         this.goodsOfBasket = {};
//         this._getBasket()
//             .then(data => {
//                 this.goodsOfBasket = data;
//                 this.render();
//                 this.countSummOfGoods();
//             });

//     }
//     _getBasket() {
//         return fetch(`${ API } getBasket.json`)
//             .then(result => result.json())
//             .catch(error => {
//                 console.log('error');
//             });
//     }
//     render() {
//         const block = document.querySelector(this.container);
//         for (let product of this.goodsOfBasket.contents) {
//             const item = new ProductItemOfBasket(product);
//             block.insertAdjacentHTML('beforeend', item.renderBasket());
//         }
//     }
//     // можно было взять из нашего объекта свойство this.goodsOfBasket.amount - оно и так уже посчитано на сервере. Но я взял из прошлого урока метод и переделал его под корзину, хотя это скорее всего плохая практика.
//     countSummOfGoods() {
//         let summ = 0;
//         for (let product of this.goodsOfBasket.contents) {
//             summ += product.price * product.quantity;
//         }
//         let paragraphSumm = document.createElement('p');
//         let boxBasket = document.querySelector('.box_basket-container');
//         boxBasket.appendChild(paragraphSumm);
//         paragraphSumm.innerText = `Итого: ${ summ } руб.`;
//     }
// }

// class ProductItem {
//     constructor(product) {
//         this.id = product.id_product;
//         this.product_name = product.product_name;
//         this.price = product.price;
//         this.img = `pictures / ${ this.product_name }.jpg`;
//     }
//     render() {
//         return `< div id = '${this.id} 'class="goods-item" > <img class='pictures' src='${this.img}'><h3>${this.product_name}</h3><p>${this.price}</p> <button class='button_buy'> КУПИТЬ </button>`
//     }
// }
// class ProductItemOfBasket extends ProductItem {
//     constructor(product) {
//         super(product);
//         this.quantity = product.quantity;
//     }
//     renderBasket() {
//         return `<div id = '${this.id}' class="goods-item"><img class= 'pictures' src='${this.img}'><h3>${this.product_name}</h3><p>${this.price}</p> <p class = 'quantity'>Количество: ${this.quantity} шт.</p>`
//     }
// }
// let list = new ProductList();
// let basket = new ProductsOfBasket();
