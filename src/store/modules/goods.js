const state = {
  goods: []
}

const getters = {

}

const mutations = {
  add(state, data) {
    state.goods.push(data)
  },
  clear(state) {
    state.goods = []
  },
  change(state, id) {
    for (var i=0;i<state.goods.length;i++) {
      if (state.goods[i].productId == id) {
        state.goods[i].num += 1
      }
    }
  }
}

const actions = {

}

export default {
  state,
  getters,
  mutations,
  actions
}
