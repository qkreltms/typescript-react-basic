import { members } from './mockData'

const baseURL = 'https://api.github.com/orgs/lemoncode'

//내장된 파일의 가짜 데이터에서 가져옴
const fetchMembers = (): Promise<MemberEntity[]> => {
    return Promise.resolve(members)
}

//url 통해서 데이터 가져옴
const fetchMembersAsync = (): Promise<MemberEntity[]> => {
    const membersURL = `${baseURL}/members`

    return fetch(membersURL)
    .then((res) => (res.json()))
    .then(mapToMembers)
}

const mapToMembers = (githubMembers: any[]): MemberEntity[] => {
    return githubMembers.map(mapToMember)
}

const mapToMember = (githubMember): MemberEntity => {
    return {
        id: githubMember.id,
        login: githubMember.login,
        avatar_url: githubMember.avatar_url
    }
}

export const memberAPI = {
    fetchMembers,
    fetchMembersAsync
}