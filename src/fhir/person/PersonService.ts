import { IPerson } from '@ahryman40k/ts-fhir-types/lib/R4'
import { exec } from 'child_process'
import { google } from 'googleapis'
import { get, map } from 'lodash'
import { logger } from '../../logging'
import { projectId, region, datasetId, fhirStoreId, runningLocally } from '../../env'

const _HEALTHCARE = google.healthcare('v1')

export class PersonService {
  public FHIR_RESOURCE_TYPE = 'Person'

  constructor () {
    this.setGcpOptions()
      .then(data => logger.info('googleapi options set', { data }))
  }

  public createPerson (person: IPerson): Promise<IPerson> {
    return _HEALTHCARE.projects.locations.datasets.fhirStores.fhir.create({
      parent: this.getPersonUrl(),
      type: this.FHIR_RESOURCE_TYPE,
      requestBody: person
    } as any).then(response => response.data as IPerson)
  }

  public allPersons (): Promise<IPerson[]> {
    return _HEALTHCARE.projects.locations.datasets.fhirStores.fhir.search({
      parent: `${ this.getPersonUrl() }/fhir`,
      resourceType: this.FHIR_RESOURCE_TYPE
    } as any).then(this.mapPersonResponse.bind(this))
      .catch(reason => {
        logger.error('Person search threw an error', { reason })
        throw reason
      })
  }

  public getPersonUrl (): string {
    return `projects/${ projectId() }/locations/${ region() }/datasets/${ datasetId() }/fhirStores/${ fhirStoreId() }`
  }

  public getAuthClient (): Promise<any> {
    const auth = new google.auth.GoogleAuth({
      scopes: [ 'https://www.googleapis.com/auth/compute' ]
    })

    return auth.getClient().then(value => {
      if (value) {
        logger.info('GCP Client Response', { value })
      }
    })
  }

  public getAccessToken (): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      exec('gcloud auth print-access-token', (error, stdout) => {
        if (error) {
          logger.error('print-access-token exec threw an exception', { error })
          reject(error)
        }

        if (stdout) {
          logger.info('Access Token', { data: stdout })
          resolve(`Bearer ${ stdout.trim() }`)
        } else {
          logger.error('Access Token is empty', { data: stdout })
          reject({ data: stdout, error })
        }
      })
    })
  }

  public mapPersonResponse (response: any): IPerson[] {
    const entries = get(response.data, 'entry', [])
    return map(entries, (entry: any) => {
      return entry.resource as IPerson
    })
  }

  public async setGcpOptions (): Promise<boolean> {
    let options

    options = runningLocally() ?
      {
        headers: {
          'Authorization': await this.getAccessToken(),
          'Content-Type': 'application/fhir+json',
          method: 'POST'
        }
      }
      :
      {
        auth: await this.getAuthClient(),
        headers: {
          'Content-Type': 'application/fhir+json',
          method: 'POST'
        }
      }

    google.options(options)

    return true
  }

  public getStoresCapabilities () {
    const name = `projects/${ projectId() }/locations/${ region() }/datasets/${ datasetId() }/fhirStores/${ fhirStoreId() }/fhir/metadata`

    _HEALTHCARE.projects.locations.datasets.fhirStores.get({ name })
      .then(response => {
        console.log(JSON.stringify(response.data, null, 2))
        // logger.info('Stores Capabilities', { data: JSON.stringify(response.data, null, 2) })
      })
  }
}
