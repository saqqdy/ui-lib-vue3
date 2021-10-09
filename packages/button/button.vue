<template>
    <button class="wl-button" :type="type">
        <slot></slot>
        <text></text>
    </button>
</template>
<script lang="ts">
import { nextIndex } from 'ui-lib-vue3/packages/utils/nextIndex'
export default {
    name: 'WlButton',
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
