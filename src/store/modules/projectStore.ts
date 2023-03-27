import { getProject, publicProject } from '@/api/requests'
import { Iproject, Project } from '@/types/project'
import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const projectStore = defineStore('project', () => {
  const project = reactive(new Project())
  const getProjectList = async () => {
    const { data: res } = await getProject()
    if (res.code === 200) {
      project.project = res.data
    }
  }
  getProjectList()

  const publicProjectInfo = async (data: Iproject) => {
    const { data: res } = await publicProject(data)
    if (res.code === 200) {
      getProjectList()
    }
  }

  return {
    project,
    publicProjectInfo
  }
})
