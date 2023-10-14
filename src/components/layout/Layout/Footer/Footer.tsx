import Container from 'react-bootstrap/Container';
import './footer.scss'

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <span><span className="arrow-left">&gt;&gt;</span><a href="https://patakiistvan.netlify.app" target='blank'> István Pataki </a><span className="arrow-right">&lt;&lt;</span></span>
      </Container>
    </footer>
  )
}

export default Footer