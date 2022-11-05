<template>
  <div id="outer-cover">
    <div id="title-row">
      <h3 style="font-weight:bold;">Model Registry</h3>
      <o-button
        class="button"
        id="register-button"
        @click="registerNewModel()"
      >Register A New Model</o-button>
    </div>
    <table id="model_registry_table">
      <!-- TABLE HEADERS -->
      <thead>
        <tr>
          <th
            v-for="header in headers"
            :key="header"
          >
            {{header}}
          </th>
        </tr>
      </thead>
      <!-- TABLE ROWS -->
      <tbody>
        <tr
          v-for="datum in data"
          :key="datum.model_id"
        >
          <td>{{datum.modelName}}</td>
          <td><span v-if="datum.inProduction == 1">Deployed</span><span v-if="datum.inProduction == 0">Not
              Deployed</span></td>
          <td>{{datum.modelDescription}}</td>
          <td>{{datum.modelVersion}}</td>
          <td>{{convertDate(datum.editedTime)}}</td>
          <td>{{datum.accuracy}}</td>
          <td>
            <o-button
              class="button"
              v-if="datum.inProduction != 1"
              @click="onUse(datum.model_id)"
            >Use
            </o-button>
            <p v-if="datum.inProduction == 1">In-Use</p>
          </td>
          <td>
            <o-button
              class="button"
              @click="onRefresh(datum.model_id)"
            >Refresh
            </o-button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import modelRegistryService from "@/services/modelRegistryService";

export default {
  data() {
    return {
      headers: [
        "Name of Model",
        "Deployment Status",
        "Description",
        "Version Number",
        "Updated Date",
        "Performance Metric (Accuracy)",
        "Use?",
        "Re-run model",
      ],
    };
  },
  props: {
    data: Array,
  },
  methods: {
    async onUse(id) {
      console.log(id);
      // POST request to change the deployment status field of the `model` table in DB to 'deployed' here
      const response = await modelRegistryService.post(id);
      const response2 = await modelRegistryService.refresh(id);
      console.log(response.data);
      console.log(response2.data);
      // auto-refresh page
      window.location.reload();
    },
    registerNewModel() {
      this.$router.push("/register-model");
    },
    convertDate(string) {
      let mydate = new Date(Date.parse(string));
      console.log(mydate);
      mydate.setHours(mydate.getHours() - 8);
      console.log(mydate);
      return mydate.toLocaleString();
    },
    async onRefresh(id) {
      const response = await modelRegistryService.refresh(id);
      console.log(response);
      // refresh page to see the changes made
      window.location.reload();
    },
  },
};
</script>

<style scoped>
#outer-cover {
  width: 85%;
  margin: auto;
}

#title-row {
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

#register-button {
  margin-top: 20px;
}

h1 {
  text-align: left;
}

tbody tr:nth-child(odd) {
  background-color: white;
}

tbody tr:nth-child(even) {
  background-color: #eeeeeeff;
}

table {
  background-color: #f97726;
  width: 100%;
  margin: auto;
}

tr {
  height: 60px;
}

table td th {
  text-align: center;
}

.button {
  background-color: #f16308;
  margin: 0px 0px 10px 0px;
  border: 0px;
}

.button:hover {
  background: #ffcc00;
  color: black;
  cursor: pointer;
}

.button:focus {
  outline: none;
}
</style>