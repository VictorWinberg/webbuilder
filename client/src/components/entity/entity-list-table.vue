<template>
  <div class="list-table">
    <div v-for="(entity, index) in entities" :key="index" class="entity">
      <div class="entity-header">
        <h2>{{ entity.entity }}</h2>
        <div class="buttons">
          <b-button type="is-primary" @click="editEntity(index)">
            <b-icon pack="fas" icon="edit" size="is-small" />
          </b-button>
          <b-button type="is-danger" @click="removeEntity(entity.name)">
            <b-icon pack="fas" icon="trash" size="is-small" />
          </b-button>
        </div>
      </div>
      <div v-for="field in entity.fields" :key="field.name" class="entity-data">
        <div class="entity-field">
          <h3>Name:</h3>
          <p>{{ field.name }}</p>
        </div>
        <div class="entity-field">
          <h3>Validation:</h3>
          <div v-if="field.validations.length > 0">
            <div v-for="validation in field.validations" :key="validation.key">
              <div class="validation-field">
                <h4>Key:</h4>
                <p>{{ validation.key }}</p>
              </div>
              <div class="validation-field">
                <h4>Value:</h4>
                <p>{{ validation.value }}</p>
              </div>
            </div>
          </div>
          <p v-else class="faded-light">No validation</p>
        </div>
        <div class="entity-field">
          <h3>Relation</h3>
          <p v-if="field.relation.entity">
            {{ field.relation.entity }}
          </p>
          <p v-else class="faded-light">No relation</p>
        </div>
        <div class="entity-field">
          <h3>Type:</h3>
          <p>{{ field.type }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "EntityListTable",
  data() {
    return {
      loading: false
    };
  },
  computed: {
    entities() {
      return this.$store.state.entity.all;
    }
  },
  created() {
    this.refreshEntities();
  },
  methods: {
    async refreshEntities() {
      this.loading = true;
      await this.$store.dispatch("entity/list");
      this.loading = false;
    },
    async editEntity(index: number) {
      await this.$store.commit("entity/setEntity", this.entities[index]);
      this.$router.push({
        name: "EntityEdit",
        params: { name: this.entities[index].name }
      });
    },
    async removeEntity(name: string) {
      this.loading = true;
      await this.$store.dispatch("entity/remove", name);
      await this.refreshEntities();
      this.loading = false;
    }
  }
});
</script>

<style lang="scss">
h2 {
  text-transform: capitalize;
}

.list-table {
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
  text-align: left;
}

.buttons {
  display: inline-block;
  float: right;
}

.entity {
  background: white;
  border-radius: 10px;
}

.entity-header {
  border-bottom: solid aliceblue 5px;
  padding: 0.5rem 1rem;
  display: flow-root;
}

.entity-data {
  margin: 0 1rem 1rem 1rem;
}

.entity-field {
  padding: 0.5rem 0;
}

.validation-field {
  display: inline-block;
  margin-right: 0.5rem;
}

.entity-data:not(:last-of-type) {
  border-bottom: solid #ddd 1px;
}

.entity:last-of-type .entity-data:last-of-type {
  margin-bottom: 0;
}

p {
  margin: 0;
  display: inline-block;

  &.faded-light {
    color: #999;
  }
}
</style>
