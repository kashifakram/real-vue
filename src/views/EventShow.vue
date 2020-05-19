<template>
    <div>
        <h1>Showing event #{{ Number(id) }}</h1>
    </div>
</template>

<script>
export default {
    props: {
        id: {
            default: 0
        },
    },
}
</script>
