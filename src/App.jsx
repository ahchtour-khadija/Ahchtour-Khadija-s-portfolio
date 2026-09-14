import './App.css';
import {BrowserRouter,Routes,Route,Link} from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import ProjectsPage from './pages/ProjectsPage.jsx';
import SkillsPage from './pages/SkillsPage.jsx';
import ContactsPage from './pages/ContactsPage.jsx';

function App() {

  return (
    <>
      <BrowserRouter>
        <nav>
          <Link to='/'>Home</Link>
          <Link to='/about'>About</Link>
          <Link to='/projects'>Projects</Link>
          <Link to='/skills'>Skills</Link>
          <Link to='/contacts'>Contacts</Link>
        </nav>

      
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/about' element={<AboutPage/>}/>
          <Route path='/projects'element={<ProjectsPage/>}/>
          <Route path='/skills'element={<SkillsPage/>}/>
          <Route path='/contacts'element={<ContactsPage/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
