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
            <th>음력 > 양력</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, idx) in list" :key="idx">
            <td>{{item.dateSun}}</td>
            <td>{{item.korAge}}</td>
<!--            <td>{{item.korAge - 1}}</td>-->
            <td>{{item.date}}</td>
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
        day: null,
        dayOfWeek: null,
        leapMonth: false,
        month: null,
        year: null,
      };
      const { year, month, day } = this.form
      this.lunar = getLunar(year, month, day)
      const lunarMonth = this.lunar.month;
      const lunarDay = this.lunar.day;
      const lunarLeapMonth = this.lunar.leapMonth;


      for(let i = 0;i < 100; i++) {
        const newYear = this.lunar.year + i;

        const solar = getSolar(newYear, lunarMonth, lunarDay, lunarLeapMonth)
        this.list.push({
          korAge: i + 1,
          since: newYear,
          dateSun: `${newYear}년 ${lunarMonth}월 ${lunarDay}일`,
          date: `${solar.year}년 ${solar.month}월 ${solar.day}일 (${solar.dayOfWeek})`
        })
      }

    }
  }
}
</script>

<style>
td{text-align: center}
</style>
