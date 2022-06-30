<template>
  <div>
    <div class="overlay"></div>
    <FrameOutside @click="closeModal" @focus="closeModal">
      <div tabindex="0" class="modal" @keydown.esc="close">
        <div class="close-btn" @click="closeModal">
          <font-awesome-icon :icon="['fas', 'xmark']" />
        </div>
        <div class="main">
          <div class="header">
            <p class="time">{{ event.startTime }} - {{ event.endTime }}</p>
            <h2>
              {{ event.title }}
            </h2>
          </div>
          <div class="content">
            <p v-for="paragraph in paragraphs" :key="paragraph" class="text">
              {{ paragraph }}
            </p>
            <p class="text">
              {{ event.venue }}
              <a
                class="address"
                :href="`https://www.google.com/maps/dir/?api=1&destination=${event.address}`"
                target="_blank"
              >
                {{ event.address }}
              </a>
            </p>
            <a
              class="calendar-btn text"
              :href="`https://www.google.com/calendar/render?action=TEMPLATE&text=${event.title}&location=${event.address}&dates=${calendarStartDate}%2F${calendarEndDate}`"
              target="_blank"
              >Add event to Google Calendar</a
            >
            <a
              v-if="event.url"
              class="register-btn text"
              :href="event.url"
              target="_blank"
              >Event Url</a
            >
          </div>
        </div>
      </div>
    </FrameOutside>
  </div>
</template>

<script>
import { getCalendarDate } from '../utils'

export default {
  props: {
    event: {
      type: Object,
      required: true,
    },
  },
  computed: {
    calendarStartDate() {
      console.log(this.event)
      return this.getCalendarDate(this.event.startTimestamp)
    },
    calendarEndDate() {
      return this.getCalendarDate(this.event.endTimestamp)
    },
    paragraphs() {
      return this.event.description
        .split(/<br>|\n/)
        .map((x) => x.trim())
        .filter((x) => !!x)
    },
  },
  methods: {
    closeModal() {
      this.$emit('close')
    },
    getCalendarDate,
  },
}
</script>
<style lang="scss" scoped>
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0px;
  background: $overlay;
}
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: $white;
  color: $black;
  min-width: 400px;
  grid-gap: 24px;
  .main {
    max-height: 70vh;
    overflow-y: auto;
    overflow-x: hidden;
    -ms-overflow-style: none; /* Internet Explorer 10+ */
    scrollbar-width: none; /* Firefox */
  }
  .main::-webkit-scrollbar {
    display: none;
  }

  .close-btn {
    position: fixed;
    cursor: pointer;
    top: 16px;
    right: 16px;
    font-size: 36px;
    line-height: 36px;
  }
  .header {
    font-size: 16px;
    padding: 32px;

    .time {
      font-size: 22px;
      font-weight: 600;
      margin-bottom: 16px;
    }
  }
  .content {
    padding: 0 32px 32px 32px;

    .subtitle {
      margin-bottom: 8px;
    }

    .text {
      line-height: 1.5;
      margin-bottom: 16px;
    }
    .address {
      color: $black;
      display: flex;
      flex-direction: column;
    }
    .calendar-btn {
      color: $black;
      text-decoration: underline;
      cursor: pointer;
      display: block;
    }
    .register-btn {
      color: $black;
      text-decoration: underline;
      cursor: pointer;
      display: block;
    }
  }
}
@media (max-width: 1200px) {
  .modal {
    min-width: 0;
    left: 0%;
    transform: translate(0%, -50%);
    width: 100%;

    .main {
      max-height: 100vh;
      overflow-y: auto;
      overflow-x: hidden;
    }
  }
}
</style>
