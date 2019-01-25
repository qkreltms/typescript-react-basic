import { members } from './mockData'
import { RepositoryEntity } from '../../model'

const baseURL = 'https://api.github.com/orgs/lemoncode'
const repoURL = 'https://api.github.com/orgs/lemoncode/repos'
let mockMembers = members

//내장된 파일의 가짜 데이터에서 가져옴
const fetchMembers = (): Promise<MemberEntity[]> => {
    return Promise.resolve(mockMembers)
}

const saveMember = (member: MemberEntity): Promise<boolean> => {
    //멤버가 이미 추가됐는지 확인
    const index = mockMembers.findIndex(m => m.id === member.id)

    //이미 추가되어있으면 업데이트 아니면 새로 추가
    index >= 0 ?
        updateMember(member, index) :
        insertMember(member)
    
    return Promise.resolve(true)
}

const updateMember = (member: MemberEntity, index: number) => {
    //배열 중간에 데이터 추가
    mockMembers = [
        ...mockMembers.slice(0, index),
        member,
        ...mockMembers.slice(index + 1)
    ]
}

const insertMember = (member: MemberEntity) => {
    member.id = mockMembers.length

    mockMembers = [
        ...mockMembers,
        member
    ]
}

//아이디가 같은 맴버 가져옴 없으면 초기값 반환
const fetchMemberById = (id: number): Promise<MemberEntity> => {
    const index: number = mockMembers.findIndex(m => m.id === id);
    const member: MemberEntity = index >= 0 ?
      mockMembers[index]
      :
      {
        id: -1,
        login: '',
        avatar_url: '',
      };
  
    return Promise.resolve(member);
  }

//url 통해서 데이터 가져옴
const fetchMembersAsync = (): Promise<MemberEntity[]> => {
    const membersURL = `${baseURL}/members`

    return fetch(membersURL)
    .then((res) => (res.json()))
    .then(mapToMembers)
}

//새로 매핑한 객체를 배열로 반환
const mapToMembers = (githubMembers: any[]): MemberEntity[] => {
    return githubMembers.map(mapToMember)
}

//객체를 새로 매핑해줌
const mapToMember = (githubMember): MemberEntity => {
    return {
        id: githubMember.id,
        login: githubMember.login,
        avatar_url: githubMember.avatar_url
    }
}

const mapToRepositories = (githubRepositories: any[]): RepositoryEntity[] => {
    return githubRepositories.map(mapToRepository)
}

const mapToRepository = (githubRepository: any): RepositoryEntity => {
    return {
        id: githubRepository.id,
        name: githubRepository.name,
        description: githubRepository.decription
    }
}

const fetchRepositoriesAsync = (): Promise<RepositoryEntity[]> => {
    const repositoryURL = repoURL

    return fetch(repositoryURL)
    .then(res => res.json())
    .then(mapToRepositories)
}

export const memberAPI = {
    fetchMembers,
    fetchMembersAsync,
    saveMember,
    fetchMemberById,
    fetchRepositoriesAsync,
}