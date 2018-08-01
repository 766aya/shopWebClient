<template>
  <div class="counter">
    <a class="sup" @click="increment"
    @mouseover="()=>{this.isSelection=true; this.counter=true;}"
    @mouseleave="()=>{this.focus ? this.isSelection=true : this.isSelection=false; this.counter=false; }"
    >+</a>
    <input type="text" v-model.number="num" :class="{ 'is-selction': isSelection }"
      @focus="()=>{this.isSelection=true; this.focus=true;}"
      @mouseover="()=>{this.isSelection=true}"
      @blur="()=>{this.counter ? this.isSelection=true : this.isSelection=false; this.focus=false;}"
      @mouseleave="()=>{this.focus ? this.isSelection=true : this.isSelection=false}"
    >
    <a class="sub" @click="decrement"
    @mouseover="()=>{this.isSelection=true; this.counter=true}"
    @mouseleave="()=>{this.focus ? this.isSelection=true : this.isSelection=false; this.counter=false; }"
    >-</a>
  </div>
</template>

<script>
export default {
  name: 'Counter',
  props: {
    max: {
      type: Number,
      default: 10,
    },
    min: {
      type: Number,
      default: 0,
    }
  },
  data() {
    return {
      num: this.min,
      isSelection: false,
      focus: false,
      counter: false,
    };
  },
  watch: {
    num(newVal) {
      this.num = parseInt(newVal)
      if (this.num > this.max) {
        this.num = this.max
        this.$emit('counter', this.num)
      } else if(this.num < this.min) {
        this.num = this.min
        this.$emit('counter', this.num)
      } else if(typeof(this.num) == 'number') {
        this.$emit('counter', newVal)
      } else {
        this.num = 0
      }
    }
  },
  methods: {
    increment() {
      this.num++;
    },
    decrement() {
      this.num--;
    }
  },
};
</script>

<style lang="scss" scoped type="">
  .counter {
    position: relative;
    width: 150px;
    height: 40px;
    border-radius: 5px;
    * {
      transition: 0.3s;
    }
    a {
      display: block;
      height: 100%;
      width: 39px;
      line-height: 40px;
      text-align: center;
      cursor: pointer;
      font-size: 1.5rem;
      &::selection {
        background: none;
      }
      &:hover {
        color: #3385FF;
        border-color: #3385FF;
      }
    }
    .sup {
      position: absolute;
      top: 0px;
      left: 0px;
      border-right: 1px solid #D5D7DA;
    }
    .sub {
      position: absolute;
      top: 0px;
      right: 0px;
      border-left: 1px solid #D5D7DA;
    }
    input {
      margin: 0;
      border: 0;
      padding: 0px 40px;
      height: 38px;
      text-align: center;
      width: 68px;
      font-size: 16px;
      border: 1px solid #D5D7DA;
      border-radius: 5px;
      outline: none;
    }
    .is-selction {
      border: 1px solid #3385FF;
    }
  }
</style>
