import {createRouter, createWebHistory} from "vue-router";
import ExampleCalendar from "@/components/Calendar/ExampleCalendar.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [

                {
                    path:'/calendar',
                    component:ExampleCalendar,
                    name:'ExampleCalendar'
                }


    ]
})

export default router;