<template>
    <div class="list-table">
        <div
            class="entity"
            v-for="(entity, index) in entities"
            v-bind:key="index"
        >
            <div class="entity-header">
                <h2>{{ entity.name }}</h2>
                <div class="buttons">
                    <b-button type="is-primary" v-on:click="editEntity(index)">
                        <b-icon pack="fas" icon="edit" size="is-small" />
                    </b-button>
                    <b-button
                        type="is-danger"
                        v-on:click="removeEntity(entity.name)"
                    >
                        <b-icon pack="fas" icon="trash" size="is-small" />
                    </b-button>
                </div>
            </div>
            <div
                class="entity-data"
                v-for="field in entity.fields"
                v-bind:key="field.name"
            >
                <div class="entity-field">
                    <h3>Name:</h3>
                    <p>{{ field.name }}</p>
                </div>
                <div class="entity-field">
                    <h3>Validation:</h3>
                    <div v-if="field.validations.length > 0">
                        <div
                            v-for="validation in field.validations"
                            v-bind:key="validation.key"
                        >
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
import Vue from 'vue';

export default Vue.extend({
    name: 'entity-list-table',
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
    methods: {
        async refreshEntities() {
            this.loading = true;
            await this.$store.dispatch('entity/list');
            this.loading = false;
        },
        async editEntity(index: number) {
            await this.$store.commit('entity/setEntity', this.entities[index]);
            this.$router.push({
                name: 'entity-edit',
                params: { name: this.entities[index].name }
            });
        },
        async removeEntity(name: string) {
            this.loading = true;
            await this.$store.dispatch('entity/remove', name);
            await this.refreshEntities();
            this.loading = false;
        }
    },
    created() {
        this.refreshEntities();
    }
});
</script>

<style scoped lang="scss">
.list-table {
    max-width: 400px;
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

h2 {
    size: 150%;
    margin: 0;
    display: inline-block;
}

h3 {
    margin: 0;
    padding: 0 0.5rem 0 0;
    display: inline-block;
}
h4 {
    margin: 0;
    padding: 0 0.5rem 0 0;
    display: inline-block;
}

p {
    margin: 0;
    display: inline-block;

    &.faded-light {
        color: #999;
    }
}
</style>
