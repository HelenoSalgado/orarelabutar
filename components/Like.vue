<template>
    <div class="amei-container">
        <span class="count-likes">0</span>
        <LazyIconsHeart/>
    </div>
</template>
<script setup lang="ts">
/* Observei que o css importado dentro da tag script demora mais para ser aplicado
 * talvez depois que o script é carregado no final da leitura da DOM HTML, porém,
 * como o objetivo é gerar página estática, o css será carregado normalmente, sem atraso.
*/
//import '../assets/css/like.css';
</script>