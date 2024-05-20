export const Events = {
    data:() => ({
        titles: ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party'],
        colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
    }),
    methods: {
        generateEvents : function ({start,end}){
            const events = []

            const min = start
            const max = end
            const days = (max.getTime() - min.getTime()) / 86400000
            const eventCount = this.rnd(days, days + 5)

            for (let i = 0; i < eventCount; i++) {
                const allDay = this.rnd(0, 3) === 0
                const firstTimestamp = this.rnd(min.getTime(), max.getTime())
                const first = new Date(firstTimestamp - (firstTimestamp % 900000))
                const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000
                const second = new Date(first.getTime() + secondTimestamp)

                events.push({
                    title: this.titles[this.rnd(0, this.titles.length - 1)],
                    start: first,
                    end: second,
                    color: this.colors[this.rnd(0, this.colors.length - 1)],
                })
            }
            return events
        },
        rnd (a, b) {
            return Math.floor((b - a + 1) * Math.random()) + a
        },
    }
}
export default Events;
