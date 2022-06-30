<template>
  <div class="agenda">
    <div class="header">
      <div class="text">EVENTS</div>
      <a :href="submitUrl" target="_blank"><Button>Submit event</Button></a>
    </div>
    <div class="content">
      <Select
        class="select"
        :options="options"
        :default-option="selected"
        @update-selected="updateSelected"
      />
      <hr class="onlyDesktop" />
      <div class="day-switch">
        <div
          v-for="day in days"
          :key="day.key"
          class="day"
          :class="{ current: currentDay === day.key }"
          @click="setCurrentDay(day.key)"
        >
          <p class="onlyDesktop">{{ day.name }}</p>
          <p>{{ day.key }}</p>
        </div>
      </div>
      <div v-if="filteredEvents.length" class="events-list">
        <div
          v-for="event in filteredEvents"
          :key="event.title"
          class="row"
          :class="{ current: event.current }"
        >
          <div class="col svg-container" @click="makeEventFav(event.id)">
            <SvgIcon
              name="heart"
              :current-class="event.favorite ? 'fav' : 'default'"
            />
          </div>
          <p class="col">{{ event.startTime }} - {{ event.endTime }}</p>
          <div>
            <div class="trigger col" @click="showModal(event)">
              <p class="trigger title">{{ event.title }}</p>
            </div>
          </div>
          <div class="col categories">
            <p
              v-for="category in event.categories"
              :key="category"
              class="label"
              :class="{ current: event.current }"
            >
              {{ category }}
            </p>
          </div>
        </div>
      </div>
      <Empty v-else :day="currentDay" :category="selected.label" />
      <transition name="appear">
        <EventInfoModal
          v-if="currentEvent"
          :event="currentEvent"
          @close="closeModal"
        />
      </transition>
    </div>
  </div>
</template>

<script>
import { fetchEvents } from '../fetchEvents'
import { getDay } from '../utils'
import { EVENT_CATEGORIES, WEEK, EVENTS_URL } from '~/constants.js'
import { SUBMIT_EVENT_URL } from '~/constants'

export default {
  data() {
    return {
      submitUrl: SUBMIT_EVENT_URL,
      days: WEEK,
      options: EVENT_CATEGORIES,
      eventsUrl: EVENTS_URL,
      selected: { label: 'all' },
      filteredEvents: [],
      selectedEvents: [],
      currentDay: '12',
      currentEvent: null,
      isModalVisible: false,
      events: [],
      favorites: [],
    }
  },
  async fetch() {},
  computed: {
    keyDays() {
      return Object.keys(this.days)
    },
  },
  watch: {
    favorites() {
      this.setFavorites()
    },
    currentDay() {
      this.filterEvents(this.selectedEvents)
    },
  },
  async mounted() {
    // Load events from csv stored in github
    this.events = await fetchEvents(this.eventsUrl)
    // Load favorites from localStorage
    this.loadFavorites()
    // Add favorite key to the events stored as fav in localStorage
    this.setFavorites()
    this.setCurrentEvent()
    // Show events for the default day
    this.filterEvents()
  },
  methods: {
    loadFavorites() {
      this.favorites = JSON.parse(localStorage.getItem('favorites')) || []
    },
    setFavorites() {
      if (this.favorites) {
        this.events = this.events.map((event) => {
          return {
            ...event,
            favorite: this.favorites.find((favorite) => favorite === event.id),
          }
        })
        // Filter event to re-render favorites
        this.filterEvents()
      }
    },
    makeEventFav(id) {
      if (this.favorites.includes(id)) {
        this.favorites = this.favorites.filter((x) => x !== id)
      } else {
        this.favorites.push(id)
      }

      if (process.browser) {
        localStorage.setItem('favorites', JSON.stringify(this.favorites))
      }
      this.$nextTick(() => {
        this.updateSelected(this.selected)
      })
    },
    setCurrentDay(day) {
      this.currentDay = day
    },
    showModal(event) {
      document.body.style.top = `-${window.scrollY}px`
      document.body.style.position = 'fixed'
      this.$nextTick(() => {
        this.currentEvent = event
      })
    },
    closeModal() {
      this.currentEvent = null
      this.$nextTick(() => {
        const scrollY = document.body.style.top
        document.body.style.position = ''
        document.body.style.top = ''
        window.scrollTo(0, parseInt(scrollY || '0') * -1)
      })
    },
    setCurrentEvent() {
      this.events.map((event) => {
        if (
          event.startTimestamp < new Date().getTime() &&
          event.endTimestamp > new Date().getTime()
        ) {
          this.currentDay = getDay(event.endTimestamp)
          event.current = true
        } else {
          event.current = false
        }
        return event
      })
      this.selectedEvents = this.events
    },
    filterEvents(events) {
      const eventsToFilter = events || this.events
      const isTimeForEvent = this.days[this.currentDay].timestamp
      const endForLastDay =
        this.days[this.keyDays[this.keyDays.length - 1]].timestamp + 86400000

      if (!isTimeForEvent) {
        this.currentDay = this.keyDays[0]
      }
      this.filteredEvents = eventsToFilter
        .filter((event) => {
          const upperLimit =
            this.days[(parseInt(this.currentDay) + 1).toString()] !== undefined
              ? this.days[(parseInt(this.currentDay) + 1).toString()].timestamp
              : endForLastDay

          return (
            event.startTimestamp < upperLimit &&
            event.endTimestamp > this.days[this.currentDay].timestamp
          )
        })
        .sort((ev1, ev2) => ev1.startTimestamp - ev2.startTimestamp)
    },
    updateSelected(selectedOption) {
      this.selected = selectedOption
      if (this.selected.label === 'all') {
        this.selectedEvents = this.events
      } else if (this.selected.label === 'favorites') {
        this.selectedEvents = this.events.filter((event) => {
          return event.favorite
        })
      } else {
        this.selectedEvents = this.events.filter((event) => {
          return event.categories
            .map((category) => category.toLowerCase())
            .includes(this.selected.label.toLowerCase())
        })
      }
      this.filterEvents(this.selectedEvents)
    },
  },
}
</script>

<style scoped lang="scss">
.appear-enter-active {
  transition: all 0.3s ease-in-out;
}
.appear-leave-active {
  transition: all 0.3s ease-in-out;
}
.current {
  color: $yellow;
  background-color: $black;
  &.label {
    border: 1px solid $red;
  }
}
.agenda {
  background-color: $yellow;
  display: grid;
  grid-template: max-content 1fr / 1fr;
  row-gap: 34px;
  justify-content: center;
  padding-bottom: 100px;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 34px 0;
    width: 1200px;
    margin: 0px auto;

    .text {
      font-size: 64px;
    }
  }
  .content {
    max-width: 1200px;
    margin: 0px auto;
    display: grid;
    grid-template: max-content 1fr / 1fr;
    row-gap: 0px;

    .select {
      margin-bottom: 30px;
    }
    hr {
      border: 1px solid $black;
    }

    .day-switch {
      display: flex;
      justify-content: space-around;
      width: 1200px;
      margin-bottom: 50px;
    }
    .row {
      background-color: $white;
      display: grid;
      grid-template-columns: max-content auto auto 1fr;
      padding: 24px;
      font-size: 18px;
      grid-column-gap: 34px;
      align-items: center;
      justify-content: center;
      border-bottom: 2px solid $black;
    }
    .svg-container {
      cursor: pointer;
    }
    .title {
      text-decoration: underline;
      cursor: pointer;
    }
    .col {
      margin: 16px;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;

      &.categories {
        justify-content: flex-end;
      }

      .label {
        border: 2px solid $black;
        border-radius: 80px;
        width: max-content;
        padding: 5px 24px;
        margin: 8px;
        font-size: 16px;
        text-transform: uppercase;
      }
      .current {
        &.label {
          border: 1px solid $red;
        }
      }
    }
    .day {
      width: 104px;
      padding: 16px 8px;
      font-size: 50px;
      font-family: 'NeueBitBold', 'Courier New', Arial, Helvetica, sans-serif;
      cursor: pointer;
      text-align: center;
    }
  }
}
@media (max-width: 1200px) {
  .agenda {
    justify-content: flex-start;
    row-gap: 0px;
    .header {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      width: initial;
      margin: 0px 20px;
      .select {
        align-self: flex-end;
        margin-top: 24px;
      }

      .button {
        font-size: 20px;
      }
    }
    .content {
      // grid-template-columns: 70px 1fr;
      grid-column-gap: 24px;
      justify-content: flex-start;
      flex-direction: column;
      width: initial;
      margin: 0px 20px;

      .day-switch {
        flex-direction: row;
        justify-content: center;
        position: sticky;
        top: 0;
        // height: 100vh;
        width: 100%;
        .day {
          // background-color: transparent;
          border-top: 2px solid $black;
          border-right: 2px solid $black;
          border-bottom: 2px solid $black;
          width: initial;
          min-width: 50px;
          flex-grow: 1;
        }

        :first-child {
          border-left: 2px solid $black;
        }
      }

      .events-list {
        .row {
          display: flex;
          flex-direction: column;
          justify-content: left;
          align-items: flex-start;
          font-size: 20px;

          .col {
            text-align: center;
            margin: 8px;

            .label {
              font-size: 18px;
            }

            &.categories {
              justify-content: center;
              margin-right: 0;
              margin-left: 0;
            }
          }
        }
      }
    }
  }
}
</style>
