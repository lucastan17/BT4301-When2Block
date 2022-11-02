<template>
  <div class="home">
    <HeaderBar />
    <div class="group-container">
      <div class="button-div-4">
        <o-button class="back-button" onclick="javascript:history.back();"
          >&laquo; Back</o-button
        >
      </div>
      <div class="group">
        <div class="header5 epilogue-extra-bold-ebony-clay-40px">
          How our Solution is compliant with IMDA AI Governance framework
        </div>
        <div class="content-block-3" style="font-size: 26px">
          <b><i>Internal governance structures and measures</i></b>
        </div>
        <table id="imda_framework_table1">
          <!-- TABLE HEADERS -->
          <thead>
            <tr>
              <th v-for="header in headers" :key="header">
                {{ header }}
              </th>
            </tr>
          </thead>
          <!-- TABLE ROWS -->
          <tbody>
            <tr v-for="row in table1" :key="row.serial_no">
              <td>{{ row.serial_no }}</td>
              <td>{{ row.main_point }}</td>
              <td>{{ row.sub_point }}</td>
              <td>{{ row.solution }}</td>
              <td>{{ row.page }}</td>
            </tr>
          </tbody>
        </table>
        <div class="content-block-4" style="font-size: 26px; font-weight: 600">
          Percentage Compliance = <u>84.6%</u>
        </div>
        <div class="content-block-3" style="font-size: 26px">
          <b
            ><i
              >Determining the level of human involvement in AI-augmented
              decision-making</i
            ></b
          >
          <br />
          <p style="font-size: 22px; text-align: justify; margin-top: 10px">
            <b>(pg 29) Benefits of AI for our context:</b> <br />
            AI lies in the heart of our business operations. With AI, we will be
            able to forecast the UVI data for the next few hours. Combined with
            the weather forecast data we are retrieving directly from the
            Singapore government, we are able to predict the necessity for
            sunscreen for those few hours and inform our clients accordingly.
            Through this, we hope that our clients are able to build up a habit
            of wearing sunscreen regularly and reap the benefits of doing so.
          </p>

          <p style="font-size: 22px">
            <b>Risks of using AI in our context:</b> <br />
            In our context, the AI algorithm may produce false negative cases
            whereby the actual weather conditions (cloudiness and UV index)
            dictates that one to wear sunscreen but it predicts that there isn’t
            a need to do so. This may then mean that our clients are exposed to
            the harmful rays of the sun. However, there has only been a
            correlation established between prolonged (i.e years) of exposure to
            the harmful rays of the sun and negative health implications (e.g
            skin cancer). Since no correlation or causal links have yet to be
            established between short term exposure to sun’s rays, we believe
            that the risk associated with the false negative predictions are
            minimal.
          </p>

          <p style="font-size: 22px">
            <i>Mitigating Measure</i> <br />
            Nevertheless, at the model training stage, we have taken
            precautionary measures such as prioritizing the reduction of false
            negative cases through an emphasis on the recall metric.
          </p>

          <p style="font-size: 22px">
            <i>Risk Impacy Assessment</i> <br />
            While the probability of the false negative cases appearing are
            moderate based on our model evaluation, the severity when false
            negative cases appear is extremely low as mentioned earlier. Hence,
            we will classify this as low risk.
          </p>
          <br />
          <p style="font-size: 22px">
            <b>(pg 30) Overall Decision on level of human involvement:</b>
            <br />
            Overall, after reviewing the benefits and risks, we have decided
            that a Human-out-of-loop process would be suitable for our context
            due to the extremely low risk involved. This way, predictions will
            be made automatically by the model and served to our clients with
            little intervention from our data scientists.
          </p>
          <br />
          <p style="font-size: 22px">
            <i>Regular Review</i> <br />
            However, our Chief AI officer will conduct a monthly review of the
            model performance to determine if there’s a need for any changes to
            our model. Additionally, we have set up a model dashboard that will
            allow our machine learning engineer to monitor our model’s
            performance on a day to day basis to look out for any significant
            drift or degradation in performance.
          </p>
        </div>
        <div class="content-block-4" style="font-size: 26px; font-weight: 600">
          Percentage Compliance = <u>100%</u>
        </div>
        <div class="content-block-3" style="font-size: 26px">
          <b><i>Operations Management</i></b>
          <p style="font-size: 22px">
            Issues to be considered when developing, selecting and maintaining
            AI models, including data management.
          </p>
        </div>
        <table id="imda_framework_table2">
          <!-- TABLE HEADERS -->
          <thead>
            <tr>
              <th v-for="header in headers" :key="header">
                {{ header }}
              </th>
            </tr>
          </thead>
          <!-- TABLE ROWS -->
          <tbody>
            <tr v-for="row in table2" :key="row.serial_no">
              <td>{{ row.serial_no }}</td>
              <td>{{ row.main_point }}</td>
              <td>{{ row.sub_point }}</td>
              <td>{{ row.solution }}</td>
              <td>{{ row.page }}</td>
            </tr>
          </tbody>
        </table>
        <div class="content-block-4" style="font-size: 26px; font-weight: 600">
          Percentage Compliance = <u>..%</u>
        </div>
        <div class="content-block-3" style="font-size: 26px">
          <b><i>Stakeholder interaction and communication</i></b> <br />
          <p style="font-size: 22px">
            Strategies for communicating with an organisation’s stakeholders,
            and the management of relationships with them.
          </p>
        </div>
        <table id="imda_framework_table3">
          <!-- TABLE HEADERS -->
          <thead>
            <tr>
              <th v-for="header in headers" :key="header">
                {{ header }}
              </th>
            </tr>
          </thead>
          <!-- TABLE ROWS -->
          <tbody>
            <tr v-for="row in table3" :key="row.serial_no">
              <td>{{ row.serial_no }}</td>
              <td>{{ row.main_point }}</td>
              <td>{{ row.sub_point }}</td>
              <td>{{ row.solution }}</td>
              <td>{{ row.page }}</td>
            </tr>
          </tbody>
        </table>
        <div class="content-block-4" style="font-size: 26px; font-weight: 600">
          Percentage Compliance = <u>..%</u>
        </div>
        <div class="button-div-3">
          <o-button class="back-button" onclick="javascript:history.back();"
            >&laquo; Back</o-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderBar from "@/components/HeaderBar.vue";
//import HeaderBar2 from "@/components/HeaderBar2.vue";
//import { userStore } from "../store/store";

export default {
  name: "IMDAPage",
  components: {
    HeaderBar,
    //HeaderBar2,
    //userStore
  },
  data() {
    return {
      headers: ["S/N", "Main Point", "Sub-points", "Our Solution", "Page"],
      table1: [
        {
          serial_no: 1,
          main_point:
            "Clear roles and responsibilities for the ethical deployment of AI",
          sub_point:
            "Responsibility for and oversight of the various stages and activities involved in AI deployment should be allocated to the appropriate personnel and/or departments. If necessary and possible, consider establishing a coordinating body, having relevant expertise and proper representation from across the organisation",
          solution:
            "We have established a ‘group of three’ (CEO, Chief AI officer, Machine learning engineer) to be the coordinating body for AI deployment. This way there’s representation from all levels (entry level and C-suite) and people with expertise (Chief AI officer, ML engineer).",
          page: 22,
        },
        {
          serial_no: 2,
          main_point:
            "Clear roles and responsibilities for the ethical deployment of AI",
          sub_point:
            "Personnel and/or departments having internal AI governance functions should be fully aware of their roles and responsibilities, be properly trained, and be provided with the resources and guidance needed for them to discharge their duties.",
          solution:
            "At the point of hiring, we have done an extensive verification of their credentials to ensure that they have been properly trained and are equipped with the necessary expertise to discharge their duties. All new hires are attached to a senior who will serve as their mentor and guide them for the first 6 months as they get acquainted with the tasks. Additionally, we have curated a training program specific to each stage of the ML development and deployment that the new hires will undergo as part of their induction program.",
          page: 22,
        },
        {
          serial_no: 3,
          main_point:
            "Clear roles and responsibilities for the ethical deployment of AI",
          sub_point:
            "Allocated Role: Assess and manage the risks of deploying AI, including any potential adverse impact on the individuals (e.g. who are most vulnerable, how are they impacted, how to assess the scale of the impact, how to get feedback from those impacted, etc.).",
          solution:
            "Chief AI officer will be responsible for assessing and managing the risk of deploying AI together with our in-house counsel.",
          page: 22,
        },
        {
          serial_no: 4,
          main_point:
            "Clear roles and responsibilities for the ethical deployment of AI",
          sub_point:
            "Allocated Role: Decide on the appropriate level of human involvement in AI-augmented decision-making",
          solution:
            "Data scientists will be responsible for deciding the appropriate level of human involvement and seek approval from the Chief AI officer before deployment.",
          page: 22,
        },
        {
          serial_no: 5,
          main_point:
            "Clear roles and responsibilities for the ethical deployment of AI",
          sub_point:
            "Allocated Role: Manage the AI model training and selection process.",
          solution:
            "Data Scientist will be responsible for AI model training and selection.",
          page: 22,
        },
        {
          serial_no: 6,
          main_point:
            "Clear roles and responsibilities for the ethical deployment of AI",
          sub_point:
            "Allocated Role: Maintenance, monitoring, documentation and review of the AI models that have been deployed, with a view to taking remediation measures where needed.",
          solution:
            "Machine Learning engineer will be responsible for Maintenance, monitoring, documentation and review of the AI models that have been deployed, especially with the help of the model dashboard. He will raise issues with models with intervention measures/ solutions directly to the Chief AI officer before implementing them.",
          page: 23,
        },
        {
          serial_no: 7,
          main_point:
            "Clear roles and responsibilities for the ethical deployment of AI",
          sub_point:
            "Allocated Role: Reviewing communications channels and interactions with stakeholders to provide disclosure and effective feedback channels.",
          solution:
            "No channels have been established for communication with stakeholders at the moment.",
          page: 23,
        },
        {
          serial_no: 8,
          main_point:
            "Clear roles and responsibilities for the ethical deployment of AI",
          sub_point:
            "Allocated Role: Ensuring relevant staff dealing with AI systems are properly trained. Where applicable and necessary, staff who are working and interacting directly with AI models may need to be trained to interpret AI model output and decisions and to detect and manage bias in data. Other staff whose work deals with the AI system (e.g. a customer relationship officer answering customer queries about the AI system, or a salesperson using an AI-enabled product to make a recommendation) should be trained to be at least aware of and sensitive to the benefits, risks and limitations when using AI, so that they know when to alert subject-matter experts within their organisations.",
          solution:
            "Not Applicable. Human-out-of-the-loop process in our context would mean there isn’t an intermediary viewing the model predictions and decisions before the client receive them.",
          page: 23,
        },
        {
          serial_no: 9,
          main_point: "Risk management and internal controls",
          sub_point:
            "Measure: Using reasonable efforts to ensure that the datasets used for AI model training are adequate for the intended purpose, and to assess and manage the risks of inaccuracy or bias, as well as reviewing exceptions identified during model training. Virtually, no dataset is completely unbiased. Organisations should strive to understand the ways in which datasets may be biased and address this in their safety measures and deployment strategies.",
          solution:
            "NOT FULFILLED. Input data to our models are not validated at the moment. Data input can be monitored for drift and for bias/ inaccuracy.",
          page: 24,
        },
        {
          serial_no: 10,
          main_point: "Risk management and internal controls",
          sub_point:
            "Measure: Establishing monitoring and reporting systems as well as processes to ensure that the appropriate level of management is aware of the performance of and other issues relating to the deployed AI. Where appropriate, the monitoring can include autonomous monitoring to effectively scale human oversight. AI systems can be designed to report on the confidence level of their predictions, and explainability features could focus on why the AI model had a certain level of confidence.",
          solution:
            "Have established a model dashboard that tracks the performance of the model being deployed and alerts to be given when performance drops below a certain threshold. This way, the machine learning engineer is aware of issues that the models are facing and can report that to the Chief AI officer. However, no explainability is included at the moment.",
          page: 24,
        },
        {
          serial_no: 11,
          main_point: "Risk management and internal controls",
          sub_point:
            "Measure: Ensuring proper knowledge transfer whenever there are changes in key personnel involved in AI activities. This will reduce the risk of staff movement creating a gap in internal governance.",
          solution:
            "As per the contract, all hires are required to stay for two months upon tendering resignations and the two months will be used to familiarise the new hires who have been hired to replace them.",
          page: 24,
        },
        {
          serial_no: 12,
          main_point: "Risk management and internal controls",
          sub_point:
            "Measure: Reviewing the internal governance structure and measures when there are significant changes to organisational structure or key personnel involved.",
          solution:
            "Every 4 months or when major changes in organization structures occur (whichever comes first), the ‘group of three’ convenes a meeting to discuss the internal governance structure and measures. ",
          page: 24,
        },
        {
          serial_no: 13,
          main_point: "Risk management and internal controls",
          sub_point:
            "Measure: Periodically reviewing the internal governance structure and measures to ensure their continued relevance and effectiveness.",
          solution:
            "Every 4 months or when major changes in organization structures occur (whichever comes first), the ‘group of three’ convenes a meeting to discuss the internal governance structure and measures. ",
          page: 24,
        },
      ],
      table2: [
        {
          serial_no: 1,
          main_point: "Model Framework",
          sub_point:
            "The framework follows a generalised AI model development and deployment process, showing a continuous process of learning.",
          solution:
            "The model we deployed follows clearly to the Framework, and the development and deployment of the model involves the team’s learning and deeper understanding of the model and how it applies to the web-app’s functions.",
          page: 35,
        },
        {
          serial_no: 2,
          main_point: "Data Preparation",
          sub_point:
            "Raw data is formatted and cleansed so conclusions can be drawn accurately.",
          solution:
            "Raw data from the APIs are cleaned and extracted to make meaningful conclusion for our model",
          page: 35,
        },
        {
          serial_no: 3,
          main_point: "Algorithms",
          sub_point:
            "During deployment, algorithms (linear regression, decision trees, or neural networks) are applied for analysis on training sets.",
          solution:
            "Linear regression is the chosen algorithm for our model due to its suitability.",
          page: 36,
        },
        {
          serial_no: 4,
          main_point: "Algorithms",
          sub_point:
            "The resulting algorithmic models are examined, and algorithms are iterated until a model that produces the most appropriate results for the use case emerges.",
          solution:
            "NOT FULFILLED. Only one algorithmic model is used and chosen in our application.",
          page: 36,
        },
        {
          serial_no: 5,
          main_point: "Chosen Model",
          sub_point:
            "This model and its results are then incorporated into applications to offer predictions, make decisions, solve problems, and trigger actions.",
          solution:
            "The model built is deployed into the project to help make decision on recommendation of daily sunscreen usage.",
          page: 36,
        },
        {
          serial_no: 6,
          main_point: "Data",
          sub_point:
            "Datasets used for building models may come from  multiple sources and could include both personal and non-personal data. The quality and selection of data from each of these sources should be verified.",
          solution:
            "The models used data called from APIs from data.gov, which ensure the quality of data.",
          page: 36,
        },
        {
          serial_no: 7,
          main_point: "Data",
          sub_point:
            "The models deployed in an intelligent system have an internal departmental owner, who will be the one making decisions on which models to deploy.",
          solution:
            "One member of our team is assigned to build and deploy the AI model.",
          page: 36,
        },
        {
          serial_no: 8,
          main_point:
            "Data Accountability Practices: Understanding the lineage of data",
          sub_point:
            "Understanding the lineage of data: knowing where the data originally came from, how it was collected, curated and moved within the organisation, and how its accuracy is maintained over time.",
          solution:
            "The models used data called from APIs from data.gov, which ensure the quality of data.",
          page: 36,
        },
        {
          serial_no: 9,
          main_point:
            "Data Accountability Practices: Understanding the lineage of data",
          sub_point:
            "Data lineage can be represented visually to trace how the data moves from its source to its destination, how the data gets transformed along the way, where it interacts with other data, and how the representations change.",
          solution:
            "The models used data called from APIs from data.gov, which ensure the quality of data.",
          page: 36,
        },
        {
          serial_no: 10,
          main_point:
            "Data Accountability Practices: Understanding the lineage of data",
          sub_point:
            "Keeping a data provenance record allows an organisation to ascertain the quality of the data based on its origin and subsequent transformation, trace potential sources of errors, update data, and attribute data to their sources.",
          solution:
            "The models used data called from APIs from data.gov, which ensure the quality of data.",
          page: 37,
        },
        {
          serial_no: 11,
          main_point:
            "Data Accountability Practices: Understanding the lineage of data",
          sub_point:
            "Understanding and addressing factors that may affect the quality of data, such as: i. The accuracy of the dataset, ii. The completeness of the dataset, iii. The veracity of the dataset, iv. How recently the dataset was compiled or updated, v. The relevance of the dataset and the context for data collection, vi. The integrity of the dataset that has been joined from multiple datasets, vii. The usability of the dataset, viii. Human interventions (e.g. if any human has filtered, applied labels, or edited the data).",
          solution:
            "The source of data (data.gov) confirms the quality of data",
          page: 38,
        },
        {
          serial_no: 12,
          main_point: "Data Accountability Practices: Minimising inherent bias",
          sub_point:
            "Mitigate omission bias and  stereotype bias (the omission of certain characteristics from the dataset).",
          solution: "Covered by the quality of data called from APIs.",
          page: 39,
        },
        {
          serial_no: 13,
          main_point: "Data Accountability Practices: Minimising inherent bias",
          sub_point:
            "Mitigate selection bias (data used to produce the model are not fully representative of the actual data or environment that the model may receive or function in).",
          solution: "Covered by the quality of data called from APIs.",
          page: 39,
        },
        {
          serial_no: 14,
          main_point: "Data Accountability Practices: Minimising inherent bias",
          sub_point:
            "Mitigate measurement bias (data collection device causes the data to be systematically skewed in a particular direction).",
          solution: "Covered by the quality of data called from APIs.",
          page: 39,
        },
        {
          serial_no: 15,
          main_point:
            "Data Accountability Practices: Different datasets for training, testing, and validation",
          sub_point:
            "Different datasets are required for training, testing, and validation. Split a large dataset into subsets for these purposes.",
          solution: "Data from API calls are split for different purposes.",
          page: 40,
        },
        {
          serial_no: 16,
          main_point:
            "Data Accountability Practices: Periodic reviewing and updating of datasets",
          sub_point:
            "Datasets (including training, testing, and validation datasets) to be reviewed periodically to ensure accuracy, quality, currency, relevance and reliability. Where necessary, the datasets can be updated with new input data obtained from actual use of the AI models deployed in production.",
          solution:
            "NOT APPLICABLE. The dataset itself is real-time, hence it is constantly updated.",
          page: 40,
        },
        {
          serial_no: 17,
          main_point: "Algorithm and Model",
          sub_point:
            "Risk-based approach: identify the subset of features or functionalities that have the greatest impact on stakeholders for which the below-mentioned measures are relevant. Identify which measures will be most effective in building trust with their stakeholders.",
          solution:
            "The team identified these measures: … making the greatest impact on the stakeholders - the users of the project.",
          page: 43,
        },
        {
          serial_no: 18,
          main_point: "Explainability",
          sub_point:
            "Explaining how deployed AI models’ algorithms function and/or how the decision-making process incorporates model predictions, so as to build understanding and trust.",
          solution:
            "The model is explainable as we deploy a logistic regression model that describes how the outputs and decisions are reached from the input data.",
          page: 44,
        },
        {
          serial_no: 19,
          main_point: "Explainability",
          sub_point:
            "Documenting how the model training and selection processes are conducted, the reasons for which decisions are made, and measures taken to address identified risks.",
          solution:
            "The development team of the models keep records of all past and current models deployed for the project.",
          page: 44,
        },
        {
          serial_no: 20,
          main_point: "Explainability",
          sub_point:
            "Incorporating descriptions of the solutions’ design and expected behaviour into product or service descriptions and system technical specifications documentation demonstrates accountability to individuals and/or regulators.",
          solution:
            "The easy-to-understand explanation of how the model predicts the recommendation for sunblock is included in our About Page.",
          page: 44,
        },
        {
          serial_no: 21,
          main_point: "Explainability",
          sub_point:
            "Implicit explanations of how the AI models’ algorithms function may be more useful.",
          solution:
            "The easy-to-understand explanation of how the model predicts the recommendation for sunblock is included in our About Page.",
          page: 45,
        },
        {
          serial_no: 22,
          main_point: "Repeatability",
          sub_point:
            "The model has the ability to consistently perform an action or make a decision, given the same scenario.",
          solution: "",
          page: 46,
        },
        {
          serial_no: 23,
          main_point: "Repeatability",
          sub_point:
            "Conducting repeatability assessments for commercial deployments in live environments to ensure that deployments are repeatable.",
          solution: "",
          page: 46,
        },
        {
          serial_no: 24,
          main_point: "Repeatability",
          sub_point:
            "Performing counterfactual fairness testing to ensure that a model’s decisions are the same in both the real world and in a counterfactual world where attributes deemed sensitive are altered.",
          solution: "",
          page: 46,
        },
        {
          serial_no: 25,
          main_point: "Repeatability",
          sub_point:
            "Assessing how exceptions can be identified and handled when decisions are not repeatable.",
          solution: "",
          page: 46,
        },
        {
          serial_no: 26,
          main_point: "Repeatability",
          sub_point:
            "Ensuring exception handling is in line with organisations’ policies.",
          solution: "",
          page: 46,
        },
        {
          serial_no: 27,
          main_point: "Repeatability",
          sub_point:
            "Identifying and accounting for changes over time to ensure that models trained on time-sensitive data remain relevant.",
          solution: "",
          page: 46,
        },
        {
          serial_no: 28,
          main_point: "Robustness",
          sub_point:
            "The model has the ability to cope with errors during execution and erroneous input, and function correctly in the presence of invalid input or stressful environmental conditions. ",
          solution:
            "There are input-checking measures in all of our functions and error/warning messages for such scenarios.",
          page: 47,
        },
        {
          serial_no: 29,
          main_point: "Robustness",
          sub_point:
            "Testing: Conduct adversarial testing on their models to ensure that their models are able to handle a broader range of unexpected input variables.",
          solution:
            "The development team conducted testing of the model and recorded them in the Testing Plan.",
          page: 47,
        },
        {
          serial_no: 30,
          main_point: "Regular tuning",
          sub_point:
            "Establishing an internal policy and process to perform regular model tuning is effective for ensuring that deployed models cater for changes to customer behaviour over time. Testing: Assess the degree to which an AI solution generalises well and fails gracefully.",
          solution:
            "The team set out scheduled meeting to update each other on the current progress of the model and discuss rooms for improvement and fine-tuning at these meetings.",
          page: 48,
        },
        {
          serial_no: 31,
          main_point: "Regular tuning",
          sub_point:
            "Active monitoring, review and tuning for the deployed model.",
          solution:
            "The development team met regularly to discuss new changes and fine-tuning the model during development and upon deployment.",
          page: 48,
        },
        {
          serial_no: 32,
          main_point: "Traceability",
          sub_point:
            "The model’s decisions, and the datasets and processes that yield the AI model’s decision are documented in an easily understandable way.",
          solutions: "",
          page: 48,
        },
        {
          serial_no: 33,
          main_point: "Traceability",
          sub_point:
            "Practices: At least one of the following: i. Building an audit trail to document the model training and AI-augmented decision. ii. Implementing a black box recorder that captures all input data streams. iii. Ensuring that data relevant to traceability are stored appropriately to avoid degradation or alteration, and retained for durations relevant to the industry.",
          solutions: "",
          page: 48,
        },
        {
          serial_no: 34,
          main_point: "Reproducibility",
          sub_point:
            "An independent verification team can produce the same results using the same AI method based on the documentation made by the organisation.",
          solutions: "",
          page: 50,
        },
        {
          serial_no: 35,
          main_point: "Reproducibility",
          sub_point:
            "Practices: Testing whether specific contexts or particular conditions would need to be taken into account to ensure reproducibility.",
          solutions: "",
          page: 50,
        },
        {
          serial_no: 36,
          main_point: "Reproducibility",
          sub_point:
            "Practices: Putting in place verification methods to ensure different aspects of the AI model’s reliability and reproducibility.",
          solutions: "",
          page: 50,
        },
        {
          serial_no: 37,
          main_point: "Reproducibility",
          sub_point:
            "Practices: Making available replication files to facilitate the process of testing and reproducing behaviours.",
          solutions: "Our codes are available publicly on Github.",
          page: 50,
        },
        {
          serial_no: 38,
          main_point: "Auditability",
          sub_point:
            "The AI system is ready to undergo an assessment of its algorithms, data and design processes.",
          solutions:
            "The project is available for auditing and assessment upon submission.",
          page: 51,
        },
        {
          serial_no: 39,
          main_point: "Auditability",
          sub_point:
            "Keeping a comprehensive record of data provenance, procurement, preprocessing, lineage, storage and security, centralised in a process log",
          solutions:
            "All are documented carefully along with the codes of the project (on Github) and supporting documents.",
          page: 51,
        },
      ],
      table3: [
        {
          serial_no: 1,
          main_point: "Overview",
          sub_point:
            "Provide general information on whether AI is used in their products and/or services. (what AI is, how AI is used in decision-making in relation to consumers, what are its benefits, why your organisation has decided to use AI, how your organisation has taken steps to mitigate risks, and the role and extent that AI plays in the decision-making process.)",
          solution:
            "This information is provided as part of the general product description in the “About us” Page.",
          page: 52,
        },
        {
          serial_no: 2,
          main_point: "Overview",
          sub_point:
            "Disclose the manner in which an AI decision may affect an individual consumer, and whether the decision is reversible.",
          solution:
            "This information is provided as part of the general product description in the “About us” Page.",
          page: 52,
        },
        {
          serial_no: 3,
          main_point: "Policy for explanation",
          sub_point:
            "Develop a policy on what explanations to provide to individuals and when to provide them to ensure consistency in communication.",
          solution:
            "The team confirmed the manner of explanation of the model in a meeting.",
          page: 52,
        },
        {
          serial_no: 4,
          main_point: "Communicating Explainability + Transparency",
          sub_point:
            "Identifying the audience (i.e. its external and internal stakeholders).",
          solution:
            "The team identified the audience to be the users of the application.",
          page: 54,
        },
        {
          serial_no: 5,
          main_point: "Communicating Explainability + Transparency",
          sub_point:
            "Considering the purpose and the context of the interaction with its stakeholders.",
          solution:
            "The team identified the goal of simplifying the inner working of the AI Model and the project to the users as they are using the application.",
          page: 54,
        },
        {
          serial_no: 6,
          main_point: "Interacting with Consumers",
          sub_point:
            "Considering the information needs of consumers as they go through the journey of interacting with AI.",
          solution:
            "The team identified the needs that the application users have in understanding the AI model during their usage of the application.",
          page: 54,
        },
        {
          serial_no: 7,
          main_point: "Interacting with Consumers",
          sub_point:
            "Needs: Making sure that consumers are aware that the products or services that they are considering are AI-enabled.",
          solution:
            "This information is provided as part of the general product description in the “About us” Page",
          page: 55,
        },
        {
          serial_no: 8,
          main_point: "Interacting with Consumers",
          sub_point:
            "Needs: Identifying those features where providing additional information in this manner will enhance consumer trust, providing information so that consumers know how decisions made with the assistance of AI may affect them.",
          solution:
            "This information is provided as part of the general product description in the “About us” Page.",
          page: 55,
        },
        {
          serial_no: 9,
          main_point: "Option to opt-out",
          sub_point:
            "Deciding whether to provide individuals with the option to opt out from the use of the AI product or service, either offered by default or upon request.",
          solution:
            "NOT APPLICABLE. The application relies on the decision made by the AI outputs.",
          page: 55,
        },
        {
          serial_no: 10,
          main_point: "Option to opt-out",
          sub_point:
            "Providing modes of recourse to the consumer such as providing a channel for reviewing the decision.",
          solution:
            "NOT APPLICABLE. The application relies on the decision made by the AI outputs.",
          page: 55,
        },
        {
          serial_no: 11,
          main_point: "Communicatoin channels",
          sub_point:
            "Putting in place communication channels for customers- a. Feedback channels: for customers to raise feedback or raise queries. b. Decision Review channels: for individuals to request a review of material AI decisions that have affected them.",
          solution:
            "NOT FULFILLED. The application does not contain channels for feedbacks or decision reviews.",
          page: 55,
        },
        {
          serial_no: 12,
          main_point: "Testing the user interface",
          sub_point:
            "Testing user interfaces and addressing usability problems before deployment, so that the user interface serves its intended purposes.",
          solution:
            "The is a testing plan and report done by the development team of the project.",
          page: 57,
        },
        {
          serial_no: 13,
          main_point: "Easy-to-understand communications",
          sub_point:
            "Communicating in an easy-to-understand manner to increase transparency, using visualisation tools, graphical representations, summary tables, or a combination of these.",
          solution:
            "Graphs on AI performance, user data summary and explanations are provided within the web-app to communicate.",
          page: 57,
        },
        {
          serial_no: 14,
          main_point: "Acceptable user policies",
          sub_point:
            "Setting out certain acceptable user policies (“AUPs”) to ensure that users do not maliciously introduce input data that unacceptably manipulates the performance and/or results of the solution’s model.",
          solution:
            "There are restrictions on the inputs the users can key in upon query to the AI, namely the location and timeframe.",
          page: 58,
        },
        {
          serial_no: 15,
          main_point: "Acceptable user policies",
          sub_point:
            "Setting broad boundaries for the interactions that individuals can perform with the AI system, such as restrictions with regard to intentional actions or attempts to reverse engineer, disable, interfere or disrupt the functionality, integrity or performance of the AI-powered service.",
          solution:
            "There are restrictions on the inputs the users can key in upon query to the AI, namely the location and timeframe.",
          page: 58,
        },
        {
          serial_no: 16,
          main_point: "Interacting with other organisations",
          sub_point:
            "Obtaining sufficient information from AI solution providers to help them meet their business objectives.",
          solution:
            "NOT APPLICABLE. The AI solution is built and implemented by the team itself.",
          page: 58,
        },
        {
          serial_no: 17,
          main_point: "Ethical evaluation",
          sub_point:
            "Evaluating whether their AI governance practices and processes are in line with evolving AI standards, and making the outcome of such evaluations available to relevant stakeholders.",
          solution:
            "The team has evaluated that the project is in line witht the AI Model Framework and standards.",
          page: 59,
        },
      ],
    };
  },
  methods: {},
};
</script>

<style scoped>
.group-container {
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: 69px 113px;
}

.epilogue-extra-bold-ebony-clay-40px {
  font-family: var(--font-family-epilogue);
  font-weight: 800;
  color: ebony-clay;
  font-size: 40px;
  font-style: normal;
}

.header5 {
  letter-spacing: 0;
  line-height: 48px;
  min-height: 64px;
  width: 1240px;
  text-align: justify;
}

.back-button {
  background-color: #f16308;
  margin: 5px;
  right: 5px;
  border-radius: 25px;
  width: 120px;
  height: 60px;
  font-size: 26px;
  border: none;
}

.back-button:hover {
  background: #ffcc00;
  color: black;
  cursor: pointer;
}

.back-button:focus {
  outline: none;
}

.button-div-3 {
  float: left;
}

.button-div-4 {
  position: absolute;
  left: 1%;
  top: 8%;
}

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
  text-align: right;
}

.content-block-3 {
  color: black;
  font-family: var(--font-family-epilogue);
  font-weight: 400;
  letter-spacing: 0;
  line-height: 32px;
  margin-top: 25px;
  margin-bottom: 20px;
  width: 1400px;
  text-align: justify;
  margin-left: 5px;
}

.content-block-4 {
  color: black;
  font-family: var(--font-family-epilogue);
  letter-spacing: 0;
  line-height: 32px;
  margin-top: 20px;
  margin-bottom: 60px;
  width: 1400px;
  text-align: center;
  margin-left: 5px;
}
</style>


