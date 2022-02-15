<template>
  <div id="app" class="container">
    <div class="px-4 py-5 my-5">
      <h1 class="h3 fw-bold mb-5 text-center">음력 생일은 언제일까?</h1>
      <div class="flex" style="justify-content: center">
        <div style="width: 320px">
          <h2 class="h5 title mb-3">태어난 날</h2>
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
            <input type="date" v-model="form.date" placeholder="태어난 날" class="form-control form-control-lg">
            <!--      <input type="number" v-model.number="form.year" placeholder="연" maxlength="4" class="form-control form-control-lg">-->
            <!--      <input type="number" v-model.number="form.month" placeholder="월" maxlength="2" class="form-control form-control-lg">-->
            <!--      <input type="number" v-model.number="form.day" placeholder="일" maxlength="2" class="form-control form-control-lg">-->
            <button type="button" class="btn btn-secondary" :disabled="!form.date" @click="onclickSubmit">확인</button>
          </div>
        </div>
      </div>
    </div>
    <div class="flex mt-3" style="justify-content: center" v-if="state.isShowLunarDay">
      <div style="width: 320px">
        <h2 class="h5 title">음력</h2>
        <p>{{ lunar.year }}년 {{ lunar.month }}월 {{ lunar.day }}일 {{ lunar.leapMonth ? '윤달' : '평달' }}</p>
      </div>
    </div>
    <div class="flex mt-3" style="justify-content: center" v-if="list && list.length > 0">
      <div style="min-width: 320px">
      <table class="table table-striped">
        <caption class="visually-hidden">표</caption>
        <thead>
        <tr>
          <th>한국<br/>나이</th>
          <th>음력</th>
          <!--            <th>만 나이</th>-->
          <th>양력</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, idx) in list" :key="idx">
          <td>{{ item.korAge }}</td>
          <td>{{ item.dateLunar }}</td>
          <!--            <td>{{item.korAge - 1}}</td>-->
          <td>{{ item.dateSolar }}</td>
        </tr>
        </tbody>
      </table>
      </div>
    </div>
  </div>
</template>

<script>
import {getLunar, getSolar} from 'holiday-kr'
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
      list: []
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
      const { year, month, day } = this.getDate(this.form.date);
      this.reset();

      if (year < 1800 || year > 2101) {
        alert('1800년부터 2101년까지만 확인 가능합니다.');
        return;
      }

      if (this.form.type=== 'solar') {
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
      for(let i = 0;i < 100; i++) {
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
.flex {
  display: flex
}
.title {
  border-bottom: 1px solid #ddd; padding-bottom: 3px
}
th {
  vertical-align: middle;
  text-align: center;
}
</style>
