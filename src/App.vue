<script setup lang="ts">
import type { Exception as ZxingExeption, Result as ZxingResult } from '@zxing/library'

import { onMounted, ref } from 'vue'
import { BrowserCodeReader } from '@zxing/browser'
import QrCamera from './components/QrCamera.vue'

const hasCameraPermission = ref(false)

const handleResult = (result: ZxingResult) => {
  console.log(result)
}

const handleError = (error: ZxingExeption) => {
  console.error(error)
}

const requestCameraPermission = async () => {
  try {
    const response = await navigator.mediaDevices.getUserMedia({ video: true })
    hasCameraPermission.value = true

    return response
  }
  catch (err) {
    console.error(err)
  }
}

onMounted(async () => {
  await requestCameraPermission()
  const videoInputDevices = await BrowserCodeReader.listVideoInputDevices()
  console.log(videoInputDevices)
})
</script>

<template>
  <div class="container">
    <QrCamera
      device-id="c4e39be576fabb0d24bfe4e79844bbe8ed527f9a24e1c2d2afde492ad1c33c28"
      @result="handleResult"
      @error="handleError"
    />
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: black;
}
</style>
