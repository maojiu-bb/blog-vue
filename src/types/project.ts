export interface Iproject {
  project_id: number
  project_name: string
  github_address: string
  project_info: string
  project_cover: []
}

export class Project {
  project: Iproject[] = []
}
