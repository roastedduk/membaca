# Vue Membaca

## Table of Contents
- [Vue Membaca](#vue-membaca)
  - [Table of Contents](#table-of-contents)
  - [About ](#about-)
  - [Getting Started ](#getting-started-)
  - [Usage ](#usage-)

## About <a name = "about"></a>
vue-membaca is a Vue 3 component library to scan QR code and read the content. It uses [zxingjs/browser](https://github.com/zxing-js/browser) to scan the QR code.

## Getting Started <a name = "getting_started"></a>
To use this library, you can install it via npm or yarn.

```bash
npm install vue-membaca
```

## Usage <a name = "usage"></a>

```vue
<script setup lang="ts">
const deviceId = ref<string>('')

onMounted(() => {
  const mediaDevices = await navigator.mediaDevices.getUserMedia({ video: true })
  deviceId.value = mediaDevices[0].id
})
</script>

<template>
  <QrCamera
    :device-id="deviceId"
    @result="handleResult"
    @error="handleError"
  />
</template>
```
