<template>
    <div>
        <span>Hello {{ name }}</span>
        <br />
        <v-data-table
            :headers="headers"
            :items="items"
            hide-default-footer
            item-key="name"
            class="elevation-1"
        >
            <template v-slot:item.name="{ item }">
                <div>
                    <v-text-field required v-model="item.name" />
                </div>
            </template>
            <template v-slot:item.relation="{ item }">
                <v-row>
                    <v-select :items="[item.name]" v-model="item.name" />
                </v-row>
                <!-- <v-row /> -->
            </template>
            <template v-slot:item.validations="{ item }">
                <div
                    v-for="(val, index) in item.validations"
                    v-bind:key="index"
                >
                    <div>
                        <v-select
                            label="key"
                            :items="[item.validations[index].key]"
                            v-model="item.validations[index].key"
                        />
                    </div>
                    <div>
                        <v-select
                            label="value"
                            :items="[item.validations[index].value]"
                            v-model="item.validations[index].value"
                        />
                    </div>
                </div>
                <!-- <v-row /> -->
            </template>
            <template v-slot:item.type="{ item }">
                <v-row>
                    <v-select :items="[item.type]" v-model="item.type" />
                </v-row>
                <!-- <v-row /> -->
            </template>
        </v-data-table>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'entity-edit',
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
        headers() {
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
    methods: {
        async refreshEntity() {
            this.loading = true;
            await this.$store.dispatch('entity/read', this.name);
            this.loading = false;
        },
        async editEntity(id: string) {
            if (this.valid()) {
                await this.$store.dispatch('entity/update', {
                    name,
                    title: this.entity.title,
                    content: this.entity.content
                });

                this.back();
            }
        },
        valid(): boolean {
            return this.entity.title !== '' && this.entity.content !== '';
        },
        showEntity(id: string) {
            this.$router.push({
                name: 'entity-show',
                params: { id }
            });
        },
        back() {
            this.$router.push({ name: 'entity-list' });
        }
    },
    created() {
        this.refreshEntity();
    }
});
</script>

<style scoped lang="scss"></style>
