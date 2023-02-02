<template>
  <div id="app" class="container">
    <div class=" my-5">
      <div class="text-center mb-1">
        <img src="@/assets/img/icons_top.png" width="64">
      </div>
      <h1 class="h3 fw-bold mb-5 text-center">음력 생일은 언제일까?</h1>
      <div class="flex" style="justify-content: center">
        <div style="width: 100%">
          <h2 class="h5 title mb-3">태어난 날을 입력해주세요.</h2>
          <div class="mb-3" style="text-align: left">
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" v-model="form.type" id="radio1" value="solar">
              <label class="form-check-label" for="radio1">양력</label>
            </div>

            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" v-model="form.type" id="radio2" value="lunar">
              <label class="form-check-label" for="radio2">음력</label>
            </div>
          </div>
          <div class="form-check" v-if="form.type === 'lunar'">
            <input class="form-check-input" type="checkbox" v-model="form.leapMonth" id="leapMonth">
            <label class="form-check-label" for="leapMonth">
              윤달
            </label>
          </div>
          <div class="input-group mt-3">
            <input type="date" v-model="form.date" placeholder="태어난 날" class="form-control form-control-lg"
                   max="2999-12-31" @enter="onclickSubmit">
            <!--      <input type="number" v-model.number="form.year" placeholder="연" maxlength="4" class="form-control form-control-lg">-->
            <!--      <input type="number" v-model.number="form.month" placeholder="월" maxlength="2" class="form-control form-control-lg">-->
            <!--      <input type="number" v-model.number="form.day" placeholder="일" maxlength="2" class="form-control form-control-lg">-->
            <button type="button" class="btn btn-secondary" :disabled="!form.date" @click="onclickSubmit">확인</button>
          </div>
        </div>
      </div>
    </div>
    <div class="flex mt-3" style="justify-content: center" v-if="state.isShowLunarDay">
      <div style="width: 100%">
        <h2 class="h5 title">
          음력
        </h2>
        <p>{{ lunar.year }}년 {{ lunar.month }}월 {{ lunar.day }}일 {{ lunar.leapMonth ? '윤달' : '평달' }}</p>
      </div>
    </div>
    <div class="flex mt-3" v-if="list && list.length > 0">
      <div style="width: 100%">
        <h2 class="h5 title">타임라인</h2>
        <div class="card mb-4">
          <div class="card-body mt-3">
            <div class="vertical-timeline vertical-timeline--animate vertical-timeline--one-column">
              <div class="vertical-timeline-item vertical-timeline-element" v-for="(item, idx) in list" :key="idx">
                <div>
                  <span class="vertical-timeline-element-icon bounce-in">
                    <span class="icon"></span>
                  </span>
                  <div class="vertical-timeline-element-content bounce-in">
                    <strong class="timeline-title">
                      <span style="vertical-align: top;line-height: 14px">{{ item.dateSolar }}</span>
                      <img src="@/assets/img/icon_sun.png" width="12px" alt="양력" style="margin-top: 1px">
                    </strong>
                    <p class="age_txt">{{ item.korAge }} 세</p>
                    <span class="vertical-timeline-element-date">
                      <img src="@/assets/img/icon_moon.png" width="12px" alt="음력" style="margin-top: 1px">
                      <span style="vertical-align: top;line-height: 14px">{{ item.dateLunar }}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-3 mb-4"  v-else-if="clicked && form.leapMonth">
      <p class="text-center">😱 윤달이 아닌 것 같네요</p>
    </div>
    <p class="text-center" style="font-size: 10px">icon by <a href="https://icons8.kr/" target="_blank">icons8</a></p>
  </div>
</template>

<script>
import {getLunar, getSolar} from 'holiday-kr';

export default {
  name: 'App',
  data() {
    return {
      form: {
        // year: null,
        // month: null,
        // day: null,
        date: null,
        type: 'solar',
        leapMonth: false,
      },
      lunar: {
        day: null,
        dayOfWeek: null,
        leapMonth: false,
        month: null,
        year: null,
      },
      state: {
        isShowLunarDay: false
      },
      list: [],
      clicked: false
    }
  },
  watch:{
    form: {
      immediate: false,
      deep: true,
      handler() {
        this.clicked = false;
      }
    }
  },
  methods: {
    getDate(val) {
      const date = new Date(val);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      return {
        year, month, day
      }
    },
    reset() {
      this.list = [];
      this.lunar = {
        day: null, // 일
        dayOfWeek: null, // 요일
        leapMonth: false, // 윤달=true/평달
        month: null, // 월
        year: null, // 연도
      };
      this.state.isShowLunarDay = false;
    },
    onclickSubmit() {
      // 입력한 날짜
      const {year, month, day} = this.getDate(this.form.date);
      this.reset();

      if (year < 1800 || year > 2101) {
        alert('1800년부터 2101년까지만 확인 가능합니다.');
        return;
      }
      this.clicked = true;

      if (this.form.type === 'solar') {
        // 입력한 날짜를 음력으로 변환
        this.lunar = getLunar(year, month, day);
        this.state.isShowLunarDay = true;
      } else {
        this.lunar = {
          day: day, // 일
          dayOfWeek: null, // 요일
          leapMonth: this.form.leapMonth, // 윤달=true/평달
          month: month, // 월
          year: year, // 연도
        };
      }

      const lunarMonth = this.lunar.month; // 음력 생일 월
      const lunarDay = this.lunar.day; // 음력 생일 일
      const lunarLeapMonth = this.lunar.leapMonth; // 윤달여부

      // 100세까지 배열에 추가
      for (let i = 0; i < 100; i++) {
        const newYear = this.lunar.year + i; // 연도 증가

        // 변환된 음력값(해당연도-음력월-음력일)을 통해 양력으로 변환
        const solar = getSolar(newYear, lunarMonth, lunarDay, lunarLeapMonth)
        this.list.push({
          korAge: i + 1, // 한국나이
          year: newYear, // 연도
          dateLunar: `${newYear}년 ${lunarMonth}월 ${lunarDay}일`, // 음력
          dateSolar: `${solar.year}년 ${solar.month}월 ${solar.day}일(${solar.dayOfWeek})` // 양력
        })
      }
    }
  }
}
</script>

<style>
.container {
  max-width: 320px;
}

.flex {
  display: flex
}

.title {
  border-bottom: 1px solid #ddd;
  padding-bottom: 3px
}

th {
  vertical-align: middle;
  text-align: center;
}


.card {
  border-width: 0;
  transition: all .2s
}

.card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  width: 100%
}

.card-body {
  flex: 1 1 auto;
  padding: 0;
  margin: 0 auto;
}

.vertical-timeline {
  width: auto;
  display: inline-block;
  position: relative;
  padding: 1.5rem 0 1rem
}

.vertical-timeline::before {
  content: '';
  position: absolute;
  top: 0;
  left: 128px;
  height: 100%;
  width: 4px;
  background: #e9ecef;
  border-radius: .25rem
}

.vertical-timeline-element {
  position: relative;
  margin: 0 0 1rem
}

.vertical-timeline--animate .vertical-timeline-element-icon.bounce-in {
  visibility: visible;
  animation: cd-bounce-1 .8s
}

.vertical-timeline-element-icon {
  position: absolute;
  top: 0;
  left: 120px
}

.vertical-timeline-element-content {
  position: relative;
  margin-left: 145px;
  font-size: 14px;
  vertical-align: top;
}

.vertical-timeline-element-content .timeline-title {
  font-size: 14px;
  text-transform: uppercase;
  padding: 2px 0 0;
  font-weight: normal;
  vertical-align: top;
}

.vertical-timeline-element-content .vertical-timeline-element-date {
  display: block;
  position: absolute;
  left: -145px;
  top: 0;
  padding-right: 10px;
  text-align: right;
  color: #666;
  font-size: 14px;
  white-space: nowrap
}

.vertical-timeline-element-content:after {
  content: "";
  display: table;
  clear: both
}

.icon {
  display: inline-block;
  margin: 3px;
  width: 15px;
  height: 15px;
  border: 2px solid #999;
  border-radius: 15px;
  background-color: #fff;
}

img {
  vertical-align: top;
}

.age_txt {
  font-size: 13px;
  color: #666666;
}
</style>
