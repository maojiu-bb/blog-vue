import { projectStore } from '@/store'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

export const useProject = () => {
  const p_store = projectStore()
  const { project } = storeToRefs(p_store)
  const { publicProjectInfo } = p_store
  const project_id = computed(() => {
    let id = project.value.project.map((item) => item.project_id)
    let max_id = id[0]
    for (let i = 0; i < id.length; i++) {
      if (id[i] > max_id) {
        max_id = id[i]
      }
    }
    return (max_id += 1)
  })

  return {
    project,
    project_id,
    publicProjectInfo
  }
}
