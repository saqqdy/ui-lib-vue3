<template>
    <button class="ui-button" :type="type">
        <slot></slot>
        <text></text>
    </button>
</template>
<script lang="ts">
import { nextIndex } from 'ui-lib-vue3/packages/utils/nextIndex'
export default {
    name: 'UiButton',
    props: {
        type: String,
        disabled: Boolean
    },
    data() {
        return {}
    },
    created() {
        nextIndex()
    },
    methods: {}
}
</script>
