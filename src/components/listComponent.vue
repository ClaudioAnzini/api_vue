<script setup>
import { RouterLink } from 'vue-router';
import { ref, computed, onMounted } from 'vue';

const props = defineProps({
    title: String,
    MoreTo: String,
    MoreTitle: String,
    itens: Array,
});

const carouselRef = ref(null);
const itemWidth = ref(0);
const currentSlide = ref(0);

const totalSlides = computed(() => Math.ceil(props.itens.length / visibleItems.value));
const visibleItems = ref(0);


function update() {
    if (carouselRef.value && props.itens.length > 0) {
        const firstItem = carouselRef.value.querySelector('.item');
        if (firstItem) {
            const itemWidthValue = firstItem.offsetWidth;

            const styles = getComputedStyle(firstItem);
            const marginLeft = parseInt(styles.marginLeft, 10);
            const marginRight = parseInt(styles.marginRight, 10);

            itemWidth.value = itemWidthValue + marginLeft + marginRight;

            // o ultimo item tem que tar 80% dentro pra contar como visivel
            let itens100p = Math.floor(carouselRef.value.offsetWidth / itemWidth.value);
            let ultimoItemVisivel = (((carouselRef.value.offsetWidth - itemWidth.value * itens100p)) > (itemWidth.value * 0.8)) ? 1 : 0;

            visibleItems.value = itens100p + ultimoItemVisivel;       
        }
    }

    if (currentSlide.value >= totalSlides.value) {
        currentSlide.value = totalSlides.value - 1;
    }
};

const transform = computed(() => {
    if (currentSlide.value == totalSlides.value - 1 && props.itens.length % visibleItems.value != 0) {
        let itensFaltando = visibleItems.value - (props.itens.length % visibleItems.value);
        return (-currentSlide.value * (itemWidth.value * visibleItems.value)) + (itemWidth.value * itensFaltando);
    } else {
        return -currentSlide.value * (itemWidth.value * visibleItems.value);
    }
});

function nextSlide() {
    if (currentSlide.value < totalSlides.value - 1) {
        currentSlide.value++;
    }
};

function prevSlide() {
    if (currentSlide.value > 0) {
        currentSlide.value--;
    }
};

onMounted(() => {
    update();
    window.addEventListener('resize', update);
});

</script>

<template>

    <div class="card">
        <div class="title">
            <p>{{ title }}
            </p>
        </div>
        <div class="carousel">
            <button @click="prevSlide" :class="(currentSlide === 0) ? 'arrow left arrow-empty' : 'arrow left'">
                <span class="material-symbols-outlined">chevron_left</span>
            </button>
            <div class="slideable" ref="carouselRef">
                <div class="itens" :style="{ transform: `translateX(${transform}px)` }">
                    <RouterLink class="item" v-for="(item, index) in itens" :key="index"
                        :class="{ 'empty-item': item.title == null }" :to="item.to">
                    <div class="img">
                        <img :src="`https://image.tmdb.org/t/p/original/${item.poster_path}`"
                        :alt="item.title" />
                    </div>
                    <div class="title">
                        <p>{{ item.title }}</p>
                    </div>
                    <div class="price">
                        
                    </div>
                    </RouterLink>
                </div>
            </div>
            <button @click="nextSlide"
                :class="(currentSlide < Math.ceil(props.itens.length / visibleItems) - 1) ? 'arrow right' : 'arrow right arrow-empty'">
                <span class="material-symbols-outlined">chevron_right</span>
            </button>
        </div>
    </div>
</template>

<style scoped>
.card {
    font-family: 'Inter', sans-serif;
    background-color: #fff;
    border-radius: 10px;
    padding-top: 10px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    flex: 1;
    max-width: 100%;
}

.title {
    padding: 5px 25px;
}

.title p {
    font-weight: 700;
    margin: 0;
    padding: 0;
    display: flex;
    gap: 1rem;
    align-items: flex-end;
}

.img {
    display: flex;
    justify-content: center;
}

.img img {
    height: 220px;
    width: 175px;
    object-fit: contain;
    user-select: none;
}

.title p a {
    color: #0095CF;
    font-size: 14px;
}

.title p a:hover {
    color: #0169a1;
}

.old-price {
    font-size: 14px;
    color: #9B9B9B;
    text-decoration: line-through;
}

.old-price.none {
    opacity: 0;
}

.promotion {
    font-weight: 700;
    font-size: 14px;
    color: #007505;
}

.carousel {
    display: flex;
    align-items: center;
    background-color: white;
    position: relative;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
}

.itens {
    display: flex;
    transition: transform 0.3s ease-in-out;
    align-items: flex-start;
}

.price p {
    margin-top: 0;
}

.item {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin: 15px 10px;
    padding: 5px;
    cursor: pointer;
    transition: transform 0.2s;
    background-color: white;
    border-radius: 8px;
    text-decoration: none;
    color: black;
    z-index: 15;
}

.item:hover {
    transform: scale(1.05);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
}

.arrow {
    cursor: pointer;
    background: none;
    border: none;
    position: relative;
    z-index: 25;
    user-select: none
}

.arrow:hover {
    color: #0169a1;
}

.arrow span {
    font-size: 24px;
    padding: 8px;
    background-color: black;
    color: white;
    border-radius: 50%;
}

.empty-item {
    opacity: 0;
    background-color: #f5f5f5;
    box-shadow: none !important;
    cursor: default;
}

.arrow-empty span {
    cursor: default;
    color: #f5f5f5 !important;
    opacity: 0;
}

.arrow.right {
    right: -20px;
}

.arrow.left {
    left: -20px;
}

.slideable {
    display: flex;
    gap: 1rem;
    overflow: hidden;
    flex: 1;
    position: relative;
    transition: transform 0.3s ease;
    z-index: 10;
    transition: transform 0.3s ease-in;
}

@media screen and (max-width: 768px) {
    
    .card {
        background: none;
        gap: 0;
    }

    .arrow {
        display: none;
    }
    .carousel {
        background: none;
    }

    .slideable {
        gap: 0.5rem;
        overflow: auto;
    }

    .item:first-child {
        margin-left: 0;
    }

    .item:last-child {
        margin-right: 0;
    }

    .item .price {
        padding: 1rem;
    }
}

</style>