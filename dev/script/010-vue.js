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
      //this.s.vol = getValidInput(newVal, 0.001, Infinity);
      this.mainCalculations();
      this.saveSettings();
    },
    's.f' (newVal) {
      //this.s.f = getValidInput(newVal, 0.001, Infinity);
      this.saveSettings();
    },
    's.w' (newVal) {
      //this.s.w = getValidInput(newVal, 0.001, Infinity);
      this.mainCalculations();
      this.saveSettings();
    },
    's.cpf' (newVal) {
      //this.s.cpf = getValidInput(newVal, 0.001, 1);
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
      //this.s.rpf = getValidInput(newVal, 0.001, 1);
      this.adjustRpf();
      this.mainCalculations();
      this.saveSettings();
    }, 's.rpfs' (newVal) {
      this.adjustRpf();
    }
  },
  mounted() {
    this.mainCalculations();
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

      //Calculating quantities for the third tab
      // one phase
      this.s.ncs = Math.ceil(this.s.vol/this.s.av); //number of capacitors in series
      this.s.ncp = Math.ceil(this.s.c/(this.s.ac/this.s.ncs)); //number of capacitors in parallel
      let realCapacitor = (this.s.ncp*this.s.ac/this.s.ncs)*1e-6; //real capacitance added in uF
      this.s.cri = Math.pow(this.s.vol, 2) * 2 * Math.PI * this.s.f * realCapacitor; // reactive power
      this.s.fr = this.s.cri - this.s.q;
      this.s.fa = Math.sqrt(Math.pow(this.s.fr,2) + Math.pow(this.s.w,2));
      this.s.fpf = this.s.w / this.s.fa;
      // three phase star
      this.s.ncss = Math.ceil(this.s.vol/this.s.av/Math.sqrt(3)); //number of capacitors in series
      this.s.ncps = Math.ceil(this.s.cS/(this.s.ac/this.s.ncss)); //number of capacitors in parallel
      realCapacitor = (this.s.ncps*this.s.ac/this.s.ncss)*1e-6; //real capacitance added in uF
      this.s.cris = 3 * Math.pow(this.s.vol/Math.sqrt(3), 2) * 2 * Math.PI * this.s.f * realCapacitor; // reactive power
      this.s.frs = this.s.cris - this.s.q;
      this.s.fas = Math.sqrt(Math.pow(this.s.frs,2) + Math.pow(this.s.w,2));
      this.s.fpfs = this.s.w / this.s.fas;     
      // three phase delta
      this.s.ncsd = Math.ceil(this.s.vol/this.s.av); //number of capacitors in series
      this.s.ncpd = Math.ceil(this.s.cS/(this.s.ac/this.s.ncss)); //number of capacitors in parallel
      realCapacitor = (this.s.ncpd*this.s.ac/this.s.ncsd)*1e-6; //real capacitance added in uF
      this.s.crid = 3 * Math.pow(this.s.vol, 2) * 2 * Math.PI * this.s.f * realCapacitor; // reactive power
      this.s.frd = this.s.crid - this.s.q;
      this.s.fad = Math.sqrt(Math.pow(this.s.frd,2) + Math.pow(this.s.w,2));
      this.s.fpfd = this.s.w / this.s.fad;
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