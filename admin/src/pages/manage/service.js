import http from '@/utils/request';

/**
 * personnel
 * @start
 */
const personnel = '/api/v1/personnel'

export async function queryPersonnel() {
  return http.get(`${personnel}/list`)
}

export async function createPersonnel(params) {
  return http.post(`${personnel}/create`, params)
}

export async function updatePersonnel(params) {
  return http.post(`${personnel}/update`, params)
}

export async function deletePersonnel(id) {
  return http.delete(`${personnel}/${id}`)
}
/**
 * personnel
 * @end
 */