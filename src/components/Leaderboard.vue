<template>
  <section class="section has-text-centered">
    <div class="content">
      <p class="is-size-5"><strong>Here's the current leaderboard</strong></p>
    </div>
    <b-table :data="leaders" striped narrowed hoverable>
      <template slot-scope="props">
        <b-table-column label="#" width="40" numeric>
          {{ props.row.placement }}
        </b-table-column>
        <b-table-column label="NIckname">
          {{ props.row.nickname }}
        </b-table-column>
        <b-table-column label="When" centered>
          {{ new Date(props.row.date).toLocaleDateString() }}
        </b-table-column>
        <b-table-column label="Difficulty">
          {{ props.row.difficulty }}
        </b-table-column>
        <b-table-column label="Points">
          {{ props.row.points }}
        </b-table-column>
      </template>
      <!-- <template slot="footer">
        <div class="has-text-centered">
          <p>Honor and glory to the first 10 players!</p>
          <p class="is-size-7">Updated to {{new Date().toLocaleDateString()}}</p>
        </div>
      </template> -->
      <template slot="empty">
        <section class="section">
          <div class="content has-text-grey has-text-centered">
            <p>
              <b-icon
                icon="emoticon-sad"
                size="is-large">
              </b-icon>
            </p>
            <p>There are no leaders yet, you can be one the first one!!!</p>
          </div>
        </section>
      </template>
    </b-table>
    <div class="content has-text-centered" v-if="leaders.length > 0">
      <br />
      <p class="is-size-6">Honor and glory to the first {{leaders.length}} players!</p>
      <p class="is-size-7">Updated to {{new Date().toLocaleDateString()}}</p>
    </div>
  </section>
</template>

<script>
export default {
  computed: {
    leaders () {
      return this.$store.state.leaderboard
    }
  },
  mounted () {
    this.$store.dispatch('getLeaderboards')
  }
}
</script>

<style scoped>
#no-content {
  font-style: italic;
}
</style>
