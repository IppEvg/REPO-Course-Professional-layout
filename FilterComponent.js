Vue.component('sort', {
    template: `
    <form action="#" class="search_form" @sumbit.prevent="$root.filter">
                    <input type="text" class="search-field" v-model="$root.userSearch" @input="$root.filter">
                </form>>
    `
}) 