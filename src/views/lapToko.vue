<template>
  <CRow>
    <CCol :xs="3">
      <CWidgetStatsA class="mb-4" color="primary">
        <template #title>Jumlah Transaksi</template>
        <template #value
          >{{ jmlT }}
          <span id="valueT" class="fs-6 fw-normal"></span>
        </template>
      </CWidgetStatsA>
    </CCol>
    <CCol :xs="3">
      <CWidgetStatsA class="mb-4" color="info">
        <template #title>Pemasukan Gross</template>
        <template #value>Rp. {{ jmlK }} ,00</template>
      </CWidgetStatsA>
    </CCol>
    <CCol :xs="3">
      <CWidgetStatsA class="mb-4" color="warning">
        <template #value>{{ jmlB }}</template>
        <template #title>Jumlah Barang Di inventory</template>
      </CWidgetStatsA>
    </CCol>
  </CRow>
</template>

<script setup>
import {
  getFirestore,
  collection,
  getCountFromServer,
  getDocs,
} from 'firebase/firestore'
import fApp from '../firebase'

const db = getFirestore(fApp)
const col = collection(db, 'transaksi')
const colB = collection(db, 'barang')

const snp = await getCountFromServer(col)
const jmlT = snp.data().count

const snpB = await getCountFromServer(colB)
const jmlB = snpB.data().count
let jmlK = 0
const keuntunganG = await getDocs(col)
keuntunganG.forEach((doc) => {
  jmlK = jmlK + doc.data()['totalHarga']
})
</script>

<script>
export default {
  name: 'WidgetsStatsA',
}
</script>
