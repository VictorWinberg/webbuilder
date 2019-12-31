<template>
  <div>
    <h1>{{ name }}</h1>
    <b-table
      ref="table"
      class="all-table"
      :data="items"
      detailed
      detail-key="name"
      :show-detail-icon="false"
    >
      <template slot-scope="props">
        <b-table-column field="name" label="Name">
          {{ props.row.name }}
        </b-table-column>
        <b-table-column field="relation" label="Relation">
          {{ props.row.relation.entity }}
        </b-table-column>
        <b-table-column field="type" label="Type">
          {{ props.row.type }}
        </b-table-column>
        <b-table-column field="validations" label="Validations">
          <span
            v-if="props.row.validations.length > 0"
            class="toggle"
            @click="toggle(props.row)"
          >
            {{ props.row.validations.length }} Validations
            <b-icon
              class="icon"
              pack="fas"
              icon="chevron-down"
              size="is-small"
            />
          </span>
          <span v-else>
            No Validations
          </span>
        </b-table-column>
        <b-table-column field="actions" label="Actions">
          <div class="buttons">
            <b-button type="is-primary">
              <b-icon pack="fas" icon="edit" size="is-small" />
            </b-button>
            <b-button type="is-danger">
              <b-icon pack="fas" icon="trash" size="is-small" />
            </b-button>
          </div>
        </b-table-column>
      </template>
      <template slot="detail" slot-scope="props">
        <div class="validation-title">Validations</div>
        <b-table :data="props.row.validations">
          <template slot-scope="props">
            <b-table-column field="key" label="Key">
              {{ props.row.key }}
            </b-table-column>
            <b-table-column field="value" label="Value">
              {{ props.row.value }}
            </b-table-column>
          </template>
        </b-table>
      </template>
    </b-table>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "EntityEdit",
  props: {
    name: { required: true }
  },
  data() {
    return {
      loading: false
    };
  },
  computed: {
    entity() {
      return this.$store.state.entity.current;
    },
    columns() {
      const keys = Object.keys(this.entity.fields[0]);
      return keys.map(obj => ({
        text: obj,
        value: obj
      }));
    },
    items() {
      return this.entity.fields;
    }
  },
  created() {
    this.refreshEntity();
  },
  methods: {
    toggle(row) {
      console.log(row);
      this.$refs.table.toggleDetails(row);
    },
    async refreshEntity() {
      this.loading = true;
      await this.$store.dispatch("entity/read", this.name);
      this.loading = false;
    },
    async editEntity(name: string) {
      if (this.valid()) {
        await this.$store.dispatch("entity/update", {
          name,
          title: this.entity.title,
          content: this.entity.content
        });

        this.back();
      }
    },
    valid(): boolean {
      return this.entity.title !== "" && this.entity.content !== "";
    },
    showEntity(id: string) {
      this.$router.push({
        name: "EntityShow",
        params: { id }
      });
    },
    back() {
      this.$router.push({ name: "EntityList" });
    }
  }
});
</script>

<style scoped lang="scss">
.toggle .icon {
  vertical-align: middle;
  padding: 1rem;
}

.all-table {
  border-radius: 10px;
  margin: 1rem;
}

.validation-title {
  font-weight: 600;
  font-size: 1em;
  margin-bottom: 1rem;
}
</style>
