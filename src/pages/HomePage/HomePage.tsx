import Layout from '../../components/layout/Layout/Container/Layout.tsx'
import ProjectContainer from '../../components/sections/ProjectContainer/ProjectContainer'

const HomePage = (props: any) => {
  return (
    <Layout>
      <ProjectContainer search={props.search}></ProjectContainer>
    </Layout>
  )
}

export default HomePage