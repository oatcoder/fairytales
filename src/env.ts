export const runningLocally = (): boolean => {
  return process.env.RUNNING_LOCALLY == null ? false : process.env.RUNNING_LOCALLY === 'true'
}

export const projectId = (): string => {
  return process.env.GCP_PROJECT_ID || ''
}

export const fhirStoreId = (): string => {
  return process.env.GCP_FHIR_STORE_ID || ''
}

export const datasetId = (): string => {
  return process.env.GCP_DATASET_ID || ''
}

export const region = (): string => {
  return process.env.GCP_REGION || ''
}
