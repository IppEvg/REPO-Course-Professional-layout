const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/';

const app = new Vue({
    el: '#app',
    data: {
        catalogUrl: 'db/products.json',
        cartUrl: 'db/userCart.json',
        goods: [],
        filtered: [],
        imgCatalog: '',
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
        putJson(url, data) {
            return fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(result => result.json())
                .catch(error => {
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
        delJson(url, data) {
            return fetch(url, {
                method: "DELETE",
                headers: {
                    "content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(result => result.json())
                .catch(error => {
                    this.error = true;
                })
        },

        addProduct(item) {
            let find = this.goodsOfBasket.find(el => el.id_product === item.id_product);
            if (find) {
                this.putJson(`/api/cart/${find.id_product}/${find.product_name}`, { quantity: 1 })
                    .then(data => {
                        if (data.result) {
                            find.quantity++;
                        }
                    })
            } else {
                const prod = Object.assign({ quantity: 1 }, item);
                item.imgPath = `Pictures/${item.id_product}.jpg`;
                this.postJson(`/api/cart`, prod)
                    .then(data => {
                        if (data.result) {
                            this.goodsOfBasket.push(prod);
                        }
                    })
            }
        },
        delProduct(item) {
            if (item.quantity > 1) {
                this.putJson(`/api/cart/${item.id_product}/${item.product_name}`, { quantity: -1 })
                    .then(data => {
                        if (data.result) {
                            item.quantity--;
                        }
                    })
            } else {
                this.delJson(`/api/cart/${item.id_product}`, item)
                    .then(data => {
                        if (data.result) {
                            this.goodsOfBasket.splice(this.goodsOfBasket.indexOf(item), 1)
                        } else {
                            console.log('error');
                        }
                    })
            }
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
                    el.imgPath = `Pictures/${el.id_product}.jpg`;
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
