<template>
  <v-app>
    <v-container fluid>
      <v-row>
        <v-col cols="1"></v-col>
        <v-col cols="10">
          <v-card-text elevation="2" border>
            <v-locale-provider locale="it">
              <v-row v-if="loadingCalendar" justify="center" align="center">
                <v-col cols="12" style="text-align: center">
                  <v-progress-circular  indeterminate :size="150" color="memberYellow"
                                        style="margin-top: 3vw"
                  ></v-progress-circular></v-col>
              </v-row>
              <v-calendar
                  v-else
                  ref="calendarHome"
                  :events="eventsUser"
                  :view-mode="viewMode"
                  v-model="calendar"
                  show-adjacent-months
                  :model-value="calendar"
                  @click.stop="openDay"
                  :min="new Date()"
              >
                <template v-slot:header>
                  <v-row>
                    <v-col cols="4" style="text-align: left">
                      <v-btn
                          color="#E67E22"
                          icon="mdi-plus"
                          variant="flat"
                          alt="Aggiungi evento"
                          title="Aggiungi evento"
                          @click="openCreate"
                          style="color:#ffffff!important;"
                          v-if="(viewMode === 'month')"
                      >
                      </v-btn>
                      <v-btn variant="flat"
                             icon="mdi-calendar-today"
                             @click="createEventToday"
                             color="primary"
                             :alt="'Crea evento per il '+calendar.toLocaleString('it-IT',{
                                  day:'2-digit',
                                  month:'long',
                                  year:'numeric'
                               })"
                             :title="'Crea evento per il '+calendar.toLocaleString('it-IT',{
                                  day:'2-digit',
                                  month:'long',
                                  year:'numeric'
                               })"
                             v-if="(viewMode === 'day') && isMin"
                      >
                      </v-btn>
                      <v-btn  v-if="(viewMode === 'day')"
                              variant="flat"
                              icon="mdi-calendar-month"
                              @click="changeViewMode('month')"
                              color="info" style="margin-right: 3px;"
                              alt="Imposta la vista mese"
                              title="Imposta la vista mese">
                      </v-btn>
                    </v-col>
                    <v-col cols="4" style="text-align: center;">
                      <v-sheet><strong style="text-transform: uppercase;font-size: 20px">{{month}}</strong></v-sheet>
                    </v-col>
                    <v-col cols="4" style="text-align: right;">
                      <v-btn variant="flat" icon="mdi-skip-previous-outline" @click="changeDay(false)"  color="memberGrey" style="margin-right: 3px;" alt="Indietro" title="Indietro">
                      </v-btn>
                      <v-btn variant="flat" icon="mdi-skip-next-outline"  @click="changeDay(true)" color="memberGrey" style="margin-right: 3px;" alt="Avanti" title="Avanti">
                      </v-btn>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12"><div style="height: 0.15vw"></div></v-col>
                  </v-row>
                </template>
                <template v-slot:event="{day,allDay,event}" style="text-align: center">
                  <v-menu
                      location="top"
                      open-on-click
                      transition="scale-transition"
                  >
                    <template v-slot:activator="{props}">
                      <v-sheet
                          v-bind="props"
                          border
                          elevation="2"
                          color="#D6EAF8"
                          rounded
                          style="margin-bottom: 3px;font-size: 11px;cursor: pointer"
                      >
                        <v-icon icon="mdi-circle"
                                :color="event.color"
                                :alt="JSON.stringify(day)+';'+allDay"
                        ></v-icon>
                        {{(cutString(event.title))}}
                      </v-sheet>

                    </template>
                  </v-menu>
                </template>
              </v-calendar>
            </v-locale-provider>
          </v-card-text>

        </v-col>
        <v-col cols="1"></v-col>
      </v-row>


    </v-container>
  </v-app>
</template>
<script>

import {
  VCalendar,
} from "vuetify/labs/components";
import {useDate} from "vuetify";
import Events from "@/mixins/Events";

export default {
  name: "ExampleCalendar",
  components:{VCalendar},
  mixins:[Events],
  data: () => ({
    loadingCalendar: false,
    eventsUser: [],
    viewMode: 'month',
    calendar: new Date(),
    isMin: true,
    month: null,
    date: new Date(),
    getMonths:["gennaio","febbraio","marzo","aprile","maggio","giugno","luglio","agosto","settembre","ottobre","novembre","dicembre"],
  }),
  methods:{
    getList: function (){
      let adapter = useDate();
      this.eventsUser = this.generateEvents({ start: adapter.startOfDay(adapter.startOfMonth(new Date())), end: adapter.endOfDay(adapter.endOfMonth(new Date())) });
    },
    openCreate: function (){
      alert("Open form for create new event")
    },
    openDay: function (event){
      let day        =  event.target.outerText;
      if(!isNaN(parseInt(day))  && (parseInt(day) >= 1 && parseInt(day) <=31)) {
        let splitMonth = this.month.split(' ')
        let idMonth    = this.getMonths.findIndex(e => {
          return e.toString().toUpperCase() === (splitMonth[0]).toString().toUpperCase()
        })
        let date = new Date(splitMonth[1] + '-' + (idMonth + 1).toString().padStart(2, '0') + '-' + day.toString().padStart(2, '0'))
        alert('day='+date)
        if(date.toString().indexOf('Invalid') !== -1) {
          this.changeViewMode('month')
          event.stopPropagation()
        }
        else{
          this.changeViewMode('day')
          this.calendar = date
          this.ctrlIsMin()
        }

      }else
        event.stopPropagation()
    },
    createEventToday: function (){
      alert("Open form for create new event")
    },
    changeViewMode: function (view){
      this.viewMode = view
    },
    changeDay: function (isUpDown){
      const date = new Date(this.calendar);
      if(isUpDown){
        if(this.viewMode === 'day')
          date.setDate(date.getDate() + 1);
        else if(this.viewMode === 'week')
          date.setDate(date.getDate() + 7);
        else if(this.viewMode === 'month')
          date.setMonth(date.getMonth()+1)
      }
      else {
        if(this.viewMode === 'day')
          date.setDate(date.getDate() - 1);
        else if(this.viewMode === 'week')
          date.setDate(date.getDate() - 7);
        else if(this.viewMode === 'month')
          date.setMonth(date.getMonth()-1)
      }
      this.calendar = date;
      this.day      = date
      this.ctrlIsMin()
    },
    cutString: function (string){
      if(string.length > 25)
        return string.toString().substring(0,25)+" ..."
      else
        return  string;
    },
    ctrlIsMin: function (){
      let date = new Date();
      this.isMin = this.calendar.getFullYear()+(this.calendar.getMonth()+1).toString().padStart(2,"0")+this.calendar.getDate().toString().padStart(2,'0') >= date.getFullYear()+(date.getMonth()+1).toString().padStart(2,"0")+date.getDate().toString().padStart(2,'0')
    }
  }, created() {
    this.getList();
    this.month = this.date.toLocaleString('it-IT',{month:'long',year:'numeric'})
  },
  watch:{
    calendar: {
      deep:true,
      handler: function (value){
        let monthId     = value.getMonth()
        let actualMonth = this.getMonths.findIndex(e => {
          return e.toString().toUpperCase().trim() === (this.month.toString().split(" ")[0]).toString().toUpperCase().trim()
        })
        if(actualMonth > 0 && parseInt(monthId) !== actualMonth) {
          let date = new Date()
          date.setMonth(monthId)
          this.month = date.toLocaleString('it-IT', {month: 'long', year: 'numeric'})
        }
      }
    },
    viewMode:{
      deep:true,
      handler: function (value){
        if(value === 'day'){
          this.ctrlIsMin()
        }

      }
    },
    dateOpen:{
      deep:true,
      handler: function (value){
        this.changeViewMode('day')
        this.calendar = value
        this.ctrlIsMin()
      }
    }
  },
  mounted() {

  }
}
</script>