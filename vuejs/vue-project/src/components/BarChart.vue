<template>
  <Bar class="barchart" :options="chartOptions" :data="chartData" />
</template>

<script>
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export default {
  name: "BarChart",
  components: { Bar },
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
            borderWidth: 1,
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
