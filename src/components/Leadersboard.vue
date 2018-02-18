<template>
  <b-table :data="leaders">
    <template slot-scope="props">
        <b-table-column label="#" width="40" numeric>
            {{ props.row.placement }}
        </b-table-column>
        <b-table-column label="NIckname">
            {{ props.row.nickname }}
        </b-table-column>
        <b-table-column label="When" centered>
            {{ props.row.date.toLocaleDateString() }}
        </b-table-column>
        <b-table-column label="Difficulty">
            {{ props.row.difficulty }}
        </b-table-column>
        <b-table-column label="Points">
            {{ props.row.points }}
        </b-table-column>
    </template>
    <template slot="footer">
        <div class="has-text-centered">
            Bulvia &copy; Matteo Merola {{new Date().getFullYear()}}
        </div>
    </template>
  </b-table>
</template>

<script>
import _ from 'lodash'
export default {
  data() {
    let leaders = [
      { 'nickname': 'Jesse', 'date': new Date(), 'difficulty': 'Easy', 'points': 368 },
      { 'nickname': 'John', 'date': new Date(), 'difficulty': 'Medium', 'points': 50 },
      { 'nickname': 'Tina', 'date': new Date(), 'difficulty': 'Difficult', 'points': 658 },
      { 'nickname': 'Clarence', 'date': new Date(), 'difficulty': 'Medium', 'points': 368 },
      { 'nickname': 'Anne', 'date': new Date(), 'difficulty': 'Easy', 'points': 500 }
    ]
    leaders = _.sortBy(leaders, ['points'])
    leaders = _.reverse(leaders)
    leaders = leaders.map((el, idx) => {
      return {...el, placement: idx + 1}
    })
    return {
      leaders
    }
  }
}
</script>
