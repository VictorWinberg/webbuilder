<template>
    <div>
        <el-aside>Hello</el-aside>
        <el-container>
            <div>
                <span>Title</span>
                <input type="text" v-model="title" />
                <el-input placeholder="Pick a date" suffix-icon="el-icon-edit" v-model="title"> </el-input>
                <br />
                <textarea v-model="content" />
                <br />
                <button v-on:click="addPost()">CREATE</button>
            </div>
            <el-button type="success" v-on:click="addPost()">CREATE</el-button>
        </el-container>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'entity-new',
    data() {
        return {
            title: '',
            content: ''
        };
    },
    computed: {
        entities() {
            return this.$store.state.entity.all;
        }
    },
    methods: {
        async addEntity() {
            if (this.valid()) {
                await this.$store.dispatch('entity/create', {
                    title: this.title,
                    content: this.content
                });

                this.title = '';
                this.content = '';
                await this.$store.dispatch('entity/list');
            }
        },
        valid(): boolean {
            return this.title !== '' && this.content !== '';
        }
    }
});
</script>

<style scoped lang="scss"></style>
