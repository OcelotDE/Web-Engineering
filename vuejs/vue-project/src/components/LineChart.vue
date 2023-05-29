<template>
  <Line class="linechart" :options="chartOptions" :data="chartData" />
</template>

<script>
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "vue-chartjs";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
export default {
  name: "LineChart",
  components: { Line },
  props: ["valuesSet", "labelsSet", "title"],

  data() {
    return {
      chartData: {
        labels: this.labelsSet,
        datasets: [
          {
            label: this.title,
            backgroundColor: "rgba(126,58,242,0.49)",
            borderColor: "rgba(126,58,242,1)",
            data: this.valuesSet,
            fill: false,
            tension: 0.1,
          },
        ],
      },
      chartOptions: {
        responsive: true,
        animated: true,
      },
    };
  },
};
</script>

<style scoped></style>
