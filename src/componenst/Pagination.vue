<template>
  <ul class="pagination" :class="paginationClass">
    <li class="page-item" @click="prevPage"  :class="{disabled: value === 1}">
      <a href="javascript:void(0)" class="page-link" aria-label="Previous">
        <span aria-hidden="true">«</span>
        <span class="sr-only">Geri</span>
      </a>
    </li>
    <li class="page-item" :class="{active: value === item}" v-for="item in range(minPage, maxPage)">
      <a href="javascript:void(0)" class="page-link" @click="changePage(item)">{{item}}</a>
    </li>
    <li class="page-pre" :class="{disabled: value === totalPages}">
      <a href="javascript:void(0)" class="page-link" aria-label="Next" @click="nextPage">
        <span aria-hidden="true">&raquo;</span>
        <span class="sr-only">İleri</span>
      </a>
    </li>
  </ul>
</template>
<script>
  export default{
    name: 'pagination',
    props: {
      type: {
        type: String,
        default: 'default'
      },
      pageCount: {
        type: Number,
        default: 0
      },
      perPage: {
        type: Number,
        default: 10
      },
      total: {
        type: Number,
        default: 0
      },
      value: {
        type: Number,
        default: 1
      }
    },
    computed: {
      paginationClass () {
        return `pagination-${this.type}`
      },
      totalPages () {
        if (this.pageCount > 0) return this.pageCount
        if (this.total > 0) {
          return Math.ceil(this.total / this.perPage)
        }
        return 1
      },
      pagesToDisplay () {
        if (this.totalPages > 0 && this.totalPages < this.defaultPagesToDisplay) {
          return this.totalPages
        }
        return this.defaultPagesToDisplay
      },
      minPage () {
        if (this.value >= this.pagesToDisplay) {
          const pagesToAdd = Math.floor(this.pagesToDisplay / 2)
          const newMaxPage = pagesToAdd + this.value
          if (newMaxPage > this.totalPages) {
            return this.totalPages - this.pagesToDisplay + 1
          }
          return this.value - pagesToAdd
        } else {
          return 1
        }
      },
      maxPage () {
        if (this.value >= this.pagesToDisplay) {
          const pagesToAdd = Math.floor(this.pagesToDisplay / 2)
          const newMaxPage = pagesToAdd + this.value
          if (newMaxPage < this.totalPages) {
            return newMaxPage
          } else {
            return this.totalPages
          }
        } else {
          return this.pagesToDisplay
        }
      }
    },
    data () {
      return {
        defaultPagesToDisplay: 5
      }
    },
    methods: {
      range (min, max) {
        let arr = []
        for (let i = min; i <= max; i++) {
          arr.push(i)
        }
        return arr
      },
      changePage (item) {
        this.$emit('input', item)
      },
      nextPage () {
        if (this.value < this.totalPages) {
          this.$emit('input', this.value + 1)
        }
      },
      prevPage () {
        if (this.value > 1) {
          this.$emit('input', this.value - 1)
        }
      },
      handlePageChange () {
        if (this.value >= this.pagesToDisplay) {
          const pagesToAdd = Math.floor(this.pagesToDisplay / 2)
          this.minPage = this.value - pagesToAdd
          const newMaxPage = pagesToAdd + this.value
          if (newMaxPage < this.total) {
            this.maxPage = newMaxPage
          } else {
            this.maxPage = this.total
            this.minPage = this.total - this.pagesToDisplay + 1
          }
        } else {
          this.minPage = 1
          this.maxPage = this.pagesToDisplay
        }
      }
    },
    watch: {
      perPage (value) {
        this.$emit('input', 1)
      },
      maxPage (value) {
        if (this.value > value) {
          this.$emit('input', value)
        }
      }
    }
  }
</script>