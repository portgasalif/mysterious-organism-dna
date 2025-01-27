// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ["A", "T", "C", "G"];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single strand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

const pAequorFactory = (specimenNum, dna) => {
  return {
    specimenNum,
    dna,

    mutate() {
      const randomDna = Math.floor(Math.random() * this.dna.length);
      const currentDna = this.dna[randomDna];

      let newDNA = returnRandBase();
      while (newDNA === currentDna) {
        newDNA = returnRandBase();
      }
      this.dna[randomDna] = newDNA;
      return this.dna;
    },
    compareDNA(pAequor) {
      let counter = 0;

      for (let i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === pAequor.dna[i]) {
          counter++;
        }
      }
      let result = (counter / this.dna.length) * 100;
      console.log(
        `#${this.specimenNum} and #${pAequor.specimenNum} have ${result}% DNA in common`
      );
    },
    willLikelySurvive() {
      let counter = 0;

      for (let x = 0; x < this.dna.length; x++) {
        if (this.dna[x] === 'C' || this.dna[x] === 'G') {
          counter++;
        }
      }
      let result = (counter / this.dna.length) * 100;

      if (result >= 60) {
        return true;
      }
      else {
        return false;
      }
    }
  };
};

const survivingSpacimens = [];
let specimenNum = 1;

while (survivingSpacimens.length < 30) {
  let organism = pAequorFactory(specimenNum, mockUpStrand());

  if (organism.willLikelySurvive()) {
    survivingSpacimens.push(organism);
    specimenNum++;
  }

}
