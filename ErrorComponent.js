Vue.component('error', {
    template: `
    <div class="alarm" v-show='$root.error' >
    К сожалению, возникла ошибка подключения к серверу. Попробуйте еще раз или измените путь. 
    </div>
    `
});
