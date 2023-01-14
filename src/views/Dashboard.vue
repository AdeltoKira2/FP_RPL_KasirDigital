<template>
  <suspense>
    <div>
      <WidgetsStatsA />
      <CRow>
        <CCol :md="12">
          <CCard class="mb-4">
            <CCardBody>
              <CRow>
                <CCol :sm="5">
                  <h4 id="traffic" class="card-title mb-0">
                    Keuntungan Gros Toko Bulanan
                  </h4>
                  <div class="small text-medium-emphasis">January 2023</div>
                </CCol>
              </CRow>
              <CRow>
                <MainChartExample
                  style="height: 300px; max-height: 300px; margin-top: 40px"
                />
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </div>
  </suspense>
</template>

<script>
import MainChartExample from './ChartJual.vue'
import WidgetsStatsA from './lapToko.vue'
// import WidgetsStatsD from './widgets/WidgetsStatsTypeD.vue'

export default {
  name: 'Dashboard',
  components: {
    MainChartExample,
    WidgetsStatsA,
  },
}
</script>
