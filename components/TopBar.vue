<template>
  <div class="top">
    <img
      class="headerImageDesktop"
      :src="require('~/assets/HEADER_DESKTOP.png')"
    />
    <img
      class="headerImageMobile"
      :src="require('~/assets/HEADER_MOBILE.png')"
    />
    <div class="description">
      <div class="descriptionLeft">
        <hr />
        <p>ABOUT</p>
        <hr class="onlyDesktop" />

        <a
          href="https://twitter.com/BerBlockWeek"
          target="_blank"
          class="onlyDesktop"
        >
          <font-awesome-icon :icon="['fab', 'twitter']" />
        </a>

        <a
          href="https://t.me/BerlinBlockchainWeek"
          target="_blank"
          class="onlyDesktop"
        >
          <font-awesome-icon :icon="['fab', 'telegram']" />
        </a>
      </div>
      <div class="descriptionRight">
        <hr class="onlyDesktop" />
        <p>
          Blockchain Week Berlin is a decentralized community-organized
          initiative. There is no single owner. It is an agnostic movement based
          on the premise that self-organization is the backbone of the
          ecosystem. We invite projects, individuals and anyone interested in
          fruitful and educational discussions to join us in Berlin in
          September.
        </p>
        <p>
          Blockchain Week Berlin is committed to reduce the noise from the
          market and focus on education, in order to push mass adoption by
          providing first-hand information about the industry.
        </p>
        <p>
          Our concept is simple: keep it educational, try to be as cost-friendly
          for the community as you can (bearing in mind, we all need to pay
          bills - so not all events are free!) and to create a welcoming and
          inclusive environment, so interested parties at anyknowledge level
          feel comfortable to join.
        </p>
        <hr class="onlyMobile" />

        <a
          href="https://twitter.com/BerBlockWeek"
          target="_blank"
          class="onlyMobile"
        >
          <font-awesome-icon :icon="['fab', 'twitter']" />
        </a>

        <a
          href="https://t.me/BerlinBlockchainWeek"
          target="_blank"
          class="onlyMobile"
        >
          <font-awesome-icon :icon="['fab', 'telegram']" />
        </a>
      </div>
    </div>
  </div>
</template>

<script></script>

<style lang="scss" scoped>
.top {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;

  .headerImageDesktop {
    width: 100%;
  }

  .headerImageMobile {
    width: 100%;
    display: none;
  }

  .description {
    max-width: 1200px;
    margin: 85px auto 120px auto;

    hr {
      border: 1px #000 solid;
      margin-bottom: 20px;
    }
    .descriptionLeft {
      width: 393px;
      margin-right: 145px;
      float: left;

      p {
        font-size: 64px;
        margin-top: 10px;
        margin-bottom: 70px;
      }

      a {
        color: $black;
        font-size: 54px;
        margin-top: 10px;
        padding-right: 100px;

        :hover {
          color: $red;
        }
      }
    }

    .descriptionRight {
      margin-left: 538px;

      hr {
        margin-bottom: 20px;
        width: 100%;
      }

      p {
        margin-bottom: 20px;
      }

      a {
        color: $black;
        font-size: 54px;
        margin-top: 10px;
        padding-right: 100px;

        :hover {
          color: $red;
        }
      }
    }
  }
}

@media (max-width: 1200px) {
  .top {
    .headerImageDesktop {
      display: none;
    }

    .headerImageMobile {
      display: block;
    }
    .description {
      margin: 100px 20px;

      .descriptionLeft {
        float: none;
        width: 100%;

        p {
          font-size: 48px;
          margin-bottom: 25px;
        }
      }
      .descriptionRight {
        margin-left: 0px;
      }
    }
  }
}
</style>
