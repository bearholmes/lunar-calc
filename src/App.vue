<template>
  <div id="app">
    <div>
      <strong>양력</strong>
      <input type="number" v-model.number="form.year" placeholder="연" maxlength="4">
      <input type="number" v-model.number="form.month" placeholder="월" maxlength="2">
      <input type="number" v-model.number="form.day" placeholder="일" maxlength="2">
      <button type="button" @click="onclickSubmit">확인</button>
    </div>
    <div style="margin-top: 30px">
      <p>음력 : {{lunar.year}}년 {{lunar.month}}월 {{lunar.day}}일 ({{lunar.dayOfWeek}}) {{lunar.leapMonth ? '윤달' : '평달'}}</p>
    </div>
    <div style="margin-top: 30px">
      <table>
        <caption style="display: none">표</caption>
        <thead>
          <tr>
            <th>음력</th>
            <th>한국나이</th>
<!--            <th>만 나이</th>-->
            <th>양력</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, idx) in list" :key="idx">
            <td>{{item.dateLunar}}</td>
            <td>{{item.korAge}}</td>
<!--            <td>{{item.korAge - 1}}</td>-->
            <td>{{item.dateSolar}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import {getLunar, getSolar} from 'holiday-kr'
export default {
  name: 'App',
  components: {},
  data() {
    return {
      form: {
        year: null,
        month: null,
        day: null
      },
      lunar: {
        day: null,
        dayOfWeek: null,
        leapMonth: false,
        month: null,
        year: null,
      },
      list: []
    }
  },
  methods: {
    onclickSubmit() {
      console.log('onclickSubmit')
      this.list = [];

      this.lunar = {
        day: null, // 일
        dayOfWeek: null, // 요일
        leapMonth: false, // 윤달=true/평달
        month: null, // 월
        year: null, // 연도
      };

      // 입력한 날짜
      const { year, month, day } = this.form

      // 입력한 날짜를 음력으로 변환
      this.lunar = getLunar(year, month, day)
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
          dateSolar: `${solar.year}년 ${solar.month}월 ${solar.day}일 (${solar.dayOfWeek})` // 양력
        })
      }

    }
  }
}
</script>

<style>
td{text-align: center}
</style>
