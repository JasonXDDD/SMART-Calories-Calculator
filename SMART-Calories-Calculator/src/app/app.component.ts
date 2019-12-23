import { Component, OnInit } from '@angular/core'
import SlideRuler from 'slide-ruler'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  weight: number = 80
  height: number = 170
  age: number = 20

  bmr: number = 0
  rmr: number = 0
  bmi: number = 0
  tdee: number = 0
  fat: number = 0

  wantWeight: number = 2
  deadline: number = 0
  daysPerWeek: number = 0
  minsPerTimes: number = 0
  wantMeal: number = 0

  slider: any

  ngOnInit (): void {
    // this.testing()

    this.initSlider()
    this.initRuler('weight', this.weight, 40, 200)
    this.initRuler('height', this.height, 100, 250)
    this.initRuler('age', this.age, 1, 80)
    this.initRuler('wantWeight', this.wantWeight, 1, 10)

  }

  initSlider () {
    this.slider = tns({
      container: '.my-slider',
      items: 1,
      slideBy: 'page',
      autoHeight: true,
      loop: false,
      center: false,
      nav: false,
      controls: false,
      touch: false,
      preventScrollOnTouch: 'auto',
    })
  }

  initRuler (target, curr, min, max) {
    let self = this
    function handleValue (value) {
      switch (target) {
        case 'weight':
          self.weight = value
          break
        case 'height':
          self.height = value
          break
        case 'age':
          self.age = value
          break
        case 'wantWeight':
          self.wantWeight = value
          break
      }
    }

    var a = new SlideRuler({
      el: document.querySelector(`#${target}`),
      maxValue: max,
      minValue: min,
      currentValue: curr,
      canvasWidth: 300,
      handleValue: handleValue,
      precision: 1,
      fontMarginTop: 40
    })
  }

  // calc
  calcTotalTime () {
    return this.daysPerWeek * this.minsPerTimes * Math.round(this.deadline / 7)
  }

  calcTargetCal () {
    return this.wantWeight * 7700
  }

  calcTargetMeal () {
    return this.wantMeal * this.deadline
  }

  calcNeedEx () {
    return this.calcTargetCal() - this.calcTargetMeal()
  }

  calcNeedCalPerMin () {
    return this.calcNeedEx() / this.calcTotalTime()
  }

  calcMET () {
    return ((this.weight * 3.5) / 1000) * 5
  }

  testing(){
    this.weight = 121
    this.height = 182
    this.age = 24

    this.bmr = 1866
    this.tdee = 2565.75
    this.bmi = 36.7
    this.rmr = 2651
    this.fat = 43

    this.wantWeight = 5
    this.wantMeal = 1000
    this.deadline = 31
    this.daysPerWeek = 3
    this.minsPerTimes = 120
  }

  reset(){
    this.weight = 80
    this.height = 170
    this.age = 20

    this.bmr = 0
    this.rmr = 0
    this.bmi = 0
    this.tdee = 0
    this.fat = 0

    this.wantWeight = 2
    this.deadline = 0
    this.daysPerWeek = 0
    this.minsPerTimes = 0
    this.wantMeal = 0

    this.slider.goTo('first')
  }
}
