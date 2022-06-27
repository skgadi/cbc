const {
  createApp
} = Vue;
const app = createApp({
  data() {
    return {
      s,
      l
    }
  },
  watch: {
    's.nP' (newVal) {
      this.completeMainInfo();
      this.saveSettings();
    },
    's.vol' (newVal) {
      this.s.vol = getValidInput(newVal, 0.001, Infinity);
      this.completeMainInfo();
      this.saveSettings();
    },
    's.f' (newVal) {
      this.s.f = getValidInput(newVal, 0.001, Infinity);
      this.saveSettings();
    },
    's.w' (newVal) {
      this.s.w = getValidInput(newVal, 0.001, Infinity);
      this.completeMainInfo();
      this.saveSettings();
    },
    's.cpf' (newVal) {
      this.s.cpf = getValidInput(newVal, 0.001, 1);
      this.completeMainInfo();
      this.saveSettings();
    },
    's.sV': {
      handler(newVal, oldVal) {
        this.saveSettings();
      },
      deep: true
    }
  },
  methods: {
    changeLang(lang) {
      this.s.sL = lang;
    }, acceptPolicy() {
      this.s.pA = true;
      this.saveSettings();
    }, saveSettings() {
      saveSettings(this.s);
    }, completeMainInfo () {
      this.s.s = this.s.w/this.s.cpf;
      this.s.q = Math.sqrt(Math.pow(this.s.s,2) - Math.pow(this.s.w,2));
      this.s.i =  this.s.s / this.s.vol / Math.sqrt(this.s.nP);
    }
  }
}).mount('#gsk-app');