<script setup lang="ts">
import { BrowserQRCodeReader } from '@zxing/browser'
import type { IScannerControls } from '@zxing/browser'
import type { Exception as ZxingExeption, Result as ZxingResult } from '@zxing/library'
import { onMounted, ref, watch } from 'vue'

const props = defineProps<{
  deviceId: string
}>()

const emit = defineEmits<{
  (e: 'result', result: ZxingResult): void
  (e: 'error', error: ZxingExeption): void
}>()

const codeReader = new BrowserQRCodeReader()
const videoElement = ref<HTMLVideoElement>()
const videoControls = ref<IScannerControls>()

const loadVideoElement = async (deviceId: string) => {
  videoControls.value = await codeReader.decodeFromVideoDevice(deviceId, videoElement.value, (result, error) => {
    if (result)
      emit('result', result)
    else if (error)
      emit('error', error)
  })
}

watch(() => props.deviceId, async (newDeviceId) => {
  videoControls.value?.stop()
  if (!newDeviceId)
    return

  await loadVideoElement(newDeviceId)
})

onMounted(async () => {
  await loadVideoElement(props.deviceId)
})
</script>

<template>
  <video id="videoElement" ref="videoElement" width="100%" height="auto" />
</template>
