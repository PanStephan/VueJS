<template>
  <div class="wrapper-content wrapper-content--fixed">
    <section>
      <div class="container">

        <!-- table -->
        <table>

          <!-- head -->
          <thead>
            <tr>
              <th @click="sort('name')">Name</th>
              <th  @click="sort('age')">Age</th>
              <th  @click="sort('gender')">Gender</th>
            </tr>
          </thead>

          <!-- body -->
          <tbody>
            <tr v-for="user in usersSort" :key="user.id">
              <td>
                <img :src="user.img" :alt="user.name">
                <span>{{ user.name }}</span>
              </td>
              <td> {{ user.age }} </td>
              <td> {{ user.gender }} </td>
            </tr>
          </tbody>

        </table>
      </div>
    </section>
    <section>
      <div class="container">
        <div class="button-list">
          <button class="btn" @click="prevPage">Prev</button>
          <button class="btn" @click="nextPage">Next</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      users: [],
      currentSort: 'name',
      currentSortDir: 'asc',
      page: {
        current: 1,
        length: 3
      }
    }
  },
  created () {
    axios
      .get('https://api.myjson.com/bins/rzgya')
        .then(response => {
          this.users = response.data
        })
        .catch(error => {
          console.log(error)
        })
  },
  computed: {
    usersSort() {
      return this.users.sort((a, b) => {
        let mod = 1
        if(this.currentSortDir === 'desc') mod = -1
        if(a[this.currentSort] < b[this.currentSort]) return -1*mod
        if(a[this.currentSort] > b[this.currentSort]) return 1*mod
      }).filter((row, index) => {
        let start = (this.page.current-1)*this.page.length
        let end = this.page.current*this.page.length
        if(index >= start && index < end) return row
      })
    }
  },
  methods: {
    sort(e) {
      if (e === this.currentSort) {
        this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc'
      }
      this.currentSort = e
    },
    prevPage() {
      if(this.page.current > 1) this.page.current -= 1
    },
    nextPage() {
      if((this.page.current * this.page.length) < this.users.length) this.page.current += 1 
    }
  }
}
</script>


<style lang="scss" scoped>
img {
  width: 60px;
  height: auto;
  border-radius: 50%;
  margin-right: 16px;
}
</style>
