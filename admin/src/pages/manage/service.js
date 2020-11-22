import http from '@/utils/request';

/**
 * personnel
 * @start
 */
const personnel = '/api/v1/personnel'

export async function queryPersonnel() {
  return http.get(`${personnel}/list`)
}

export async function createPersonnel(data) {
  return http.post(`${personnel}/create`, data)
}

export async function updatePersonnel(data) {
  return http.post(`${personnel}/update`, data)
}

export async function deletePersonnel(id) {
  return http.delete(`${personnel}/${id}`)
}
/**
 * personnel
 * @end
 */

 /**
  * recordType
  * @start
  */
 const recordType = '/api/v1/recordType'
 
export async function queryRecordType() {
  return http.get(`${recordType}/list`)
}
/**
* recordType
* @end
*/

/**
 * classify
 * @start
 */
const classify = '/api/v1/classify'

export async function queryClassify(data) {
  return http.get(`${classify}/list`, {params: data})
}

export async function createClassify(data) {
  return http.post(`${classify}/create`, data)
}

export async function updateClassify(data) {
  return http.post(`${classify}/update`, data)
}

export async function deleteClassify(id) {
  return http.delete(`${classify}/${id}`)
}
 /**
 * classify
 * @end
 */

 /**
 * classify
 * @start
 */
const account = '/api/v1/account'

export async function queryAccount() {
  return http.get(`${account}/list`)
}

export async function createAccount(data) {
  return http.post(`${account}/create`, data)
}

export async function updateAccount(data) {
  return http.post(`${account}/update`, data)
}

export async function deleteAccount(id) {
  return http.delete(`${account}/${id}`)
}
 /**
 * classify
 * @end
 */


