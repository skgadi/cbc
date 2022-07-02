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
      this.mainCalculations();
      this.saveSettings();
    },
    's.vol' (newVal) {
      this.s.vol = getValidInput(newVal, 0.001, Infinity);
      this.mainCalculations();
      this.saveSettings();
    },
    's.f' (newVal) {
      this.s.f = getValidInput(newVal, 0.001, Infinity);
      this.saveSettings();
    },
    's.w' (newVal) {
      this.s.w = getValidInput(newVal, 0.001, Infinity);
      this.mainCalculations();
      this.saveSettings();
    },
    's.cpf' (newVal) {
      this.s.cpf = getValidInput(newVal, 0.001, 1);
      this.mainCalculations();
      this.saveSettings();
    },
    's.sV': {
      handler(newVal, oldVal) {
        this.saveSettings();
      },
      deep: true
    },
    's.rpf' (newVal) {
      this.s.rpf = getValidInput(newVal, 0.001, 1);
      this.adjustRpf();
      this.mainCalculations();
      this.saveSettings();
    }, 's.rpfs' (newVal) {
      this.adjustRpf();
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
    }, mainCalculations () {
      this.s.s = this.s.w/this.s.cpf;
      this.s.q = Math.sqrt(Math.pow(this.s.s,2) - Math.pow(this.s.w,2));
      this.s.i =  this.s.s / this.s.vol / Math.sqrt(this.s.nP);
      this.s.rS = this.s.w/this.s.rpf;
      this.s.rQ = this.s.rS * Math.sqrt(1-Math.pow(this.s.rpf,2));
      this.s.rI = this.s.rS / this.s.vol / Math.sqrt(this.s.nP);
      this.s.rQC = this.s.q + this.s.rpfs*this.s.rQ;
      let xc = Math.pow(this.s.vol,2) / this.s.rQC;
      this.s.c = 1e6 / (2 * Math.PI * this.s.f * xc);
      xc = Math.pow(this.s.vol,2) / this.s.rQC * 3;
      this.s.cD = 1e6 / (2 * Math.PI * this.s.f * xc);
      xc = Math.pow(this.s.vol/Math.sqrt(3),2) / this.s.rQC * 3;
      this.s.cS = 1e6 / (2 * Math.PI * this.s.f * xc);
    }, adjustRpf() {
      if (this.s.rpfs<0) {
        if (this.s.rpf<this.s.cpf) {
          this.s.rpf = this.s.cpf;
          showSnackbarMessage(this.l[this.s.sL][24]);
        }
      }
      this.mainCalculations();
      this.saveSettings();
    }
  }
}).mount('#gsk-app');