var eventBus = new Vue()

Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        },
        details: {
            type: Array,
            required: true
        }
    },
    template: `
    <div class="product">
        <div class="product-image">
        <img v-bind:src="image">
        </div>

        <div class="product-info">
        <h1 :class="{ outOfStock: !inStock}">{{ title }}</h1>
        <p v-if="inStock > 10">In Stock</p>
        <p v-else-if="inStock > 0 && inStock < 10">Almost sold out</p>
        <p v-else>Out of Stock</p>
        <a :href="link" target="_blank">More products like this</a>

        <p>Shipping: {{ shipping }}

        <ul>
            <li v-for="detail in details">{{ detail }}</li>
        </ul>

        <div  v-for="(variant, index) in variants"
                :key="variant.variantId"
                class="color-box"
                :style="{ backgroundColor: variant.variantColor }"
                @mouseover="updateProduct(index)">
        </div>

        <p v-show="onSale">On Sale!</p>
        
        <div>
            <button v-on:click="addToCart"
                    :disabled="inStock <= 0"
                    :class="{ disabledButton: inStock <= 0 }">Add to Cart</button>

            <button v-on:click="removeFromCart">Remove from Cart</button>
        </div>

        <product-tabs :reviews="reviews"></product-tabs>

        
        </div>
        
    </div>
    `,
    data () {
        return {
        brand: "Vue Mastery",
        product: 'Socks',
        link: "https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks",
        selectedVariant: 0,
        variants: [
            {
                variantId: 2234,
                variantColor: "green",
                variantImage: "./assets/vmSocks-green-onWhite.jpg",
                variantQuantity: 42,
                variantOnSale: true
            },
            {
                variantId: 2235,
                variantColor: "blue",
                variantImage: "./assets/vmSocks-blue-onWhite.jpg",
                variantQuantity: 0,
                variantOnSale: false
            }
        ],
        reviews: []
      }},
      methods: {
          addToCart: function () {
              this.$emit("add-to-cart", this.variants[this.selectedVariant].variantId)
          },
          removeFromCart: function () {
            this.$emit("remove-from-cart", this.variants[this.selectedVariant].variantId)
          },
          updateProduct: function (index) {
              this.selectedVariant = index
          }
      },
      computed: {
          title() {
              return this.brand + ' ' + this.product
          },
          image() {
              return this.variants[this.selectedVariant].variantImage
          },
          inStock() {
              return this.variants[this.selectedVariant].variantQuantity
          },
          onSale() {
              return this.variants[this.selectedVariant].variantOnSale
          },
          shipping() {
              if (this.premium) {
                  return "Free"
              }
              return 2.99
          }
      },
      mounted() {
          eventBus.$on('review-submitted', productReview => {
            this.reviews.push(productReview)
          })
      }

})

Vue.component('product-review', {
    template: `
    <form class="review-form" @submit.prevent="onSubmit">

        <p v-if="errors.length">
            <b>Please correct the following error(s):</b>
            <ul>
                <li v-for="error in errors">{{ error }}</li>
            </ul>
        </p>

        <p>
        <label for="name">Name:</label>
        <input id="name" v-model="name">
        </p>

        <p>
        <label for="review">Review:</label>
        <textarea id="review" v-model="review"></textarea>
        </p>

        <p>
        <label for="rating">Rating:</label>
        <select id="rating" v-model.number="rating">
            <option>5</option>
            <option>4</option>
            <option>3</option>
            <option>2</option>
            <option>1</option>
        </select>
        </p>

        <p>
        <input type="submit" value="Submit">
        </p>
    </form>
    `,
    data() {
        return {
            name: null,
            review: null,
            rating: null,
            errors: []
        }
    },
    methods: {
        onSubmit() {
            if (this.name && this.review && this.rating) {
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating
                }
                eventBus.$emit('review-submitted', productReview)
                this.name = null
                this.review = null
                this.rating = null
            }
            else {
                if(!this.name) this.errors.push("name required")
                if(!this.review) this.errors.push("review required")
                if(!this.rating) this.errors.push("rating required")
            }
        }
    }

})

Vue.component('product-tabs', {
    props: {
        reviews: {
            type: Array,
            required: true
        }
    },
    template: `
        <div>
            <span class="tab"
                :class="{ activeTab: selectedTab === tab}"
                v-for="(tab, index) in tabs"
                :key="index"
                @click="selectedTab = tab">
                {{tab}}</span>

        <div v-show="selectedTab === 'Reviews'">
            <h2>Reviews</h2>
            <p v-if="!reviews.length">Write the first review!</p>
            <ul>
                <li v-for="review in reviews">
                    <p>{{ review.name }}</p>
                    <p>{{ review.rating }}</p>
                    <p>{{ review.review }}</p>
                </li>
            </ul>
        </div>

        <product-review
            v-show="selectedTab === 'Make a Review'"></product-review>

        </div>
    `,
    data() {
        return {
            tabs: ['Reviews', 'Make a Review'],
            selectedTab: 'Reviews'
        }
    }

})

var app = new Vue({
    el: '#app',
    data: {
        premium: true,
        cart: [],
        sockDetails: ["80% cotton", "20% polyester", "Gender-neutral"],
    },
    methods: {
        addToCart(id) {
            this.cart.push(id)
        },
        removeFromCart(id) {
            this.cart.pop(id)
        }
    }
    
  })

var footer = new Vue({
    el: '#footerapp',
    data: {
        sandbox: true
    },
    methods: {
        updateSandbox() {
            this.sandbox = false
        }
    }
})